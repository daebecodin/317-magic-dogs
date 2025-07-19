"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, AlertTriangle } from "lucide-react"
import type { Dog } from "@/lib/types"
import { GradientText } from "@/components/animations/gradient-text"

export function DogCard({ dog }: { dog: Dog }) {
  // Determine image source, prioritizing medium, then small, then fallback
  const imageUrl = dog.photos[0]?.medium || dog.photos[0]?.small || "/placeholder.svg";

  return (
    <GradientText showBorder={true} className="h-full" animationSpeed={5}>
      <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full flex flex-col border-none">
        <div className="aspect-square w-full bg-gradient-to-br from-blue-50 to-green-50 relative">
          <Image
            src={imageUrl}
            alt={dog.name}
            fill
            className="object-cover rounded-t-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg"; // Fallback image on error
            }}
          />
          {dog.urgent && (
            <Badge variant="destructive" className="absolute top-3 right-3 z-10 flex items-center gap-1">
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
          <Button size="sm" className="w-full mt-4" asChild>
            <Link href={`/dogs/${dog.id}`}>View Profile</Link>
          </Button>
        </CardContent>
      </Card>
    </GradientText>
  )
}