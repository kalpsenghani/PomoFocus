"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function BackgroundAnimation() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Pre-calculated positions and timings to avoid hydration mismatches
  const particles = [
    { left: 90.43, top: 41.71, duration: 15.2, delay: 3.1 },
    { left: 46.13, top: 58.48, duration: 12.8, delay: 7.4 },
    { left: 65.32, top: 97.29, duration: 18.5, delay: 1.9 },
    { left: 38.95, top: 75.63, duration: 14.7, delay: 5.6 },
    { left: 13.20, top: 97.83, duration: 16.3, delay: 2.8 },
    { left: 7.88, top: 20.01, duration: 13.9, delay: 8.2 },
    { left: 53.10, top: 64.65, duration: 17.1, delay: 4.3 },
    { left: 47.05, top: 57.88, duration: 11.5, delay: 6.7 },
    { left: 86.02, top: 74.63, duration: 19.2, delay: 0.5 },
    { left: 80.81, top: 38.72, duration: 14.4, delay: 9.1 },
    { left: 37.12, top: 36.67, duration: 16.8, delay: 2.4 },
    { left: 14.10, top: 57.23, duration: 13.2, delay: 7.8 },
    { left: 75.28, top: 0.58, duration: 18.9, delay: 1.2 },
    { left: 45.03, top: 27.10, duration: 15.6, delay: 4.9 },
    { left: 87.53, top: 64.10, duration: 12.4, delay: 8.5 },
    { left: 8.94, top: 82.23, duration: 17.7, delay: 3.6 },
    { left: 4.78, top: 54.07, duration: 14.1, delay: 6.2 },
    { left: 64.16, top: 17.74, duration: 19.5, delay: 0.8 },
    { left: 56.58, top: 33.16, duration: 13.8, delay: 5.4 },
    { left: 62.07, top: 8.15, duration: 16.9, delay: 2.1 },
  ]

  if (!mounted) {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Static background elements that don't cause hydration issues */}
        <div className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-[#00FFFF]/10 to-[#7F5AF0]/10 blur-3xl" style={{ top: "10%", left: "10%" }} />
        <div className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-[#FF6B6B]/8 to-[#00FFFF]/8 blur-3xl" style={{ top: "60%", right: "15%" }} />
        <div className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-[#7F5AF0]/6 to-[#FF6B6B]/6 blur-3xl" style={{ bottom: "20%", left: "20%" }} />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Floating orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-[#00FFFF]/10 to-[#7F5AF0]/10 blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          top: "10%",
          left: "10%",
        }}
      />

      <motion.div
        className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-[#FF6B6B]/8 to-[#00FFFF]/8 blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          top: "60%",
          right: "15%",
        }}
      />

      <motion.div
        className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-[#7F5AF0]/6 to-[#FF6B6B]/6 blur-3xl"
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 30,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          bottom: "20%",
          left: "20%",
        }}
      />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Animated particles with pre-calculated positions */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#00FFFF]/20 rounded-full"
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: particle.delay,
            ease: "easeInOut",
          }}
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
        />
      ))}
    </div>
  )
}
