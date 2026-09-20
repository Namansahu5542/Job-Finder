import Link from "next/link";
import { Dancing_Script } from "next/font/google";
import { signIn } from "@/auth";

const cursive = Dancing_Script({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});


const oauthButton =
  "inline-flex w-full items-center justify-center gap-3 rounded-lg px-4 py-3 text-sm font-medium " +
  "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/70 " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900";

const trackedJobs = [
  { company: "Northwind", role: "Frontend Engineer", status: "Interview", tone: "bg-violet-500/15 text-violet-300" },
  { company: "Acme Labs", role: "Full Stack Developer", status: "Applied", tone: "bg-sky-500/15 text-sky-300" },
  { company: "Globex", role: "Software Intern", status: "Saved", tone: "bg-gray-500/20 text-gray-300" },
];

const GithubIcon = () => (
  <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
    />
  </svg>
);


const GoogleIcon = () => (
  <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
  </svg>
);

const SignUpPage = () => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[#16181D] px-4 py-8 sm:px-6">
      <div className="grid grid-cols-2 w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-gray-900 to-gray-800 shadow-2xl shadow-black/40 md:grid-cols-2">

        <section className="flex flex-col col-span-1 justify-center gap-8 p-6 sm:p-10">
          <div className="space-y-3 text-center md:text-left">
            <h1
              className={`${cursive.className} text-balance text-3xl leading-snug text-gray-100 sm:text-4xl`}
            >
              Sign up to track your job search
            </h1>
            <p className="text-sm leading-relaxed text-gray-400">
              Save jobs, log applications and see where each one stands.
            </p>
          </div>

          <div className="flex flex-col gap-3">

            <form
              action={async () => {
                "use server";
                await signIn("github", { redirectTo: "/dashboard" });
              }}
            >
              <button type="submit" className={`${oauthButton} border border-white/10 bg-gray-800 text-gray-100 hover:bg-gray-700`}>
                <GithubIcon /> Continue with GitHub
              </button>
            </form>
            <button
              type="button"
              className={`${oauthButton} bg-white text-gray-900 hover:bg-gray-200`}
            >
              <GoogleIcon />
              Continue with Google
            </button>
          </div>

          <div className="space-y-3 text-center text-sm text-gray-400 md:text-left">
            <p>
              Already have an account?{" "}
              <Link
                href="/Login"
                className="font-medium text-violet-400 underline-offset-4 hover:underline focus:outline-none focus-visible:underline"
              >
                Sign in
              </Link>
            </p>
            <p className="text-xs leading-relaxed text-gray-500">
              By continuing, you agree to our{" "}
              <Link href="/terms" className="underline underline-offset-2 hover:text-gray-300">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline underline-offset-2 hover:text-gray-300">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Right: preview of the tracker (hidden on small screens) */}
        <aside
          aria-hidden="true"
          className="relative hidden flex-col  gap-4 overflow-hidden border-l border-white/5 bg-[#16181D]/60 p-10 md:flex"
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="m-4 text-gray-100">
            <form className="flex flex-col justify-center items-start gap-2" >
              <div> <label className="ml-1 text-sm font-(family-name:--font-poppins)" htmlFor="username">Enter Username
              </label>
                <input id="username" type="text" className={`${oauthButton} bg-gray-950`} placeholder="Eg :-  XYZ" /></div>

              <div> <label className="ml-1 text-sm font-(family-name:--font-poppins)" htmlFor="profile-name">Enter Profile Name
              </label>
                <input id="profile-name" type="text" className={`${oauthButton} bg-gray-950`} placeholder="Eg :-  Naman Sahu" /></div>



              <div>  <label className="ml-1 text-sm font-(family-name:--font-poppins)" htmlFor="email">Enter e-mail
              </label>
                <input id="email" type="email" className={`${oauthButton} bg-gray-950`} placeholder="Eg :-  abc@gmil.com" /></div>

              <div>  <label className="ml-1 text-sm font-(family-name:--font-poppins)" htmlFor="password">Enter Passowrd
              </label>
                <input id="password" type="password" className={`${oauthButton} bg-gray-950`} placeholder="Eg :- nam0@552005" /></div>

              <div>
                <button type="button" className="ml-1 mt-2 rounded-xl bg-linear-to-br from-gray-900 to-blue-400 px-4 py-2.5 text-center text-sm font-medium leading-5 text-white hover:bg-linear-to-bl focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">Submit</button>
              </div>
            </form>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default SignUpPage;