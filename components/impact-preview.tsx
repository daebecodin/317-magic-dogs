import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowRight, MapPin } from "lucide-react"

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
      story: "Senior dog found a quiet home perfect for his golden years.",
      location: "Arizona → Colorado",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Success Stories
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Every Dog Has a Story</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Meet some of the amazing dogs who found their second chance through SafeDawgs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {stories.map((story, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src={story.image || "/placeholder.svg"} alt={story.name} />
                  <AvatarFallback className="text-2xl">🐕</AvatarFallback>
                </Avatar>
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
          ))}
        </div>

        <div className="text-center">
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
