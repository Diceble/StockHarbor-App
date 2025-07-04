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
      authorization: {
        params: {
          scope: "openid profile email stockharbor.api",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
        token.scope = account.scope;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      session.expiresAt = token.expiresAt as number;
      session.scope = token.scope as string;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
