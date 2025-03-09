"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Icon from "@/components/Icon"
import { Copy, ExternalLink } from "lucide-react"

interface Template {
  id: string
  name: string
  content: string
  icon: string
  install: string
  ImageUrl: string
  previewLink: string
  features?: string[]
  tags?: string[]
  createdAt?: Date | string | null
}

export default function TemplateClientContent({ template }: { template: Template }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard
      .writeText(template.install)
      .then(() => {
        setCopied(true)
        setTimeout(() => {
          setCopied(false)
        }, 2000)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <Card className="border-none shadow-lg sticky top-24">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Icon name={template.icon} className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-xl">Template Details</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="text-sm font-semibold mb-2 text-muted-foreground">Installation</h4>
          <div className="bg-muted p-3 rounded-md flex items-center justify-between">
            <code className="text-sm text-white">{template.install}</code>
            <Button size="sm" variant="ghost" onClick={handleCopy} className="ml-2">
              <Copy className="w-4 h-4 mr-1" />
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
        </div>

        <div className="pt-4 space-y-4">
          <Button className="w-full" onClick={() => window.open(template.previewLink, "_blank")}>
            <ExternalLink className="mr-2 h-4 w-4" />
            View Live Demo
          </Button>

          <Button variant="outline" className="w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download Template
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

