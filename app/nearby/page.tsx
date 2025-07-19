"use client"
import { useState, useEffect, useCallback } from "react"
import dynamic from "next/dynamic"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Loader } from "lucide-react"
import { mockOrganizations, mockPets } from "@/lib/mock-data" // Updated import for mockPets
import { PetsTab } from "./pets-tab" // Updated import
import { SheltersTab } from "./shelters-tab"
import { RescuesTab } from "./rescues-tab"
import { GradientText } from "@/components/animations/gradient-text"
import type { Pet, PetfinderAnimal } from "@/lib/types" // Updated import
import { mapPetfinderAnimalToInternalPet } from "@/lib/utils" // Updated import
import { toast } from "sonner"

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
  const [pets, setPets] = useState<Pet[]>([]) // Renamed state from dogs to pets
  const [isLoadingPets, setIsLoadingPets] = useState(true) // Renamed loading state

  const fetchPetsForNearby = useCallback(async (currentLocation: string) => { // Renamed function
    setIsLoadingPets(true)
    try {
      // Call our own API route, now supporting 'type' parameter
      const response = await fetch(`/api/pets?location=${encodeURIComponent(currentLocation)}&limit=24`); // Updated API route
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const fetchedPfAnimals: PetfinderAnimal[] = await response.json(); // Updated type
      const mappedPets = fetchedPfAnimals.map(mapPetfinderAnimalToInternalPet) // Updated mapping function
      setPets(mappedPets) // Updated state
      toast.success(`Found ${mappedPets.length} pets near ${currentLocation}!`) // Updated toast message
    } catch (error) {
      console.error("Error fetching pets for Nearby page:", error) // Updated console message
      setPets([]) // Updated state
      toast.error("Failed to load pets for your location. Please try again.") // Updated toast message
    } finally {
      setIsLoadingPets(false)
    }
  }, [])

  useEffect(() => {
    // Initial fetch for San Francisco, CA on component mount
    fetchPetsForNearby(location);

    // Optional: Attempt geolocation for more accurate initial load
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          const geoLoc = `${latitude},${longitude}`
          setLocation(geoLoc) // Update location state
          fetchPetsForNearby(geoLoc) // Fetch pets for new location
        },
        (error) => {
          console.warn("Geolocation error:", error.message);
          toast.info("Could not detect your precise location. Showing pets for San Francisco, CA.") // Updated toast message
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      )
    } else {
      toast.info("Geolocation not supported. Showing pets for San Francisco, CA.") // Updated toast message
    }
  }, [fetchPetsForNearby, location])

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
          <Button variant="outline" size="sm">
            <MapPin className="w-4 h-4 mr-2" />
            Change Location {/* This button would ideally open a location input modal */}
          </Button>
        </div>

        <GradientText showBorder={true} className="rounded-2xl" animationSpeed={5}>
          <div className="bg-muted/50 rounded-2xl p-4 md:p-8 mb-12 animate-fade-in-up border-none" style={{ animationDelay: "200ms" }}>
            <div className="w-full h-64 md:h-96 bg-muted rounded-xl shadow-inner">
              {/* InteractiveMap still uses mock data for shelters/rescues */}
              <InteractiveMap shelters={mockOrganizations.shelters} rescues={mockOrganizations.rescues} />
            </div>
          </div>
        </GradientText>

        <Tabs defaultValue="pets" className="max-w-6xl mx-auto animate-fade-in-up" style={{ animationDelay: "400ms" }}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="pets">Pets</TabsTrigger> {/* Updated tab name */}
            <TabsTrigger value="shelters">Shelters</TabsTrigger>
            <TabsTrigger value="rescues">Rescues</TabsTrigger>
          </TabsList>

          <TabsContent value="pets">
            <PetsTab pets={pets} isLoading={isLoadingPets} /> {/* Updated component and props */}
          </TabsContent>

          <TabsContent value="shelters">
            <SheltersTab shelters={mockOrganizations.shelters} isLoading={false} /> {/* Keep mock for now */}
          </TabsContent>

          <TabsContent value="rescues">
            <RescuesTab rescues={mockOrganizations.rescues} isLoading={false} /> {/* Keep mock for now */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}