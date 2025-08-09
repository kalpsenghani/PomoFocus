import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(req: NextRequest) {
  // Normalize legacy /auth route to /login or /signup
  if (req.nextUrl.pathname === '/auth') {
    const mode = req.nextUrl.searchParams.get('mode')
    const dest = mode === 'signup' ? '/signup' : '/login'
    return NextResponse.redirect(new URL(dest, req.url))
  }

  const res = NextResponse.next({ request: { headers: req.headers } })
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      get(name: string) {
        return req.cookies.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        res.cookies.set({ name, value, ...options })
      },
      remove(name: string, options: any) {
        res.cookies.set({ name, value: '', ...options })
      },
    },
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isAuthPage = ['/login', '/signup', '/forgot-password', '/reset-password'].includes(req.nextUrl.pathname)
  const isProtected = req.nextUrl.pathname.startsWith('/dashboard')
    || req.nextUrl.pathname.startsWith('/tasks')
    || req.nextUrl.pathname.startsWith('/analytics')
    || req.nextUrl.pathname.startsWith('/settings')
    || req.nextUrl.pathname.startsWith('/profile')

  // Redirect authenticated users away from auth pages
  if (user && isAuthPage) {
    const url = req.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  // Redirect unauthenticated users to login for protected routes
  if (!user && isProtected) {
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('next', req.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  return res
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/settings/:path*', '/profile/:path*', '/analytics/:path*', '/tasks/:path*', '/auth', '/login', '/signup', '/forgot-password', '/reset-password'],
}
