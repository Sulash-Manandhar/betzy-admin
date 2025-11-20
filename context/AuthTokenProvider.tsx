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

interface TokenContextValue {
  token: string | null;
  isLoading: boolean;
}

const TokenContext = createContext<TokenContextValue | null>(null);

export const AuthTokenProvider = ({ children }: { children: ReactNode }) => {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        if (isLoaded && isSignedIn) {
          const tok = await getToken();
          setToken(tok);
        } else {
          setToken(null);
        }
      } catch (error) {
        console.log("FAILED TO FETCH TOKEN FROM CLERK", error);
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchToken();
  }, [getToken, isLoaded, isSignedIn, isLoading]);

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
