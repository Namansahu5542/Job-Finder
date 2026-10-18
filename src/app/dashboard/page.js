import React from 'react'
import { auth } from '@/lib/auth/auth'
import Link from 'next/link'
import { initializeUserBoard } from '@/lib/init-user-board'

const page = async () => {
  const session = await auth()

  // When a signed-in user first visits the dashboard, ensure their default
  // board (and its columns) exist in the database before rendering anything.
  if (session?.user?.id) {
    await initializeUserBoard(session.user.id)
  }

  return (
    <div>

      {!session &&
        <>


          <div class="bg-neutral-primary-soft block max-w-sm border border-default rounded-base shadow-xs">

            <img class="rounded-t-base" src="/docs/images/blog/image-1.jpg" alt="" />

            <div class="p-6 text-center">
              <span class="inline-flex items-center bg-brand-softer border border-brand-subtle text-fg-brand-strong text-xs font-medium px-1.5 py-0.5 rounded-sm">
                <svg class="w-3 h-3 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.122 17.645a7.185 7.185 0 0 1-2.656 2.495 7.06 7.06 0 0 1-3.52.853 6.617 6.617 0 0 1-3.306-.718 6.73 6.73 0 0 1-2.54-2.266c-2.672-4.57.287-8.846.887-9.668A4.448 4.448 0 0 0 8.07 6.31 4.49 4.49 0 0 0 7.997 4c1.284.965 6.43 3.258 5.525 10.631 1.496-1.136 2.7-3.046 2.846-6.216 1.43 1.061 3.985 5.462 1.754 9.23Z" /></svg>
                Trending
              </span>

              <h5 class="mt-3 mb-6 text-2xl font-semibold tracking-tight text-heading">Login/SignUp first to continue this page</h5>

              <Link href="/Login" class="inline-flex items-center text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">

                Login
              </Link>
            </div>
          </div>

        </>
      }

      {session &&
        <div>
          <p>Welcome, {session.user.name}! Your board is ready.</p>
        </div>
      }

    </div>
  )
}

export default page
