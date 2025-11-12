"use client";

import { ClerkProvider as ClerkProviderClerk } from "@clerk/nextjs";
import { env } from "@lib/env";
import { ReactNode } from "react";

const clerkPublishableKey = env.CLERK_PUBLISHABLE_KEY;

export function ClerkProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProviderClerk publishableKey={clerkPublishableKey}>
      {children}
    </ClerkProviderClerk>
  );
}
