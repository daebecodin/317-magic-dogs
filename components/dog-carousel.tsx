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
// Removed Dialog imports as it's no longer needed for this component
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"
import type { Dog } from "@/lib/types"
import { GradientText } from "@/components/animations/gradient-text"
import { DogCard } from "./dog-card" // Import DogCard to use it directly

interface DogCarouselProps {
  dogs: Dog[]
}

export function DogCarousel({ dogs }: DogCarouselProps) {
  // Removed selectedDog and isModalOpen states
  // Removed handleDogClick and handleCloseModal functions

  return (
    <>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-5xl mx-auto"
      >
        <CarouselContent className="-ml-4">
          {dogs.map((dog, index) => (
            <CarouselItem key={dog.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                {/* Use DogCard directly, which now contains the PixelTransition */}
                <DogCard dog={dog} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* Removed Dialog component */}
    </>
  )
}