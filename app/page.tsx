import { SignedOut, SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="grid place-items-center w-dvw h-dvh">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl text-center">Betzy Admin Panel</h1>
          <p className="text-center text-black/90">
            View and manage data for betzy site
          </p>
        </div>
        <SignedOut>
          <SignIn />
        </SignedOut>
      </div>
    </main>
  );
}
