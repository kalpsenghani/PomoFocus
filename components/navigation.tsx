"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Timer, BarChart3, Settings, User, Moon, Sun, Menu, X, Home } from "lucide-react"
import { useTheme } from "next-themes"
import { useRouter, usePathname } from "next/navigation"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()

  const navItems = [
    { icon: Home, label: "Dashboard", path: "/", active: pathname === "/" },
    { icon: BarChart3, label: "Analytics", path: "/analytics", active: pathname === "/analytics" },
    { icon: Settings, label: "Settings", path: "/settings", active: pathname === "/settings" },
    { icon: User, label: "Profile", path: "/profile", active: pathname === "/profile" },
  ]

  return (
    <nav className="border-b border-neutral-700/40 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-[#00FFFF] to-[#7F5AF0] rounded-lg flex items-center justify-center">
              <Timer className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-white">PomoFocus</span>
            <Badge className="bg-[#7F5AF0]/20 text-[#7F5AF0] border-[#7F5AF0]/30 text-xs">Pro</Badge>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  onClick={() => router.push(item.path)}
                  variant="ghost"
                  className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                    item.active
                      ? "bg-[#00FFFF]/10 text-[#00FFFF] border border-[#00FFFF]/30"
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              variant="ghost"
              size="sm"
              className="w-10 h-10 rounded-full bg-white/5 border border-neutral-700/40 hover:bg-white/10"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-neutral-400" />
              ) : (
                <Moon className="w-4 h-4 text-neutral-400" />
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant="ghost"
              size="sm"
              className="md:hidden w-10 h-10 rounded-full bg-white/5 border border-neutral-700/40 hover:bg-white/10"
            >
              {isMenuOpen ? <X className="w-4 h-4 text-neutral-400" /> : <Menu className="w-4 h-4 text-neutral-400" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-neutral-700/40 py-4"
          >
            <div className="space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  onClick={() => {
                    router.push(item.path)
                    setIsMenuOpen(false)
                  }}
                  variant="ghost"
                  className={`w-full justify-start px-4 py-3 rounded-xl transition-all duration-300 ${
                    item.active
                      ? "bg-[#00FFFF]/10 text-[#00FFFF] border border-[#00FFFF]/30"
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}
