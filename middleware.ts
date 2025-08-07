import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // Normalize legacy /auth route to /login or /signup
  if (req.nextUrl.pathname === '/auth') {
    const mode = req.nextUrl.searchParams.get('mode')
    const dest = mode === 'signup' ? '/signup' : '/login'
    return NextResponse.redirect(new URL(dest, req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/settings/:path*', '/profile/:path*', '/analytics/:path*', '/tasks/:path*', '/auth', '/login', '/signup'],
}
