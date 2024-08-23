import {Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";


export async function POST(request: { formData: () => any; }){
    const formData = await request.formData();
    const name = formData.get('name') as string
    const email = formData.get('email')as string
    const message = formData.get('message') as string

    const resend = new Resend(process.env.RESEND_API_KEY)

    try{
        await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: 'antonio_kodheli@icloud.com',
            subject: "New Contact Form Submission",
           react: EmailTemplate({firstName: name, email: email, message: message})
        });
    } catch (error){
        return new Response(JSON.stringify({success: false}), {status: 500})
    }
}
