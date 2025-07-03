import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import DuendeIDS6Provider from "next-auth/providers/duende-identity-server6";

export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers
  providers: [
    DuendeIDS6Provider({
      name: "Duende Identity Server 6",
      id: "duende-identity-server6",
      clientId: process.env.DUENDE_CLIENT_ID!,
      clientSecret: "",
      issuer: process.env.DUENDE_ISSUER!,
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
