import { auth, signOut } from "@/auth";

export default async function signOut() {
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