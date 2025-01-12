import { Html, Tailwind, Body, Container, Heading, Text, Button } from "@react-email/components";
import logoUrl from '@/assets/portfolioLogo.svg'

interface VerificationEmailProps {
  verificationUrl: string;
  appName?: string;
  logoUrl?: string;
}

export default function VerificationEmail({
  verificationUrl,
  appName = "CodeWithToni",
}: VerificationEmailProps) {
  return (
    <Html>
      <Tailwind>
        <Body className="bg-gray-50 py-10">
          <Container className="bg-white rounded-lg shadow-md max-w-lg mx-auto p-6">
            {/* Logo */}
            <div className="text-center mb-6">
              <img src={logoUrl} alt={`${appName} Logo`} className="mx-auto h-12" />
            </div>
            {/* Heading */}
            <Heading className="text-xl font-bold text-gray-800 text-center">
              Verify Your Email Address
            </Heading>
            {/* Message */}
            <Text className="text-gray-600 text-center my-4">
              Thank you for signing up for {appName}! Please verify your email address by clicking the button below.
            </Text>
            {/* Button */}
            <div className="text-center">
              <Button
                href={verificationUrl}
                className="bg-blue-500 text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-blue-600"
              >
                Verify Email
              </Button>
            </div>
            {/* Footer */}
            <Text className="text-gray-500 text-sm text-center mt-6">
              If you didn’t sign up for {appName}, you can safely ignore this email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}