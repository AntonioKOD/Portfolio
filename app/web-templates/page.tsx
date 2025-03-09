"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { ArrowRight, BarChart, Download, Search, CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { getTemplates, deleteTemplate } from "./actions"
import { useSession } from "next-auth/react"
import Icon from "@/components/Icon"
import { useDebounce } from "@/hooks/use-debounce"

interface Template {
  id: string
  name: string
  content: string
  icon: string
  install: string
  // Adding optional fields to handle the display in our design
  category?: string
  tags?: string[]
  downloads?: number
  price?: string
  ImageUrl?: string
  createdAt?: Date | string // Use createdAt instead of publishedAt
}

export default function TemplatesPage() {
  // State for search and filtering
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [templates, setTemplates] = useState<Template[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Use debounce to avoid making too many requests while typing
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const { data: session } = useSession()
  const user = session?.user

  // Template categories
  const categories = ["All", "Dashboard", "E-commerce", "Portfolio", "Landing Page", "Blog", "Admin", "Mobile App"]

  // Update the useEffect hook to properly handle search and category changes
  // Fetch templates from the server with search parameters
  useEffect(() => {
    async function fetchTemplates() {
      setIsLoading(true)
      try {
        console.log("Fetching templates with:", {
          searchTerm: debouncedSearchTerm,
          category: activeCategory,
        })

        const searchParams = {
          searchTerm: debouncedSearchTerm,
          category: activeCategory !== "All" ? activeCategory : undefined,
        }

        const fetchedTemplates = await getTemplates(searchParams)
        console.log("Fetched templates:", fetchedTemplates.length)
        setTemplates(fetchedTemplates)
      } catch (error) {
        console.error("Error fetching templates:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTemplates()
  }, [debouncedSearchTerm, activeCategory])

  // Update the handleSearchChange function to properly handle input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Search term changed:", e.target.value)
    setSearchTerm(e.target.value)
  }

  // Update the handleCategoryChange function to properly handle category changes
  const handleCategoryChange = (category: string) => {
    console.log("Category changed:", category)
    setActiveCategory(category)
  }

  // Handle template download
  const handleDownload = (templateId: string) => {
    // In a real app, this would trigger a download or installation flow
    console.log(`Installing template ${templateId}`)

    // Show success message or redirect to download page
    alert(`Template ${templateId} installation started!`)
  }

  // Get featured template (first template or empty object if none)
  const featuredTemplate = templates.length > 0 ? templates[0] : null

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-primary">Templates</h1>
        <p className="text-xl text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Download professionally designed templates to jumpstart your next project
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search templates..."
              className="pl-10 pr-4"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Featured Template */}
        {featuredTemplate && (
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-foreground">Featured Template</h2>
            <Card className="bg-card hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-primary hover:text-primary/80 transition-colors duration-200">
                  <Link href={`/templates/${featuredTemplate.id}`}>{featuredTemplate.name}</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative aspect-video rounded-md overflow-hidden">
                    {featuredTemplate.ImageUrl ? (
                      <Image
                        src={featuredTemplate.ImageUrl || "/placeholder.svg"}
                        alt={featuredTemplate.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <Icon name={featuredTemplate.icon || "Code2"} className="h-16 w-16 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div
                      className="text-muted-foreground mb-4 line-clamp-6"
                      dangerouslySetInnerHTML={{
                        __html:
                          featuredTemplate.content.length > 400
                            ? featuredTemplate.content.substring(0, 400) + "..."
                            : featuredTemplate.content,
                      }}
                    />
                    <div className="flex flex-wrap gap-2 mb-4">
                      {featuredTemplate.tags ? (
                        featuredTemplate.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="font-normal">
                            {tag}
                          </Badge>
                        ))
                      ) : (
                        <Badge variant="secondary" className="font-normal">
                          {featuredTemplate.category || "Template"}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground space-x-4 mb-4">
                      <div className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        <time dateTime={featuredTemplate.createdAt?.toString() || new Date().toISOString()}>
                          {new Date(featuredTemplate.createdAt || new Date()).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </time>
                      </div>
                      {featuredTemplate.downloads && (
                        <div className="flex items-center">
                          <Download className="w-4 h-4 mr-2" />
                          <span>{featuredTemplate.downloads.toLocaleString()} downloads</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center">
                      <Badge
                        variant={featuredTemplate.price === "Free" ? "secondary" : "default"}
                        className="text-sm font-medium"
                      >
                        {featuredTemplate.price || "Free"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/web-templates/${featuredTemplate.id}`} className="w-full">
                  <Button variant="default" className="w-full group">
                    View Featured Template
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        )}

        {/* Templates Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Browse Templates</h2>
          <Tabs defaultValue="All" className="w-full" value={activeCategory} onValueChange={handleCategoryChange}>
            <div className="flex justify-center mb-8 overflow-x-auto">
              <TabsList>
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category}>
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value={activeCategory} className="mt-0">
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : templates.length > 0 ? (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {templates.map((template) => (
                    <Card
                      key={template.id}
                      className="flex flex-col bg-card hover:shadow-xl transition-shadow duration-300 group"
                    >
                      <div className="relative aspect-video">
                        {template.ImageUrl ? (
                          <Image
                            src={template.ImageUrl || "/placeholder.svg"}
                            alt={template.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-muted flex items-center justify-center">
                            <Icon name={template.icon || "Code2"} className="h-12 w-12 text-muted-foreground" />
                          </div>
                        )}
                        <div className="absolute top-2 right-2">
                          <Badge variant={template.price === "Free" ? "secondary" : "default"} className="font-medium">
                            {template.price || "Free"}
                          </Badge>
                        </div>
                      </div>
                      <CardHeader className="flex-grow">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl font-semibold text-primary hover:text-primary/80 transition-colors duration-200">
                            {template.name}
                          </CardTitle>
                          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div
                          className="text-muted-foreground mb-4 line-clamp-3"
                          dangerouslySetInnerHTML={{
                            __html:
                              template.content.length > 150
                                ? template.content.substring(0, 150) + "..."
                                : template.content,
                          }}
                        />
                        <div className="flex flex-wrap gap-2 mb-4">
                          {template.tags ? (
                            template.tags.slice(0, 2).map((tag, index) => (
                              <Badge key={index} variant="outline" className="font-normal text-xs">
                                {tag}
                              </Badge>
                            ))
                          ) : (
                            <Badge variant="outline" className="font-normal text-xs">
                              {template.category || "Template"}
                            </Badge>
                          )}
                          {template.tags && template.tags.length > 2 && (
                            <Badge variant="outline" className="font-normal text-xs">
                              +{template.tags.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <div className="flex gap-2 w-full">
                          <Link href={`/templates/${template.id}`} className="flex-1">
                            <Button variant="default" className="w-full group">
                              View Template
                              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                            </Button>
                          </Link>

                          {/* Admin controls */}
                          {user?.email === "antonio_kodheli@icloud.com" && (
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                className="group"
                                onClick={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  if (confirm("Are you sure you want to delete this template?")) {
                                    deleteTemplate(template.id)
                                    setTemplates(templates.filter((t) => t.id !== template.id))
                                  }
                                }}
                              >
                                Delete
                              </Button>
                              <Link href={`/templates/edit/${template.id}`}>
                                <Button variant="outline">Edit</Button>
                              </Link>
                            </div>
                          )}
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <BarChart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No templates found</h3>
                  <p className="text-muted-foreground mb-6">
                    We couldn't find any templates matching your search criteria.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("")
                      setActiveCategory("All")
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6 text-foreground text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                question: "Can I use these templates for commercial projects?",
                answer:
                  "Yes, all templates come with a license that allows you to use them in both personal and commercial projects. Free templates require attribution, while premium templates don't require attribution.",
              },
              {
                question: "Do I need to credit the author when using these templates?",
                answer:
                  "For free templates, attribution is required. For premium templates, no attribution is required, though it's always appreciated.",
              },
              {
                question: "Can I modify the templates to fit my needs?",
                answer:
                  "All templates are fully customizable. You can modify the code, design, and content to match your brand and requirements.",
              },
              {
                question: "What's included in the download package?",
                answer:
                  "Each template package includes all source files, assets, and documentation to help you get started. Premium templates also include additional features and support.",
              },
            ].map((faq, index) => (
              <Card key={index} className="border-none shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-primary text-primary-foreground rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Need a Custom Template?</h2>
          <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
            If you can't find what you're looking for, I can create a custom template tailored to your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="font-medium">
                Contact Me
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-white hover:bg-primary-foreground/10 font-medium"
            >
              View Services
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

