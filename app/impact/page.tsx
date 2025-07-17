import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Calendar, Heart } from "lucide-react"

export const metadata: Metadata = {
  title: "Impact Stories - SafeDawgs",
  description: "Read real stories of hope and second chances from dogs saved through our rescue matching platform.",
}

export default function ImpactPage() {
  const stories = [
    {
      name: "Buddy",
      status: "Fostered",
      story:
        "Buddy was found as a stray in a rural shelter with limited resources. Through SafeDawgs, he was matched with a rescue organization that specializes in shy dogs. Now he's in a loving foster home learning to trust humans again.",
      location: "Texas → California",
      date: "2 months ago",
      image: "/placeholder.svg?height=200&width=200",
      rescueOrg: "Second Chance Rescue",
    },
    {
      name: "Lucy",
      status: "Adopted",
      story:
        "Lucy arrived at the shelter with a severe skin condition that required expensive treatment. A rescue organization with medical resources stepped up through our platform. After months of care, Lucy found her forever family.",
      location: "Georgia → Florida",
      date: "4 months ago",
      image: "/placeholder.svg?height=200&width=200",
      rescueOrg: "Healing Paws Rescue",
    },
    {
      name: "Max",
      status: "Placed",
      story:
        'At 8 years old, Max was considered "unadoptable" by many. Our platform connected him with a senior dog specialist rescue. Max now enjoys his golden years in a quiet home with a patient, loving family.',
      location: "Arizona → Colorado",
      date: "6 months ago",
      image: "/placeholder.svg?height=200&width=200",
      rescueOrg: "Golden Years Dog Rescue",
    },
  ]

  const stats = [
    { number: "1,247", label: "Dogs Saved", icon: Heart },
    { number: "89", label: "Partner Rescues", icon: MapPin },
    { number: "156", label: "Shelter Partners", icon: Calendar },
  ]

  return (
    <div className="py-12 md:py-24">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <Badge variant="secondary" className="mb-4">
            Impact Stories
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Real Stories of Hope and Second Chances
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every dog has a story. Here are just a few of the lives that have been transformed through our rescue
            matching platform.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
              <Card className="text-center h-full">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-primary">{stat.number}</CardTitle>
                  <CardDescription className="text-lg">{stat.label}</CardDescription>
                </CardHeader>
              </Card>
            </div>
          ))}
        </div>

        {/* Success Stories */}
        <div className="mb-16 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
            <p className="text-lg text-muted-foreground">
              Meet some of the amazing dogs who found their second chance through SafeDawgs.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${300 + index * 150}ms` }}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                  <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-blue-50 to-green-50">
                    <Avatar className="w-full h-full rounded-none">
                      <AvatarImage
                        src={story.image || "/placeholder.svg"}
                        alt={story.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="rounded-none text-4xl">🐕</AvatarFallback>
                    </Avatar>
                    <Badge
                      className="absolute top-4 right-4"
                      variant={story.status === "Adopted" ? "default" : "secondary"}
                    >
                      {story.status}
                    </Badge>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-2xl">{story.name}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {story.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {story.date}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-4">{story.story}</p>
                    <div className="text-sm">
                      <span className="font-medium">Rescued by:</span> {story.rescueOrg}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div
          className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center animate-fade-in-up"
          style={{ animationDelay: "450ms" }}
        >
          <h2 className="text-3xl font-bold mb-4">Be Part of the Next Success Story</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you're a shelter with dogs in need or a rescue with space to help, join our platform and help us
            save more lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Badge variant="outline" className="text-base px-6 py-2">
              Join as a Rescue
            </Badge>
            <Badge variant="outline" className="text-base px-6 py-2">
              Join as a Shelter
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}