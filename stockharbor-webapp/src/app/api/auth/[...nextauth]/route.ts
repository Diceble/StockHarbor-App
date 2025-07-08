import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import DuendeIDS6Provider from "next-auth/providers/duende-identity-server6";

interface TokenWithRefresh {
  access_token?: string;
  refresh_token?: string;
  expires_at?: number;
  error?: string;
}

async function refreshAccessToken(token: TokenWithRefresh) {
  try {
    const uri = new URL("/connect/token", process.env.DUENDE_ISSUER!);

    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("client_id", process.env.DUENDE_CLIENT_ID!);
    params.append("client_secret", "");

    if (token.refresh_token) {
      params.append("refresh_token", token.refresh_token);
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    const response = await fetch(uri, {
      method: "POST",
      headers: headers,
      body: params.toString(),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      console.log("Failed to refresh token:", refreshedTokens);
      throw new Error(refreshedTokens.error || "Token refresh failed");
    }
    console.log("Refreshed token successfully fetched");

    return {
      ...token,
      access_token: refreshedTokens.access_token,
      expires_at: Math.floor(Date.now() / 1000) + refreshedTokens.expires_in,
      refresh_token: refreshedTokens.refresh_token ?? token.refresh_token,
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

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
          scope: "openid profile email stockharbor.api offline_access",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      // Persist the OAuth access_token to the token right after signin
      if (account && user) {
        return {
          ...token,
          access_token: account.access_token,
          refresh_token: account.refresh_token,
          expires_at: account.expires_at,
        };
      }

      // Check if token is expired
      const currentTime = Math.floor(Date.now() / 1000);
      const expiresAt = token.expires_at as number;
      const isTokenExpired =
        expiresAt && typeof expiresAt === "number" && currentTime >= expiresAt;

      if (isTokenExpired) {
        // Token expired, refresh it
        return await refreshAccessToken(token as TokenWithRefresh);
      }

      // Token expired, refresh it
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      if (token) {
        session.accessToken = token.access_token as string;
        session.refreshToken = token.refresh_token as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
