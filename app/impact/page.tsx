import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Scale, Lightbulb, BarChart, Cpu, MessageSquare, CalendarDays, ClipboardCheck, Clock, Link as LinkIcon, ArrowRight } from "lucide-react" // Added new icons
import { GradientText } from "@/components/animations/gradient-text"
import Link from "next/link" // Added Link import for the CTA button
import { Button } from "@/components/ui/button" // Added Button import for the CTA button

export const metadata: Metadata = {
  title: "Our Vision for Impact - SafeDawgs",
  description: "Learn about SafeDawgs' vision for impact and how we plan to save more dogs through smarter rescue matching.",
}

export default function ImpactPage() {
  const impactAreas = [
    {
      icon: Heart,
      title: "Increasing Live Release Rates",
      description: "Our primary goal is to reduce euthanasia rates in overcrowded shelters by facilitating timely transfers to rescue partners with available space and resources.",
    },
    {
      icon: Users,
      title: "Expanding Rescue Networks",
      description: "We aim to connect shelters with a broader network of vetted rescue organizations, including those in different geographical areas, to maximize placement opportunities.",
    },
    {
      icon: Scale,
      title: "Optimizing Resource Allocation",
      description: "By providing data-driven insights, we will help shelters and rescues make more informed decisions about resource allocation, transport logistics, and animal care.",
    },
    {
      icon: Lightbulb,
      title: "Fostering Collaboration",
      description: "We envision a future where shelters and rescues seamlessly collaborate, sharing information and resources to create a more efficient and compassionate animal welfare ecosystem.",
    },
    {
      icon: Cpu, // Using Cpu icon for hardware
      title: "Developing Hardware Solutions",
      description: "We are exploring the development of innovative hardware devices to further assist shelters and rescues with real-time monitoring and data collection, enhancing animal welfare efforts.",
    },
  ]

  const measurementPlans = [
    {
      title: "Live Release Rate Tracking",
      description: "We plan to track the percentage of animals leaving shelters alive, directly correlating with successful placements facilitated by SafeDawgs.",
    },
    {
      title: "Rescue Partner Growth",
      description: "Measuring the growth in our network of active, verified rescue organizations and their collective capacity to take in at-risk animals.",
    },
    {
      title: "Geographic Reach Expansion",
      description: "Monitoring the expansion of our platform's reach to connect shelters and rescues across new states and regions, bridging critical gaps.",
    },
    {
      title: "Time-to-Placement Reduction",
      description: "Analyzing the average time it takes for an animal to be matched and transferred through our platform, aiming for quicker outcomes for urgent cases.",
    },
  ]

  return (
    <div className="py-12 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <Badge variant="secondary" className="mb-4">
            Our Vision
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Building a Future of Impact
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            As a research and startup initiative, SafeDawgs is laying the groundwork for a future where every at-risk dog finds a second chance. Here's our vision for the impact we aim to create.
          </p>
        </div>

        {/* Key Impact Areas */}
        <div className="mb-16 animate-fade-in-up" style={{ animationDelay: "150ms" }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Key Areas of Impact</h2>
            <p className="text-lg text-muted-foreground">
              Our platform is designed to address critical challenges in animal welfare.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8"> {/* Adjusted grid columns */}
            {impactAreas.map((area, index) => (
              <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${150 + index * 100}ms` }}>
                <GradientText showBorder={true} className="h-full" animationSpeed={5}>
                  <Card className="text-center h-full border-none">
                    <CardHeader>
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <area.icon className="w-8 h-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{area.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">{area.description}</CardDescription>
                    </CardContent>
                  </Card>
                </GradientText>
              </div>
            ))}
          </div>
        </div>

        {/* Our Core Focus: The Volunteer Engagement Engine */}
        <div className="mb-16 animate-fade-in-up" style={{ animationDelay: "450ms" }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Focus: Empowering the Human Heart of Rescue</h2>
            <p className="text-lg text-muted-foreground">
              We believe the greatest leverage for saving lives lies in supporting the dedicated staff and volunteers.
            </p>
          </div>

          <GradientText showBorder={true} className="rounded-2xl" animationSpeed={5}>
            <Card className="bg-muted/50 rounded-2xl p-8 md:p-12 border-none">
              <CardTitle className="text-2xl font-bold mb-6 text-center">The SafeDawgs Volunteer Engagement Engine</CardTitle>
              <CardDescription className="text-lg text-muted-foreground text-center mb-8">
                Our initial development is laser-focused on building a robust platform to address the critical challenges faced by animal welfare volunteers and coordinators. By streamlining operations and fostering community, we aim to reduce burnout and maximize impact.
              </CardDescription>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-xl flex items-center gap-2"><MessageSquare className="w-5 h-5 text-primary" /> Centralized Communication</h3>
                  <p className="text-muted-foreground text-sm">Bringing order to chaotic message threads with dedicated channels for teams and announcements.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-xl flex items-center gap-2"><CalendarDays className="w-5 h-5 text-primary" /> Unified Scheduling</h3>
                  <p className="text-muted-foreground text-sm">A simple, visual calendar for volunteers to sign up for shifts and events with ease.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-xl flex items-center gap-2"><Users className="w-5 h-5 text-primary" /> Skill-Based Matching</h3>
                  <p className="text-muted-foreground text-sm">A directory to quickly find volunteers with specific skills for urgent tasks.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-xl flex items-center gap-2"><ClipboardCheck className="w-5 h-5 text-primary" /> Structured Onboarding</h3>
                  <p className="text-muted-foreground text-sm">Formalized training modules and checklists for new recruits to ensure consistent understanding.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-xl flex items-center gap-2"><Clock className="w-5 h-5 text-primary" /> Automated Hours Tracking</h3>
                  <p className="text-muted-foreground text-sm">Effortlessly track volunteer contributions for reporting and recognition.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-xl flex items-center gap-2"><LinkIcon className="w-5 h-5 text-primary" /> Seamless Integrations</h3>
                  <p className="text-muted-foreground text-sm">Designed to connect with existing shelter management systems, not replace them.</p>
                </div>
              </div>
            </Card>
          </GradientText>
        </div>

        {/* How We Plan to Measure Success */}
        <div className="mb-16 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How We Plan to Measure Success</h2>
            <p className="text-lg text-muted-foreground">
              Our commitment to transparency and continuous improvement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {measurementPlans.map((plan, index) => (
              <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${300 + index * 100}ms` }}>
                <GradientText showBorder={true} className="h-full" animationSpeed={5}>
                  <Card className="h-full border-none">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <BarChart className="w-6 h-6 text-primary" />
                        {plan.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">{plan.description}</CardDescription>
                    </CardContent>
                  </Card>
                </GradientText>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <GradientText showBorder={true} className="rounded-2xl" animationSpeed={5}>
          <div
            className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center animate-fade-in-up border-none"
            style={{ animationDelay: "600ms" }}
          >
            <h2 className="text-3xl font-bold mb-4">Join Us in Building the Future of Animal Welfare Tech</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We are a research and startup initiative, actively seeking collaborators, early adopters, and passionate individuals to help us develop and refine the SafeDawgs platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Get Involved
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </GradientText>
      </div>
    </div>
  )
}