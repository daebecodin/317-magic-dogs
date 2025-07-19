"use client"
import { useState, useEffect, useCallback } from "react"
import dynamic from "next/dynamic"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Loader } from "lucide-react"
import { mockOrganizations } from "@/lib/mock-data" // Keep for shelters/rescues tabs
import { DogsTab } from "./dogs-tab"
import { SheltersTab } from "./shelters-tab"
import { RescuesTab } from "./rescues-tab"
import { GradientText } from "@/components/animations/gradient-text"
import type { Dog, PetfinderDog } from "@/lib/types" // Import our internal Dog type and PetfinderDog
import { toast } from "sonner" // For notifications

// Utility function to decode HTML entities (moved here for reusability)
function decodeHtmlEntities(text: string): string {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

// Utility function to map PetfinderDog to our internal Dog type
function mapPetfinderDogToInternalDog(pfDog: PetfinderDog): Dog {
  return {
    id: pfDog.id,
    name: pfDog.name,
    breed: pfDog.breeds.primary,
    age: pfDog.age,
    gender: pfDog.gender,
    size: pfDog.size,
    photos: pfDog.photos,
    description: pfDog.description ? decodeHtmlEntities(pfDog.description) : "No description available.",
    url: pfDog.url,
    status: pfDog.status,
    shelter: pfDog.contact.organization_id || `${pfDog.contact.address.city}, ${pfDog.contact.address.state}`, // Use org ID or city/state
    distance: pfDog.distance ? `${pfDog.distance.toFixed(1)} miles` : "N/A",
    urgent: false, // Default to false, as Petfinder doesn't have this directly
    characteristics: pfDog.tags || [], // Mapped from Petfinder 'tags'
    health: [ // Mapped from Petfinder 'attributes'
      pfDog.attributes.spayed_neutered ? "Spayed / Neutered" : null,
      pfDog.attributes.shots_current ? "Vaccinations up to date" : null,
      pfDog.attributes.special_needs ? "Special Needs" : null,
      pfDog.attributes.house_trained ? "House Trained" : null,
    ].filter(Boolean) as string[],
    goodInHomeWith: [ // Mapped from Petfinder 'environment'
      pfDog.environment.children ? "Children" : null,
      pfDog.environment.dogs ? "Other dogs" : null,
      pfDog.environment.cats ? "Cats" : null,
    ].filter(Boolean) as string[],
    adoptionFee: pfDog.adoption_fee,
  };
}


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
  const [dogs, setDogs] = useState<Dog[]>([]) // Use internal Dog type
  const [isLoadingDogs, setIsLoadingDogs] = useState(true) // Separate loading state for dogs

  const fetchDogsForNearby = useCallback(async (currentLocation: string) => {
    setIsLoadingDogs(true)
    try {
      // Call our own API route instead of Petfinder directly
      const response = await fetch(`/api/dogs?location=${encodeURIComponent(currentLocation)}&limit=24`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const fetchedPfDogs: PetfinderDog[] = await response.json();
      const mappedDogs = fetchedPfDogs.map(mapPetfinderDogToInternalDog)
      setDogs(mappedDogs)
      toast.success(`Found ${mappedDogs.length} dogs near ${currentLocation}!`)
    } catch (error) {
      console.error("Error fetching dogs for Nearby page:", error)
      setDogs([])
      toast.error("Failed to load dogs for your location. Please try again.")
    } finally {
      setIsLoadingDogs(false)
    }
  }, [])

  useEffect(() => {
    // Initial fetch for San Francisco, CA on component mount
    fetchDogsForNearby(location);

    // Optional: Attempt geolocation for more accurate initial load
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          const geoLoc = `${latitude},${longitude}`
          setLocation(geoLoc) // Update location state
          fetchDogsForNearby(geoLoc) // Fetch dogs for new location
        },
        (error) => {
          console.warn("Geolocation error:", error.message);
          toast.info("Could not detect your precise location. Showing dogs for San Francisco, CA.")
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      )
    } else {
      toast.info("Geolocation not supported. Showing dogs for San Francisco, CA.")
    }
  }, [fetchDogsForNearby, location]) // Depend on location to re-fetch if changed by geolocation

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

        <Tabs defaultValue="dogs" className="max-w-6xl mx-auto animate-fade-in-up" style={{ animationDelay: "400ms" }}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="dogs">Dogs</TabsTrigger>
            <TabsTrigger value="shelters">Shelters</TabsTrigger>
            <TabsTrigger value="rescues">Rescues</TabsTrigger>
          </TabsList>

          <TabsContent value="dogs">
            <DogsTab dogs={dogs} isLoading={isLoadingDogs} /> {/* Pass fetched dogs */}
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