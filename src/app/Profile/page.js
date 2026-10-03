import { auth } from '@/lib/auth/auth'
import BackgroundImage from '@/app/components/background-image'
import ChangeDescription from '../components/User-Description';


const default_descrption = 'Hey , I am new here'
const page = async () => {
  const session = await auth();
  const name = session?.user?.name ?? '';
  const email = session?.user?.email ?? '';
  const image = session?.user?.image;
  const storageKey = session?.user?.email
    ? `profile-background:${session.user.email.toLowerCase()}`
    : null;
  const descKey = session?.user?.email
    ? `profile-description:${session.user.email.toLowerCase()}`
    : null;

  return (
    <main className='flex min-h-screen w-full flex-col bg-[#140b22]'>
      <div className="relative">
        <BackgroundImage storageKey={storageKey} />
        <figure className='absolute -bottom-10 left-5 z-10 flex min-h-40 min-w-40 items-center justify-center rounded-full bg-gray-100 text-black'>
          {image ? (
            <img className='h-40 w-40 rounded-full object-cover transition-transform hover:scale-105' src={image} alt="userimage" />
          ) : (
            <span aria-label="User profile" className='text-6xl'>
              {name.charAt(0) || 'U'}
            </span>
          )}
        </figure>
      </div>
      <div className="min-h-20 w-full grid grid-cols-4">
        <section className="col-span-1 flex h-full flex-col items-end  justify-start bg-white text-black">
          <p className='mr-5'>{name}</p>
          <p className='mr-5'>{email}</p>
        </section>

        <section className="col-span-3  flex h-full bg-[#8e96b1] text-white">
          <label htmlFor="description" className="sr-only">
            Description
          </label>
          <ChangeDescription storageKey={descKey} />

        </section>
      </div>
    </main>
  )
}

export default page
