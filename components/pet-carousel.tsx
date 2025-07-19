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
import type { Pet } from "@/lib/types"
import { GradientText } from "@/components/animations/gradient-text"
import { PetCardSkeleton } from "@/components/skeletons/card-skeletons"
import dynamic from "next/dynamic"

const DynamicPetCard = dynamic(() => import("./pet-card").then(mod => mod.PetCard), {
  ssr: false,
  loading: () => <PetCardSkeleton />,
});

interface PetCarouselProps {
  pets: Pet[]
}

export function PetCarousel({ pets }: PetCarouselProps) {
  return (
    <>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-5xl mx-auto"
      >
        <CarouselContent className="-ml-4">
          {pets.map((pet, index) => (
            <CarouselItem key={pet.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <DynamicPetCard pet={pet} />
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