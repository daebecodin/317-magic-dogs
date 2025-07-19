import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, MessageCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GradientText } from "@/components/animations/gradient-text"
import Link from "next/link" // Import Link for navigatio

export const metadata: Metadata = {
  title: "About Us - SafeDawgs",
  description:
    "Meet the team behind SafeDawgs and learn about our mission to save dogs through smarter rescue matching.",
}

export default function AboutPage() {
  const values = [
    {
      emoji: "🐕",
      title: "Dogs First",
      description: "Every decision we make prioritizes the welfare and wellbeing of the dogs we serve.",
    },
    {
      emoji: "🤝",
      title: "Collaboration",
      description: "We believe in bringing together shelters, rescues, and communities to work as one.",
    },
    {
      emoji: "💡",
      title: "Innovation",
      description: "We use technology thoughtfully to solve real problems in animal rescue.",
    },
  ]

  const universityCollaborations = [
    {
      name: "San Francisco State University",
      description: "Our foundational research and initial development began here, focusing on innovative solutions for animal welfare.",
      link: "https://sfsu.edu",
    },
    {
      name: "Stanford University",
      description: "Collaborating on advanced data science and AI models to optimize dog matching algorithms.",
      link: "https://stanford.edu",
    },
    {
      name: "University of California, Berkeley",
      description: "Partnering on community engagement strategies and ethical considerations in technology for social good.",
      link: "https://berkeley.edu",
    },
  ]

  return (
    <div className="py-12 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <Badge variant="secondary" className="mb-4">
            About Us
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Our Mission: Every Dog Deserves a Chance
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're building technology to solve one of the most heartbreaking problems in animal welfare: the disconnect
            between overcrowded shelters and rescue organizations with space to help.
          </p>
        </div>

        {/* Mission Statement */}
        <GradientText showBorder={true} className="rounded-2xl" animationSpeed={5}>
          <div
            className="bg-primary/5 rounded-2xl p-8 md:p-12 mb-16 animate-fade-in-up border-none"
            style={{ animationDelay: "150ms" }}
          >
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Why We Started SafeDawgs</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every year, millions of healthy, loving dogs are euthanized in shelters simply because there isn't enough
                space or resources. Meanwhile, rescue organizations across the country have the capacity and desire to
                help, but lack an efficient way to connect with shelters in need. SafeDawgs bridges this gap with smart
                technology that saves lives.
              </p>
            </div>
          </div>
        </GradientText>

        {/* Our Roots & Research Section */}
        <div className="mb-16 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Roots & Research</h2>
            <p className="text-lg text-muted-foreground">
              Driven by academic rigor and a passion for innovation.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {universityCollaborations.map((uni, index) => (
              <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${300 + index * 100}ms` }}>
                <GradientText showBorder={true} className="h-full" animationSpeed={5}>
                  <Card className="text-center h-full border-none">
                    <CardHeader>
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <GraduationCap className="w-8 h-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{uni.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                      <CardDescription className="text-base mb-4">{uni.description}</CardDescription>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={uni.link} target="_blank" rel="noopener noreferrer">
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </GradientText>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <GradientText showBorder={true} className="rounded-2xl" animationSpeed={5}>
          <div
            className="bg-muted/50 rounded-2xl p-8 md:p-12 animate-fade-in-up border-none"
            style={{ animationDelay: "450ms" }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-lg text-muted-foreground">The principles that guide everything we do.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="text-center animate-fade-in-up"
                  style={{ animationDelay: `${450 + (index + 1) * 150}ms` }}
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">{value.emoji}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </GradientText>

        {/* Join Our Community Call to Action */}
        <GradientText showBorder={true} className="rounded-2xl mt-16" animationSpeed={5}>
          <div
            className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center animate-fade-in-up border-none"
            style={{ animationDelay: "600ms" }}
          >
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect with our team, fellow developers, and animal welfare advocates on Discord.
            </p>
            <Button size="lg" asChild>
              <a href="https://discord.gg/8k6uXqD4Xt" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" />
                Join Our Discord (Engineers & All)
              </a>
            </Button>
          </div>
        </GradientText>
      </div>
    </div>
  )
}