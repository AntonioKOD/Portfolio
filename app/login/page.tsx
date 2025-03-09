"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Eye, EyeOff, Github, Mail, ArrowRight, Terminal, AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { SiteLogo } from "@/components/site-logo"
import { ScrollAnimationObserver } from "@/components/scroll-animation-observer"
import { cn } from "@/lib/utils"
import { signIn } from "next-auth/react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

// Define the validation schema
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).transform((value) => value.trim()),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }).transform((value) => value.trim()),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const [terminalLines, setTerminalLines] = useState<string[]>([
    "$ connecting to codeWithToni...",
    "$ initializing session...",
    "$ loading authentication module...",
  ])

  // Set up the form with react-hook-form and zod validation
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (values: LoginFormValues) => {
    setIsLoading(true)
    setLoginError(null)

    // Add terminal lines for visual effect
    setTerminalLines((prev) => [
      ...prev,
      `$ authenticating user: ${values.email.split("@")[0]}...`,
      "$ validating credentials...",
    ])

    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      })

      if (res?.ok) {
        // Add success message to terminal
        setTerminalLines((prev) => [
          ...prev,
          "$ authentication successful!",
          "$ redirecting to dashboard...",
        ])
        
        // Redirect after a short delay
        setTimeout(() => router.push('/templates'), 1000)
      } else {
        setLoginError("Invalid email or password. Please try again.")
        setTerminalLines((prev) => [
          ...prev,
          "$ error: authentication failed",
          "$ please check credentials and try again",
        ])
        setIsLoading(false)
      }
    } catch (error) {
      setLoginError("An error occurred. Please try again.")
      setTerminalLines((prev) => [
        ...prev,
        "$ error: authentication service unavailable",
        "$ please try again later",
      ])
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Login Form */}
      <div className="w-full md:w-1/2 flex flex-col p-8 md:p-12 lg:p-16">
        <div className="mb-8">
          <SiteLogo />
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
          <ScrollAnimationObserver animation="fade-up">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
              <p className="text-muted-foreground">Enter your credentials to access your account</p>
            </div>

            {loginError && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md flex items-start dark:bg-red-900/10 dark:border-red-800">
                <AlertCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0 dark:text-red-400" />
                <p className="text-red-600 text-sm dark:text-red-400">{loginError}</p>
              </div>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Email</FormLabel>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <FormControl>
                          <Input
                            placeholder="name@example.com"
                            className="pl-10"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <div className="flex justify-between items-center">
                        <FormLabel>Password</FormLabel>
                        <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pr-10"
                            {...field}
                          />
                        </FormControl>
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Logging in...
                    </>
                  ) : (
                    <>Log in</>
                  )}
                </Button>


                <p className="text-center text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link href="/signup" className="text-primary hover:underline">
                    Sign up
                  </Link>
                </p>
              </form>
            </Form>
          </ScrollAnimationObserver>
        </div>
      </div>

      {/* Right side - Interactive Terminal */}
      <div className="hidden md:flex md:w-1/2 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:24px_24px]" />
        <div className="absolute h-full w-full bg-gradient-to-br from-primary/20 via-black to-black opacity-60" />

        <div className="relative z-10 w-full max-w-2xl mx-auto p-8 flex flex-col h-full">
          <div className="flex-1 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-900/90 backdrop-blur-sm rounded-lg border border-gray-800 shadow-xl overflow-hidden"
            >
              <div className="flex items-center gap-1.5 p-4 bg-gray-950 border-b border-gray-800">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <div className="ml-2 text-sm text-gray-400 flex items-center">
                  <Terminal className="h-4 w-4 mr-2" />
                  <span>codeWithToni ~ login</span>
                </div>
              </div>

              <div className="p-4 font-mono text-sm text-green-400 h-[400px] overflow-y-auto">
                {terminalLines.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.15 }}
                    className={cn(
                      "mb-2",
                      line.includes("error")
                        ? "text-red-400"
                        : line.includes("authenticating")
                          ? "text-yellow-400"
                          : line.includes("validating")
                            ? "text-blue-400"
                            : line.includes("successful")
                              ? "text-green-500"
                              : "text-green-400",
                    )}
                  >
                    {line}
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                  className="inline-block h-5 w-2 bg-green-400 ml-1"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8 text-center text-white"
            >
              <p className="text-xl font-bold mb-2">Unlock Your Coding Potential</p>
              <p className="text-gray-400 mb-6">Join our community of developers and build amazing projects</p>
              <Link href="/signup">
                <Button variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10">
                  Create an account <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
