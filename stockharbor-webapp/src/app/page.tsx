"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">StockHarbor App</h1>

      {!session ? (
        <div>
          <p className="mb-4">You are not signed in</p>
          <button
            onClick={() => signIn("duende-identity-server6")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign In with Duende Identity Server
          </button>
        </div>
      ) : (
        <div>
          <p className="mb-4">
            Welcome, {session.user?.name || session.user?.email}!
          </p>
          <p className="mb-4">You are signed in as: {session.user?.email}</p>
          <button
            onClick={() => signOut()}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
