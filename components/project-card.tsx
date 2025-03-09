import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from 'lucide-react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProjectCardProps {
  image: string
  title: string
  category: string
  description: string
  technologies: string[]
  link?: string
}

export default function ProjectCard({
  image,
  title,
  category,
  description,
  technologies,
  link = "#",
}: ProjectCardProps) {
  // Function to truncate HTML content safely
  const truncateHTML = (html: string, maxLength: number) => {
    // Create a temporary div to parse the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // Get the text content
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    
    // Check if truncation is needed
    if (textContent.length <= maxLength) {
      return html;
    }
    
    // Truncate the text content
    let truncated = '';
    let currentLength = 0;
    const walk = (node: Node) => {
      if (currentLength >= maxLength) return;
      
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || '';
        const remaining = maxLength - currentLength;
        if (currentLength + text.length <= maxLength) {
          truncated += text;
          currentLength += text.length;
        } else {
          truncated += text.substring(0, remaining) + '...';
          currentLength = maxLength;
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        truncated += `<${element.tagName.toLowerCase()}>`;
        for (let i = 0; i < element.childNodes.length; i++) {
          if (currentLength < maxLength) {
            walk(element.childNodes[i]);
          }
        }
        truncated += `</${element.tagName.toLowerCase()}>`;
      }
    };
    
    // Walk through the nodes to build truncated HTML
    for (let i = 0; i < tempDiv.childNodes.length; i++) {
      if (currentLength < maxLength) {
        walk(tempDiv.childNodes[i]);
      }
    }
    
    return truncated;
  };

  return (
    <Card className="overflow-hidden group border-none shadow-md hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <CardContent className="p-6">
        <div className="text-sm text-muted-foreground mb-2">{category}</div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
        {/* Fix: Use dangerouslySetInnerHTML to properly render HTML content */}
        <div 
          className="text-muted-foreground text-sm prose prose-sm dark:prose-invert max-w-none line-clamp-3"
          dangerouslySetInnerHTML={{ 
            __html: typeof window !== 'undefined' 
              ? truncateHTML(description, 150) 
              : description.substring(0, 150) + (description.length > 150 ? '...' : '')
          }}
        />
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0 flex flex-col items-start">
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <Badge key={index} variant="secondary" className="font-normal">
              {tech}
            </Badge>
          ))}
        </div>
        <Link href={link} className="text-sm font-medium flex items-center text-primary hover:underline">
          View Project <ArrowUpRight className="ml-1 h-3 w-3" />
        </Link>
      </CardFooter>
    </Card>
  )
}
