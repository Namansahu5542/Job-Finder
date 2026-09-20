import React from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Extended_Landingpage from './components/Extended_Landingpage'
import Image from 'next/image'



const page = () => {
  return (
    <main className='min-h-[calc(100svh-3.75rem)] w-full overflow-x-hidden border border-gray-800 bg-linear-to-br from-gray-900 to-gray-800'>
      <section className='mx-auto flex min-h-[calc(100svh-3.75rem)] w-full max-w-7xl flex-col items-center justify-center gap-6 px-4 py-10 sm:px-6 lg:px-8'>
        <Image className='h-24 w-24 object-contain sm:h-28 sm:w-28' src="/man.gif" width={112} height={112} alt="" priority />
        <div className='w-full max-w-3xl rounded-2xl bg-gray-900 px-5 py-8 sm:px-10 sm:py-12'>
          <div className='flex flex-col items-center justify-center gap-5 text-center text-white'>
            <div className='flex flex-col items-center justify-center gap-5 font-sans'>
              <h1 className='text-3xl text-[#E4E6EB] sm:text-5xl lg:text-6xl'>Best Place to Track Your Job Applications</h1>
              <p className='text-base text-gray-500 sm:text-xl'>Capture, organise and manage your job at one place</p>
            </div>
          </div>
        </div>
      </section>

      <section className='mx-auto flex w-full max-w-7xl flex-col items-center px-4 pb-12 sm:px-6 lg:px-8'>
        <Link
          href='/Signup'
          className='flex items-center rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-violet-500/50 hover:bg-white/10'
        >
          Let&apos;s Go <ArrowRight className='ml-1' />
        </Link>
        <p className='mt-5 text-center font-serif text-sm text-gray-300'><u>Free service, no credit card required</u></p>
        <Extended_Landingpage />
      </section>
    </main>
  )
}

export default page