"use client";

import { DEFAULT_GC_TIME, DEFAULT_STALE_TIME } from "@/lib/constant";
import { APIError } from "@/lib/types";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { PropsWithChildren } from "react";
import { toast } from "sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: DEFAULT_STALE_TIME,
      gcTime: DEFAULT_GC_TIME,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      onSettled: (_data, error, _variables, _context, mutation) => {
        if (error) return;
        if (mutation.meta?.invalidateQueries) {
          queryClient.invalidateQueries({
            queryKey: mutation.meta.invalidateQueries,
          });
        }
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof AxiosError) {
        const newError = error as AxiosError<APIError<unknown>>;
        toast.error("Something went wrong", {
          description: newError?.response?.data?.error?.message,
          descriptionClassName: "toast-description",
          className: "toast-container",
        });
        return;
      }
      toast.error("Something went wrong");
    },
  }),
});

export function QueryProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
