import "@tanstack/react-query";

declare module "@tanstack/react-query" {
  interface Register {
    mutationMeta: {
      invalidateQueries?: string[];
    };
  }
}

declare global {
  interface CustomJwtSessionClaims {
    membership: Record<string, string>;
  }
}
