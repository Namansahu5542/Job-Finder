"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const oauthButton =
    "inline-flex w-full items-center justify-center gap-3 rounded-lg px-4 py-3 text-sm font-medium " +
    "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/70 " +
    "focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900";
const Extended_Signup = () => {

    const [error, seterror] = useState("")
    const [Loading, setLoading] = useState(false)
    const router = useRouter();
    async function handlesubmit(e) {
        e.preventDefault();
        setLoading(true)
        const data = Object.fromEntries(new FormData(e.target));

        const res = await fetch("/api/SignUp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (res.ok) router.push("/Login");
        else seterror((await res.json()).error);



    }
    return (
        <div>
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />

            <div className="m-4 text-gray-100">

                <form onSubmit={handlesubmit} className="flex flex-col justify-center items-start gap-2" >
                    <div> <label className="ml-1 text-sm font-(family-name:--font-poppins)" htmlFor="username">Enter Username
                    </label>
                        <input id="username" type="text" name="username" className={`${oauthButton} bg-gray-950`} placeholder="Eg :-  XYZ" /></div>

                    <div> <label className="ml-1 text-sm font-(family-name:--font-poppins)" htmlFor="profile-name">Enter Profile Name
                    </label>
                        <input id="profile-name" type="text" name="profileName" className={`${oauthButton} bg-gray-950`} placeholder="Eg :-  Naman Sahu" /></div>



                    <div>  <label className="ml-1 text-sm font-(family-name:--font-poppins)" htmlFor="email">Enter e-mail
                    </label>
                        <input id="email" name="email" type="email" className={`${oauthButton} bg-gray-950`} placeholder="Eg :-  abc@gmil.com" /></div>

                    <div>  <label className="ml-1 text-sm font-(family-name:--font-poppins)" htmlFor="password">Enter Passowrd
                    </label>
                        <input id="password" name="password" type="password" className={`${oauthButton} bg-gray-950`} placeholder="Eg :- nam0@552005" /></div>
                    {error && <p style={{ color: "red" }}>{error}</p>}

                    <div className="flex gap-5">
                        <button type="submit" disabled={Loading} className="ml-1 mt-2 rounded-xl bg-linear-to-br from-gray-900 to-blue-400 px-4 py-2.5 text-center text-sm font-medium leading-5 text-white hover:bg-linear-to-bl focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800 disabled:opacity-50">
                            {Loading ? "Logging in..." : "Log in"}
                        </button>
                    </div>
                    
                    <div>
                        <button type="submit" className="ml-1 mt-2 rounded-xl bg-linear-to-br from-gray-900 to-blue-400 px-4 py-2.5 text-center text-sm font-medium leading-5 text-white hover:bg-linear-to-bl focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Extended_Signup
