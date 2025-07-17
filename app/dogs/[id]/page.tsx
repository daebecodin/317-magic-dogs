import { mockDogs } from "@/lib/mock-data"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { MapPin, AlertTriangle, Heart, Calendar } from "lucide-react"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"

interface DogProfilePageProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function DogProfilePage({ params, searchParams }: DogProfilePageProps) {
  const dog = mockDogs.find((d) => d.id === parseInt(params.id))

  if (!dog) {
    notFound()
  }

  return (
    <div className="py-12 md:py-24 bg-muted/20">
      <div className="container px-4 md:px-6 max-w-4xl mx-auto">
        <Card className="overflow-hidden animate-fade-in-up">
          <div className="grid md:grid-cols-2">
            <div className="relative aspect-square bg-gradient-to-br from-blue-50 to-green-50">
              <Image src={dog.image} alt={dog.name} fill className="object-cover" />
            </div>
            <div className="p-6 md:p-8 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">{dog.name}</h1>
                  <p className="text-lg text-muted-foreground">{dog.breed}</p>
                </div>
                {dog.urgent && (
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    Urgent
                  </Badge>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Age</Badge>
                  <span>{dog.age}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Gender</Badge>
                  <span>{dog.gender}</span>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">{dog.description}</p>
              <div className="space-y-3 text-sm border-t pt-6">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{dog.shelter}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>{dog.distance} away</span>
                </div>
              </div>
              <Button className="w-full mt-6">Request to Match</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}