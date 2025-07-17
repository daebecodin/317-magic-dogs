"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Check, Star, Zap, Heart } from "lucide-react"
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

  const individualPlan = {
    name: "Adopter",
    price: { monthly: 0, annual: 0 },
    description: "For individuals looking to find and adopt their new best friend.",
    features: [
      "Search for available dogs",
      "Filter by breed, age, and location",
      "View shelter and rescue profiles",
      "Save your favorite dogs",
      "Receive new dog alerts",
    ],
    icon: Heart,
    popular: false,
  }

  const faqs = [
    {
      question: "Can I change plans anytime?",
      answer:
        "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing adjustments.",
    },
    {
      question: "Is there a free trial?",
      answer:
        "All paid plans come with a 14-day free trial. No credit card required to start. You can also use our Free plan indefinitely.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and ACH bank transfers for annual plans. All payments are processed securely through Stripe.",
    },
  ]

  const PricingCard = ({ plan, type }: { plan: any; type: string }) => (
    <Card className={`relative h-full ${plan.popular ? "border-primary shadow-lg" : ""}`}>
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
      <CardContent className="flex flex-col">
        <ul className="space-y-3 mb-6 flex-grow">
          {plan.features.map((feature: string, index: number) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        <Button className="w-full mt-auto" variant={plan.popular ? "default" : "outline"}>
          {plan.price.monthly === 0 ? "Get Started Free" : "Start Free Trial"}
        </Button>
      </CardContent>
    </Card>
  )

  return (
    <div className="py-12 md:py-24">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
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
        <Tabs
          defaultValue="rescue"
          className="max-w-6xl mx-auto animate-fade-in-up"
          style={{ animationDelay: "150ms" }}
        >
          <TabsList className="grid w-full grid-cols-3 mb-12">
            <TabsTrigger value="rescue">Rescue Organizations</TabsTrigger>
            <TabsTrigger value="shelter">Shelters</TabsTrigger>
            <TabsTrigger value="individual">Individuals</TabsTrigger>
          </TabsList>

          <TabsContent value="rescue">
            <div className="grid md:grid-cols-3 gap-8 animate-fade-in">
              {rescuePlans.map((plan, index) => (
                <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                  <PricingCard plan={plan} type="rescue" />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shelter">
            <div className="grid md:grid-cols-3 gap-8 animate-fade-in">
              {shelterPlans.map((plan, index) => (
                <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                  <PricingCard plan={plan} type="shelter" />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="individual">
            <div className="grid md:grid-cols-3 gap-8 justify-center animate-fade-in">
              <div className="md:col-start-2 animate-fade-in-up">
                <PricingCard plan={individualPlan} type="individual" />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* FAQ Section */}
        <div
          className="mt-20 max-w-3xl mx-auto animate-fade-in-up"
          style={{ animationDelay: "300ms" }}
        >
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${300 + (index + 1) * 150}ms` }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}