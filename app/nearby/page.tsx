"use client"
import { useState, useEffect, useCallback } from "react"
import dynamic from "next/dynamic"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Loader } from "lucide-react"
import { mockOrganizations } from "@/lib/mock-data" // Keep mockOrganizations
import { DogsTab } from "./dogs-tab"
import { SheltersTab } from "./shelters-tab"
import { RescuesTab } from "./rescues-tab"
import { GradientText } from "@/components/animations/gradient-text"
import { getAdoptableDogs, PetfinderDog } from "@/lib/petfinder" // Import getAdoptableDogs and PetfinderDog
import { toast } from "sonner" // Import toast from sonner

const InteractiveMap = dynamic(() => import("@/components/interactive-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-muted rounded-xl flex items-center justify-center">
      <div className="text-center">
        <Loader className="w-12 h-12 text-muted-foreground mx-auto mb-4 animate-spin" />
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    </div>
  ),
})

export default function NearbyPage() {
  const [location, setLocation] = useState("San Francisco, CA")
  const [isLoading, setIsLoading] = useState(true)
  const [dogs, setDogs] = useState<PetfinderDog[]>([]) // State for Petfinder dogs

  const fetchDogs = useCallback(async (currentLocation: string) => {
    setIsLoading(true)
    try {
      const fetchedDogs = await getAdoptableDogs(currentLocation, 48) // Fetch up to 48 dogs
      setDogs(fetchedDogs)
      toast.success(`Found ${fetchedDogs.length} dogs near ${currentLocation}!`)
    } catch (error) {
      console.error("Error fetching dogs for Nearby page:", error)
      toast.error("Failed to fetch dogs. Please ensure your Petfinder API keys are correct and try a different location.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    // Initial fetch for San Francisco, CA on component mount
    fetchDogs(location)

    // Attempt to get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd reverse geocode these coords to a city/state
          // For now, we'll just keep the default or allow manual input
          console.log("User location:", position.coords.latitude, position.coords.longitude);
          // You might want to update 'location' state here based on reverse geocoding
          // For simplicity, we'll stick to the default 'San Francisco, CA' or user input
        },
        (error) => {
          console.warn("Geolocation error:", error);
          // Handle error, e.g., user denied location access
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    }
  }, [fetchDogs, location]) // Re-run if location changes

  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
    fetchDogs(newLocation);
  };

  return (
    <div className="py-12 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16 animate-fade-in-up">
          <Badge variant="secondary" className="mb-4">
            Near You
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Organizations in Your Area</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
            Connect with shelters and rescue organizations near {location}
          </p>
          <Button variant="outline" size="sm" onClick={() => handleLocationChange("New York, NY")}> {/* Example: change location */}
            <MapPin className="w-4 h-4 mr-2" />
            Change Location (Example)
          </Button>
        </div>

        <GradientText showBorder={true} className="rounded-2xl" animationSpeed={5}>
          <div className="bg-muted/50 rounded-2xl p-4 md:p-8 mb-12 animate-fade-in-up border-none" style={{ animationDelay: "200ms" }}>
            <div className="w-full h-64 md:h-96 bg-muted rounded-xl shadow-inner">
              <InteractiveMap shelters={mockOrganizations.shelters} rescues={mockOrganizations.rescues} />
            </div>
          </div>
        </GradientText>

        <Tabs defaultValue="dogs" className="max-w-6xl mx-auto animate-fade-in-up" style={{ animationDelay: "400ms" }}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="dogs">Dogs</TabsTrigger>
            <TabsTrigger value="shelters">Shelters</TabsTrigger>
            <TabsTrigger value="rescues">Rescues</TabsTrigger>
          </TabsList>

          <TabsContent value="dogs">
            <DogsTab dogs={dogs} isLoading={isLoading} /> {/* Pass fetched dogs */}
          </TabsContent>

          <TabsContent value="shelters">
            <SheltersTab shelters={mockOrganizations.shelters} isLoading={isLoading} />
          </TabsContent>

          <TabsContent value="rescues">
            <RescuesTab rescues={mockOrganizations.rescues} isLoading={isLoading} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}