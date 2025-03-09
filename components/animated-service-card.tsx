"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

interface AnimatedServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

export function AnimatedServiceCard({ icon, title, description }: AnimatedServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
      <Card
        className="overflow-hidden border-none shadow-lg h-full group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-6 flex flex-col h-full">
          <div className="mb-4 relative">
            <div className="p-3 rounded-lg bg-primary/10 inline-block">
              <motion.div animate={{ rotate: isHovered ? 360 : 0 }} transition={{ duration: 0.5 }}>
                {icon}
              </motion.div>
            </div>
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">{title}</h3>

          <p className="text-muted-foreground flex-grow">{description}</p>

          <div className="mt-4 h-1 w-0 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
        </CardContent>
      </Card>
    </motion.div>
  )
}

