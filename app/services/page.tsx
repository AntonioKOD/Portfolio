import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X } from "lucide-react"
import Image from 'next/image'
import banner from '@/public/banner.png'
import Link from "next/link"
export const metadata: Metadata = {
    title: "Web Development Services | Affordable Plans for Businesses",
    description: "Choose the perfect web development plan for your business. From basic to enterprise solutions, we offer SEO optimization, e-commerce functionality, and more.",
    keywords: ["web development", "SEO services", "e-commerce solutions", "website design", "business websites"],
    openGraph: {
      title: "Web Development Services | Affordable Plans for Businesses",
      description: "Find the right web development plan for your business. Our plans include SEO, e-commerce functionality, and more.",
      url: "https://codewithtoni.com/services",
      siteName: "CodeWithToni",
      images: {
          url: banner.src,
          width: 1200,
          height: 630,
          alt: "Web Development Services",
        },
      
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Web Development Services | Affordable Plans for Businesses",
      description: "Find the right web development plan for your business. Our plans include SEO, e-commerce functionality, and more.",
      images: [banner.src],
    },
  }

const services = [
  {
    name: "Basic",
    price: 10,
    description: "Essential web development services for small businesses",
    features: [
      "Single page website",
      "Mobile responsive design",
      "Basic SEO optimization",
      "Contact form integration",
      "Monthly content updates",
    ],
    notIncluded: ["E-commerce functionality", "Custom animations", "Advanced analytics"],
    link: 'https://buy.stripe.com/bIYbLC5A70HkdC87su',
  },
  {
    name: "Professional",
    price: 200,
    description: "Comprehensive web solutions for growing businesses",
    features: [
      "Up to 5 pages website",
      "Mobile responsive design",
      "Advanced SEO optimization",
      "Contact form integration",
      "Bi-weekly content updates",
      "Basic e-commerce functionality",
      "Social media integration",
    ],
    notIncluded: ["Custom animations", "Advanced analytics"],
    link: 'https://buy.stripe.com/14kaHy4w3cq2bu0147'
  },
  {
    name: "Enterprise",
    price: 1500,
    description: "Full-scale web development for large organizations",
    features: [
      "Unlimited pages",
      "Mobile responsive design",
      "Advanced SEO optimization",
      "Contact form integration",
      "Weekly content updates",
      "Advanced e-commerce functionality",
      "Social media integration",
      "Custom animations",
      "Advanced analytics and reporting",
      "24/7 priority support",
    ],
    notIncluded: [],
    link: 'https://buy.stripe.com/4gwbLCe6D61E9lS6oo'

  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8 mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Our Web Development Services
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Choose the perfect plan for your business. All plans include monthly services to keep your website
            up-to-date and running smoothly.
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:grid-cols-3">
          {services.map((service) => (
            <Card
              key={service.name}
              className="flex flex-col justify-between border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-center">{service.name}</CardTitle>
                <CardDescription className="text-center mt-2">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center">
                  <span className="text-4xl font-extrabold">${service.price}</span>
                  <span className="text-base font-medium text-gray-500">/month</span>
                </p>
                <ul className="mt-6 space-y-4">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="flex-shrink-0 w-5 h-5 text-green-500" />
                      <span className="ml-3 text-base text-gray-700">{feature}</span>
                    </li>
                  ))}
                  {service.notIncluded.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <X className="flex-shrink-0 w-5 h-5 text-red-500" />
                      <span className="ml-3 text-base text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link href={service.link} className="w-full"><Button className="w-full text-lg" size="lg">
                  Get Started
                </Button></Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">Not sure which plan is right for you?</h2>
          <p className="mt-4 text-lg text-gray-500">
            Our team of experts is here to help you choose the best solution for your business needs.
          </p>
          <div className="mt-8">
            <Button variant="outline" size="lg">
              <Link href='/#contact'>Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
