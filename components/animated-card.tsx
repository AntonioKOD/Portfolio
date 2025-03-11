"use client"

import type React from "react"
import { useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface AnimatedCardProps extends React.ComponentProps<typeof Card> {
  children: React.ReactNode
  className?: string
  glowOnHover?: boolean
  tiltEffect?: boolean
}

export function AnimatedCard({
  children,
  className,
  glowOnHover = true,
  tiltEffect = false, // Disabled tilt effect by default
  ...props
}: AnimatedCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltEffect || !cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Just track mouse position for subtle glow effect, but don't apply tilt
    setMousePosition({ x, y })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (cardRef.current) {
      // Reset any transforms
      cardRef.current.style.transform = "none"
    }
  }

  return (
    <Card
      ref={cardRef}
      className={cn("transition-shadow duration-300", glowOnHover && isHovered && "shadow-md", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}

      {/* Subtle glow effect without movement */}
      {glowOnHover && isHovered && (
        <div
          className="absolute inset-0 rounded-lg opacity-0 hover:opacity-30 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(94, 234, 212, 0.15), transparent 70%)`,
          }}
        />
      )}
    </Card>
  )
}

// Keep these exports to maintain compatibility with existing code
export const AnimatedCardHeader = CardHeader
export const AnimatedCardContent = CardContent
export const AnimatedCardFooter = CardFooter

