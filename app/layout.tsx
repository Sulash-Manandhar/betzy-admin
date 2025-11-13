import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@/context/ClerkProvider";
import { QueryProvider } from "@/context/QueryProvider";
import { SyncActiveOrganization } from "@/context/SyncActiveOrganizationProvider";
import { auth } from "@clerk/nextjs/server";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Betzy Admin Panel",
  description: "Handle and manage betzy's data",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { sessionClaims } = await auth();

  return (
    <html lang="en">
      <body className={`${geistMono.className} antialiased`}>
        <ClerkProvider>
          <QueryProvider>{children}</QueryProvider>
          <SyncActiveOrganization membership={sessionClaims?.membership} />
        </ClerkProvider>
      </body>
    </html>
  );
}
