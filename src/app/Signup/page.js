import Link from "next/link";
import { Dancing_Script } from "next/font/google";
import Extended_Signup from "../components/Extended_Signup";
import OAuthButtons from "../components/OAuthButtons";

const cursive = Dancing_Script({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

const trackedJobs = [
  { company: "Northwind", role: "Frontend Engineer", status: "Interview", tone: "bg-violet-500/15 text-violet-300" },
  { company: "Acme Labs", role: "Full Stack Developer", status: "Applied", tone: "bg-sky-500/15 text-sky-300" },
  { company: "Globex", role: "Software Intern", status: "Saved", tone: "bg-gray-500/20 text-gray-300" },
];

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

          {/* OAuth buttons live in a Client Component so they can use onClick */}
          <OAuthButtons />

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
          className="relative hidden flex-col gap-4 overflow-hidden border-l border-white/5 bg-[#16181D]/60 p-10 md:flex"
        >
          <Extended_Signup />
        </aside>
      </div>
    </main>
  );
};

export default SignUpPage;