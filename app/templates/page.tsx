'use client'
import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Icon from '@/components/Icon' 
import { ArrowRight, Code2, Smartphone, Globe, Terminal } from "lucide-react"
import { getTemplates, deleteTemplate } from "./actions"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"


interface Template {
  id: string
  name: string
  content: string
  icon: string
  install: string
}

export default function TemplatesPage() {
  const {data: session} = useSession();
  const user = session?.user;

 
  const [templates, setTemplates] = useState<Template[]>([])
  useEffect(() => {
    async function fetchTemplates() {
      const templates = await getTemplates()
      setTemplates(templates)
    }
  
    fetchTemplates()
  }, [])

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Development Templates</h1>
            <p className="text-xl text-gray-600">
              Explore my collection of professional development templates and starter kits
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {templates.map((template) => (
              <Link key={template.id} href={`/templates/${template.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-200 group">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                        <Icon name={template.icon}/>
                
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
                    </div>
                    <CardTitle className="text-2xl">{template.name}</CardTitle>
                    <CardDescription className="text-base">{template.content}</CardDescription>
                  </CardHeader>
                  {user?.email === 'antonio_kodheli@icloud.com' && (
                  <div className="flex justify-end">
                    <Button variant="outline" className="group" onClick={() => deleteTemplate(template.id)}>
                      Delete
                      </Button>
                      <Link href={`/templates/edit/${template.id}`}>Edit</Link>
                      </div>)}
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button variant="outline" className="group">
              Request Custom Template
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

