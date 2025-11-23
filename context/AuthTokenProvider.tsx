"use client";

import { useAuth } from "@clerk/nextjs";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { STORAGE_KEYS } from "@lib/constant/storageKeys";

interface TokenContextValue {
  token: string | null;
  isLoading: boolean;
}

const TokenContext = createContext<TokenContextValue | null>(null);

const TOKEN_STORAGE_KEY = STORAGE_KEYS.AUTH_TOKEN;

export const AuthTokenProvider = ({ children }: { children: ReactNode }) => {
  const { getToken, isLoaded, isSignedIn } = useAuth();

  const [isLoading, setIsLoading] = useState(true);

  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      try {
        const storedToken = sessionStorage.getItem(TOKEN_STORAGE_KEY);
        return storedToken || null;
      } catch {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    const fetchToken = async () => {
      try {
        if (isSignedIn) {
          const tok = await getToken();
          setToken(tok);
          if (tok && typeof window !== "undefined") {
            try {
              sessionStorage.setItem(TOKEN_STORAGE_KEY, tok);
            } catch (error) {
              console.error("Failed to persist token to sessionStorage", error);
            }
          }
        } else {
          setToken(null);
          if (typeof window !== "undefined") {
            try {
              sessionStorage.removeItem(TOKEN_STORAGE_KEY);
            } catch (error) {
              console.error("Failed to clear token from sessionStorage", error);
            }
          }
        }
      } catch (error) {
        console.log("FAILED TO FETCH TOKEN FROM CLERK", error);
        setToken(null);
        if (typeof window !== "undefined") {
          try {
            sessionStorage.removeItem(TOKEN_STORAGE_KEY);
          } catch (error) {
            console.error("Failed to clear token from sessionStorage", error);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchToken();
  }, [getToken, isLoaded, isSignedIn]);

  const memorizedValue = useMemo(
    () => ({
      token,
      isLoading,
    }),
    [isLoading, token]
  );

  return (
    <TokenContext.Provider value={memorizedValue}>
      {children}
    </TokenContext.Provider>
  );
};

export const useAuthToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
};
