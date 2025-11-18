"use server";
import { auth } from "@clerk/nextjs/server";

export async function getClerkToken() {
  try {
    const { getToken } = await auth();
    const token = await getToken();
    return token;
  } catch (error) {
    console.log("TOKEN ERROR:", error);
    return null;
  }
}
