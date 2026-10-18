import React from 'react'
import { auth } from '@/lib/auth/auth'
import Link from 'next/link'
import dbConnect from '@/lib/db'
import Board from '@/models/board';
import { initializeUserBoard } from '@/lib/init-user-board'

const page = async () => {
  const session = await auth()

  // When a signed-in user first visits the dashboard, ensure their default
  // board (and its columns) exist in the database before rendering anything.
  if (session?.user?.id) {
    await initializeUserBoard(session.user.id)
  }

  await dbConnect();
  const boardget = await Board.findOne({
    userid: session.user.id,
    name: 'Job Hunt',
  })

  return (
    <div className='bg-linear-to-br from-gray-950 to-gray-800 min-h-screen w-full overflow-hidden'>
      <div className='h-full w-full mx-4 my-2'>
        <div className='h-15 w-full text-white flex flex-col gap-2 ml-4 mt-4 justify-center items-start  font-(family-name:--font-poppins) '>
          <p className='text-2xl font-bold'>{boardget.name}</p>
          <p>The Best Place For you</p>
        </div>
        <main>
          
        </main>
      </div>
    </div>
  )
}

export default page
