"use client";
import { signIn, signOut } from "next-auth/react";
import type { Session } from "next-auth";

interface AuthButtonsProps {
  session: Session | null;
}

export default function AuthButtons({ session }: AuthButtonsProps) {
  if (!session) {
    return (
      <button
        onClick={() => signIn("duende-identity-server6")}
        className="bg-accent-3 hover:bg-accent-2 text-white font-bold py-2 px-4 rounded"
      >
        Sign In
      </button>
    );
  }

  return (
    <button
      onClick={() => signOut()}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      Sign Out
    </button>
  );
}
