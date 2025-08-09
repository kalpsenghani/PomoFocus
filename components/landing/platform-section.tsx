"use client"

import React from "react"
import { Globe, Smartphone, Monitor } from "lucide-react"

export function PlatformSection() {
  const platforms = [
    { icon: <Globe className="w-8 h-8" />, name: "Web Browser", desc: "Works on any modern browser" },
    { icon: <Smartphone className="w-8 h-8" />, name: "Mobile App", desc: "iOS & Android apps coming soon" },
    { icon: <Monitor className="w-8 h-8" />, name: "Desktop", desc: "Native apps for Windows, Mac & Linux" },
  ]

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">Available Everywhere</h2>
        <p className="text-xl text-neutral-400">Access your productivity tools from any device, anywhere</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {platforms.map((platform, index) => (
          <div
            key={index}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 text-center transition-transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,255,255,0.2)]"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-[#00FFFF] to-[#7F5AF0] rounded-full flex items-center justify-center mx-auto mb-4 text-black">
              {platform.icon}
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{platform.name}</h3>
            <p className="text-neutral-400">{platform.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default PlatformSection


