"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { LogIn, LogOut, Menu, X } from "lucide-react"
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
    <nav className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[#00FFFF] to-[#7F5AF0] rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-sm">PF</span>
            </div>
            <span className="text-white font-bold text-xl">PomoFocus</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isLandingPage ? (
              // Landing page navigation
              <>
                <a href="#features" className="text-neutral-400 hover:text-white transition-colors">
                  Features
                </a>
                <a href="#pricing" className="text-neutral-400 hover:text-white transition-colors">
                  Pricing
                </a>
                {loading ? (
                  <div className="w-20 h-8 bg-white/5 rounded-xl animate-pulse" />
                ) : user ? (
                  <Button onClick={handleSignOut} variant="ghost" className="px-4 py-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Link href="/login">
                      <Button variant="ghost" className="px-4 py-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5">
                        <LogIn className="w-4 h-4 mr-2" />
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00FFFF] to-[#7F5AF0] text-black hover:opacity-90">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}
              </>
            ) : (
              // Dashboard navigation (protected routes)
              <>
                <Link href="/dashboard" className="text-neutral-400 hover:text-white transition-colors">
                  Dashboard
                </Link>
                <Link href="/tasks" className="text-neutral-400 hover:text-white transition-colors">
                  Tasks
                </Link>
                <Link href="/analytics" className="text-neutral-400 hover:text-white transition-colors">
                  Analytics
                </Link>
                <Link href="/settings" className="text-neutral-400 hover:text-white transition-colors">
                  Settings
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
          <button onClick={toggleMobileMenu} className="md:hidden p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5">
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            {isLandingPage ? (
              // Landing page mobile navigation
              <div className="space-y-4">
                <a href="#features" className="block text-neutral-400 hover:text-white transition-colors">
                  Features
                </a>
                <a href="#pricing" className="block text-neutral-400 hover:text-white transition-colors">
                  Pricing
                </a>
                {loading ? (
                  <div className="w-20 h-8 bg-white/5 rounded-xl animate-pulse" />
                ) : user ? (
                  <Button onClick={handleSignOut} variant="ghost" className="w-full justify-start px-4 py-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <Link href="/login">
                      <Button variant="ghost" className="w-full justify-start px-4 py-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5">
                        <LogIn className="w-4 h-4 mr-2" />
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button className="w-full bg-gradient-to-r from-[#00FFFF] to-[#7F5AF0] text-black hover:opacity-90">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              // Dashboard mobile navigation
              <div className="space-y-4">
                <Link href="/dashboard" className="block text-neutral-400 hover:text-white transition-colors">
                  Dashboard
                </Link>
                <Link href="/tasks" className="block text-neutral-400 hover:text-white transition-colors">
                  Tasks
                </Link>
                <Link href="/analytics" className="block text-neutral-400 hover:text-white transition-colors">
                  Analytics
                </Link>
                <Link href="/settings" className="block text-neutral-400 hover:text-white transition-colors">
                  Settings
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
