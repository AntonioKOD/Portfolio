"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface AnimatedGradientBackgroundProps {
  children: React.ReactNode
  className?: string
  subtle?: boolean
}

export function AnimatedGradientBackground({ children, className, subtle = false }: AnimatedGradientBackgroundProps) {
  return (
    <div className={cn("relative overflow-hidden bg-background", className)}>
      {/* Animated gradient blobs - more subtle version */}
      {subtle ? (
        <>
          <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl animate-pulse-light dark:bg-primary/10"></div>
          <div className="absolute top-20 -right-40 h-96 w-96 rounded-full bg-accent/5 blur-3xl animate-pulse-light animation-delay-1000 dark:bg-accent/10"></div>
          <div className="absolute -bottom-40 left-20 h-64 w-64 rounded-full bg-muted blur-3xl animate-pulse-light animation-delay-2000"></div>
        </>
      ) : (
        <>
          <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-purple-light/20 blur-3xl animate-pulse-light dark:bg-purple-dark/20"></div>
          <div className="absolute top-20 -right-40 h-96 w-96 rounded-full bg-teal-light/20 blur-3xl animate-pulse-light animation-delay-1000 dark:bg-teal-dark/20"></div>
          <div className="absolute -bottom-40 left-20 h-64 w-64 rounded-full bg-amber-light/20 blur-3xl animate-pulse-light animation-delay-2000 dark:bg-amber-dark/20"></div>
        </>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

