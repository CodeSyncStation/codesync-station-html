import User from "@/model/UserModel";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";
import dbConnect from "./lib/mongoose/dbConnect";

async function saltAndHashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

async function getUserFromDb(email, pwHash) {
  await dbConnect();
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(pwHash, user.password))) {
    return user;
  }
  return null;
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  providers: [
    Facebook({
      async profile(profile) {
        await dbConnect();
        let existingUser = await User.findOne({ email: profile?.email });
        if (!existingUser) {
          existingUser = await User.create({
            name: profile.name,
            email: profile.email,
            image: profile.picture?.data?.url,
          });
        }
        return {
          id: existingUser._id.toString(),
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
        let existingUser = await User.findOne({ email: profile?.email });
        if (!existingUser) {
          existingUser = await User.create({
            name: profile.name,
            email: profile.email,
            image: profile.picture,
          });
        }
        return {
          id: existingUser._id.toString(),
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
        const user = await User.findOne({ email: credentials.email });
        if (
          user &&
          (await bcrypt.compare(credentials.password, user.password))
        ) {
          return {
            id: user._id.toString(),
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
        console.log(user, "user");
        token.id = user.id;
        token.role = user.role;
        // Add any additional fields you need in the session here
      }
      return token;
    },
    async session({ session, token }) {
      console.log(token, "token");
      session.user.id = token.id;
      session.user.role = token.role;
      // Add any additional fields here if needed
      return session;
    },
  },
});
