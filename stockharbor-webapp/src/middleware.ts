import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Additional middleware logic can go here if needed
    console.log("Middleware triggered for:", req.nextUrl.pathname);
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/api/auth/signin/duende-identity-server6",
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/products/:path*"], // Protect all dashboard routes
};
