"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { MapPin } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GradientText } from "@/components/animations/gradient-text"

interface LocationInputProps {
  onSearch: (location: string) => void
  initialLocation?: string
  isLoading: boolean
}

export function LocationInput({ onSearch, initialLocation = "", isLoading }: LocationInputProps) {
  const [location, setLocation] = useState(initialLocation)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (location.trim()) {
      onSearch(location.trim())
    }
  }

  return (
    <GradientText showBorder={true} className="h-full" animationSpeed={5}>
      <Card className="p-6 text-center border-none">
        <CardHeader>
          <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
          <CardTitle className="text-2xl">Location Needed</CardTitle>
          <CardDescription>
            We couldn't detect your location. Please enter your ZIP code or City, State to find adoptable dogs near you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm mx-auto">
            <Label htmlFor="location-input" className="sr-only">
              Enter Location
            </Label>
            <Input
              id="location-input"
              type="text"
              placeholder="e.g., 90210 or Austin, TX"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={isLoading}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Searching..." : "Find Dogs"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </GradientText>
  )
}