import React, { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { cacheTag } from 'next/cache'
import { auth } from '@/lib/auth/auth'
import dbConnect from '@/lib/db'
import Board from '@/models/board'
import JobApplication from '@/models/job_applications'
import { initializeUserBoard } from '@/lib/init-user-board'
import KanbanBoard from '../components/kanban'

async function getBoard(userId, revision) {
  'use cache'
  cacheTag(`board-${userId}`)

  await dbConnect()
  const doc = await Board.findOne({
    userid: userId,
    name: 'Job Hunt',
    updatedAt: new Date(revision),
  }).populate({
    path: 'columns',
    populate: { path: 'job_applications', model: JobApplication },
  })

  if (!doc) return null
  return JSON.parse(JSON.stringify(doc))
   
}

async function DashboardWrapper() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const userId = session.user.id
  await initializeUserBoard(userId)
  const boardRevision = await Board.findOne({ userid: userId, name: 'Job Hunt' })
    .select('updatedAt')
    .lean()
  const board = boardRevision
    ? await getBoard(userId, boardRevision.updatedAt.toISOString())
    : null

  if (!board) return <p>Could not load your board.</p>

  return (
    <div className='bg-linear-to-br from-gray-950 to-gray-800 min-h-screen w-full overflow-hidden'>
      <div className='h-full w-full mx-4 my-2'>
        <div className='h-15 w-full text-white flex flex-col gap-2 ml-4 mt-4 justify-center items-start font-(family-name:--font-poppins)'>
          <p className='text-2xl font-bold'>{board.name}</p>
          <p>Track Your Job Application</p>
        </div>
        <main>
          <KanbanBoard boardget={board} />
        </main>
      </div>
    </div>
  )
}

const page = () => (
  <Suspense fallback={<p>Loading...</p>}>
    <DashboardWrapper />
  </Suspense>
)

export default page
