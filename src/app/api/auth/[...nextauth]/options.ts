import axios from "axios";
import GoogleProvider from "next-auth/providers/google";
import { jwtDecode } from "jwt-decode";
import type { NextAuthOptions } from "next-auth";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        const res = await axios({
          method: "POST",
          url: `${baseUrl}/v1/auth/google-signup`,
          headers: {
            "Content-Type": "application/json",
          },
          data: { username: user.name, email: user.email, avatar: user.image },
        });
        if (res.status === 200) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          user.token = res.data.token;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          user.userRole = res.data.user.userRole;
          return true;
        } else {
          return false;
        }
      } catch {
        return false;
      }
    },

    async jwt({ token, user }) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      if (user?.token) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        token.accessToken = user.token;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        token.userRole = user.userRole;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        const decoded = jwtDecode(user.token);
        token.customExp = decoded.exp;
      }
      return token;
    },

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    async session({ session, token }) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      if (token?.customExp && Date.now() / 1000 > token.customExp) {
        return {};
      }

      if (!session || typeof session.user !== "object") {
        session.user = {};
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      session.accessToken = token.accessToken as string;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      session.user.role = token.userRole as string;
      return session;
    },
  },
};
