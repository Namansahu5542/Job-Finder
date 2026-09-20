import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub, Google],
  pages: { signIn: "/sign-in" }, // your custom page instead of the default one
  callbacks: {
    // Runs in the proxy/middleware. Return false to redirect to the sign-in page.
    authorized({ auth, request }) {
      const isProtected = request.nextUrl.pathname.startsWith("/dashboard");
      return isProtected ? !!auth?.user : true;
    },
  },
});