"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface ServicesIllustrationProps {
  className?: string
  width?: number
  height?: number
}

export function ServicesIllustration({ className = "", width = 500, height = 500 }: ServicesIllustrationProps) {
  const [isClient, setIsClient] = useState(false)

  // Prevent hydration mismatch with animations
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-primary/10 to-background rounded-lg ${className}`}
        style={{ width, height }}
      >
        <div className="animate-pulse text-primary/50">Loading illustration...</div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
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

        <motion.path
          d="M50,250 Q125,100 250,250 T450,250"
          stroke="url(#gradientLine1)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        <motion.path
          d="M100,350 Q175,200 250,350 T400,350"
          stroke="url(#gradientLine2)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
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

        {/* Code editor */}
        <motion.g
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <rect x="100" y="150" width="300" height="200" rx="8" fill="#1e293b" />
          <rect x="100" y="150" width="300" height="30" rx="8" fill="#0f172a" />

          {/* Window controls */}
          <circle cx="115" cy="165" r="5" fill="#f43f5e" />
          <circle cx="135" cy="165" r="5" fill="#f59e0b" />
          <circle cx="155" cy="165" r="5" fill="#10b981" />

          {/* Code lines */}
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.2 }}>
            <rect x="120" y="200" width="120" height="10" rx="2" fill="#5eead4" opacity="0.6" />
            <rect x="120" y="220" width="180" height="10" rx="2" fill="#a855f7" opacity="0.5" />
            <rect x="120" y="240" width="150" height="10" rx="2" fill="#f59e0b" opacity="0.5" />
            <rect x="120" y="260" width="200" height="10" rx="2" fill="#5eead4" opacity="0.6" />
            <rect x="120" y="280" width="100" height="10" rx="2" fill="#a855f7" opacity="0.5" />
            <rect x="120" y="300" width="160" height="10" rx="2" fill="#f59e0b" opacity="0.5" />
          </motion.g>
        </motion.g>

        {/* Floating elements */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          {/* React logo */}
          <motion.g
            animate={{
              rotate: 360,
              y: [0, -5, 0, 5, 0],
            }}
            transition={{
              rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              y: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            }}
          >
            <circle cx="80" cy="120" r="15" fill="#61dafb" opacity="0.8" />
            <ellipse cx="80" cy="120" rx="30" ry="10" stroke="#61dafb" strokeWidth="2" fill="none" />
            <ellipse
              cx="80"
              cy="120"
              rx="30"
              ry="10"
              stroke="#61dafb"
              strokeWidth="2"
              fill="none"
              transform="rotate(60 80 120)"
            />
            <ellipse
              cx="80"
              cy="120"
              rx="30"
              ry="10"
              stroke="#61dafb"
              strokeWidth="2"
              fill="none"
              transform="rotate(120 80 120)"
            />
          </motion.g>

          {/* Database */}
          <motion.g
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <ellipse cx="420" cy="140" rx="25" ry="10" fill="#a855f7" opacity="0.8" />
            <path
              d="M395,140 L395,170 C395,175.5 406.2,180 420,180 C433.8,180 445,175.5 445,170 L445,140"
              stroke="#a855f7"
              strokeWidth="2"
              fill="none"
            />
            <ellipse cx="420" cy="170" rx="25" ry="10" stroke="#a855f7" strokeWidth="2" fill="none" />
          </motion.g>

          {/* Cloud */}
          <motion.g
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <path
              d="M380,80 C380,68 390,60 400,60 C410,60 418,68 420,75 C422,65 430,60 440,60 C450,60 460,70 460,80 C460,90 450,100 440,100 L390,100 C385,100 380,90 380,80 Z"
              fill="#5eead4"
              opacity="0.6"
            />
          </motion.g>
        </motion.g>

        {/* Service icons */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          {/* Frontend */}
          <motion.g
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.2 }}
          >
            <circle cx="100" cy="400" r="25" fill="#1e293b" />
            <rect x="85" y="385" width="30" height="30" rx="2" stroke="#5eead4" strokeWidth="2" fill="none" />
            <path d="M85,395 L115,395" stroke="#5eead4" strokeWidth="2" />
            <path d="M95,400 L105,400" stroke="#5eead4" strokeWidth="2" />
          </motion.g>

          {/* Backend */}
          <motion.g
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.8 }}
          >
            <circle cx="180" cy="400" r="25" fill="#1e293b" />
            <path d="M165,385 L195,385 L195,415 L165,415 Z" stroke="#a855f7" strokeWidth="2" fill="none" />
            <path d="M165,395 L195,395" stroke="#a855f7" strokeWidth="2" />
            <path d="M170,405 L190,405" stroke="#a855f7" strokeWidth="2" />
          </motion.g>

          {/* Mobile */}
          <motion.g
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.4 }}
          >
            <circle cx="260" cy="400" r="25" fill="#1e293b" />
            <rect x="245" y="385" width="30" height="30" rx="5" stroke="#f59e0b" strokeWidth="2" fill="none" />
            <rect x="255" y="410" width="10" height="2" rx="1" fill="#f59e0b" />
          </motion.g>

          {/* API */}
          <motion.g
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
          >
            <circle cx="340" cy="400" r="25" fill="#1e293b" />
            <path d="M325,400 L355,400" stroke="#5eead4" strokeWidth="2" />
            <path d="M330,390 L335,410" stroke="#5eead4" strokeWidth="2" />
            <path d="M345,390 L350,410" stroke="#5eead4" strokeWidth="2" />
          </motion.g>

          {/* DevOps */}
          <motion.g
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2.6 }}
          >
            <circle cx="420" cy="400" r="25" fill="#1e293b" />
            <path
              d="M405,400 C405,392 412,385 420,385 C428,385 435,392 435,400 C435,408 428,415 420,415 C412,415 405,408 405,400 Z"
              stroke="#f43f5e"
              strokeWidth="2"
              fill="none"
            />
            <path d="M420,385 L420,390" stroke="#f43f5e" strokeWidth="2" />
            <path d="M420,410 L420,415" stroke="#f43f5e" strokeWidth="2" />
            <path d="M405,400 L410,400" stroke="#f43f5e" strokeWidth="2" />
            <path d="M430,400 L435,400" stroke="#f43f5e" strokeWidth="2" />
          </motion.g>
        </motion.g>

        {/* Connecting lines */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ duration: 1, delay: 2.5 }}>
          <motion.path
            d="M100,375 L100,350 L250,350 L250,300"
            stroke="#5eead4"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 2.5 }}
          />
          <motion.path
            d="M180,375 L180,360 L250,360 L250,300"
            stroke="#a855f7"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 2.7 }}
          />
          <motion.path
            d="M260,375 L260,370 L250,370 L250,300"
            stroke="#f59e0b"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 2.9 }}
          />
          <motion.path
            d="M340,375 L340,360 L250,360 L250,300"
            stroke="#5eead4"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 3.1 }}
          />
          <motion.path
            d="M420,375 L420,350 L250,350 L250,300"
            stroke="#f43f5e"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 3.3 }}
          />
        </motion.g>

        {/* Particles */}
        <motion.g>
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.circle
              key={`particle-${i}`}
              cx={100 + Math.random() * 300}
              cy={150 + Math.random() * 200}
              r={1 + Math.random() * 2}
              fill="#5eead4"
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
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="gradientLine1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5eead4" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <linearGradient id="gradientLine2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#5eead4" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

