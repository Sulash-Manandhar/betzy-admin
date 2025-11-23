import { SignedIn, SignOutButton } from "@clerk/nextjs";
import React from "react";

export default function Unauthorized() {
  return (
    <div>
      Unauthorized
      <SignedIn>
        <SignOutButton />
      </SignedIn>
    </div>
  );
}
