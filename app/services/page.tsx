import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ServiceCard from "@/components/service-card"
import { Layout, Cpu, Code, Layers, Zap, MessageSquare, PenTool, Database, Globe, LineChart } from "lucide-react"
import { ServicesIllustration } from "@/components/services-illustration"
import { BenefitsIllustration } from "@/components/benefits-illustration"
import Link from "next/link"

export default function ServicesPage() {
  // Service categories with their respective services
  const serviceCategories = [
    {
      title: "Development",
      description: "End-to-end development services for web and mobile applications",
      services: [
        {
          icon: <Layout className="h-10 w-10 text-primary" />,
          title: "Web Development",
          description: "Creating responsive, performant websites and web applications using modern technologies.",
        },
        {
          icon: <Cpu className="h-10 w-10 text-primary" />,
          title: "Frontend Engineering",
          description: "Building intuitive user interfaces with React, Next.js, and other cutting-edge frameworks.",
        },
        {
          icon: <Code className="h-10 w-10 text-primary" />,
          title: "Backend Development",
          description: "Developing robust server-side applications and APIs to power your digital products.",
        },
        {
          icon: <Layers className="h-10 w-10 text-primary" />,
          title: "Full-Stack Solutions",
          description: "End-to-end development from database design to user interface implementation.",
        },
      ],
    },
    {
      title: "Optimization & Consultation",
      description: "Improve performance and get expert advice for your digital products",
      services: [
        {
          icon: <Zap className="h-10 w-10 text-primary" />,
          title: "Performance Optimization",
          description: "Enhancing application speed and efficiency for better user experience.",
        },
        {
          icon: <MessageSquare className="h-10 w-10 text-primary" />,
          title: "Technical Consultation",
          description: "Expert advice on technology stack selection and implementation strategies.",
        },
        {
          icon: <PenTool className="h-10 w-10 text-primary" />,
          title: "UI/UX Design",
          description: "Creating intuitive and engaging user interfaces and experiences.",
        },
        {
          icon: <Database className="h-10 w-10 text-primary" />,
          title: "Database Architecture",
          description: "Designing efficient and scalable database solutions for your applications.",
        },
      ],
    },
    {
      title: "Specialized Services",
      description: "Focused solutions for specific technical needs",
      services: [
        {
          icon: <Globe className="h-10 w-10 text-primary" />,
          title: "API Development",
          description: "Building robust and well-documented APIs for seamless integration.",
        },
        {
          icon: <LineChart className="h-10 w-10 text-primary" />,
          title: "Analytics Integration",
          description: "Implementing data tracking and visualization solutions for informed decision-making.",
        },
      ],
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-12 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                Professional Services
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Expert Solutions for Your <span className="text-primary">Digital Needs</span>
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Comprehensive development and consulting services to bring your digital vision to life with quality,
                efficiency, and innovation.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 pt-4">
                <Link href='/contact'>
                <Button size="lg" className="font-medium">
                  Get a Quote <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <ServicesIllustration width={500} height={500} className="w-full max-w-[500px] h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Categories */}
      {serviceCategories.map((category, index) => (
        <section key={index} className={`py-12 md:py-16 ${index % 2 === 1 ? "bg-muted/30" : ""}`}>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{category.title}</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                {category.description}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
              {category.services.map((service, serviceIndex) => (
                <ServiceCard
                  key={serviceIndex}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Process Section */}
      <section className="py-12 md:py-16 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">My Development Process</h2>
            <p className="max-w-[700px] text-primary-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A structured approach to ensure quality results and client satisfaction
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Discovery",
                description: "Understanding your requirements, goals, and vision through in-depth consultation.",
              },
              {
                step: "02",
                title: "Planning",
                description: "Creating a detailed roadmap with timelines, milestones, and technical specifications.",
              },
              {
                step: "03",
                title: "Development",
                description: "Building your solution with regular updates and iterative improvements.",
              },
              {
                step: "04",
                title: "Delivery",
                description: "Thorough testing, deployment, and ongoing support to ensure long-term success.",
              },
            ].map((process, index) => (
              <Card key={index} className="bg-primary-foreground/10 border-primary-foreground/20">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-white mb-4">{process.step}</div>
                  <h3 className="text-xl font-bold mb-2">{process.title}</h3>
                  <p className="text-white">{process.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex justify-center order-2 lg:order-1">
              <BenefitsIllustration width={500} height={500} className="w-full max-w-[400px] h-auto" />
            </div>
            <div className="flex flex-col justify-center space-y-4 order-1 lg:order-2">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tighter sm:text-4xl">Why Work With Me</h2>
              <p className="text-gray-500 dark:text-gray-400">
                When you choose to work with me, you get more than just a developer. You get a dedicated partner
                committed to your success.
              </p>
              <ul className="space-y-3">
                {[
                  "Expertise across the full development stack",
                  "Commitment to clean, maintainable code",
                  "Focus on performance and user experience",
                  "Clear communication throughout the project",
                  "Flexible approach to accommodate changing requirements",
                  "Ongoing support after project completion",
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <Link href='/contact'>
                <Button size="lg">
                  Start a Project <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Frequently Asked Questions</h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Common questions about my services and process
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                question: "What technologies do you specialize in?",
                answer:
                  "I specialize in modern web technologies including React, Next.js, Node.js, and TypeScript. I also have experience with various databases, cloud platforms, and DevOps tools.",
              },
              {
                question: "How long does a typical project take?",
                answer:
                  "Project timelines vary based on complexity and scope. A simple website might take 2-4 weeks, while a complex web application could take 2-3 months or more. I'll provide a detailed timeline during the planning phase.",
              },
              {
                question: "Do you offer maintenance after project completion?",
                answer:
                  "Yes, I offer ongoing maintenance and support packages to ensure your application continues to run smoothly and stays up-to-date with the latest technologies and security practices.",
              },
              {
                question: "How do you handle project communication?",
                answer:
                  "I maintain regular communication through your preferred channels (email, Slack, etc.) with weekly progress updates and milestone reviews to ensure the project stays on track.",
              },
              {
                question: "Can you work with an existing development team?",
                answer:
                  "Absolutely. I can integrate with your existing team, providing specialized expertise or additional capacity as needed. I'm comfortable in collaborative environments and using standard development workflows.",
              },
              {
                question: "What is your pricing structure?",
                answer:
                  "I offer both project-based and hourly pricing options. For project-based work, I provide a detailed quote after understanding your requirements. For ongoing work, I offer competitive hourly or retainer rates.",
              },
            ].map((faq, index) => (
              <Card key={index} className="border-none shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Start Your Project?</h2>
            <p className="text-primary-foreground/80 md:text-xl">
              Let's discuss your requirements and create a solution that exceeds your expectations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href='/contact'>
              <Button size="lg" variant="secondary" className="font-medium">
                Get a Quote
              </Button>
              </Link>
              <Link href='/projects'>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground text-white hover:bg-primary-foreground/10 font-medium"
              >
                View My Work
              </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

