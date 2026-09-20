
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'



const Navbar = () => {
    return (
        <nav className='flex h-15 w-full items-center bg-linear-to-br from-gray-900 to-gray-800 text-white'>
            <div className='flex w-full items-center justify-between px-5 font-(family-name:--font-poppins)'>
                <div className='title flex justify-center items-center gap-2'>
                    <p className='text-2xl font-extrabold'>Hire me</p>
                    <Image src='/PNG/job-seeker.png' height={50} width={50} alt='logo'/>
                    
                </div>
                <div className='auth flex items-center justify-between gap-5'>
                    <Link
                        href='/Login'
                        className='flex items-center rounded-xl border border-white/10 bg-white/5 p-1 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-violet-500/50 hover:bg-white/10'
                    >
                        Sign In 
                    </Link>
                    <Link
                        href='/Signup'
                        className='flex items-center rounded-xl border border-white/10 bg-white/5 p-1 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-violet-500/50 hover:bg-white/10'
                    >
                        Sign Up 
                    </Link>
                </div>

            </div>

        </nav>
    )
}

export default Navbar
