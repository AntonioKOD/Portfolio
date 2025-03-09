"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, CheckCircle, Mail, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteLogo } from "@/components/site-logo"
import { AnimatedCard } from "@/components/animated-card"
import { AnimatedGradientBackground } from "@/components/animated-gradient-background"
import { ScrollAnimationObserver } from "@/components/scroll-animation-observer"
import { Badge } from "@/components/ui/badge"
import { toast } from "react-hot-toast"
import { sendVerificationEmail } from "@/utils/resend"

export default function VerifyNotice() {
  const [isResending, setIsResending] = useState(false)

  const handleResendEmail = async () => {
    setIsResending(true)

   

    toast.success("Verification email resent successfully")

    setIsResending(false)
  }

  return (
    <AnimatedGradientBackground className="min-h-screen flex flex-col items-center justify-center p-4" subtle={true}>
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <SiteLogo className="mx-auto mb-4" />
        </div>

        <ScrollAnimationObserver animation="fade-up">
          <AnimatedCard className="border-none shadow-xl overflow-hidden">
            <CardHeader className="pb-0">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-center text-2xl font-bold">Check Your Email</CardTitle>
              <div className="flex justify-center mt-2">
                <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                  Verification Required
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="text-center pt-6">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <p className="text-muted-foreground mb-6">
                  We&apos;ve sent a verification link to your email address. Please check your inbox and click on the
                  link to verify your account.
                </p>

                <div className="bg-muted/50 p-4 rounded-lg mb-6 text-sm">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-left">The verification link will expire in 24 hours.</p>
                  </div>
                  <div className="flex items-start mt-2">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-left">If you don&apos;t see the email, check your spam or junk folder.</p>
                  </div>
                </div>
              </motion.div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4 pt-0">
              <Button variant="outline" className="w-full" onClick={handleResendEmail} disabled={isResending}>
                {isResending ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Resending...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Resend Verification Email
                  </>
                )}
              </Button>

              <Link href="/login" className="w-full">
                <Button className="w-full" variant="default">
                  Go to Login
                </Button>
              </Link>

              <Link href="/" className="w-full">
                <Button variant="ghost" className="w-full text-muted-foreground">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Return to Home
                </Button>
              </Link>
            </CardFooter>
          </AnimatedCard>
        </ScrollAnimationObserver>

        <footer className="text-center mt-8 text-muted-foreground text-sm">
          <p>
            Need help?{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Contact Support
            </Link>
          </p>
        </footer>
      </div>
    </AnimatedGradientBackground>
  )
}

