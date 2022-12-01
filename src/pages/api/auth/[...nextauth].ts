import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Prisma adapter for NextAuth, optional and can be removed
import { env } from "@/envserver.mjs";
import { prisma } from "@/serverdb/client";
import { comparePassword } from "@/utils/passwordUtils";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
  callbacks: {
    async jwt({ token, user }) {
      user && (token = { ...user });
      return token;
    },
    async session({ session, token }) {
      session = {
        expires: session.expires,
        user: { ...token, id: token.id as string },
      };
      return session;
    },
  },

  adapter: PrismaAdapter(prisma),
  providers: [
    // ...add more providers here
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (user) {
          const passwordCorrect = comparePassword({
            candidatePassword: credentials?.password as string,
            hashedPassword: user.password ?? "",
          });

          if (!passwordCorrect) {
            throw new Error("Incorrect password");
          }

          return {
            id: user.id as unknown as string,
            name: user.firstName + " " + user.lastName,
            role: user.userType,
            email: user.email as string,
          };
        } else {
          throw new Error("User not found");
        }
      },
    }),
  ],
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
};

export default NextAuth(authOptions);
