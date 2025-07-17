"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle } from "lucide-react"
import { SignupForm } from "./signup-form"

export default function SignupPage() {
  const [accountType, setAccountType] = useState<"shelter" | "rescue">("rescue")
  const [isSubmitted, setIsSubmitted] = useState(false)

  if (isSubmitted) {
    return (
      <div className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <Card>
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl">Application Submitted!</CardTitle>
                <CardDescription>
                  Thank you for joining SafeDawgs. We'll review your application and get back to you within 2-3 business
                  days.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-left">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">What happens next?</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• We'll verify your organization's non-profit status</li>
                      <li>• Our team will review your care protocols</li>
                      <li>• You'll receive an email with your account activation</li>
                      <li>• Start connecting with {accountType === "rescue" ? "shelters" : "rescues"} in your area</li>
                    </ul>
                  </div>
                  <Button className="w-full" onClick={() => (window.location.href = "/")}>
                    Return to Home
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Join SafeDawgs
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Start Saving Lives Today</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join our network of verified shelters and rescue organizations working together to save dogs.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Tabs value={accountType} onValueChange={(value) => setAccountType(value as "shelter" | "rescue")}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="rescue">Rescue Organization</TabsTrigger>
              <TabsTrigger value="shelter">Shelter</TabsTrigger>
            </TabsList>

            <TabsContent value="rescue">
              <Card>
                <CardHeader>
                  <CardTitle>Join as a Rescue Organization</CardTitle>
                  <CardDescription>Connect with shelters in need and help save dogs in your area.</CardDescription>
                </CardHeader>
                <CardContent>
                  <SignupForm accountType="rescue" onSuccess={() => setIsSubmitted(true)} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shelter">
              <Card>
                <CardHeader>
                  <CardTitle>Join as a Shelter</CardTitle>
                  <CardDescription>
                    Connect with rescue organizations ready to help your dogs find homes.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SignupForm accountType="shelter" onSuccess={() => setIsSubmitted(true)} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}