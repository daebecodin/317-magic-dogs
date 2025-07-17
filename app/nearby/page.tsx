"use client"
import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Phone, Mail, Heart, Users, AlertTriangle, Filter } from "lucide-react"
import { mockOrganizations, mockDogs } from "@/lib/mock-data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { DogCardSkeleton, OrgCardSkeleton } from "@/components/skeletons/card-skeletons"
import type { Dog, Shelter, Rescue } from "@/lib/types"

const ShelterCard = ({ shelter }: { shelter: Shelter }) => (
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
      <p className="text-muted-foreground mb-4 h-12 overflow-hidden">{shelter.description}</p>
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

const RescueCard = ({ rescue }: { rescue: Rescue }) => (
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
      <p className="text-muted-foreground mb-4 h-12 overflow-hidden">{rescue.description}</p>
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

const DogCard = ({ dog }: { dog: Dog }) => (
  <Card className="hover:shadow-lg transition-shadow overflow-hidden h-full flex flex-col">
    <div className="aspect-w-1 aspect-h-1 w-full bg-muted relative">
      <Image src={dog.image} alt={dog.name} layout="fill" objectFit="cover" className="rounded-t-lg" />
      {dog.urgent && (
        <Badge variant="destructive" className="absolute top-3 right-3 flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" />
          Urgent
        </Badge>
      )}
    </div>
    <CardContent className="p-4 flex flex-col flex-grow">
      <div className="flex justify-between items-start">
        <div>
          <CardTitle className="text-xl mb-1">{dog.name}</CardTitle>
          <CardDescription>
            {dog.breed} • {dog.age}
          </CardDescription>
        </div>
        <Badge variant="outline">{dog.gender}</Badge>
      </div>
      <p className="text-muted-foreground text-sm mt-2 h-10 overflow-hidden flex-grow">{dog.description}</p>
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

export default function NearbyPage() {
  const [location, setLocation] = useState("San Francisco, CA")
  const [isLoading, setIsLoading] = useState(true)
  const [breedFilter, setBreedFilter] = useState("all")
  const [genderFilter, setGenderFilter] = useState("all")
  const [urgentOnly, setUrgentOnly] = useState(false)

  const breeds = useMemo(() => ["all", ...Array.from(new Set(mockDogs.map((dog) => dog.breed)))], [])
  const genders = ["all", "Male", "Female"]

  const filteredDogs = useMemo(
    () =>
      mockDogs.filter((dog) => {
        const breedMatch = breedFilter === "all" || dog.breed === breedFilter
        const genderMatch = genderFilter === "all" || dog.gender === genderFilter
        const urgentMatch = !urgentOnly || dog.urgent
        return breedMatch && genderMatch && urgentMatch
      }),
    [breedFilter, genderFilter, urgentOnly],
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          () => setLocation("San Francisco, CA"),
          () => setLocation("San Francisco, CA"),
        )
      }
      setIsLoading(false)
    }, 1500) // Increased delay to show skeletons
    return () => clearTimeout(timer)
  }, [])

  const renderSkeletons = (count: number, type: "dog" | "org") =>
    Array(count)
      .fill(0)
      .map((_, index) => (
        <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
          {type === "dog" ? <DogCardSkeleton /> : <OrgCardSkeleton />}
        </div>
      ))

  return (
    <div className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
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

        <div className="bg-muted/50 rounded-2xl p-8 mb-12 text-center">
          <div className="w-full h-64 bg-muted rounded-xl flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Interactive map coming soon</p>
              <p className="text-sm text-muted-foreground">Showing organizations within 25 miles of {location}</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="dogs" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="dogs">Dogs</TabsTrigger>
            <TabsTrigger value="shelters">Shelters</TabsTrigger>
            <TabsTrigger value="rescues">Rescues</TabsTrigger>
          </TabsList>

          <TabsContent value="dogs">
            <Card className="mb-8 p-4">
              <div className="flex flex-wrap items-center gap-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </h3>
                <div className="grid gap-2">
                  <Label htmlFor="breed-filter">Breed</Label>
                  <Select value={breedFilter} onValueChange={setBreedFilter}>
                    <SelectTrigger id="breed-filter" className="w-[180px]">
                      <SelectValue placeholder="Select Breed" />
                    </SelectTrigger>
                    <SelectContent>
                      {breeds.map((breed) => (
                        <SelectItem key={breed} value={breed}>
                          {breed === "all" ? "All Breeds" : breed}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="gender-filter">Gender</Label>
                  <Select value={genderFilter} onValueChange={setGenderFilter}>
                    <SelectTrigger id="gender-filter" className="w-[120px]">
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      {genders.map((gender) => (
                        <SelectItem key={gender} value={gender}>
                          {gender === "all" ? "All Genders" : gender}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2 pt-5">
                  <Switch id="urgent-only" checked={urgentOnly} onCheckedChange={setUrgentOnly} />
                  <Label htmlFor="urgent-only">Urgent Only</Label>
                </div>
              </div>
            </Card>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading
                ? renderSkeletons(6, "dog")
                : filteredDogs.map((dog, index) => (
                    <div key={dog.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                      <DogCard dog={dog} />
                    </div>
                  ))}
              {!isLoading && filteredDogs.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <h3 className="text-xl font-semibold">No dogs match your criteria</h3>
                  <p className="text-muted-foreground mt-2">Try adjusting your filters to find more furry friends.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="shelters">
            <div className="grid lg:grid-cols-2 gap-6">
              {isLoading
                ? renderSkeletons(4, "org")
                : mockOrganizations.shelters.map((shelter, index) => (
                    <div key={shelter.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                      <ShelterCard shelter={shelter} />
                    </div>
                  ))}
            </div>
          </TabsContent>

          <TabsContent value="rescues">
            <div className="grid lg:grid-cols-2 gap-6">
              {isLoading
                ? renderSkeletons(4, "org")
                : mockOrganizations.rescues.map((rescue, index) => (
                    <div key={rescue.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                      <RescueCard rescue={rescue} />
                    </div>
                  ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}