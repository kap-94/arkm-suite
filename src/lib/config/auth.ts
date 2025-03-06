// src/config/auth.ts
import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { createClient } from "@supabase/supabase-js";

// Create the Supabase client
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export const config: NextAuthConfig = {
  secret: process.env.AUTH_SECRET!,
  providers: [
    // Google Provider
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // Credentials Provider (Email/Password)
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = (credentials?.email as string) || "";
        const password = (credentials?.password as string) || "";

        // Verify user with Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        console.log({ data });

        if (error) {
          throw new Error("Invalid email or password");
        }

        const user = data.user;
        console.log({ user });

        // Return user object on successful authentication
        return {
          id: user?.id || "",
          email: user?.email || "",
          name: user?.user_metadata?.full_name || "Unknown User",
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url === baseUrl) {
        return `${baseUrl}/dashboard`;
      }
      if (url.startsWith(baseUrl)) {
        return url;
      }
      return baseUrl;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.id = profile.id;
        token.email = profile.email;
        token.name = profile.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
  debug: true,
};

export const { auth, handlers } = NextAuth(config);
