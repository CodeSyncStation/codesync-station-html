import User from "@/model/UserModel";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import dbConnect from "./lib/mongoose/dbConnect";

async function saltAndHashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

async function getUserFromDb(email, pwHash) {
  // logic to query the database
  const user = await User.findOne({ email });
  return user;
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},

      },
      async authorize(credentials) {
        let user = null

        // logic to salt and hash password
        const pwHash = saltAndHashPassword(credentials.password)

        // logic to verify if the user exists
        user = await getUserFromDb(credentials.email, pwHash)

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.")
        }
        // return user object with their profile data
        console.log(user, "user")
        return { ...user, role: user?.role }
      },

    })
  ],
  callbacks: {

    async signIn({ user, account }) {
      await dbConnect(); // Ensure MongoDB connection
      if (account.type === "oauth") {
        // Check if the user already exists in the database
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          // Create a new user if they don't exist
          await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
          });
        }

        return true;
      }
      return true;
    },

  }
})