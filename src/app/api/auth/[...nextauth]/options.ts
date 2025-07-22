import axios from "axios";
import GoogleProvider from "next-auth/providers/google";
import { jwtDecode } from "jwt-decode";
import type { NextAuthOptions } from "next-auth";

const baseUrl = process.env.API_URL;

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile",
          prompt: "consent",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      // console.log(user, "user");
      try {
        const res = await axios({
          method: "POST",
          url: `${baseUrl}/v1/auth/google-signup`,
          headers: {
            "Content-Type": "application/json",
          },
          data: { username: user.name, email: user.email, avatar: user.image },
        });
        console.log(res, "res");
        if (res.status === 200) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          user.token = res.data.token;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          user.userRole = res.data.user.userRole;
          if (res.data.user.userRole === "admin") {
          }
          return true;
        } else {
          return false;
        }
      } catch {
        return false;
      }
      return true;
    },

    async jwt({ token, user }) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      if (user?.token) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        token.accessToken = user.token;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        token.userRole = user.userRole;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const decoded = jwtDecode(user.token);
        token.customExp = decoded.exp;
      }
      return token;
    },

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    async session({ session, token }) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      if (token?.customExp && Date.now() / 1000 > token.customExp) {
        return {};
      }

      if (!session || typeof session.user !== "object") {
        session.user = {};
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      session.accessToken = token.accessToken as string;
      session.user.role = token.userRole as string;
      return session;
    },
  },
};
