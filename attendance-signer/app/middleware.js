import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request) {
    const token = sessionStorage.getItem('courseRepToken')
    console.log('ji');
    if (!token){ return NextResponse.redirect(new URL('/login', request.url))}
    //return NextResponse.redirect(new URL('/home', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
     matcher: ['/about/:path*', '/dashboard/:path*','/attendance/:path*'],
}