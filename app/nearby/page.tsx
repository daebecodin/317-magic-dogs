"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Phone, Mail, Heart, Users } from "lucide-react"

// Mock data for demonstration
const mockOrganizations = {
  shelters: [
    {
      id: 1,
      name: "Bay Area Animal Shelter",
      location: "San Francisco, CA",
      distance: "2.3 miles",
      dogsCount: 45,
      urgentCount: 8,
      phone: "(415) 555-0123",
      email: "contact@bayareashelter.org",
      description: "Municipal shelter serving the greater Bay Area with a focus on finding homes for all animals.",
    },
    {
      id: 2,
      name: "Golden Gate Humane Society",
      location: "Oakland, CA",
      distance: "8.7 miles",
      dogsCount: 32,
      urgentCount: 5,
      phone: "(510) 555-0456",
      email: "help@gghumane.org",
      description: "Non-profit organization dedicated to animal welfare and community education.",
    },
    {
      id: 3,
      name: "Peninsula Pet Rescue",
      location: "Palo Alto, CA",
      distance: "12.1 miles",
      dogsCount: 28,
      urgentCount: 3,
      phone: "(650) 555-0789",
      email: "info@peninsulapets.org",
      description: "Volunteer-run rescue focusing on senior and special needs animals.",
    },
  ],
  rescues: [
    {
      id: 1,
      name: "Second Chance Dog Rescue",
      location: "Berkeley, CA",
      distance: "6.4 miles",
      capacity: 15,
      available: 3,
      phone: "(510) 555-0321",
      email: "adopt@secondchancedog.org",
      description: "Specializing in rehabilitating dogs with behavioral challenges and finding them loving homes.",
    },
    {
      id: 2,
      name: "Loving Paws Sanctuary",
      location: "San Mateo, CA",
      distance: "15.2 miles",
      capacity: 25,
      available: 7,
      phone: "(650) 555-0654",
      email: "contact@lovingpaws.org",
      description: "Foster-based rescue with a network of dedicated volunteers throughout the Bay Area.",
    },
    {
      id: 3,
      name: "Golden Retriever Rescue",
      location: "San Jose, CA",
      distance: "18.9 miles",
      capacity: 20,
      available: 2,
      phone: "(408) 555-0987",
      email: "info@goldenrescue.org",
      description: "Breed-specific rescue dedicated to Golden Retrievers and Golden mixes.",
    },
  ],
}

export default function NearbyPage() {
  const [location, setLocation] = useState("San Francisco, CA")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate geolocation
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // In a real app, you'd reverse geocode these coordinates
            setLocation("San Francisco, CA")
            setIsLoading(false)
          },
          (error) => {
            // Default to San Francisco if geolocation fails
            setLocation("San Francisco, CA")
            setIsLoading(false)
          },
        )
      } else {
        setLocation("San Francisco, CA")
        setIsLoading(false)
      }
    }

    getLocation()
  }, [])

  const ShelterCard = ({ shelter }: { shelter: any }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{shelter.name}</CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <MapPin className="w-4 h-4" />
              {shelter.location} • {shelter.distance}
            </CardDescription>
          </div>
          {shelter.urgentCount > 0 && <Badge variant="destructive">{shelter.urgentCount} Urgent</Badge>}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{shelter.description}</p>

        <div className="flex items-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4 text-red-500" />
            <span>{shelter.dogsCount} dogs</span>
          </div>
          <div className="flex items-center gap-1">
            <Phone className="w-4 h-4" />
            <span>{shelter.phone}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button size="sm" className="flex-1">
            Connect
          </Button>
          <Button size="sm" variant="outline">
            <Mail className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const RescueCard = ({ rescue }: { rescue: any }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{rescue.name}</CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <MapPin className="w-4 h-4" />
              {rescue.location} • {rescue.distance}
            </CardDescription>
          </div>
          {rescue.available > 0 && <Badge variant="secondary">{rescue.available} Available</Badge>}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{rescue.description}</p>

        <div className="flex items-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-blue-500" />
            <span>
              {rescue.available}/{rescue.capacity} capacity
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Phone className="w-4 h-4" />
            <span>{rescue.phone}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button size="sm" className="flex-1">
            Connect
          </Button>
          <Button size="sm" variant="outline">
            <Mail className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  if (isLoading) {
    return (
      <div className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Finding organizations near you...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16">
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

        {/* Map Placeholder */}
        <div className="bg-muted/50 rounded-2xl p-8 mb-12 text-center">
          <div className="w-full h-64 bg-muted rounded-xl flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Interactive map coming soon</p>
              <p className="text-sm text-muted-foreground">Showing organizations within 25 miles of {location}</p>
            </div>
          </div>
        </div>

        {/* Organizations */}
        <Tabs defaultValue="shelters" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="shelters">Shelters ({mockOrganizations.shelters.length})</TabsTrigger>
            <TabsTrigger value="rescues">Rescues ({mockOrganizations.rescues.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="shelters">
            <div className="grid lg:grid-cols-2 gap-6">
              {mockOrganizations.shelters.map((shelter) => (
                <ShelterCard key={shelter.id} shelter={shelter} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rescues">
            <div className="grid lg:grid-cols-2 gap-6">
              {mockOrganizations.rescues.map((rescue) => (
                <RescueCard key={rescue.id} rescue={rescue} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Don't see your organization?</CardTitle>
              <CardDescription>Join SafeDawgs to connect with more rescue partners in your area.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button>Join as a Shelter</Button>
                <Button variant="outline">Join as a Rescue</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
