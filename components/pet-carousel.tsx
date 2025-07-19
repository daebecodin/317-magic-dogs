"use client"

import * as React from "react"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"
import type { Pet } from "@/lib/types" // Updated import
import { GradientText } from "@/components/animations/gradient-text"
import { PetCard } from "./pet-card" // Updated import

interface PetCarouselProps { // Renamed interface
  pets: Pet[] // Renamed prop
}

export function PetCarousel({ pets }: PetCarouselProps) { // Renamed component and prop
  return (
    <>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-5xl mx-auto"
      >
        <CarouselContent className="-ml-4">
          {pets.map((pet, index) => ( // Renamed variable
            <CarouselItem key={pet.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <PetCard pet={pet} /> {/* Updated component */}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  )
}