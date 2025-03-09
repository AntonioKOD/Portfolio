"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Eye, EyeOff, Github, Mail, ArrowRight, User, Lock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { SiteLogo } from "@/components/site-logo"
import { ScrollAnimationObserver } from "@/components/scroll-animation-observer"
import { cn } from "@/lib/utils"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

// Define the validation schema
const signupSchema = z.object({
  name: z
    .string()
    .min(5, "Name must be at least 5 characters")
    .transform((value) => value.trim()),
  email: z
    .string()
    .email("Please enter a valid email address")
    .transform((value) => value.trim()),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" })
    .transform((value) => value.trim()),
  updates: z.boolean().default(true),
})

type SignupFormValues = z.infer<typeof signupSchema>

export default function SignupPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [signupError, setSignupError] = useState<string | null>(null)

  // Set up the form with react-hook-form and zod validation
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      updates: true,
    },
  })

  // Get values from the form
  const { watch } = form
  const watchPassword = watch("password")

  // Password strength
  const getPasswordStrength = (password: string) => {
    if (!password) return 0
    let strength = 0
    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1
    return strength
  }

  const passwordStrength = getPasswordStrength(watchPassword || "")

  const handleSignup = async (values: SignupFormValues) => {
    setIsLoading(true)
    setSignupError(null)

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      })

      if (res.ok) {
        router.push("/verify-notice")
      } else {
        const error = await res.json()
        setSignupError(error.message || "Error creating account. Please try again.")
      }
    } catch (error) {
      console.error("Signup error:", error)
      setSignupError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Animated Visual */}
      <div className="hidden md:block md:w-1/3 lg:w-1/2 bg-gradient-to-br from-primary/80 via-primary/50 to-background relative overflow-hidden">
        <div className="absolute inset-0">
          <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center items-center p-8 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md text-center"
          >
            <SiteLogo textSize="lg" className="mx-auto mb-8" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Join Our Developer Community</h1>
            <p className="text-white/80 mb-8">
              Create an account to access exclusive templates, tutorials, and connect with other developers.
            </p>

            {/* Animated code blocks */}
            <div className="relative mt-12 text-left">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-black/30 backdrop-blur-sm p-4 rounded-lg mb-4 font-mono text-sm"
              >
                <div className="text-blue-300">import</div>
                <div className="pl-4">
                  <span className="text-green-300">
                    {"{"} codeWithToni {"}"}
                  </span>{" "}
                  from <span className="text-yellow-300">&apos;developer-community&apos;</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-black/30 backdrop-blur-sm p-4 rounded-lg font-mono text-sm"
              >
                <div className="text-blue-300">const</div>
                <div className="pl-4">
                  <span className="text-green-300">developer</span> = <span className="text-blue-300">await</span>{" "}
                  codeWithToni.<span className="text-yellow-300">createAccount()</span>
                </div>
                <div className="mt-2 text-gray-400">// Your journey begins here</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right side - Signup Form */}
      <div className="w-full md:w-2/3 lg:w-1/2 flex flex-col p-8 md:p-12 lg:p-16">
        <div className="md:hidden mb-8">
          <SiteLogo />
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
          <ScrollAnimationObserver animation="fade-up">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Create your account</h1>
              <p className="text-muted-foreground">Enter your details to get started</p>
            </div>

            {signupError && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md flex items-start dark:bg-red-900/10 dark:border-red-800">
                <AlertCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0 dark:text-red-400" />
                <p className="text-red-600 text-sm dark:text-red-400">{signupError}</p>
              </div>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSignup)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Full Name</FormLabel>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <FormControl>
                          <Input placeholder="John Doe" className="pl-10" {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Email</FormLabel>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <FormControl>
                          <Input type="email" placeholder="name@example.com" className="pl-10" {...field} />
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
                      <FormLabel>Password</FormLabel>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <FormControl>
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pl-10 pr-10"
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

                      {/* Password strength indicator */}
                      <div className="space-y-2">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4].map((level) => (
                            <div
                              key={level}
                              className={cn(
                                "h-1 w-full rounded-full",
                                passwordStrength >= level
                                  ? level <= 1
                                    ? "bg-red-500"
                                    : level <= 2
                                      ? "bg-orange-500"
                                      : level <= 3
                                        ? "bg-yellow-500"
                                        : "bg-green-500"
                                  : "bg-gray-200",
                              )}
                            />
                          ))}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {passwordStrength === 0 && "Enter a password"}
                          {passwordStrength === 1 && "Weak - Add uppercase letters, numbers or symbols"}
                          {passwordStrength === 2 && "Fair - Add more variety"}
                          {passwordStrength === 3 && "Good - Almost there"}
                          {passwordStrength === 4 && "Strong password"}
                        </div>
                      </div>

                      <FormDescription className="text-xs">
                        Password must be at least 8 characters long and contain at least one letter, one number, and one
                        special character.
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="updates"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} id="updates" />
                      </FormControl>
                      <Label htmlFor="updates" className="font-normal">
                        Send me updates about new templates, tutorials, and community events
                      </Label>
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
                      Creating account...
                    </>
                  ) : (
                    <>
                      Sign Up <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary hover:underline">
                    Log in
                  </Link>
                </p>
              </form>
            </Form>
          </ScrollAnimationObserver>
        </div>
      </div>
    </div>
  )
}

