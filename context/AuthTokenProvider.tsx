"use client";

import { useAuth } from "@clerk/nextjs";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface TokenContextValue {
  token: string | null;
}

const TokenContext = createContext<TokenContextValue | null>(null);

export const AuthTokenProvider = ({ children }: { children: ReactNode }) => {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      if (isLoaded && isSignedIn) {
        const tok = await getToken();
        setToken(tok);
      } else {
        setToken(null);
      }
    };
    fetchToken();
  }, [isLoaded, isSignedIn, getToken]);

  return (
    <TokenContext.Provider value={{ token }}>{children}</TokenContext.Provider>
  );
};

export const useAuthToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
};
