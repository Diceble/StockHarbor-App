import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Image from "next/image";
import AuthButtons from "@/components/AuthButtons";

export default async function Home() {
  // Get session on server - no loading state needed!
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="mb-8">
        <Image
          src="/stockharbor-logo.svg"
          alt="StockHarbor Logo"
          width={500}
          height={500}
        />
        <p className="text-center">
          Welcome to StockHarbor, Sign In to use the app
        </p>
        <div className="text-center mt-4">
          {/* Pass session data to client component */}
          <AuthButtons session={session} />
        </div>
      </div>
    </div>
  );
}
