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
  tiltEffect = true,
  ...props
}: AnimatedCardProps) {
  const [isTilted, setIsTilted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltEffect || !cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const tiltX = (y - centerY) / 10
    const tiltY = (centerX - x) / 10

    setMousePosition({ x, y })
    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
  }

  const handleMouseEnter = () => {
    setIsTilted(true)
  }

  const handleMouseLeave = () => {
    setIsTilted(false)
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)"
    }
  }

  return (
    <Card
      ref={cardRef}
      className={cn(
        "card-hover-effect transition-all duration-300",
        glowOnHover && "hover:shadow-[0_0_15px_rgba(94,234,212,0.3)] dark:hover:shadow-[0_0_15px_rgba(94,234,212,0.2)]",
        isTilted && "transition-transform duration-200",
        className,
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}

      {/* Glow effect */}
      {glowOnHover && isTilted && (
        <div
          className="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(94, 234, 212, 0.15), transparent 50%)`,
          }}
        />
      )}
    </Card>
  )
}

export const AnimatedCardHeader = CardHeader
export const AnimatedCardContent = CardContent
export const AnimatedCardFooter = CardFooter

