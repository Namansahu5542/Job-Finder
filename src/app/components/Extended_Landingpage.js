"use client"
import React, { useState } from 'react'
import Image from 'next/image'







const Extended_Landingpage = () => {
    const [change, setchange] = useState("Organise Application")
    return (
        <section className='mx-auto mt-10 w-full max-w-6xl'>
            <div className='w-full'>
                <div className='flex flex-wrap items-center justify-center gap-3 sm:justify-around'>
                    <button onClick={() => setchange("Organise Application")}
                        className='flex  cursor-pointer items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-violet-500/50 hover:bg-white/10 sm:px-4'
                    >
                        Organise Application
                    </button>
                    <button onClick={() => setchange("Hired")}
                        className='flex  cursor-pointer items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-violet-500/50 hover:bg-white/10 sm:px-4'
                    >
                        Hired
                    </button>
                    <button onClick={() => setchange("Manage Boards")}
                        className='flex cursor-pointer items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-violet-500/50 hover:bg-white/10 sm:px-4'
                    >
                        Manage Boards
                    </button>
                </div>
                <figure className='mt-6 flex flex-col items-center gap-6'>
                    
                    {change === "Organise Application" &&
                        <Image className='h-auto w-full max-w-4xl rounded-xl object-contain' src="/hero2.png" alt="Organise application" width={800} height={450} />
                    }
                    {change === "Hired" &&
                        <Image className='h-auto w-full max-w-4xl rounded-xl object-contain' src="/hero2.png" alt="Track hired applications" width={800} height={450} />
                    }
                    {change === "Manage Boards" &&
                        <Image className='h-auto w-full max-w-4xl rounded-xl object-contain' src="/hero3.png" alt="Manage application boards" width={800} height={450} />
                    }

                </figure>
            </div>
        </section>
    )
}

export default Extended_Landingpage
