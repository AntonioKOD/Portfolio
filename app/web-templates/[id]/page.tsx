import { Suspense } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getTemplateById } from "../actions"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import TemplateClientContent from "@/components/template-client-content"

export default async function TemplatePage({ params }: { params: Promise<{ id: string }> }) {
  // Properly await the params in a Server Component
  const { id } = await params

  // Fetch template data
  const template = await getTemplateById(id)

  if (!template) {
    return <TemplateNotFound />
  }

  return (
    <div className="min-h-screen py-24 bg-muted/10">
      <div className="container px-4 md:px-6">
        <div className="mb-8">
          <Link href="/web-templates" className="inline-flex items-center text-primary hover:underline mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Templates
          </Link>
          <h1 className="text-4xl font-bold mb-2">{template.name}</h1>
          <div className="flex flex-wrap gap-2">
            {template.tags?.map((tag, index) => (
              <Badge key={index} variant="secondary" className="font-normal">
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
                    {template.features?.map((feature, index) => (
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
            
              <TemplateClientContent template={template} />
            
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
                <Link href="/contact">
                  <Button variant="secondary" size="lg" className="font-medium">
                    Contact Me
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-transparent border-white/20 text-white hover:bg-white/10 font-medium"
                  >
                    View Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TemplateNotFound() {
  return (
    <div className="min-h-screen py-24 bg-muted/10">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center h-64">
          <h2 className="text-2xl font-bold mb-4">Template Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The template you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/templates">
            <Button>Browse Templates</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

