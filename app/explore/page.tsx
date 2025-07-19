"use client"

import { useEffect, useState, useCallback } from "react"
import { Badge } from "@/components/ui/badge"
import { Loader } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"

import { getAdoptableDogs, type PetfinderDog } from "@/lib/petfinder"
import { PetCard } from "@/components/PetCard"
import { LocationInput } from "@/components/LocationInput"
import { DogCardSkeleton } from "@/components/skeletons/card-skeletons"
import { GradientText } from "@/components/animations/gradient-text"

export default function ExplorePage() {
  const [dogs, setDogs] = useState<PetfinderDog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [locationError, setLocationError] = useState(false)
  const [currentLocation, setCurrentLocation] = useState<string | null>(null)

  const fetchDogs = useCallback(async (location: string) => {
    setIsLoading(true)
    setLocationError(false)
    try {
      const fetchedDogs = await getAdoptableDogs(location, 48)
      setDogs(fetchedDogs)
      setCurrentLocation(location)
      toast.success(`Found ${fetchedDogs.length} dogs near ${location}!`)
    } catch (error) {
      console.error("Error fetching dogs:", error)
      setDogs([])
      setLocationError(true)
      toast.error("Failed to fetch dogs. Please try a different location.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          // Reverse geocoding is not directly available in browser,
          // so we'll use a generic placeholder or prompt for manual input.
          // For a real app, you'd use a reverse geocoding API here.
          fetchDogs(`${latitude},${longitude}`)
        },
        (error) => {
          console.error("Geolocation error:", error)
          setLocationError(true)
          setIsLoading(false)
          toast.warning("Geolocation denied or failed. Please enter your location manually.")
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      )
    } else {
      setLocationError(true)
      setIsLoading(false)
      toast.warning("Geolocation is not supported by your browser. Please enter your location manually.")
    }
  }, [fetchDogs])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  return (
    <div className="py-12 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16 animate-fade-in-up">
          <Badge variant="secondary" className="mb-4">
            Explore Adoptable Dogs
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Find Your New Best Friend
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
            {currentLocation
              ? `Showing dogs near ${currentLocation}`
              : "Enter your location to see adoptable dogs near you."}
          </p>
        </div>

        {locationError && !isLoading && (
          <div className="max-w-md mx-auto mb-12 animate-fade-in-up">
            <LocationInput onSearch={fetchDogs} isLoading={isLoading} />
          </div>
        )}

        {isLoading && !locationError && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <DogCardSkeleton key={index} />
            ))}
          </div>
        )}

        {!isLoading && dogs.length > 0 && (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {dogs.map((dog) => (
              <motion.div key={dog.id} variants={itemVariants}>
                <PetCard dog={dog} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {!isLoading && dogs.length === 0 && !locationError && (
          <GradientText showBorder={true} className="h-full" animationSpeed={5}>
            <div className="text-center py-12 border-none">
              <h3 className="text-xl font-semibold">No dogs found for your location.</h3>
              <p className="text-muted-foreground mt-2">
                Try a different ZIP code or city, or check back later!
              </p>
            </div>
          </GradientText>
        )}
      </div>
    </div>
  )
}