import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import dbConnect from "@/lib/db";
import UserCredential from "@/models/User_Credential";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub, Google],
  pages: { signIn: "/sign-in" }, // your custom page instead of the default one
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
    // Runs in the proxy/middleware. Return false to redirect to the sign-in page.
    authorized({ auth, request }) {
      const isProtected = request.nextUrl.pathname.startsWith("/dashboard");
      return isProtected ? !!auth?.user : true;
    },
  },
});