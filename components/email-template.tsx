import * as React from 'react';
import {
    Body,
    Container,
    Head,
    Hr,
    Html,
    Preview,
    Text,
} from "@react-email/components"


export interface EmailTemplateProps{
    firstName: string;
    email: string;
    message: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps>= ({
    firstName,email, message,
}) => (
    <Html>
        <Head/>
        <Preview>Portfolio Message</Preview>
        <Body>
            <Container>
                <Hr/>
                <Text>{firstName}</Text>
                <Text>{email}</Text>
                <Text>{message}</Text>
                <Text> Sent via Contact Form</Text>
                
            </Container>
        </Body>
    </Html>
    
)