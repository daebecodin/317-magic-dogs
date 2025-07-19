import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowRight, MapPin } from "lucide-react"
import { GradientText } from "@/components/animations/gradient-text"

export function ImpactPreview() {
  const stories = [
    {
      name: "Buddy",
      status: "Fostered",
      story: "Saved from a rural shelter and now thriving in a loving foster home.",
      location: "Texas → California",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Lucy",
      status: "Adopted",
      story: "Received medical treatment and found her forever family.",
      location: "Georgia → Florida",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Max",
      status: "Placed",
      story: "Senior pet found a quiet home perfect for his golden years.", // Updated text
      location: "Arizona → Colorado",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16 animate-fade-in-up">
          <Badge variant="secondary" className="mb-4">
            Success Stories
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Every Pet Has a Story</h2> {/* Updated text */}
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Meet some of the amazing pets who found their second chance through OnlyPets. {/* Updated text */}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {stories.map((story, index) => (
            <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
              <GradientText showBorder={true} className="h-full" animationSpeed={5}>
                <Card className="text-center hover:shadow-lg transition-shadow h-full border-none">
                  <CardHeader>
                    <div className="relative w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-50 to-green-50 rounded-full">
                      <Avatar className="w-full h-full">
                        <AvatarImage src={story.image || "/placeholder.svg"} alt={story.name} />
                        <AvatarFallback className="text-2xl">🐾</AvatarFallback> {/* Updated emoji */}
                      </Avatar>
                    </div>
                    <CardTitle className="text-xl">{story.name}</CardTitle>
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {story.location}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Badge variant={story.status === "Adopted" ? "default" : "secondary"} className="mb-4">
                      {story.status}
                    </Badge>
                    <CardDescription className="text-base">{story.story}</CardDescription>
                  </CardContent>
                </Card>
              </GradientText>
            </div>
          ))}
        </div>

        <div className="text-center animate-fade-in-up" style={{ animationDelay: "450ms" }}>
          <Button size="lg" asChild>
            <Link href="/impact">
              Read More Stories
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}