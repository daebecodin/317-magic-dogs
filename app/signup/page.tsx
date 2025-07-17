"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, CheckCircle } from "lucide-react"

export default function SignupPage() {
  const [accountType, setAccountType] = useState<"shelter" | "rescue">("rescue")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    phone: "",
    location: "",
    description: "",
    website: "",
    agreeToTerms: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setIsSubmitted(true)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

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
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Contact Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="organization">Organization Name *</Label>
                        <Input
                          id="organization"
                          value={formData.organization}
                          onChange={(e) => handleInputChange("organization", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location (City, State) *</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        placeholder="e.g., San Francisco, CA"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website (Optional)</Label>
                      <Input
                        id="website"
                        type="url"
                        value={formData.website}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                        placeholder="https://yourrescue.org"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">About Your Rescue *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        placeholder="Tell us about your rescue's mission, capacity, and specialties..."
                        rows={4}
                        required
                      />
                    </div>

                    <div className="space-y-4">
                      <Label>Verification Documents *</Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Upload your 501(c)(3) documentation and any relevant licenses
                        </p>
                        <Button type="button" variant="outline" size="sm">
                          Choose Files
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                        required
                      />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the{" "}
                        <a href="/terms" className="text-primary hover:underline">
                          Terms & Conditions
                        </a>{" "}
                        and{" "}
                        <a href="/privacy" className="text-primary hover:underline">
                          Privacy Policy
                        </a>
                      </Label>
                    </div>

                    <Button type="submit" className="w-full" disabled={!formData.agreeToTerms}>
                      Submit Application
                    </Button>
                  </form>
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
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Contact Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="organization">Shelter Name *</Label>
                        <Input
                          id="organization"
                          value={formData.organization}
                          onChange={(e) => handleInputChange("organization", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location (City, State) *</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        placeholder="e.g., San Francisco, CA"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website (Optional)</Label>
                      <Input
                        id="website"
                        type="url"
                        value={formData.website}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                        placeholder="https://yourshelter.org"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">About Your Shelter *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        placeholder="Tell us about your shelter's capacity, typical intake, and current challenges..."
                        rows={4}
                        required
                      />
                    </div>

                    <div className="space-y-4">
                      <Label>Verification Documents *</Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Upload your shelter license and any relevant municipal documentation
                        </p>
                        <Button type="button" variant="outline" size="sm">
                          Choose Files
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                        required
                      />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the{" "}
                        <a href="/terms" className="text-primary hover:underline">
                          Terms & Conditions
                        </a>{" "}
                        and{" "}
                        <a href="/privacy" className="text-primary hover:underline">
                          Privacy Policy
                        </a>
                      </Label>
                    </div>

                    <Button type="submit" className="w-full" disabled={!formData.agreeToTerms}>
                      Submit Application
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
