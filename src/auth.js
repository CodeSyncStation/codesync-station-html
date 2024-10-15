import User from "@/model/UserModel";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

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
    Google({
      async profile(profile) {
        // check using email exist or not
        let existingUser = await User.findOne({ email: profile.email });
        if (!existingUser) {
          // Create a new user if they don't exist
          existingUser = await User.create({
            name: profile.name,
            email: profile.email,
            image: profile.picture,
          });
        }
        return { role: existingUser?.role ?? "user", ...existingUser };
      },
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        let user = null;

        // logic to salt and hash password
        const pwHash = saltAndHashPassword(credentials.password);

        // logic to verify if the user exists
        user = await getUserFromDb(credentials.email, pwHash);

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.");
        }
        // return user object with their profile data

        return { ...user, role: user?.role ?? "user" };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
    // async signIn({ user, account }) {
    //   await dbConnect(); // Ensure MongoDB connection
    //   // Check if the user already exists in the database
    //   if (account.type === "oauth") {
    //     const existingUser = await User.findOne({ email: user.email });
    //     if (!existingUser) {
    //       // Create a new user if they don't exist
    //       await User.create({
    //         name: user.name,
    //         email: user.email,
    //         image: user.image,
    //       });
    //     }
    //   }
    //   return true;
    // },
  },
});
