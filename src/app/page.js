import React from 'react'
import { ArrowRight } from 'lucide-react'
import CursiveQuote from './components/CursiveQuote'
import Link from 'next/link'



const page = () => {
  return (
    <div className='min-h-screen w-full  border border-gray-800 bg-linear-to-br relative from-gray-900 to-gray-800 grid grid-rows-2'>
      
      <section className='row-span-1 flex flex-col justify-center items-center'>
        <div className='flex justify-center items-center '><img  className='h-30 w-30' src="/man.gif" alt="" /></div>
        <div className='bg-gray-900 rounded-2xl min-h-[60%] w-[40%]'>
          <div className='m-5 flex text-white flex-col justify-center items-center gap-5'>
            <div className='font-sans text-center flex flex-col justify-center items-center gap-10'>
              <p className='text-6xl text-[#E4E6EB]'>Best Place to Track Your Job Applications</p>
              <p className='text-xl text-gray-500'>capture, organise and manage your job at one place</p>
            </div>
          </div>
        </div>
      </section>

      <div className='row-span-1 mx-auto flex flex-col items-center px-4'>
        {/* Cursive quote */}
        {/* <div className='w-full max-w-4xl mb-8'>
          <CursiveQuote/>
        </div> */}

        <button
          className='rounded-xl border flex items-center border-white/10 bg-white/5 px-6 py-3 font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-violet-500/50'
        >
          <Link href='/Signup'>Let's Go</Link> <ArrowRight className='ml-1' />
        </button>
        <div><p className='text-sm font-serif text-gray-300 mt-5'><u>Free servive , No credit card required</u></p></div>

       
      </div>
    </div>
  )
}

export default page