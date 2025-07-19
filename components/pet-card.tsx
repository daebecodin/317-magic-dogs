"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, AlertTriangle, PawPrint } from "lucide-react" // Changed Heart to PawPrint for generic pet icon
import type { Pet } from "@/lib/types" // Updated import
import { GradientText } from "@/components/animations/gradient-text"
import PixelTransition from "@/components/animations/pixel-transition"
import { useRouter } from "next/navigation"

export function PetCard({ pet }: { pet: Pet }) { // Renamed prop from dog to pet
  const router = useRouter();
  // Determine image source, prioritizing medium, then small, then fallback
  const imageUrl = pet.photos[0]?.medium || pet.photos[0]?.small || "/placeholder.svg";

  // Function to prefetch the pet's profile page data
  const handleMouseEnter = () => {
    router.prefetch(`/pets/${pet.id}`); // Updated path
  };

  return (
    <GradientText showBorder={true} className="h-full" animationSpeed={5}>
      <Card
        className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full flex flex-col border-none"
        onMouseEnter={handleMouseEnter}
      >
        <PixelTransition
          firstContent={
            <div className="relative w-full h-full">
              <Image
                src={imageUrl}
                alt={pet.name}
                fill
                className="object-cover rounded-t-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onError={(e) => { e.currentTarget.src = "/placeholder.svg"; }}
              />
              {pet.urgent && (
                <Badge variant="destructive" className="absolute top-3 right-3 z-10 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  Urgent
                </Badge>
              )}
              <div className="absolute inset-0 bg-blue-500 opacity-10 mix-blend-multiply rounded-t-lg"></div>
              <div className="absolute inset-0 border-4 border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg"></div>
            </div>
          }
          secondContent={
            <div className="w-full h-full flex flex-col items-center justify-center bg-primary text-primary-foreground p-4 text-center">
              <h3 className="text-2xl font-bold">{pet.name}</h3>
              <p className="text-lg">{pet.age} • {pet.gender}</p>
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
              <CardTitle className="text-xl mb-1">{pet.name}</CardTitle>
              <CardDescription>
                {pet.breed} • {pet.age}
              </CardDescription>
            </div>
            <Badge variant="outline">{pet.type}</Badge> {/* Display pet type */}
          </div>
          <p className="text-muted-foreground text-sm mt-2 h-10 overflow-hidden flex-grow">{pet.description}</p>
          <div className="flex items-center gap-1 mt-3 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>
              {pet.shelter} • {pet.distance}
            </span>
          </div>
          <Button size="sm" className="w-full mt-4" asChild>
            <Link href={`/pets/${pet.id}`}>View Profile</Link> {/* Updated link */}
          </Button>
        </CardContent>
      </Card>
    </GradientText>
  )
}