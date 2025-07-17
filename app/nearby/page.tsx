"use client"
import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Loader } from "lucide-react"
import { mockOrganizations, mockDogs } from "@/lib/mock-data"
import { DogsTab } from "./dogs-tab"
import { SheltersTab } from "./shelters-tab"
import { RescuesTab } from "./rescues-tab"

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

  useEffect(() => {
    const timer = setTimeout(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          () => setLocation("San Francisco, CA"),
          () => setLocation("San Francisco, CA"),
        )
      }
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="py-12 md:py-24">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
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
            Change Location
          </Button>
        </div>

        <div className="bg-muted/50 rounded-2xl p-4 md:p-8 mb-12 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          <div className="w-full h-64 md:h-96 bg-muted rounded-xl shadow-inner">
            <InteractiveMap shelters={mockOrganizations.shelters} rescues={mockOrganizations.rescues} />
          </div>
        </div>

        <Tabs defaultValue="dogs" className="max-w-6xl mx-auto animate-fade-in-up" style={{ animationDelay: "400ms" }}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="dogs">Dogs</TabsTrigger>
            <TabsTrigger value="shelters">Shelters</TabsTrigger>
            <TabsTrigger value="rescues">Rescues</TabsTrigger>
          </TabsList>

          <TabsContent value="dogs">
            <DogsTab dogs={mockDogs} isLoading={isLoading} />
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