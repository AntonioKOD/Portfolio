"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getTemplateById } from "../actions"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import Icon from "@/components/Icon"
import { Copy, ExternalLink, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Template {
  id: string
  name: string
  content: string
  icon: string
  install: string
  ImageUrl: string
  previewLink: string
  features: string[]
  tags: string[]
  createdAt?: Date | string | null
}

export default async function TemplatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const [template, setTemplate] = React.useState<Template | null>(null)
  const [copied, setCopied] = React.useState(false)
  React.useEffect(() => {
    async function fetchTemplate() {
      const template = await getTemplateById(id)
      setTemplate(template)
    }
    fetchTemplate()
  }, [id])

  const handleCopy = () => {
    if (template) {
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
  }

  if (!template) {
    return (
      <div className="min-h-screen py-24 bg-muted/10">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-24 bg-muted/10">
      <div className="container px-4 md:px-6">
        <div className="mb-8">
          <Link href="/templates" className="inline-flex items-center text-primary hover:underline mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Templates
          </Link>
          <h1 className="text-4xl font-bold mb-2">{template.name}</h1>
          <div className="flex flex-wrap gap-2">
            {template.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="overflow-hidden border-none shadow-lg">
              <div className="aspect-video relative rounded-t-lg overflow-hidden">
                <Image
                  src={template.ImageUrl || "/placeholder.svg?height=600&width=1200"}
                  alt={`${template.name} Preview`}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6 space-y-6">
                <div className="prose prose-invert max-w-none">
                  <h3 className="text-2xl font-bold text-primary">About this template</h3>
                  <div className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: template.content }} />

                  <h3 className="text-2xl font-bold text-primary mt-8">Features</h3>
                  <ul className="space-y-2 mt-4">
                    {template.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-flex items-center justify-center w-6 h-6 mr-2 rounded-full bg-primary/10 text-primary">
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
                            className="lucide lucide-check"
                          >
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        </span>
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
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
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-16 rounded-xl overflow-hidden">
          <div className="relative bg-primary py-12 px-6">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white blur-3xl" />
              <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-white blur-3xl" />
            </div>

            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4 text-white">Need a Custom Template?</h2>
              <p className="text-primary-foreground/80 mb-8 text-lg">
                If you need a custom solution tailored to your specific requirements, I can help you build it.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="font-medium">
                  Contact Me
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-white/20 text-white hover:bg-white/10 font-medium"
                >
                  View Services
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

