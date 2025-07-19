import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, CheckCircle, ArrowRight, PawPrint } from "lucide-react" // Changed Heart to PawPrint
import { GradientText } from "@/components/animations/gradient-text"

export function HowItWorksPreview() {
  const steps = [
    {
      number: "1",
      title: "Shelters List Pets", // Updated text
      description: "Overburdened shelters add red-listed pets who need immediate help.", // Updated text
      icon: PawPrint, // Changed icon
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
      description: "Smart algorithms suggest the best matches for each pet.", // Updated text
      icon: CheckCircle,
      color: "bg-green-50 text-green-600",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            How It Works
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <GradientText>Simple Process, Powerful Results</GradientText>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our platform streamlines rescue matching to save more pets faster. {/* Updated text */}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <GradientText key={index} showBorder={true} className="h-full" animationSpeed={5}>
              <Card className="relative text-center hover:shadow-lg transition-shadow h-full border-none">
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
            </GradientText>
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