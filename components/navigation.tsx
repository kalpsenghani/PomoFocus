"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { LogIn, LogOut, Menu, X, Clock } from "lucide-react"
import { useState } from "react"

export function Navigation() {
  const pathname = usePathname()
  const { user, signOut, loading } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Check if we're on the landing page
  const isLandingPage = pathname === "/"

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (e) {
      console.error("Sign out error:", e)
    } finally {
      window.location.href = "/"
    }
  }

  return (
    <nav className={(isLandingPage ? "" : "border-b border-white/10 bg-black/20 backdrop-blur-sm ") + "sticky top-0 z-50"}>
      <div className="container mx-auto px-4">
        <div className={isLandingPage ? "flex items-center justify-between py-6" : "flex items-center justify-between h-16"}>
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[#00FFFF] to-[#7F5AF0] rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-black" />
            </div>
            <span className="text-white font-bold text-xl">PomoFocus</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isLandingPage ? (
              // Landing page navigation
              <>
                <a href="#features" className="text-neutral-300 hover:text-[#00FFFF] transition-colors">
                  Features
                </a>
                <a href="#how-it-works" className="text-neutral-300 hover:text-[#00FFFF] transition-colors">
                  How It Works
                </a>
                <a href="#testimonials" className="text-neutral-300 hover:text-[#00FFFF] transition-colors">
                  Reviews
                </a>
                <a href="#pricing" className="text-neutral-300 hover:text-[#00FFFF] transition-colors">
                  Pricing
                </a>
                {loading ? (
                  <div className="w-20 h-8 bg-white/5 rounded-xl animate-pulse" />
                ) : user ? (
                  <Button onClick={handleSignOut} variant="ghost" className="px-4 py-2 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Link href="/login">
                      <Button variant="ghost" className="px-4 py-2 rounded-lg text-neutral-300 hover:text-white transition-colors">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#00FFFF] to-[#7F5AF0] text-black hover:opacity-90 transition-opacity">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}
              </>
            ) : (
              // Dashboard navigation (protected routes)
              <>
                <Link
                  href="/dashboard"
                  className="relative px-3 py-2 rounded-xl text-neutral-300 hover:text-white transition-all hover:bg-white/5 hover:shadow-[0_0_20px_rgba(0,255,255,0.15)]"
                >
                  Dashboard
                </Link>
                <Link
                  href="/tasks"
                  className="relative px-3 py-2 rounded-xl text-neutral-300 hover:text-white transition-all hover:bg-white/5 hover:shadow-[0_0_20px_rgba(0,255,255,0.15)]"
                >
                  Tasks
                </Link>
                <Link
                  href="/analytics"
                  className="relative px-3 py-2 rounded-xl text-neutral-300 hover:text-white transition-all hover:bg-white/5 hover:shadow-[0_0_20px_rgba(0,255,255,0.15)]"
                >
                  Analytics
                </Link>
                <Link
                  href="/settings"
                  className="relative px-3 py-2 rounded-xl text-neutral-300 hover:text-white transition-all hover:bg-white/5 hover:shadow-[0_0_20px_rgba(0,255,255,0.15)]"
                >
                  Settings
                </Link>
                <Link
                  href="/profile"
                  className="relative px-3 py-2 rounded-xl text-neutral-300 hover:text-white transition-all hover:bg-white/5 hover:shadow-[0_0_20px_rgba(0,255,255,0.15)]"
                >
                  Profile
                </Link>
                {loading ? (
                  <div className="w-20 h-8 bg-white/5 rounded-xl animate-pulse" />
                ) : user ? (
                  <Button onClick={handleSignOut} variant="ghost" className="px-4 py-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                ) : (
                  <Link href="/login">
                    <Button variant="ghost" className="px-4 py-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5">
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign In
                    </Button>
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button onClick={toggleMobileMenu} className="md:hidden text-white p-2 rounded-lg hover:bg-white/5">
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className={isLandingPage ? "md:hidden mt-4 space-y-4 bg-black/50 rounded-lg p-4 backdrop-blur-sm" : "md:hidden py-4 border-t border-white/10"}>
            {isLandingPage ? (
              // Landing page mobile navigation
              <div className="space-y-4">
                <a href="#features" className="block text-neutral-300 hover:text-[#00FFFF] transition-colors">
                  Features
                </a>
                <a href="#how-it-works" className="block text-neutral-300 hover:text-[#00FFFF] transition-colors">
                  How It Works
                </a>
                <a href="#testimonials" className="block text-neutral-300 hover:text-[#00FFFF] transition-colors">
                  Reviews
                </a>
                <a href="#pricing" className="block text-neutral-300 hover:text-[#00FFFF] transition-colors">
                  Pricing
                </a>
                {loading ? (
                  <div className="w-20 h-8 bg-white/5 rounded-xl animate-pulse" />
                ) : user ? (
                  <Button onClick={handleSignOut} variant="ghost" className="w-full justify-start px-4 py-2 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <Link href="/login">
                      <Button variant="ghost" className="w-full justify-start px-4 py-2 rounded-lg text-neutral-300 hover:text-white">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button className="w-full bg-gradient-to-r from-[#00FFFF] to-[#7F5AF0] text-black hover:opacity-90 rounded-lg">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              // Dashboard mobile navigation
              <div className="space-y-2">
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 rounded-xl text-neutral-300 hover:text-white transition-all hover:bg-white/5 hover:shadow-[0_0_20px_rgba(0,255,255,0.15)]"
                >
                  Dashboard
                </Link>
                <Link
                  href="/tasks"
                  className="block px-3 py-2 rounded-xl text-neutral-300 hover:text-white transition-all hover:bg-white/5 hover:shadow-[0_0_20px_rgba(0,255,255,0.15)]"
                >
                  Tasks
                </Link>
                <Link
                  href="/analytics"
                  className="block px-3 py-2 rounded-xl text-neutral-300 hover:text-white transition-all hover:bg-white/5 hover:shadow-[0_0_20px_rgba(0,255,255,0.15)]"
                >
                  Analytics
                </Link>
                <Link
                  href="/settings"
                  className="block px-3 py-2 rounded-xl text-neutral-300 hover:text-white transition-all hover:bg-white/5 hover:shadow-[0_0_20px_rgba(0,255,255,0.15)]"
                >
                  Settings
                </Link>
                <Link
                  href="/profile"
                  className="block px-3 py-2 rounded-xl text-neutral-300 hover:text-white transition-all hover:bg-white/5 hover:shadow-[0_0_20px_rgba(0,255,255,0.15)]"
                >
                  Profile
                </Link>
                {loading ? (
                  <div className="w-20 h-8 bg-white/5 rounded-xl animate-pulse" />
                ) : user ? (
                  <Button onClick={handleSignOut} variant="ghost" className="w-full justify-start px-4 py-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                ) : (
                  <Link href="/login">
                    <Button variant="ghost" className="w-full justify-start px-4 py-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5">
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign In
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
