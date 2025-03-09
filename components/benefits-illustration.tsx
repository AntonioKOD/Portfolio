"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface BenefitsIllustrationProps {
  className?: string
  width?: number
  height?: number
}

export function BenefitsIllustration({ className = "", width = 500, height = 500 }: BenefitsIllustrationProps) {
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

        {/* Central laptop/device */}
        <motion.g
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Laptop base */}
          <motion.rect
            x="150"
            y="280"
            width="200"
            height="15"
            rx="2"
            fill="#1e293b"
            animate={{ y: [280, 285, 280] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />

          {/* Laptop screen */}
          <motion.g
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <rect x="160" y="180" width="180" height="100" rx="4" fill="#0f172a" />
            <rect x="165" y="185" width="170" height="90" rx="2" fill="#1e293b" />

            {/* Code on screen */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.2 }}>
              <rect x="175" y="195" width="100" height="6" rx="1" fill="#5eead4" opacity="0.6" />
              <rect x="175" y="205" width="140" height="6" rx="1" fill="#a855f7" opacity="0.5" />
              <rect x="175" y="215" width="80" height="6" rx="1" fill="#f59e0b" opacity="0.5" />
              <rect x="175" y="225" width="120" height="6" rx="1" fill="#5eead4" opacity="0.6" />
              <rect x="175" y="235" width="90" height="6" rx="1" fill="#a855f7" opacity="0.5" />
              <rect x="175" y="245" width="130" height="6" rx="1" fill="#f59e0b" opacity="0.5" />
              <rect x="175" y="255" width="110" height="6" rx="1" fill="#5eead4" opacity="0.6" />
            </motion.g>
          </motion.g>
        </motion.g>

        {/* Benefit icons */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          {/* Speed/Performance */}
          <motion.g
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.2 }}
          >
            <circle cx="120" cy="150" r="30" fill="#1e293b" />
            <motion.path
              d="M120,130 L130,160 L120,155 L110,160 Z"
              fill="#5eead4"
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
          </motion.g>

          {/* Quality/Code */}
          <motion.g
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.8 }}
          >
            <circle cx="380" cy="150" r="30" fill="#1e293b" />
            <motion.path
              d="M365,150 L375,140 L385,150 L375,160 Z"
              fill="#a855f7"
              animate={{ x: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <motion.path
              d="M395,150 L385,140 L375,150 L385,160 Z"
              fill="#a855f7"
              animate={{ x: [5, -5, 5] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
          </motion.g>

          {/* Support/Communication */}
          <motion.g
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.4 }}
          >
            <circle cx="120" cy="350" r="30" fill="#1e293b" />
            <motion.path
              d="M105,345 L120,355 L135,345 L135,360 L105,360 Z"
              fill="#f59e0b"
              animate={{ y: [-3, 3, -3] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <circle cx="120" cy="340" r="3" fill="white" />
          </motion.g>

          {/* Innovation/Ideas */}
          <motion.g
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
          >
            <circle cx="380" cy="350" r="30" fill="#1e293b" />
            <motion.path
              d="M380,330 L380,350 M370,340 L390,340"
              stroke="#5eead4"
              strokeWidth="4"
              strokeLinecap="round"
              animate={{ rotate: [0, 15, 0, -15, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <motion.circle
              cx="380"
              cy="360"
              r="5"
              fill="#5eead4"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
          </motion.g>
        </motion.g>

        {/* Connecting lines */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ duration: 1, delay: 2.5 }}>
          <motion.path
            d="M150,230 L120,180"
            stroke="#5eead4"
            strokeWidth="2"
            strokeDasharray="5,5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 2.5 }}
          />
          <motion.path
            d="M350,230 L380,180"
            stroke="#a855f7"
            strokeWidth="2"
            strokeDasharray="5,5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 2.7 }}
          />
          <motion.path
            d="M150,250 L120,320"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeDasharray="5,5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 2.9 }}
          />
          <motion.path
            d="M350,250 L380,320"
            stroke="#5eead4"
            strokeWidth="2"
            strokeDasharray="5,5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 3.1 }}
          />
        </motion.g>

        {/* Benefit labels */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 3.5 }}>
          <motion.text
            x="120"
            y="120"
            textAnchor="middle"
            fill="white"
            fontSize="14"
            fontWeight="bold"
            animate={{ y: [120, 115, 120] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.2 }}
          >
            Performance
          </motion.text>

          <motion.text
            x="380"
            y="120"
            textAnchor="middle"
            fill="white"
            fontSize="14"
            fontWeight="bold"
            animate={{ y: [120, 115, 120] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.8 }}
          >
            Clean Code
          </motion.text>

          <motion.text
            x="120"
            y="390"
            textAnchor="middle"
            fill="white"
            fontSize="14"
            fontWeight="bold"
            animate={{ y: [390, 385, 390] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.4 }}
          >
            Support
          </motion.text>

          <motion.text
            x="380"
            y="390"
            textAnchor="middle"
            fill="white"
            fontSize="14"
            fontWeight="bold"
            animate={{ y: [390, 385, 390] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
          >
            Innovation
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
        </defs>
      </svg>
    </div>
  )
}

