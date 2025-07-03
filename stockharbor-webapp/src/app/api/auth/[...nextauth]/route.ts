import NextAuth from "next-auth";
import DuendeIDS6Provider from "next-auth/providers/duende-identity-server6";

const handler = NextAuth({
  // https://next-auth.js.org/configuration/providers
  providers: [
    DuendeIDS6Provider({
      name: "Duende Identity Server 6",
      id: "duende-identity-server6",
      clientId: "interactive.confidential",
      clientSecret: "secret",
      issuer: "https://demo.duendesoftware.com",
    }),
  ],
});

export { handler as GET, handler as POST };
