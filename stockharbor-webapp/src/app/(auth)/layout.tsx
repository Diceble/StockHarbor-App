import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/providers/AuthProvider";
import SidebarMenu from "@/components/SidebarMenu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider session={session}>
          <div className="flex h-screen">
            <SidebarMenu />
            <div className="flex-1 flex flex-col overflow-hidden ">
              {/* Header */}
              <header className="bg-(--foreground)">
                <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Dashboard
                  </h2>
                </div>
              </header>

              {/* Main content area */}
              <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                <div>{children}</div>
              </main>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
