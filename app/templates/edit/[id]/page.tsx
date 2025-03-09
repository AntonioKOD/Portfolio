'use client';

import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { getTemplateById, updateTemplate } from '../../actions';

interface Template {
  id: string;
  name: string;
  content: string;
  icon: string;
  install: string;
  ImageUrl: string;
  previewLink: string;
  features: string[];
  tags: string[];
}

export default function TemplatePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [template, setTemplate] = useState<Template | null>(null);

  useEffect(() => {
    async function fetchTemplate() {
      const fetchedTemplate = await getTemplateById(id);
      setTemplate(fetchedTemplate);
    }
    fetchTemplate();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await updateTemplate(id,formData);
    // Optionally, handle post-submission actions here, such as displaying a success message or redirecting the user.
  };

  if (!template) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Edit Template</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input type="hidden" name="id" value={template.id} />
            <Label>Title</Label>
            <Input type="text" name="name" defaultValue={template.name} placeholder="Title" />
            <Label>Content</Label>
            <Textarea name="content" defaultValue={template.content} placeholder="Description" />
            <Label>Install</Label>
            <Input type="text" name="install" defaultValue={template.install} placeholder="Install" />
            <Label>Icon</Label>
            <Input type="text" name="icon" defaultValue={template.icon} placeholder="Enter Icon" />
            <Label>Tags</Label>
            <Textarea name="tags" defaultValue={template.tags.join(', ')} placeholder="Tags" />
            <Label>Features</Label>
            <Textarea name="features" defaultValue={template.features.join(', ')} placeholder="Features" />
            <Label>Image</Label>
            <Input type="text" name="image" defaultValue={template.ImageUrl} placeholder="Image" />
            <Label>Preview</Label>
            <Input type="text" name="preview" defaultValue={template.previewLink} placeholder="Preview" />
            <Button type="submit">Update</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}