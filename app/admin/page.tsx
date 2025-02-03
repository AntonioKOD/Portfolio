'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { createTemplate} from './actions';
import { Button } from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';


export default function Admin(){
    const {data: session} = useSession();
    const user = session?.user;
    const router = useRouter();

    if(session){
        if(user?.email !== 'antonio_kodheli@icloud.com'){
            router.push('/dashboard')
        }
    }


    
    return (
        <div className='flex justify-center items-center min-h-screen'>
        <Card className='w-[350px]'>
            <CardHeader>
                <CardTitle>Create A Template</CardTitle>
                <CardDescription>Fill out the form to create a new template</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={createTemplate} className='space-y-4'>
                <Label>Title</Label>
                <Input type='text' name='name' placeholder='Title'/>
                <Label>Content</Label>
                <Textarea name='content' placeholder='Description'/>
                <Label>Install</Label>
                <Input type='text' name='install' placeholder='Install'/>
                <Label>Icon</Label>
                <Input type='text' name='icon' placeholder='Enter Icon'/>
                <Label>Tags</Label>
                <Textarea name='tags' placeholder='Tags'/>
                <Label>Features</Label>
                <Textarea name='features' placeholder='Features'/>
                <Label>Image</Label>
                <Input type='text' name='image' placeholder='Image'/>
                <Label>Preview</Label>
                <Input type='text' name='preview' placeholder='Preview'/>
                <Button type='submit'>Create</Button>
                </form>
            </CardContent>
        </Card>
        </div>
    )
}