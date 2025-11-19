"use client";
import { useUser } from "@clerk/nextjs";
import { ADMIN_USER_EMAILS } from "@lib/constant";

export default function useIsMasterAdmin() {
  const { user, isSignedIn, isLoaded } = useUser();

  if (!isSignedIn || !isLoaded) return false;
  console.log(user.emailAddresses?.[0].emailAddress);

  if (ADMIN_USER_EMAILS.includes(user?.emailAddresses?.[0]?.emailAddress))
    return true;
  return false;
}
