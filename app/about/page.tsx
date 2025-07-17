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
      name: "Anastasia",
      role: "Founder",
      description:
        "A lifelong animal advocate bridging the tech gap in rescue. Anastasia has over 10 years of experience in animal welfare and saw the need for better technology to connect shelters and rescues.",
      avatar: "/placeholder.svg?height=100&width=100",
      initials: "AN",
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      name: "Aaron",
      role: "Founding Engineer",
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

  return (
    <div className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16">
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
        <div className="bg-primary/5 rounded-2xl p-8 md:p-12 mb-16">
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
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-lg text-muted-foreground">
              Meet the passionate individuals working to save dogs every day.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback className="text-lg">{member.initials}</AvatarFallback>
                  </Avatar>
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
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="bg-muted/50 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground">The principles that guide everything we do.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🐕</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Dogs First</h3>
              <p className="text-muted-foreground">
                Every decision we make prioritizes the welfare and wellbeing of the dogs we serve.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
              <p className="text-muted-foreground">
                We believe in bringing together shelters, rescues, and communities to work as one.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-muted-foreground">
                We use technology thoughtfully to solve real problems in animal rescue.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
