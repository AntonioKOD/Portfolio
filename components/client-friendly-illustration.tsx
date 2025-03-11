"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface ClientFriendlyIllustrationProps {
  className?: string
  width?: number
  height?: number
}

export function ClientFriendlyIllustration({
  className = "",
  width = 500,
  height = 500,
}: ClientFriendlyIllustrationProps) {
  const [isClient, setIsClient] = useState(false)

  // Prevent hydration mismatch with animations
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-primary/10 to-background rounded-lg ${className}`}
        style={{ width: "100%", maxWidth: width, height: "auto", aspectRatio: "1/1" }}
      >
        <div className="animate-pulse text-primary/50">Loading illustration...</div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`} style={{ width: "100%", maxWidth: width, height: "auto" }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background elements */}
        <motion.circle
          cx="250"
          cy="250"
          r="200"
          fill="url(#gradientBg)"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* Grid pattern */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.15 }} transition={{ duration: 1.5 }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="50"
              y1={100 + i * 30}
              x2="450"
              y2={100 + i * 30}
              stroke="#5eead4"
              strokeWidth="1"
              strokeDasharray="5,5"
            />
          ))}
          {Array.from({ length: 14 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={50 + i * 30}
              y1="100"
              x2={50 + i * 30}
              y2="400"
              stroke="#5eead4"
              strokeWidth="1"
              strokeDasharray="5,5"
            />
          ))}
        </motion.g>

        {/* Website/App Mockup */}
        <motion.g
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Browser window */}
          <motion.rect
            x="100"
            y="120"
            width="300"
            height="200"
            rx="8"
            fill="#1e293b"
            animate={{ y: [120, 125, 120] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />

          {/* Browser header */}
          <rect x="100" y="120" width="300" height="25" rx="8" fill="#0f172a" />

          {/* Browser controls */}
          <circle cx="115" cy="132.5" r="5" fill="#f43f5e" />
          <circle cx="135" cy="132.5" r="5" fill="#f59e0b" />
          <circle cx="155" cy="132.5" r="5" fill="#10b981" />

          {/* URL bar */}
          <rect x="175" y="125" width="200" height="15" rx="3" fill="#334155" />

          {/* Website content */}
          <rect x="115" y="155" width="270" height="20" rx="2" fill="#5eead4" opacity="0.6" />
          <rect x="115" y="185" width="200" height="15" rx="2" fill="#a855f7" opacity="0.5" />
          <rect x="115" y="210" width="120" height="15" rx="2" fill="#f59e0b" opacity="0.5" />

          {/* Buttons */}
          <rect x="115" y="240" width="80" height="25" rx="4" fill="#5eead4" />
          <rect x="205" y="240" width="80" height="25" rx="4" fill="#334155" />
        </motion.g>

        {/* Mobile Device */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.g
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
          >
            {/* Phone outline */}
            <rect x="380" y="150" width="70" height="140" rx="10" fill="#1e293b" />
            <rect x="385" y="160" width="60" height="120" rx="5" fill="#0f172a" />

            {/* Phone content */}
            <rect x="390" y="170" width="50" height="10" rx="2" fill="#5eead4" opacity="0.6" />
            <rect x="390" y="185" width="40" height="8" rx="2" fill="#a855f7" opacity="0.5" />
            <rect x="390" y="198" width="30" height="8" rx="2" fill="#f59e0b" opacity="0.5" />

            {/* Phone button */}
            <rect x="390" y="215" width="30" height="15" rx="3" fill="#5eead4" />

            {/* Phone home button */}
            <circle cx="415" cy="250" r="8" stroke="#334155" strokeWidth="2" fill="none" />
          </motion.g>
        </motion.g>

        {/* Tablet Device */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <motion.g
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
          >
            {/* Tablet outline */}
            <rect x="50" y="180" width="100" height="140" rx="10" fill="#1e293b" />
            <rect x="55" y="190" width="90" height="120" rx="5" fill="#0f172a" />

            {/* Tablet content */}
            <rect x="60" y="200" width="80" height="15" rx="2" fill="#5eead4" opacity="0.6" />
            <rect x="60" y="220" width="60" height="10" rx="2" fill="#a855f7" opacity="0.5" />
            <rect x="60" y="235" width="40" height="10" rx="2" fill="#f59e0b" opacity="0.5" />

            {/* Tablet button */}
            <rect x="60" y="255" width="40" height="20" rx="3" fill="#5eead4" />

            {/* Tablet home button */}
            <circle cx="100" cy="290" r="5" stroke="#334155" strokeWidth="2" fill="none" />
          </motion.g>
        </motion.g>

        {/* Connecting lines */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ duration: 1, delay: 2 }}>
          <motion.path
            d="M200,320 C250,380 300,380 350,320"
            stroke="url(#gradientLine1)"
            strokeWidth="2"
            strokeDasharray="5,5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 2 }}
          />

          <motion.path
            d="M150,250 C120,300 100,320 100,350"
            stroke="#5eead4"
            strokeWidth="2"
            strokeDasharray="5,5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 2.2 }}
          />

          <motion.path
            d="M350,250 C380,300 400,320 400,350"
            stroke="#a855f7"
            strokeWidth="2"
            strokeDasharray="5,5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 2.4 }}
          />
        </motion.g>

        {/* Process Icons */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.5 }}
        >
          {/* Design Icon */}
          <motion.g
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.2 }}
          >
            <circle cx="150" cy="350" r="30" fill="#1e293b" />
            <path
              d="M135,350 A15,15 0 0,1 165,350 A15,15 0 0,1 135,350 Z"
              stroke="#5eead4"
              strokeWidth="2"
              fill="none"
            />
            <circle cx="150" cy="350" r="5" fill="#5eead4" />
            <path d="M150,335 L150,340" stroke="#5eead4" strokeWidth="2" />
            <path d="M150,360 L150,365" stroke="#5eead4" strokeWidth="2" />
            <path d="M135,350 L140,350" stroke="#5eead4" strokeWidth="2" />
            <path d="M160,350 L165,350" stroke="#5eead4" strokeWidth="2" />
          </motion.g>

          {/* Develop Icon */}
          <motion.g
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.8 }}
          >
            <circle cx="250" cy="380" r="30" fill="#1e293b" />
            <path d="M235,380 L245,370 L255,380 L245,390 Z" fill="#a855f7" />
            <path d="M265,380 L255,370 L245,380 L255,390 Z" fill="#a855f7" />
          </motion.g>

          {/* Launch Icon */}
          <motion.g
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.4 }}
          >
            <circle cx="350" cy="350" r="30" fill="#1e293b" />
            <path d="M350,335 L350,365" stroke="#f59e0b" strokeWidth="2" />
            <path d="M335,350 L365,350" stroke="#f59e0b" strokeWidth="2" />
            <circle cx="350" cy="350" r="10" stroke="#f59e0b" strokeWidth="2" fill="none" />
            <circle cx="350" cy="350" r="5" fill="#f59e0b" />
          </motion.g>
        </motion.g>

        {/* Process Labels */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 3 }}>
          <motion.text
            x="150"
            y="395"
            textAnchor="middle"
            fill="white"
            fontSize="14"
            fontWeight="bold"
            animate={{ y: [395, 390, 395] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.2 }}
          >
            Design
          </motion.text>

          <motion.text
            x="250"
            y="425"
            textAnchor="middle"
            fill="white"
            fontSize="14"
            fontWeight="bold"
            animate={{ y: [425, 420, 425] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.8 }}
          >
            Develop
          </motion.text>

          <motion.text
            x="350"
            y="395"
            textAnchor="middle"
            fill="white"
            fontSize="14"
            fontWeight="bold"
            animate={{ y: [395, 390, 395] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.4 }}
          >
            Launch
          </motion.text>
        </motion.g>

        {/* Floating particles */}
        <motion.g>
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.circle
              key={`particle-${i}`}
              cx={100 + Math.random() * 300}
              cy={100 + Math.random() * 300}
              r={1 + Math.random() * 2}
              fill={["#5eead4", "#a855f7", "#f59e0b"][Math.floor(Math.random() * 3)]}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.8, 0],
                y: [0, -20 - Math.random() * 30],
                x: [0, (Math.random() - 0.5) * 20],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
                ease: "easeOut",
              }}
            />
          ))}
        </motion.g>

        {/* Gradients */}
        <defs>
          <linearGradient id="gradientBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5eead4" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="gradientLine1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5eead4" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

