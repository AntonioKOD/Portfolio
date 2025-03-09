"use client"
import { useState, type FormEvent } from "react"
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "react-hot-toast"
import { ScrollAnimationObserver } from "@/components/scroll-animation-observer"
import { AnimatedGradientBackground } from "@/components/animated-gradient-background"
import { Badge } from "@/components/ui/badge"


// Using the same interface as in the footer component
interface EmailTemplateProps {
  firstName: string
  email: string
  message: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<EmailTemplateProps>({
    firstName: "",
    email: "",
    message: "",
  })
  const [characterCount, setCharacterCount] = useState(0)
  const [isSending, setIsSending] = useState<boolean>(false)
  const [formErrors, setFormErrors] = useState<{
    firstName?: string
    email?: string
    message?: string
  }>({})
  const [formSuccess, setFormSuccess] = useState(false)

  const validateForm = () => {
    const errors: {
      firstName?: string
      email?: string
      message?: string
    } = {}

    if (!formData.firstName.trim()) {
      errors.firstName = "Name is required"
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address"
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required"
    } else if (formData.message.length < 50) {
      errors.message = "Message should be at least 50 characters"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      setIsSending(true)
      const response = await fetch("/api/send/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          email: formData.email,
          message: formData.message,
        }),
      })

      // handle success
      if (response.ok) {
        toast.success("Message sent successfully!")
        setFormSuccess(true)
        setFormData({
          firstName: "",
          email: "",
          message: "",
        })
        setCharacterCount(0)
      } else {
        toast.error("There was a problem sending your message. Please try again!")
      }
    } catch (error) {
      console.log("Error sending email:", error)
      toast.error("There was a problem sending your message. Please try again!")
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-primary/5 to-background dark:from-primary/10 dark:to-background">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-30">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
          </div>
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollAnimationObserver animation="fade-up">
              <Badge variant="outline" className="mb-4 px-4 py-1 text-sm border-primary/20 bg-primary/5">
                Get in Touch
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Let's Connect
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Have a project in mind or want to discuss a potential collaboration? I'd love to hear from you.
              </p>
            </ScrollAnimationObserver>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Form */}
            <ScrollAnimationObserver animation="fade-up">
              <Card className="border-none shadow-lg overflow-hidden">
                {formSuccess ? (
                  <CardContent className="p-8">
                    <div className="flex flex-col items-center justify-center text-center py-10">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle className="h-8 w-8 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold mb-4">Message Sent Successfully!</h2>
                      <p className="text-muted-foreground mb-8 max-w-md">
                        Thank you for reaching out. I'll get back to you as soon as possible.
                      </p>
                      <Button onClick={() => setFormSuccess(false)}>Send Another Message</Button>
                    </div>
                  </CardContent>
                ) : (
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-6">Send Me a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Your Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="John Doe"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className={formErrors.firstName ? "border-red-500" : ""}
                        />
                        {formErrors.firstName && (
                          <p className="text-red-500 text-sm mt-1 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {formErrors.firstName}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Your Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={formErrors.email ? "border-red-500" : ""}
                        />
                        {formErrors.email && (
                          <p className="text-red-500 text-sm mt-1 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {formErrors.email}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="message">Message</Label>
                          <span className={`text-xs ${characterCount < 50 ? "text-red-500" : "text-muted-foreground"}`}>
                            {characterCount}/50 characters minimum
                          </span>
                        </div>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Tell me about your project or inquiry..."
                          rows={6}
                          value={formData.message}
                          onChange={(e) => {
                            setCharacterCount(e.target.value.length)
                            setFormData({ ...formData, message: e.target.value })
                          }}
                          className={formErrors.message ? "border-red-500" : ""}
                        />
                        {formErrors.message && (
                          <p className="text-red-500 text-sm mt-1 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {formErrors.message}
                          </p>
                        )}
                      </div>

                      <Button type="submit" className="w-full" disabled={isSending} size="lg">
                        {isSending ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                            Sending Message...
                          </>
                        ) : (
                          <>
                            Send Message <Send className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                )}
              </Card>
            </ScrollAnimationObserver>

            {/* Contact Info */}
            <ScrollAnimationObserver animation="fade-up" delay={100}>
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                  <p className="text-muted-foreground mb-8">
                    Feel free to reach out through any of the following channels. I'm always open to discussing new
                    projects, creative ideas, or opportunities to be part of your vision.
                  </p>

                  <div className="space-y-8">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mr-4">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">Email</h3>
                        <a
                          href="mailto:contact@codewithtoni.com"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          antonio_kodheli@icloud.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mr-4">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">Phone</h3>
                        <a
                          href="tel:+15551234567"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          +1 (617) 415-8731
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mr-4">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">Location</h3>
                        <p className="text-muted-foreground">Boston, Massachusetts</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Availability */}
                <AnimatedGradientBackground className="mt-12 rounded-xl p-8" subtle={true}>
                  <h3 className="text-xl font-bold mb-4">Current Availability</h3>
                  <p className="mb-6 text-muted-foreground">
                    I'm currently available for freelance work and new projects. My typical response time is within
                    24-48 hours.
                  </p>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="font-medium">Available for new projects</span>
                  </div>
                </AnimatedGradientBackground>
              </div>
            </ScrollAnimationObserver>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <ScrollAnimationObserver animation="fade-up">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">Frequently Asked Questions</h2>
              <p className="max-w-[700px] text-muted-foreground">Common questions about working with me</p>
            </div>
          </ScrollAnimationObserver>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                question: "What is your typical response time?",
                answer: "I typically respond to all inquiries within 24-48 hours during business days.",
              },
              {
                question: "Do you work with clients internationally?",
                answer: "Yes, I work with clients from all around the world. Time zone differences are never an issue.",
              },
              {
                question: "What information should I provide for a project quote?",
                answer:
                  "To provide an accurate quote, it helps to include project details, timeline, specific requirements, and any design assets or references you have.",
              },
              {
                question: "Do you offer ongoing maintenance?",
                answer:
                  "Yes, I offer maintenance packages to keep your website or application running smoothly after launch.",
              },
            ].map((faq, index) => (
              <ScrollAnimationObserver key={index} animation="fade-up" delay={index * 100}>
                <Card className="border-none shadow-md h-full">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              </ScrollAnimationObserver>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

