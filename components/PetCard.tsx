"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
import { motion } from "framer-motion"
import type { PetfinderDog } from "@/lib/petfinder"
import { GradientText } from "@/components/animations/gradient-text"

interface PetCardProps {
  dog: PetfinderDog
}

export function PetCard({ dog }: PetCardProps) {
  const primaryBreed = dog.breeds.primary;
  const secondaryBreed = dog.breeds.secondary;
  const breedText = secondaryBreed && !dog.breeds.mixed ? `${primaryBreed}, ${secondaryBreed}` : primaryBreed;
  const locationText = `${dog.contact.address.city}, ${dog.contact.address.state}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
      className="h-full"
    >
      <GradientText showBorder={true} className="h-full" animationSpeed={5}>
        <Card className="overflow-hidden h-full flex flex-col border-none">
          <div className="relative aspect-square w-full bg-gradient-to-br from-blue-50 to-green-50">
            <Image
              src={dog.photos[0]?.medium || "/placeholder.svg"}
              alt={dog.name}
              fill
              className="object-cover rounded-t-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg"; // Fallback image on error
              }}
            />
          </div>
          <CardContent className="p-4 flex flex-col flex-grow">
            <CardTitle className="text-xl mb-1">{dog.name}</CardTitle>
            <CardDescription>
              {breedText} • {dog.age}
            </CardDescription>
            <p className="text-muted-foreground text-sm mt-2 h-10 overflow-hidden flex-grow">
              {dog.description ? dog.description.substring(0, 100) + "..." : "No description available."}
            </p>
            <div className="flex items-center gap-1 mt-3 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{locationText}</span>
            </div>
            <Button size="sm" className="w-full mt-4" asChild>
              <Link href={dog.url} target="_blank" rel="noopener noreferrer">
                View Profile
              </Link>
            </Button>
          </CardContent>
        </Card>
      </GradientText>
    </motion.div>
  )
}