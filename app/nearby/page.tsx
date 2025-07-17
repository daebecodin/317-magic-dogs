"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Phone, Mail, Heart, Users, AlertTriangle } from "lucide-react"

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

const mockDogs = [
  {
    id: 1,
    name: "Buddy",
    breed: "Golden Retriever",
    age: "2 years",
    gender: "Male",
    shelter: "Bay Area Animal Shelter",
    distance: "2.3 miles",
    image: "https://placedog.net/500/500?id=1",
    urgent: true,
    description: "A friendly and energetic boy who loves to play fetch and swim.",
  },
  {
    id: 2,
    name: "Luna",
    breed: "German Shepherd Mix",
    age: "1 year",
    gender: "Female",
    shelter: "Golden Gate Humane Society",
    distance: "8.7 miles",
    image: "https://placedog.net/500/500?id=2",
    urgent: false,
    description: "A smart and loyal companion, great with kids and other dogs.",
  },
  {
    id: 3,
    name: "Max",
    breed: "Beagle",
    age: "4 years",
    gender: "Male",
    shelter: "Peninsula Pet Rescue",
    distance: "12.1 miles",
    image: "https://placedog.net/500/500?id=3",
    urgent: false,
    description: "A curious and happy-go-lucky dog who loves to follow his nose.",
  },
  {
    id: 4,
    name: "Daisy",
    breed: "Pit Bull Mix",
    age: "3 years",
    gender: "Female",
    shelter: "Bay Area Animal Shelter",
    distance: "2.3 miles",
    image: "https://placedog.net/500/500?id=4",
    urgent: true,
    description: "A sweet and affectionate girl who just wants to cuddle on the couch.",
  },
  {
    id: 5,
    name: "Rocky",
    breed: "Labrador Mix",
    age: "5 years",
    gender: "Male",
    shelter: "Loving Paws Sanctuary",
    distance: "15.2 miles",
    image: "https://placedog.net/500/500?id=5",
    urgent: false,
    description: "A gentle giant who is calm, well-behaved, and loves long walks.",
  },
  {
    id: 6,
    name: "Sadie",
    breed: "Australian Shepherd",
    age: "1.5 years",
    gender: "Female",
    shelter: "Golden Gate Humane Society",
    distance: "8.7 miles",
    image: "https://placedog.net/500/500?id=6",
    urgent: false,
    description: "A highly intelligent and active dog, perfect for an adventurous family.",
  },
]

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

  const DogCard = ({ dog }: { dog: any }) => (
    <Card className="hover:shadow-lg transition-shadow overflow-hidden">
      <div className="aspect-w-1 aspect-h-1 w-full bg-muted">
        <Image src={dog.image} alt={dog.name} layout="fill" objectFit="cover" className="rounded-t-lg" />
        {dog.urgent && (
          <Badge variant="destructive" className="absolute top-3 right-3 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            Urgent
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl mb-1">{dog.name}</CardTitle>
            <CardDescription>
              {dog.breed} • {dog.age}
            </CardDescription>
          </div>
          <Badge variant="outline">{dog.gender}</Badge>
        </div>
        <p className="text-muted-foreground text-sm mt-2 h-10 overflow-hidden">{dog.description}</p>
        <div className="flex items-center gap-1 mt-3 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>
            {dog.shelter} • {dog.distance}
          </span>
        </div>
        <Button size="sm" className="w-full mt-4">
          View Profile
        </Button>
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
        <Tabs defaultValue="dogs" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="dogs">Dogs ({mockDogs.length})</TabsTrigger>
            <TabsTrigger value="shelters">Shelters ({mockOrganizations.shelters.length})</TabsTrigger>
            <TabsTrigger value="rescues">Rescues ({mockOrganizations.rescues.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="dogs">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {mockDogs.map((dog) => (
                <DogCard key={dog.id} dog={dog} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shelters">
            <div className="grid lg:grid-cols-2 gap-6 animate-fade-in">
              {mockOrganizations.shelters.map((shelter) => (
                <ShelterCard key={shelter.id} shelter={shelter} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rescues">
            <div className="grid lg:grid-cols-2 gap-6 animate-fade-in">
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