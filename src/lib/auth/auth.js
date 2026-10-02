import NextAuth from "next-auth";
import dbConnect from "@/lib/db";
import UserCredential from "@/models/User_Credential";
import UserData from "@/models/User_Credentials_m2";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import authConfig from "@/lib/auth/auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [...authConfig.providers, Credentials({
    credentials: { email: {}, password: {} },
    async authorize(credentials) {
      await dbConnect();

      const user = await UserData.findOne({
        email: credentials.email.toLowerCase(),
      }).select("+Password");

      if (!user) return null;

      const ok = await bcrypt.compare(credentials.password, user.Password);
      if (!ok) return null;

      return {
        id: user._id.toString(),
        email: user.email,
        name: user.ProfileName,
        username: user.Username,
      };
    },
  }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user.name || !user.email || !account?.providerAccountId) {
        throw new Error("The OAuth provider did not return the required user details.");
      }

      await dbConnect();
      await UserCredential.findOneAndUpdate(
        {
          provider: account.provider,
          providerAccountId: account.providerAccountId,
        },
        {
          $set: {
            name: user.name,
            email: user.email,
            image: user.image ?? null,
          },
          $setOnInsert: {
            provider: account.provider,
            providerAccountId: account.providerAccountId,
          },
        },
        { upsert: true, new: true, runValidators: true }
      );

      return true;
    },
    ...authConfig.callbacks,
  },
});