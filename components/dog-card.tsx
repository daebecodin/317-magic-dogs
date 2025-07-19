"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, AlertTriangle } from "lucide-react"
import type { Dog } from "@/lib/types"
import { GradientText } from "@/components/animations/gradient-text"
import PixelTransition from "@/components/animations/pixel-transition" // Import PixelTransition
import { useRouter } from "next/navigation" // Import useRouter for prefetching

export function DogCard({ dog }: { dog: Dog }) {
  const router = useRouter();
  // Determine image source, prioritizing medium, then small, then fallback
  const imageUrl = dog.photos[0]?.medium || dog.photos[0]?.small || "/placeholder.svg";

  // Function to prefetch the dog's profile page data
  const handleMouseEnter = () => {
    router.prefetch(`/dogs/${dog.id}`);
  };

  return (
    <GradientText showBorder={true} className="h-full" animationSpeed={5}>
      <Card
        className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full flex flex-col border-none"
        onMouseEnter={handleMouseEnter} // Add onMouseEnter for prefetching
      >
        <PixelTransition
          firstContent={
            <div className="relative w-full h-full">
              <Image
                src={imageUrl}
                alt={dog.name}
                fill
                className="object-cover rounded-t-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onError={(e) => { e.currentTarget.src = "/placeholder.svg"; }}
              />
              {dog.urgent && (
                <Badge variant="destructive" className="absolute top-3 right-3 z-10 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  Urgent
                </Badge>
              )}
              <div className="absolute inset-0 bg-blue-500 opacity-10 mix-blend-multiply rounded-t-lg"></div> {/* Blue hue */}
              <div className="absolute inset-0 border-4 border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg"></div> {/* Blue border on hover */}
            </div>
          }
          secondContent={
            <div className="w-full h-full flex flex-col items-center justify-center bg-primary text-primary-foreground p-4 text-center">
              <h3 className="text-2xl font-bold">{dog.name}</h3>
              <p className="text-lg">{dog.age} • {dog.gender}</p>
            </div>
          }
          gridSize={8}
          pixelColor='hsl(var(--primary))'
          animationStepDuration={0.4}
          className="relative w-full h-72 bg-gradient-to-br from-blue-50 to-green-50 rounded-t-lg"
        />

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
          <Button size="sm" className="w-full mt-4" asChild>
            <Link href={`/dogs/${dog.id}`}>View Profile</Link>
          </Button>
        </CardContent>
      </Card>
    </GradientText>
  )
}