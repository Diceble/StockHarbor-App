import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware() {
    // Additional middleware logic can go here if needed
  },
  {
    callbacks: {
      authorized: async ({ token }) => {
        // NextAuth automatically handles refresh in the JWT callback
        // So we just need to check if token exists and doesn't have errors
        if (!token) {
          console.log("No token found");
          return false;
        }

        // Check if token refresh failed
        if (token.error === "RefreshAccessTokenError") {
          console.log("Token refresh failed, redirecting to sign in");
          return false;
        }

        return true;
      },
    },
    pages: {
      signIn: "/api/auth/signin/duende-identity-server6",
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/products/:path*"], // Protect all dashboard routes
};
