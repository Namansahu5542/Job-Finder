import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

const authConfig = {
  session: { strategy: "jwt" },
  providers: [GitHub, Google],
  
  callbacks: {
    jwt({ token, user }) {
      if (user) token.username = user.username;
      return token;
    },
    session({ session, token }) {
      session.user.username = token.username;
      return session;
    },
    authorized({ auth, request }) {
      const isProtected = request.nextUrl.pathname.startsWith("/dashboard");
      return isProtected ? !!auth?.user : true;
    },
  },
};

export default authConfig;
