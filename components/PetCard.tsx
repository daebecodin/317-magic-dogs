"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, PawPrint, Stethoscope, Home, Tag } from "lucide-react" // Added icons
import { motion } from "framer-motion"
import type { Dog } from "@/lib/types" // Changed import to internal Dog type
import { GradientText } from "@/components/animations/gradient-text"
import { Badge } from "@/components/ui/badge" // Added Badge

interface PetCardProps {
  dog: Dog // Now expects our internal Dog type
}

export function PetCard({ dog }: PetCardProps) {
  const breedText = dog.breed; // Already primary breed from mapping
  const locationText = dog.shelter; // Already mapped to shelter name or city/state
  const distanceText = dog.distance;

  // Clean and truncate description
  const truncatedDescription = dog.description && dog.description.length > 100 ? dog.description.substring(0, 100) + "..." : dog.description || "No description available.";

  // Determine image source, prioritizing medium, then small, then fallback
  const imageUrl = dog.photos[0]?.medium || dog.photos[0]?.small || "/placeholder.svg";

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
              src={imageUrl}
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
              {breedText} • {dog.age} • {dog.gender} • {dog.size}
            </CardDescription>
            <p className="text-muted-foreground text-sm mt-2 h-10 overflow-hidden">
              {truncatedDescription}
            </p>

            {dog.characteristics && dog.characteristics.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                <PawPrint className="w-4 h-4 text-primary shrink-0" />
                {dog.characteristics.slice(0, 2).map((char, index) => ( // Show up to 2 characteristics
                  <Badge key={index} variant="secondary" className="text-xs">{char}</Badge>
                ))}
                {dog.characteristics.length > 2 && <span className="text-xs text-muted-foreground">+{dog.characteristics.length - 2} more</span>}
              </div>
            )}

            {dog.health && dog.health.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                <Stethoscope className="w-4 h-4 text-primary shrink-0" />
                {dog.health.slice(0, 1).map((item, index) => ( // Show up to 1 health item
                  <Badge key={index} variant="secondary" className="text-xs">{item}</Badge>
                ))}
                {dog.health.length > 1 && <span className="text-xs text-muted-foreground">+{dog.health.length - 1} more</span>}
              </div>
            )}

            {dog.goodInHomeWith && dog.goodInHomeWith.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                <Home className="w-4 h-4 text-primary shrink-0" />
                {dog.goodInHomeWith.slice(0, 1).map((item, index) => ( // Show up to 1 compatibility item
                  <Badge key={index} variant="secondary" className="text-xs">{item}</Badge>
                ))}
                {dog.goodInHomeWith.length > 1 && <span className="text-xs text-muted-foreground">+{dog.goodInHomeWith.length - 1} more</span>}
              </div>
            )}

            {dog.adoptionFee !== null && typeof dog.adoptionFee === 'number' && (
              <div className="flex items-center gap-1 mt-2 text-sm text-primary font-semibold">
                <Tag className="w-4 h-4" />
                ${dog.adoptionFee.toFixed(0)}
              </div>
            )}

            <div className="flex items-center gap-1 mt-3 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{locationText} {distanceText && `• ${distanceText}`}</span>
            </div>
            <Button size="sm" className="w-full mt-4" asChild>
              <Link href={`/dogs/${dog.id}`}>
                View Profile
              </Link>
            </Button>
          </CardContent>
        </Card>
      </GradientText>
    </motion.div>
  )
}