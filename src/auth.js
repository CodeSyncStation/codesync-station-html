import User from "@/model/UserModel";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";
import { findUser } from "./lib/fetch/users";
import dbConnect from "./lib/mongoose/dbConnect";

async function saltAndHashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  providers: [
    Facebook({
      async profile(profile) {
        await dbConnect();
        let existingUser = await findUser(profile?.email);
        if (existingUser?.status == 404) {
          existingUser = await User.create({
            name: profile.name,
            email: profile.email,
            image: profile.picture?.data?.url,
          });
        }
        return {
          _id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
          image: existingUser.image,
          role: existingUser.role ?? "user",
        };
      },
    }),
    Google({
      async profile(profile) {
        await dbConnect();
        let existingUser = await findUser(profile?.email);
        if (existingUser?.status == 404) {
          existingUser = await User.create({
            name: profile.name,
            email: profile.email,
            image: profile.picture,
          });
        }
        return {
          _id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
          image: existingUser.image,
          role: existingUser.role ?? "user",
        };
      },
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();
        const user = await findUser(credentials?.email);
        if (user) {
          return {
            _id: user._id,
            name: user.name,
            email: user.email,
            image: user.image ?? undefined,
            role: user.role ?? "user",
          };
        }
        throw new Error("Invalid credentials");
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.role = user.role;
        token.image = user?.image;
      }
      return token;
    },
    async session({ session, token }) {
      session.user._id = token._id;
      session.user.role = token.role;
      session.user.image = token?.image;
      return session;
    },
  },
});
