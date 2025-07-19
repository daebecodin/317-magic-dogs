"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Users, MapPin, AlertTriangle, CheckCircle, Clock, Plus, Settings, PawPrint }
  from "lucide-react" // Added PawPrint
import { GradientText } from "@/components/animations/gradient-text"

// Mock user data - in a real app this would come from authentication
const mockUser = {
  type: "rescue", // or 'shelter'
  name: "Second Chance Dog Rescue", // Keep specific for mock
  location: "Berkeley, CA",
  verified: true,
}

export default function DashboardPage() {
  const [userType] = useState<"rescue" | "shelter">(mockUser.type as "rescue" | "shelter")

  // Mock data for rescue dashboard
  const rescueData = {
    stats: {
      totalCapacity: 25,
      currentPets: 18, // Changed from currentDogs
      availableSpaces: 7,
      pendingMatches: 3,
    },
    recentMatches: [
      {
        id: 1,
        petName: "Buddy", // Changed from dogName
        shelter: "Bay Area Animal Shelter",
        status: "pending",
        date: "2 hours ago",
        urgent: true,
      },
      {
        id: 2,
        petName: "Luna", // Changed from dogName
        shelter: "Golden Gate Humane Society",
        status: "accepted",
        date: "1 day ago",
        urgent: false,
      },
      {
        id: 3,
        petName: "Max", // Changed from dogName
        shelter: "Peninsula Pet Rescue",
        status: "completed",
        date: "3 days ago",
        urgent: false,
      },
    ],
    currentPets: [
      {
        id: 1,
        name: "Charlie",
        status: "In Foster",
        daysInCare: 45,
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: 2,
        name: "Bella",
        status: "Available for Adoption",
        daysInCare: 23,
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: 3,
        name: "Rocky",
        status: "Medical Care",
        daysInCare: 12,
        image: "/placeholder.svg?height=60&width=60",
      },
    ],
  }

  // Mock data for shelter dashboard
  const shelterData = {
    stats: {
      totalPets: 45, // Changed from totalDogs
      urgentPets: 8, // Changed from urgentDogs
      matchedThisWeek: 12,
      pendingMatches: 5,
    },
    urgentPets: [
      {
        id: 1,
        name: "Rex",
        breed: "German Shepherd Mix",
        daysLeft: 2,
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: 2,
        name: "Daisy",
        breed: "Pit Bull Mix",
        daysLeft: 1,
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: 3,
        name: "Oscar",
        breed: "Labrador Mix",
        daysLeft: 3,
        image: "/placeholder.svg?height=60&width=60",
      },
    ],
    recentMatches: [
      {
        id: 1,
        petName: "Buddy", // Changed from dogName
        rescue: "Second Chance Dog Rescue",
        status: "accepted",
        date: "2 hours ago",
      },
      {
        id: 2,
        petName: "Luna", // Changed from dogName
        rescue: "Loving Paws Sanctuary",
        status: "pending",
        date: "1 day ago",
      },
    ],
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const RescueDashboard = () => (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          <GradientText showBorder={true} className="h-full" animationSpeed={5}>
            <Card className="border-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{rescueData.stats.totalCapacity}</div>
              </CardContent>
            </Card>
          </GradientText>
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          <GradientText showBorder={true} className="h-full" animationSpeed={5}>
            <Card className="border-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Pets</CardTitle>
                <PawPrint className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{rescueData.stats.currentPets}</div>
              </CardContent>
            </Card>
          </GradientText>
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          <GradientText showBorder={true} className="h-full" animationSpeed={5}>
            <Card className="border-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Available Spaces</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{rescueData.stats.availableSpaces}</div>
              </CardContent>
            </Card>
          </GradientText>
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: "400ms" }}>
          <GradientText showBorder={true} className="h-full" animationSpeed={5}>
            <Card className="border-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Matches</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{rescueData.stats.pendingMatches}</div>
              </CardContent>
            </Card>
          </GradientText>
        </div>
      </div>

      {/* Recent Matches */}
      <GradientText showBorder={true} className="h-full" animationSpeed={5}>
        <Card className="animate-fade-in-up border-none" style={{ animationDelay: "500ms" }}>
          <CardHeader>
            <CardTitle>Recent Match Requests</CardTitle>
            <CardDescription>Pets that have been matched with your rescue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {rescueData.recentMatches.map((match, index) => (
                <div
                  key={match.id}
                  className="flex items-center justify-between p-4 border rounded-lg animate-fade-in-up"
                  style={{ animationDelay: `${500 + (index + 1) * 100}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>🐾</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{match.petName}</h4>
                        {match.urgent && (
                          <Badge variant="destructive" className="text-xs">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Urgent
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        From {match.shelter} • {match.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(match.status)}>{match.status}</Badge>
                    {match.status === "pending" && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Decline
                        </Button>
                        <Button size="sm">Accept</Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </GradientText>

      {/* Current Pets */}
      <GradientText showBorder={true} className="h-full" animationSpeed={5}>
        <Card className="animate-fade-in-up border-none" style={{ animationDelay: "600ms" }}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Current Pets in Care</CardTitle>
                <CardDescription>Pets currently in your rescue program</CardDescription>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Pet
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rescueData.currentPets.map((pet, index) => (
                <div
                  key={pet.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${600 + (index + 1) * 100}ms` }}
                >
                  <GradientText showBorder={true} className="h-full" animationSpeed={5}>
                    <Card className="border-none">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 bg-gradient-to-br from-blue-50 to-green-50 rounded-full">
                            <Avatar className="w-full h-full">
                              <AvatarImage src={pet.image || "/placeholder.svg"} alt={pet.name} />
                              <AvatarFallback>🐾</AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">{pet.name}</h4>
                            <p className="text-sm text-muted-foreground">{pet.status}</p>
                            <p className="text-xs text-muted-foreground">{pet.daysInCare} days in care</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </GradientText>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </GradientText>
    </div>
  )

  const ShelterDashboard = () => (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          <GradientText showBorder={true} className="h-full" animationSpeed={5}>
            <Card className="border-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Pets</CardTitle>
                <PawPrint className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{shelterData.stats.totalPets}</div>
              </CardContent>
            </Card>
          </GradientText>
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          <GradientText showBorder={true} className="h-full" animationSpeed={5}>
            <Card className="border-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Urgent Pets</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{shelterData.stats.urgentPets}</div>
              </CardContent>
            </Card>
          </GradientText>
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          <GradientText showBorder={true} className="h-full" animationSpeed={5}>
            <Card className="border-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Matched This Week</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{shelterData.stats.matchedThisWeek}</div>
              </CardContent>
            </Card>
          </GradientText>
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: "400ms" }}>
          <GradientText showBorder={true} className="h-full" animationSpeed={5}>
            <Card className="border-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Matches</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{shelterData.stats.pendingMatches}</div>
              </CardContent>
            </Card>
          </GradientText>
        </div>
      </div>

      {/* Urgent Pets */}
      <GradientText showBorder={true} className="h-full" animationSpeed={5}>
        <Card className="animate-fade-in-up border-none" style={{ animationDelay: "500ms" }}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  Urgent Pets
                </CardTitle>
                <CardDescription>Pets that need immediate placement</CardDescription>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Pet
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {shelterData.urgentPets.map((pet, index) => (
                <div
                  key={pet.id}
                  className="flex items-center justify-between p-4 border rounded-lg border-red-200 bg-red-50 animate-fade-in-up"
                  style={{ animationDelay: `${500 + (index + 1) * 100}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 bg-gradient-to-br from-red-100 to-yellow-100 rounded-full">
                      <Avatar className="w-full h-full">
                        <AvatarImage src={pet.image || "/placeholder.svg"} alt={pet.name} />
                        <AvatarFallback>🐾</AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <h4 className="font-semibold">{pet.name}</h4>
                      <p className="text-sm text-muted-foreground">{pet.breed}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="destructive">
                      {pet.daysLeft} day{pet.daysLeft !== 1 ? "s" : ""} left
                    </Badge>
                    <Button size="sm">Find Rescue</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </GradientText>

      {/* Recent Matches */}
      <GradientText showBorder={true} className="h-full" animationSpeed={5}>
        <Card className="animate-fade-in-up border-none" style={{ animationDelay: "600ms" }}>
          <CardHeader>
            <CardTitle>Recent Match Responses</CardTitle>
            <CardDescription>Rescue organizations responding to your pets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {shelterData.recentMatches.map((match, index) => (
                <div
                  key={match.id}
                  className="flex items-center justify-between p-4 border rounded-lg animate-fade-in-up"
                  style={{ animationDelay: `${600 + (index + 1) * 100}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>🐾</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{match.petName}</h4>
                      <p className="text-sm text-muted-foreground">
                        {match.rescue} • {match.date}
                      </p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(match.status)}>{match.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </GradientText>
    </div>
  )

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in-up">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{mockUser.name}</h1>
              {mockUser.verified && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Verified
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{mockUser.location}</span>
            </div>
          </div>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>

        {/* Dashboard Content */}
        {userType === "rescue" ? <RescueDashboard /> : <ShelterDashboard />}
      </div>
    </div>
  )
}