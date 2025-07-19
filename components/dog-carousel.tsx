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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"
import type { Dog } from "@/lib/types"
import { GradientText } from "@/components/animations/gradient-text"

interface DogCarouselProps {
  dogs: Dog[]
}

export function DogCarousel({ dogs }: DogCarouselProps) {
  const [selectedDog, setSelectedDog] = React.useState<Dog | null>(null)
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const handleDogClick = (dog: Dog) => {
    setSelectedDog(dog)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedDog(null)
  }

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
                <GradientText showBorder={true} className="h-full" animationSpeed={5}>
                  <Card
                    className="relative group cursor-pointer overflow-hidden h-full flex flex-col border-none"
                    onClick={() => handleDogClick(dog)}
                  >
                    <div className="relative w-full aspect-square bg-gradient-to-br from-blue-50 to-green-50">
                      <Image
                        src={dog.photos[0]?.medium || dog.photos[0]?.small || "/placeholder.svg"}
                        alt={dog.name}
                        fill
                        className="object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg";
                        }}
                      />
                      <div className="absolute inset-0 bg-blue-500 opacity-10 mix-blend-multiply rounded-t-lg"></div> {/* Blue hue */}
                      <div className="absolute inset-0 border-4 border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg"></div> {/* Blue border on hover */}
                    </div>
                    <CardContent className="p-4 flex flex-col flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{dog.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {dog.breed} • {dog.age}
                          </p>
                        </div>
                        <Badge variant="outline">{dog.gender}</Badge>
                      </div>
                      <p className="text-muted-foreground text-sm mt-2 h-10 overflow-hidden flex-grow">
                        {dog.description || "No description available."}
                      </p>
                      <div className="flex items-center gap-1 mt-3 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>
                          {dog.shelter} • {dog.distance}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </GradientText>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {selectedDog && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
            <div className="relative w-full aspect-video bg-gradient-to-br from-blue-50 to-green-50">
              <Image
                src={selectedDog.photos[0]?.large || selectedDog.photos[0]?.medium || "/placeholder.svg"}
                alt={selectedDog.name}
                fill
                className="object-cover"
                sizes="100vw"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg";
                }}
              />
            </div>
            <div className="p-6">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedDog.name}</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  {selectedDog.breed} • {selectedDog.age} • {selectedDog.gender}
                </DialogDescription>
              </DialogHeader>
              <p className="text-muted-foreground mt-4">{selectedDog.description || "No description available."}</p>
              <div className="flex items-center gap-1 mt-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>
                  {selectedDog.shelter} • {selectedDog.distance}
                </span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}