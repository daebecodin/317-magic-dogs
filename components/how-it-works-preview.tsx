import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, CheckCircle, ArrowRight } from "lucide-react"
import { GradientText } from "@/components/animations/gradient-text"

export function HowItWorksPreview() {
  const steps = [
    {
      number: "1",
      title: "Shelters List Dogs",
      description: "Overburdened shelters add red-listed dogs who need immediate help.",
      icon: Heart,
      color: "bg-red-50 text-red-600",
    },
    {
      number: "2",
      title: "Rescues Offer Space",
      description: "Vetted rescue organizations post their available capacity.",
      icon: Users,
      color: "bg-blue-50 text-blue-600",
    },
    {
      number: "3",
      title: "We Make the Match",
      description: "Smart algorithms suggest the best matches for each dog.",
      icon: CheckCircle,
      color: "bg-green-50 text-green-600",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            How It Works
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <GradientText>Simple Process, Powerful Results</GradientText>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our platform streamlines rescue matching to save more dogs faster.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <Card key={index} className="relative text-center hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center mx-auto mb-4`}>
                  <step.icon className="w-8 h-8" />
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                  {step.number}
                </div>
                <CardTitle className="text-xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{step.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" asChild>
            <Link href="/how-it-works">
              Learn More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}