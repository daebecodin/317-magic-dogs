"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { MapPin, Search, Loader } from "lucide-react" // Added Loader icon
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
      <Card className="p-4 border-none"> {/* Reduced padding */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2"> {/* Horizontal layout */}
          <Label htmlFor="location-input" className="sr-only">
            Enter Location
          </Label>
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="location-input"
              type="text"
              placeholder="Enter ZIP code or City, State (e.g., 90210 or Austin, TX)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={isLoading}
              className="pl-9" // Add padding for the icon
            />
          </div>
          <Button type="submit" disabled={isLoading} size="sm"> {/* Smaller button */}
            {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            <span className="sr-only">Search</span>
          </Button>
        </form>
      </Card>
    </GradientText>
  )
}