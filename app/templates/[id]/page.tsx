'use client'

import React from "react"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getTemplate } from "../actions"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import Icon from '@/components/Icon'

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
}

export default function TemplatePage({ params }: { params: { id: string } }) {
    const { id } = params;

    const [template, setTemplate] = React.useState<Template | null>(null);

    React.useEffect(() => {
        async function fetchTemplate() {
            const template = await getTemplate(id);
            setTemplate(template);
        }
        fetchTemplate();
    }, [id]);

    if (!template) {
        return (
            <Layout>
                <div className="container mx-auto px-4 py-12">
                    <div className="max-w-4xl mx-auto text-center">
                        Loading...
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <Icon name={template.icon}/>
                                </div>
                                <CardTitle className="text-3xl">{template.name}</CardTitle>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {template.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary">{tag}</Badge>
                                ))}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="aspect-video relative rounded-lg overflow-hidden">
                                <Image
                                    src={template.ImageUrl || "/placeholder.svg"}
                                    alt={`${template.name} Preview`}
                                    layout="fill"
                                    objectFit="cover"
                                   

                                />
                            </div>
                            <div className="prose max-w-none">
                                <h3 className="text-xl font-bold">About this template</h3>
                                <p>{template.content}</p>
                                <h3 className="text-xl font-bold mt-6">Features</h3>
                                <ul>
                                    {template.features.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                                <div className="w-full sm:w-auto">
                                    <h4 className="text-sm font-semibold mb-2">Installation</h4>
                                    <code className="bg-muted p-2 rounded text-sm block">{template.install}</code>
                                </div>
                                <div className="flex gap-4">
                                    <Button variant="outline" onClick={() => window.open(template.previewLink, '_blank')}>
                                        View Live Demo
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    )
}
