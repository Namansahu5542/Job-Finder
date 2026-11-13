import { Suspense } from "react";
import { auth, signOut } from "@/lib/auth/auth";

async function SignOutContent() {
  const session = await auth();
  if (!session) return null; // the proxy already redirected, this is a safety check

  return (
    <div>
      <p>Hi, {session.user.name}</p>
      <form action={async () => { "use server"; await signOut({ redirectTo: "/sign-in" }); }}>
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
}

export default function SignOutPage() {
  return (
    <Suspense fallback={<p aria-busy="true">Loading...</p>}>
      <SignOutContent />
    </Suspense>
  );
}