"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface AnimatedProjectCardProps {
  title: string
  category: string
  description: string
  technologies: string[]
  image: string
  link: string
}

export function AnimatedProjectCard({
  title,
  category,
  description,
  technologies,
  image,
  link,
}: AnimatedProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
      <Link href={link}>
        <Card
          className="overflow-hidden border-none shadow-lg group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 right-4 bg-primary/90 text-white p-2 rounded-full transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <ArrowUpRight className="h-5 w-5" />
            </div>
          </div>
          <CardContent className="p-5">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <Badge variant="secondary" className="mb-2">
                  {category}
                </Badge>
              </div>
              <h3 className="font-bold text-xl group-hover:text-primary transition-colors duration-300">{title}</h3>
              <p className="text-muted-foreground line-clamp-2">{description}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {technologies.map((tech, index) => (
                  <Badge key={index} variant="outline" className="bg-muted/50">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}

