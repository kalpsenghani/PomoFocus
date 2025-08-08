"use client"

import { motion } from "framer-motion"

export function AnimatedTimerRing() {
  return (
    <div className="relative mx-auto w-64 h-64">
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#00FFFF]/10 to-[#7F5AF0]/10 blur-2xl" />
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(0,255,255,0.9), rgba(127,90,240,0.9), rgba(0,255,255,0.9))",
          mask: "radial-gradient(transparent 54%, black 56%)",
          WebkitMask: "radial-gradient(transparent 54%, black 56%)",
          boxShadow: "0 0 30px rgba(127,90,240,0.35), inset 0 0 30px rgba(0,255,255,0.2)",
        }}
      />
      <div className="absolute inset-[18%] rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_0_30px_rgba(0,255,255,0.15)] flex items-center justify-center">
        <div className="text-center">
          <div className="text-xs uppercase tracking-widest text-neutral-400">Focus Session</div>
          <div className="text-3xl font-bold text-white mt-1">25:00</div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0.4 }}
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute inset-[14%] rounded-full border border-[#00FFFF]/30"
      />
    </div>
  )
}
