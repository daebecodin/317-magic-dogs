"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Search } from "lucide-react" // Changed from MapPin to Search for a search bar feel
import { toast } from "sonner" // For notifications

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
    } else {
      toast.error("Please enter a location to search for dogs.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full max-w-lg mx-auto">
      <Label htmlFor="location-input" className="sr-only">
        Enter Location
      </Label>
      <Input
        id="location-input"
        type="text"
        placeholder="Enter ZIP code or City, State (e.g., 90210 or Austin, TX)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        disabled={isLoading}
        className="flex-1"
      />
      <Button type="submit" disabled={isLoading} className="flex-shrink-0">
        <Search className="w-4 h-4 mr-2" />
        {isLoading ? "Searching..." : "Search"}
      </Button>
    </form>
  )
}