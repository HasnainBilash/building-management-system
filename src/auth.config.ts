import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize() {
        // We'll implement this in the next step.
        return null;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;