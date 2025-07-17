"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Check, Star, Zap } from "lucide-react"
import { useState } from "react"

export default function PricingClientPage() {
  const [isAnnual, setIsAnnual] = useState(false)

  const rescuePlans = [
    {
      name: "Free",
      price: { monthly: 0, annual: 0 },
      description: "Perfect for small rescues just getting started",
      features: [
        "Basic listing profile",
        "Receive match notifications",
        "Contact shelter directly",
        "Community support",
      ],
      icon: null,
      popular: false,
    },
    {
      name: "Plus",
      price: { monthly: 29, annual: 290 },
      description: "Enhanced features for active rescue organizations",
      features: [
        "Everything in Free",
        "Priority match notifications",
        "Enhanced profile with photos",
        "Advanced search filters",
        "Email support",
      ],
      icon: Star,
      popular: true,
    },
    {
      name: "Pro",
      price: { monthly: 79, annual: 790 },
      description: "Full-featured plan for established rescues",
      features: [
        "Everything in Plus",
        "AI-powered matching",
        "Verified rescue badge",
        "Map listing priority",
        "Analytics dashboard",
        "Phone support",
        "Custom branding",
      ],
      icon: Zap,
      popular: false,
    },
  ]

  const shelterPlans = [
    {
      name: "Free",
      price: { monthly: 0, annual: 0 },
      description: "Essential tools for small shelters",
      features: ["List up to 10 dogs", "Basic matching", "Email notifications", "Community support"],
      icon: null,
      popular: false,
    },
    {
      name: "Plus",
      price: { monthly: 39, annual: 390 },
      description: "Expanded capacity for busy shelters",
      features: [
        "List up to 50 dogs",
        "Priority matching",
        "Urgent listing alerts",
        "Photo galleries",
        "Email support",
      ],
      icon: Star,
      popular: true,
    },
    {
      name: "Pro",
      price: { monthly: 99, annual: 990 },
      description: "Unlimited features for large shelters",
      features: [
        "Unlimited dog listings",
        "AI-powered matching",
        "Real-time notifications",
        "Advanced analytics",
        "API access",
        "Phone support",
        "Custom integrations",
      ],
      icon: Zap,
      popular: false,
    },
  ]

  const PricingCard = ({ plan, type }: { plan: any; type: string }) => (
    <Card className={`relative ${plan.popular ? "border-primary shadow-lg" : ""}`}>
      {plan.popular && <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">Most Popular</Badge>}
      <CardHeader className="text-center">
        {plan.icon && (
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <plan.icon className="w-6 h-6 text-primary" />
          </div>
        )}
        <CardTitle className="text-2xl">{plan.name}</CardTitle>
        <div className="mt-4">
          <span className="text-4xl font-bold">${isAnnual ? plan.price.annual : plan.price.monthly}</span>
          <span className="text-muted-foreground">{plan.price.monthly === 0 ? "" : isAnnual ? "/year" : "/month"}</span>
        </div>
        <CardDescription className="mt-2">{plan.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3 mb-6">
          {plan.features.map((feature: string, index: number) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
          {plan.price.monthly === 0 ? "Get Started Free" : "Start Free Trial"}
        </Button>
      </CardContent>
    </Card>
  )

  return (
    <div className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Pricing
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Choose the plan that fits your organization's needs. All plans include our core matching features.
          </p>

          {/* Annual/Monthly Toggle */}
          <div className="flex items-center justify-center gap-4">
            <Label htmlFor="billing-toggle">Monthly</Label>
            <Switch id="billing-toggle" checked={isAnnual} onCheckedChange={setIsAnnual} />
            <Label htmlFor="billing-toggle">
              Annual
              <Badge variant="secondary" className="ml-2">
                Save 17%
              </Badge>
            </Label>
          </div>
        </div>

        {/* Pricing Tabs */}
        <Tabs defaultValue="rescue" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-12">
            <TabsTrigger value="rescue">Rescue Organizations</TabsTrigger>
            <TabsTrigger value="shelter">Shelters</TabsTrigger>
          </TabsList>

          <TabsContent value="rescue">
            <div className="grid md:grid-cols-3 gap-8">
              {rescuePlans.map((plan, index) => (
                <PricingCard key={index} plan={plan} type="rescue" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shelter">
            <div className="grid md:grid-cols-3 gap-8">
              {shelterPlans.map((plan, index) => (
                <PricingCard key={index} plan={plan} type="shelter" />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I change plans anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll
                  prorate any billing adjustments.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is there a free trial?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All paid plans come with a 14-day free trial. No credit card required to start. You can also use our
                  Free plan indefinitely.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What payment methods do you accept?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We accept all major credit cards, PayPal, and ACH bank transfers for annual plans. All payments are
                  processed securely through Stripe.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
