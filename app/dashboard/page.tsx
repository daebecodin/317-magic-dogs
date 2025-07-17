"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Users, MapPin, AlertTriangle, CheckCircle, Clock, Plus, Settings } from "lucide-react"

// Mock user data - in a real app this would come from authentication
const mockUser = {
  type: "rescue", // or 'shelter'
  name: "Second Chance Dog Rescue",
  location: "Berkeley, CA",
  verified: true,
}

export default function DashboardPage() {
  const [userType] = useState<"rescue" | "shelter">(mockUser.type as "rescue" | "shelter")

  // Mock data for rescue dashboard
  const rescueData = {
    stats: {
      totalCapacity: 25,
      currentDogs: 18,
      availableSpaces: 7,
      pendingMatches: 3,
    },
    recentMatches: [
      {
        id: 1,
        dogName: "Buddy",
        shelter: "Bay Area Animal Shelter",
        status: "pending",
        date: "2 hours ago",
        urgent: true,
      },
      {
        id: 2,
        dogName: "Luna",
        shelter: "Golden Gate Humane Society",
        status: "accepted",
        date: "1 day ago",
        urgent: false,
      },
      {
        id: 3,
        dogName: "Max",
        shelter: "Peninsula Pet Rescue",
        status: "completed",
        date: "3 days ago",
        urgent: false,
      },
    ],
    currentDogs: [
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
      totalDogs: 45,
      urgentDogs: 8,
      matchedThisWeek: 12,
      pendingMatches: 5,
    },
    urgentDogs: [
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
        dogName: "Buddy",
        rescue: "Second Chance Dog Rescue",
        status: "accepted",
        date: "2 hours ago",
      },
      {
        id: 2,
        dogName: "Luna",
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
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{rescueData.stats.totalCapacity}</div>
            </CardContent>
          </Card>
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Dogs</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{rescueData.stats.currentDogs}</div>
            </CardContent>
          </Card>
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Spaces</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{rescueData.stats.availableSpaces}</div>
            </CardContent>
          </Card>
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: "400ms" }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Matches</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{rescueData.stats.pendingMatches}</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Matches */}
      <Card className="animate-fade-in-up" style={{ animationDelay: "500ms" }}>
        <CardHeader>
          <CardTitle>Recent Match Requests</CardTitle>
          <CardDescription>Dogs that have been matched with your rescue</CardDescription>
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
                    <AvatarFallback>🐕</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{match.dogName}</h4>
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

      {/* Current Dogs */}
      <Card className="animate-fade-in-up" style={{ animationDelay: "600ms" }}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Current Dogs in Care</CardTitle>
              <CardDescription>Dogs currently in your rescue program</CardDescription>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Dog
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rescueData.currentDogs.map((dog, index) => (
              <div
                key={dog.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${600 + (index + 1) * 100}ms` }}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 bg-gradient-to-br from-blue-50 to-green-50 rounded-full">
                        <Avatar className="w-full h-full">
                          <AvatarImage src={dog.image || "/placeholder.svg"} alt={dog.name} />
                          <AvatarFallback>🐕</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{dog.name}</h4>
                        <p className="text-sm text-muted-foreground">{dog.status}</p>
                        <p className="text-xs text-muted-foreground">{dog.daysInCare} days in care</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const ShelterDashboard = () => (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Dogs</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{shelterData.stats.totalDogs}</div>
            </CardContent>
          </Card>
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Urgent Dogs</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{shelterData.stats.urgentDogs}</div>
            </CardContent>
          </Card>
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Matched This Week</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{shelterData.stats.matchedThisWeek}</div>
            </CardContent>
          </Card>
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: "400ms" }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Matches</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{shelterData.stats.pendingMatches}</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Urgent Dogs */}
      <Card className="animate-fade-in-up" style={{ animationDelay: "500ms" }}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                Urgent Dogs
              </CardTitle>
              <CardDescription>Dogs that need immediate placement</CardDescription>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Dog
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {shelterData.urgentDogs.map((dog, index) => (
              <div
                key={dog.id}
                className="flex items-center justify-between p-4 border rounded-lg border-red-200 bg-red-50 animate-fade-in-up"
                style={{ animationDelay: `${500 + (index + 1) * 100}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 bg-gradient-to-br from-red-100 to-yellow-100 rounded-full">
                    <Avatar className="w-full h-full">
                      <AvatarImage src={dog.image || "/placeholder.svg"} alt={dog.name} />
                      <AvatarFallback>🐕</AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <h4 className="font-semibold">{dog.name}</h4>
                    <p className="text-sm text-muted-foreground">{dog.breed}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="destructive">
                    {dog.daysLeft} day{dog.daysLeft !== 1 ? "s" : ""} left
                  </Badge>
                  <Button size="sm">Find Rescue</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Matches */}
      <Card className="animate-fade-in-up" style={{ animationDelay: "600ms" }}>
        <CardHeader>
          <CardTitle>Recent Match Responses</CardTitle>
          <CardDescription>Rescue organizations responding to your dogs</CardDescription>
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
                    <AvatarFallback>🐕</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{match.dogName}</h4>
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
    </div>
  )

  return (
    <div className="py-8">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
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