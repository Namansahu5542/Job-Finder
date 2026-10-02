"use client"
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { ValidationAndTransformationLogin } from '@/Pipline/VandT_Login';
import { useRouter } from 'next/navigation';




const oauthButton =
    "inline-flex w-full items-center justify-center gap-3 rounded-lg px-4 py-3 text-sm font-medium " +
    "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/70 " +
    "focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900";


const Extended__Loginpage = () => {
    const router = useRouter()
    const [error, seterror] = useState()
    const [Loading, setLoading] = useState(false)

    async function checksubmit(e) {
        e.preventDefault();
        seterror("")
        setLoading(true)
        const data = Object.fromEntries(new FormData(e.target));
        const result = ValidationAndTransformationLogin(data)
        if (!result.valid) {
            seterror(result.error)
            setLoading(false)
            return
        }

        try {
            const res = await signIn("credentials", {
                email: result.data.email,
                password: result.data.password,
                redirect: false,
            });

            if (res?.error) {
                seterror("Invalid email or password");
                return;
            }

            router.push("/dashboard");
            router.refresh();
        } catch (err) {
            console.error("Login failed", err)
            seterror("Unable to sign in. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />

            <div className="m-4 text-gray-100">
                <form onSubmit={checksubmit} className="flex flex-col justify-center items-start gap-2" >
                    <div>  <label className="ml-1 text-sm font-(family-name:--font-poppins)" htmlFor="email">Enter e-mail
                    </label>
                        <input id="email" name='email' type="email" className={`${oauthButton} bg-gray-950`} placeholder="Eg :-  abc@gmil.com" /></div>

                    <div>  <label className="ml-1 text-sm font-(family-name:--font-poppins)" htmlFor="password">Enter Passowrd
                    </label>
                        <input id="password" name='password' type="password" className={`${oauthButton} bg-gray-950`} placeholder="Eg :- nam0@552005" /></div>

                    {error && <p style={{ color: "red" }}>{error}</p>}

                    <div className="flex gap-5">
                        <button type="submit" disabled={Loading} className="ml-1 mt-2 rounded-xl bg-linear-to-br from-gray-900 to-blue-400 px-4 py-2.5 text-center text-sm font-medium leading-5 text-white hover:bg-linear-to-bl focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800 disabled:opacity-50">
                            {Loading ? "Logging in..." : "Log in"}
                        </button>

                        <div className="text-white text-sm font-sans mt-5 cursor-pointer hover:text-red-300"><u>Forget password ?</u></div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Extended__Loginpage
