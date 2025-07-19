import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GradientText } from "@/components/animations/gradient-text"
import { ChromaGrid } from "@/components/animations/chroma-grid" // Import ChromaGrid

export const metadata: Metadata = {
  title: "About Us - SafeDawgs",
  description:
    "Meet the team behind SafeDawgs and learn about our mission to save dogs through smarter rescue matching.",
}

export default function AboutPage() {
  // Removed the old 'team' array as it will be replaced by ChromaGrid's items

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

  const teamMembers = [
    {
      image: "https://i.pravatar.cc/300?img=8",
      title: "Alex Rivera",
      subtitle: "Full Stack Developer",
      handle: "@alexrivera",
      borderColor: "#4F46E5",
      gradient: "linear-gradient(145deg, #4F46E5, #000)",
      url: "https://github.com/",
    },
    {
      image: "https://i.pravatar.cc/300?img=11",
      title: "Jordan Chen",
      subtitle: "DevOps Engineer",
      handle: "@jordanchen",
      borderColor: "#10B981",
      gradient: "linear-gradient(210deg, #10B981, #000)",
      url: "https://linkedin.com/in/",
    },
    {
      image: "https://i.pravatar.cc/300?img=3",
      title: "Morgan Blake",
      subtitle: "UI/UX Designer",
      handle: "@morganblake",
      borderColor: "#F59E0B",
      gradient: "linear-gradient(165deg, #F59E0B, #000)",
      url: "https://dribbble.com/",
    },
    {
      image: "https://i.pravatar.cc/300?img=16",
      title: "Casey Park",
      subtitle: "Data Scientist",
      handle: "@caseypark",
      borderColor: "#EF4444",
      gradient: "linear-gradient(195deg, #EF4444, #000)",
      url: "https://kaggle.com/",
    },
    {
      image: "https://i.pravatar.cc/300?img=25",
      title: "Sam Kim",
      subtitle: "Mobile Developer",
      handle: "@thesamkim",
      borderColor: "#8B5CF6",
      gradient: "linear-gradient(225deg, #8B5CF6, #000)",
      url: "https://github.com/",
    },
    {
      image: "https://i.pravatar.cc/300?img=60",
      title: "Tyler Rodriguez",
      subtitle: "Cloud Architect",
      handle: "@tylerrod",
      borderColor: "#06B6D4",
      gradient: "linear-gradient(135deg, #06B6D4, #000)",
      url: "https://aws.amazon.com/",
    },
  ];


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

        {/* Team Section with ChromaGrid */}
        <div className="mb-16 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-lg text-muted-foreground">
              Meet the passionate individuals working to save dogs every day.
            </p>
          </div>

          <div style={{ height: '600px', position: 'relative' }}>
            <ChromaGrid
              items={teamMembers}
              radius={300}
              damping={0.45}
              fadeOut={0.6}
              ease="power3.out"
              columns={3} // You can adjust columns as needed
              rows={2} // You can adjust rows as needed
            />
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
      </div>
    </div>
  )
}