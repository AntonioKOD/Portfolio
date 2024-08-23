import * as React from 'react';


interface EmailTemplateProps{
    firstName: string;
    email: string;
    message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>>= ({
    firstName,email, message,
}) => (
    
    <div>
    <h1>New Form Submission</h1>
    <h1>Name: {JSON.stringify(firstName)}</h1>
    <p>Email: {JSON.stringify(email)}</p>
    <p>Message: {JSON.stringify(message)}</p>
    </div>
    
)