"use client"

import { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle2, AlertCircle, Loader2, ArrowRight, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteLogo } from "@/components/site-logo"
import { AnimatedCard } from "@/components/animated-card"
import { AnimatedGradientBackground } from "@/components/animated-gradient-background"
import { ScrollAnimationObserver } from "@/components/scroll-animation-observer"
import { Badge } from "@/components/ui/badge"

// The main VerifyEmail component with a Suspense wrapper
export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground">Loading verification...</p>
          </div>
        </div>
      }
    >
      <VerifyEmail />
    </Suspense>
  )
}

// The actual email verification logic
function VerifyEmail() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [message, setMessage] = useState("We are verifying your email address...")
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [isRetrying, setIsRetrying] = useState(false)

  const verifyEmail = async () => {
    if (!token) {
      setMessage("Invalid or missing verification token.")
      setStatus("error")
      return
    }

    try {
      const res = await fetch(`/api/verify-email?token=${token}`)
      const data = await res.json()

      if (data.error) {
        setMessage(data.error)
        setStatus("error")
      } else {
        setMessage("Your email has been verified successfully! You will be redirected to login.")
        setStatus("success")
        setTimeout(() => router.push("/login"), 3000)
      }
    } catch (error) {
      setMessage("An error occurred during verification. Please try again.")
      setStatus("error")
    } finally {
      setIsRetrying(false)
    }
  }

  const handleRetry = () => {
    setIsRetrying(true)
    setStatus("loading")
    setMessage("Retrying verification...")
    verifyEmail()
  }

  useEffect(() => {
    verifyEmail()
  }, [token, router])

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
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    status === "loading"
                      ? "bg-primary/10"
                      : status === "success"
                        ? "bg-green-100 dark:bg-green-900/20"
                        : "bg-red-100 dark:bg-red-900/20"
                  }`}
                >
                  {status === "loading" && <Loader2 className="h-8 w-8 text-primary animate-spin" />}
                  {status === "success" && <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />}
                  {status === "error" && <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />}
                </div>
              </div>
              <CardTitle className="text-center text-2xl font-bold">
                {status === "loading"
                  ? "Verifying Email"
                  : status === "success"
                    ? "Email Verified!"
                    : "Verification Failed"}
              </CardTitle>
              <div className="flex justify-center mt-2">
                <Badge
                  variant="outline"
                  className={`
                    ${
                      status === "loading"
                        ? "bg-primary/5 text-primary border-primary/20"
                        : status === "success"
                          ? "bg-green-50 text-green-600 border-green-200 dark:bg-green-900/10 dark:text-green-400 dark:border-green-800"
                          : "bg-red-50 text-red-600 border-red-200 dark:bg-red-900/10 dark:text-red-400 dark:border-red-800"
                    }
                  `}
                >
                  {status === "loading" ? "In Progress" : status === "success" ? "Success" : "Error"}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="text-center pt-6">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <p className="text-muted-foreground mb-6">{message}</p>

                {status === "error" && (
                  <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-lg mb-6 text-sm">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                      <p className="text-left text-red-600 dark:text-red-400">
                        The verification link may have expired or is invalid. Please try signing up again or contact
                        support.
                      </p>
                    </div>
                  </div>
                )}

                {status === "success" && (
                  <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-lg mb-6 text-sm">
                    <div className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      <p className="text-left text-green-600 dark:text-green-400">
                        You can now log in to your account and access all features.
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4 pt-0">
              {status === "success" && (
                <Link href="/login" className="w-full">
                  <Button className="w-full" variant="default">
                    Go to Login <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              )}

              {status === "error" && (
                <>
                  <Button variant="outline" className="w-full" onClick={handleRetry} disabled={isRetrying}>
                    {isRetrying ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Retrying...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Retry Verification
                      </>
                    )}
                  </Button>

                  <Link href="/signup" className="w-full">
                    <Button className="w-full" variant="default">
                      Sign Up Again
                    </Button>
                  </Link>
                </>
              )}

              <Link href="/" className="w-full">
                <Button variant="ghost" className="w-full text-muted-foreground">
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

