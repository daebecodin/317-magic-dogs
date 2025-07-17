import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "About Us - SafeDawgs",
  description:
    "Meet the team behind SafeDawgs and learn about our mission to save dogs through smarter rescue matching.",
}

export default function AboutPage() {
  const team = [
    {
      name: "Aaron",
      role: "Engineer",
      description:
        "Leads platform development with focus on usability and security. Aaron brings extensive experience in building scalable platforms and has a passion for using technology for social good.",
      avatar: "/placeholder.svg?height=100&width=100",
      initials: "AA",
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
  ]

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
        <div
          className="bg-primary/5 rounded-2xl p-8 md:p-12 mb-16 animate-fade-in-up"
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

        {/* Team Section */}
        <div className="mb-16 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-lg text-muted-foreground">
              Meet the passionate individuals working to save dogs every day.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${300 + index * 150}ms` }}>
                <Card className="text-center h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="relative w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-50 to-green-50 rounded-full">
                      <Avatar className="w-full h-full">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback className="text-lg">{member.initials}</AvatarFallback>
                      </Avatar>
                    </div>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription className="text-primary font-medium">{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{member.description}</p>
                    <div className="flex justify-center gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="w-4 h-4" />
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                          <Twitter className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div
          className="bg-muted/50 rounded-2xl p-8 md:p-12 animate-fade-in-up"
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
      </div>
    </div>
  )
}