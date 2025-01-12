import { Resend } from "resend";
import { render } from "@react-email/render";
import VerificationEmail from "@/components/VerificationEmail";
import React from "react";
import path from "path";
import portfolioLogo from '@/assets/portfolioLogo.svg'

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(to: string, token: string) {
  // Ensure NEXTAUTH_URL is defined
  if (!process.env.NEXTAUTH_URL) {
    throw new Error("NEXTAUTH_URL is not defined in environment variables");
  }

  const verificationUrl = `${process.env.NEXTAUTH_URL}/verifyEmail?token=${token}`;
  const subject = "Verify your email address";

  const html = await render(
    React.createElement(VerificationEmail, {
      verificationUrl: verificationUrl,
      appName: "CodeWithToni",
      logoUrl: portfolioLogo
    })
  );
  ;

  try {
    await resend.emails.send({
      from: "CodeWithToni <info@codewithtoni.com>",
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email");
  }
}