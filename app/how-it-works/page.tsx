import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Shield, Users, CheckCircle } from "lucide-react"
import Image from "next/image"

export const metadata: Metadata = {
  title: "How It Works - SafeDawgs",
  description: "Learn about our simple, effective process to save dogs through smart rescue matching.",
}

export default function HowItWorksPage() {
  const steps = [
    {
      number: "1",
      title: "Shelters List Dogs",
      description: "Red-listed dogs are added by overburdened shelters who need immediate help finding placement.",
      icon: Heart,
      color: "bg-red-50 text-red-600",
    },
    {
      number: "2",
      title: "Rescues Offer Space",
      description: "Vetted rescue organizations post their available kennel and foster space capacity.",
      icon: Users,
      color: "bg-blue-50 text-blue-600",
    },
    {
      number: "3",
      title: "We Make the Match",
      description:
        "Our platform uses smart logic to suggest the best matches based on location, capacity, and care needs.",
      icon: CheckCircle,
      color: "bg-green-50 text-green-600",
    },
  ]

  const trustFeatures = [
    "Verification of non-profit status",
    "Review of care protocols and vet references",
    "Ethical and responsible rescue standards",
    "Ongoing monitoring and support",
  ]

  return (
    <div className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            How It Works
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            A Simple, Effective Process to Save Lives
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our platform streamlines the rescue process, making it easier for shelters and rescues to work together and
            save more dogs.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {steps.map((step, index) => (
            <Card key={index} className="relative">
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center mx-auto mb-4`}>
                  <step.icon className="w-8 h-8" />
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  {step.number}
                </div>
                <CardTitle className="text-xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base">{step.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust and Safety */}
        <div className="bg-muted/50 rounded-2xl p-8 md:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Shield className="w-6 h-6 text-primary" />
                <Badge variant="outline">Trust & Safety</Badge>
              </div>
              <h2 className="text-3xl font-bold mb-6">Trust and Safety First</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Every rescue organization on our platform goes through a thorough vetting process to ensure the highest
                standards of animal care.
              </p>
              <ul className="space-y-4">
                {trustFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Happy rescued dog being cared for"
                width={500}
                height={400}
                className="rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
