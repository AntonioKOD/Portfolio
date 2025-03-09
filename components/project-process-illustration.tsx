"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface ProjectProcessIllustrationProps {
  className?: string
  width?: number
  height?: number
}

// Update the illustration to be more full and detailed
export function ProjectProcessIllustration({
  className = "",
  width = 900,
  height = 400,
}: ProjectProcessIllustrationProps) {
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

  // Define the process steps
  const processSteps = [
    { id: "discovery", label: "Discovery", icon: "🔍", color: "#5eead4" },
    { id: "planning", label: "Planning", icon: "📝", color: "#a855f7" },
    { id: "development", label: "Development", icon: "💻", color: "#f59e0b" },
    { id: "testing", label: "Testing", icon: "🧪", color: "#f43f5e" },
    { id: "deployment", label: "Deployment", icon: "🚀", color: "#3b82f6" },
  ]

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Background elements */}
        <motion.rect
          x={width * 0.05}
          y={height * 0.1}
          width={width * 0.9}
          height={height * 0.8}
          rx="20"
          fill="url(#processGradientBg)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
        />

        {/* Grid pattern */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.1 }} transition={{ duration: 1.5 }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1={width * 0.05}
              y1={height * 0.1 + i * ((height * 0.8) / 20)}
              x2={width * 0.95}
              y2={height * 0.1 + i * ((height * 0.8) / 20)}
              stroke="#5eead4"
              strokeWidth="1"
              strokeDasharray="5,5"
            />
          ))}
          {Array.from({ length: 30 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={width * 0.05 + i * ((width * 0.9) / 30)}
              y1={height * 0.1}
              x2={width * 0.05 + i * ((width * 0.9) / 30)}
              y2={height * 0.9}
              stroke="#5eead4"
              strokeWidth="1"
              strokeDasharray="5,5"
            />
          ))}
        </motion.g>

        {/* Main process path - more pronounced wave */}
        <motion.path
          d={`M${width * 0.1},${height * 0.5} 
              C${width * 0.2},${height * 0.3} 
              ${width * 0.3},${height * 0.7} 
              ${width * 0.5},${height * 0.5} 
              C${width * 0.7},${height * 0.3} 
              ${width * 0.8},${height * 0.7} 
              ${width * 0.9},${height * 0.5}`}
          stroke="url(#processGradientLine)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Process nodes - positioned along the path */}
        {processSteps.map((step, index) => {
          // Calculate position along the path
          const x = width * (0.1 + index * 0.2)
          const y = height * 0.5 + (index % 2 === 0 ? -height * 0.1 : height * 0.1)

          return (
            <motion.g key={step.id}>
              {/* Connection line to main path */}
              <motion.line
                x1={x}
                y1={index % 2 === 0 ? y + height * 0.06 : y - height * 0.06}
                x2={x}
                y2={height * 0.5}
                stroke={step.color}
                strokeWidth="3"
                strokeDasharray="5,5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ duration: 0.5, delay: 2 + index * 0.2 }}
              />

              {/* Node circle - larger */}
              <motion.circle
                cx={x}
                cy={y}
                r={height * 0.08}
                fill={`${step.color}20`}
                stroke={step.color}
                strokeWidth="3"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  delay: 2 + index * 0.2,
                }}
              />

              {/* Step number - larger */}
              <motion.text
                x={x}
                y={y + 5}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize={height * 0.06}
                fontWeight="bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.2 + index * 0.2 }}
              >
                {index + 1}
              </motion.text>

              {/* Step label - larger */}
              <motion.text
                x={x}
                y={index % 2 === 0 ? y - height * 0.12 : y + height * 0.12}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize={height * 0.04}
                fontWeight="bold"
                initial={{ opacity: 0, y: index % 2 === 0 ? y - height * 0.1 : y + height * 0.1 }}
                animate={{ opacity: 1, y: index % 2 === 0 ? y - height * 0.12 : y + height * 0.12 }}
                transition={{ duration: 0.5, delay: 2.4 + index * 0.2 }}
              >
                {step.label}
              </motion.text>
            </motion.g>
          )
        })}

        {/* Animated elements - larger and more prominent */}
        <motion.g>
          {/* Moving dot along the path - larger */}
          <motion.circle
            cx="0"
            cy="0"
            r={height * 0.025}
            fill="#5eead4"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 4,
              times: [0, 0.1, 0.9, 1],
              repeat: Number.POSITIVE_INFINITY,
              delay: 3,
            }}
          >
            <animateMotion
              path={`M${width * 0.1},${height * 0.5} 
                    C${width * 0.2},${height * 0.3} 
                    ${width * 0.3},${height * 0.7} 
                    ${width * 0.5},${height * 0.5} 
                    C${width * 0.7},${height * 0.3} 
                    ${width * 0.8},${height * 0.7} 
                    ${width * 0.9},${height * 0.5}`}
              dur="4s"
              repeatCount="indefinite"
              begin="3s"
            />
          </motion.circle>

          {/* Document icon at discovery - larger */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.5 }}
          >
            <motion.rect
              x={width * 0.05}
              y={height * 0.25}
              width={width * 0.05}
              height={height * 0.07}
              rx="2"
              fill="#5eead4"
              animate={{ y: [height * 0.25, height * 0.23, height * 0.25] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <motion.line
              x1={width * 0.06}
              y1={height * 0.27}
              x2={width * 0.09}
              y2={height * 0.27}
              stroke="white"
              strokeWidth="2"
            />
            <motion.line
              x1={width * 0.06}
              y1={height * 0.29}
              x2={width * 0.09}
              y2={height * 0.29}
              stroke="white"
              strokeWidth="2"
            />
            <motion.line
              x1={width * 0.06}
              y1={height * 0.31}
              x2={width * 0.08}
              y2={height * 0.31}
              stroke="white"
              strokeWidth="2"
            />
          </motion.g>

          {/* Planning chart - larger */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 2.7, duration: 0.5 }}
          >
            <motion.rect
              x={width * 0.25}
              y={height * 0.65}
              width={width * 0.06}
              height={height * 0.07}
              rx="2"
              fill="#a855f7"
              animate={{ y: [height * 0.65, height * 0.67, height * 0.65] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.2 }}
            />
            <motion.line
              x1={width * 0.26}
              y1={height * 0.7}
              x2={width * 0.26}
              y2={height * 0.68}
              stroke="white"
              strokeWidth="2"
            />
            <motion.line
              x1={width * 0.28}
              y1={height * 0.7}
              x2={width * 0.28}
              y2={height * 0.67}
              stroke="white"
              strokeWidth="2"
            />
            <motion.line
              x1={width * 0.3}
              y1={height * 0.7}
              x2={width * 0.3}
              y2={height * 0.69}
              stroke="white"
              strokeWidth="2"
            />
          </motion.g>

          {/* Code at development - larger */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 2.9, duration: 0.5 }}
          >
            <motion.rect
              x={width * 0.45}
              y={height * 0.25}
              width={width * 0.06}
              height={height * 0.07}
              rx="2"
              fill="#f59e0b"
              animate={{ y: [height * 0.25, height * 0.23, height * 0.25] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.4 }}
            />
            <motion.text
              x={width * 0.48}
              y={height * 0.29}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize={height * 0.04}
              fontWeight="bold"
            >
              {"</>"}
            </motion.text>
          </motion.g>

          {/* Testing beaker - larger */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 3.1, duration: 0.5 }}
          >
            <motion.path
              d={`M${width * 0.65},${height * 0.65} 
                  L${width * 0.68},${height * 0.65} 
                  L${width * 0.68},${height * 0.7} 
                  C${width * 0.68},${height * 0.72} 
                  ${width * 0.67},${height * 0.73} 
                  ${width * 0.665},${height * 0.73} 
                  C${width * 0.66},${height * 0.73} 
                  ${width * 0.65},${height * 0.72} 
                  ${width * 0.65},${height * 0.7} Z`}
              fill="#f43f5e"
              animate={{ y: [0, height * 0.02, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.6 }}
            />
            <motion.rect
              x={width * 0.655}
              y={height * 0.63}
              width={width * 0.02}
              height={height * 0.02}
              fill="#f43f5e"
            />
            <motion.circle cx={width * 0.657} cy={height * 0.68} r={height * 0.01} fill="white" />
            <motion.circle cx={width * 0.663} cy={height * 0.69} r={height * 0.007} fill="white" />
          </motion.g>

          {/* Rocket at deployment - larger */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 3.3, duration: 0.5 }}
          >
            <motion.path
              d={`M${width * 0.85},${height * 0.25} 
                  L${width * 0.865},${height * 0.2} 
                  L${width * 0.88},${height * 0.25} Z`}
              fill="#3b82f6"
              animate={{
                y: [0, -height * 0.03, 0],
                x: [0, width * 0.01, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 0.8,
              }}
            />
            <motion.path
              d={`M${width * 0.85},${height * 0.25} 
                  L${width * 0.845},${height * 0.27} 
                  L${width * 0.885},${height * 0.27} 
                  L${width * 0.88},${height * 0.25} Z`}
              fill="#3b82f6"
              animate={{
                y: [0, -height * 0.03, 0],
                x: [0, width * 0.01, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 0.8,
              }}
            />
            <motion.path
              d={`M${width * 0.85},${height * 0.27} 
                  L${width * 0.855},${height * 0.29} 
                  L${width * 0.875},${height * 0.29} 
                  L${width * 0.88},${height * 0.27} Z`}
              fill="#f43f5e"
              animate={{
                y: [0, -height * 0.03, 0],
                x: [0, width * 0.01, 0],
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 0.8,
              }}
            />
          </motion.g>
        </motion.g>

        {/* More particles for a fuller effect */}
        <motion.g>
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.circle
              key={`particle-${i}`}
              cx={width * 0.1 + Math.random() * width * 0.8}
              cy={height * 0.2 + Math.random() * height * 0.6}
              r={1 + Math.random() * 3}
              fill={processSteps[Math.floor(Math.random() * processSteps.length)].color}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.8, 0],
                y: [0, -height * 0.05 - Math.random() * height * 0.1],
                x: [0, (Math.random() - 0.5) * width * 0.05],
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
          <linearGradient id="processGradientBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5eead4" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="processGradientLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5eead4" />
            <stop offset="25%" stopColor="#a855f7" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="75%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

