import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth/auth';
import dbConnect from '@/lib/db';

import board from '@/models/board';

export async function proxy(request) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  const dashboardPage = pathname.startsWith('/dashboard');
  const signin = pathname.startsWith('/Login');
  const signup = pathname.startsWith('/Signup');

  if (!session?.user && dashboardPage) {
    return NextResponse.redirect(new URL('/Login', request.url));
  }

  if (session?.user && (signin || signup)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/Login', '/Signup'],
};