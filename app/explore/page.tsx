"use client"

import { useEffect, useState, useCallback, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Loader, Filter } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"

import type { PetfinderDog, Dog } from "@/lib/types" // Import PetfinderDog and Dog types
import { DogCard } from "@/components/dog-card" // Use DogCard instead of PetCard
import { LocationInput } from "@/components/LocationInput"
import { DogCardSkeleton } from "@/components/skeletons/card-skeletons"
import { GradientText } from "@/components/animations/gradient-text"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { mapPetfinderDogToInternalDog } from "@/lib/utils" // Import utility function

export default function ExplorePage() {
  const [dogs, setDogs] = useState<Dog[]>([]) // Store internal Dog type
  const [isLoading, setIsLoading] = useState(true)
  const [currentLocation, setCurrentLocation] = useState<string>("San Francisco, CA")

  // Filter states
  const [breedFilter, setBreedFilter] = useState("all")
  const [ageFilter, setAgeFilter] = useState("all")
  const [genderFilter, setGenderFilter] = useState("all")
  const [sizeFilter, setSizeFilter] = useState("all")

  const fetchDogs = useCallback(async (location: string) => {
    console.log("fetchDogs called with location:", location);
    setIsLoading(true)
    try {
      const response = await fetch(`/api/dogs?location=${encodeURIComponent(location)}&limit=96`); // Increased limit to 96
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const fetchedPfDogs: PetfinderDog[] = await response.json();
      const mappedDogs = fetchedPfDogs.map(mapPetfinderDogToInternalDog); // Map to internal Dog type
      setDogs(mappedDogs)
      setCurrentLocation(location)
      toast.success(`Found ${mappedDogs.length} dogs near ${location}!`)
    } catch (error) {
      console.error("Error in fetchDogs:", error)
      setDogs([])
      toast.error("Failed to fetch dogs. Please try a different location.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDogs("San Francisco, CA");
  }, [fetchDogs]);

  // Extract unique filter options from fetched dogs (from the mapped Dog type)
  const uniqueBreeds = useMemo(() => ["all", ...Array.from(new Set(dogs.map((dog) => dog.breed)))], [dogs])
  const uniqueAges = useMemo(() => ["all", ...Array.from(new Set(dogs.map((dog) => dog.age)))], [dogs])
  const uniqueGenders = useMemo(() => ["all", ...Array.from(new Set(dogs.map((dog) => dog.gender)))], [dogs])
  const uniqueSizes = useMemo(() => ["all", ...Array.from(new Set(dogs.map((dog) => dog.size)))], [dogs])

  // Filtered dogs based on selected filters
  const filteredDogs = useMemo(() => {
    return dogs.filter((dog) => {
      const breedMatch = breedFilter === "all" || dog.breed === breedFilter
      const ageMatch = ageFilter === "all" || dog.age === ageFilter
      const genderMatch = genderFilter === "all" || dog.gender === genderFilter
      const sizeMatch = sizeFilter === "all" || dog.size === sizeFilter
      return breedMatch && ageMatch && genderMatch && sizeMatch
    })
  }, [dogs, breedFilter, ageFilter, genderFilter, sizeFilter])

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  return (
    <div className="py-8 md:py-12"> {/* Adjusted top padding */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl"> {/* Keep header contained */}
        <div className="text-center mb-8 animate-fade-in-up">
          <Badge variant="secondary" className="mb-4">
            Explore Adoptable Dogs
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Find Your New Best Friend
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Showing dogs near {currentLocation}.
          </p>
        </div>
      </div>

      {/* New container for wider main content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8"> {/* Removed max-w-7xl here */}
        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Left Column: Filters and Location Input */}
          <div className="lg:sticky lg:top-24 h-fit space-y-6 animate-fade-in-up">
            <GradientText showBorder={true} className="h-full" animationSpeed={5}>
              <Card className="p-4 border-none">
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                  <Filter className="w-5 h-5" />
                  Search & Filters
                </h3>
                <div className="space-y-4">
                  <LocationInput onSearch={fetchDogs} initialLocation={currentLocation} isLoading={isLoading} />

                  <div className="grid gap-2">
                    <Label htmlFor="breed-filter">Breed</Label>
                    <Select value={breedFilter} onValueChange={setBreedFilter}>
                      <SelectTrigger id="breed-filter">
                        <SelectValue placeholder="Select Breed" />
                      </SelectTrigger>
                      <SelectContent>
                        {uniqueBreeds.map((breed) => (
                          <SelectItem key={breed} value={breed}>
                            {breed === "all" ? "All Breeds" : breed}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="age-filter">Age</Label>
                    <Select value={ageFilter} onValueChange={setAgeFilter}>
                      <SelectTrigger id="age-filter">
                        <SelectValue placeholder="Select Age" />
                      </SelectTrigger>
                      <SelectContent>
                        {uniqueAges.map((age) => (
                          <SelectItem key={age} value={age}>
                            {age === "all" ? "All Ages" : age}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="gender-filter">Gender</Label>
                    <Select value={genderFilter} onValueChange={setGenderFilter}>
                      <SelectTrigger id="gender-filter">
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        {uniqueGenders.map((gender) => (
                          <SelectItem key={gender} value={gender}>
                            {gender === "all" ? "All Genders" : gender}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="size-filter">Size</Label>
                    <Select value={sizeFilter} onValueChange={setSizeFilter}>
                      <SelectTrigger id="size-filter">
                        <SelectValue placeholder="Select Size" />
                      </SelectTrigger>
                      <SelectContent>
                        {uniqueSizes.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size === "all" ? "All Sizes" : size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>
            </GradientText>
          </div>

          {/* Right Column: Dog Listings */}
          <div className="min-h-[500px]"> {/* Added min-h to ensure space */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 12 }).map((_, index) => (
                  <DogCardSkeleton key={index} />
                ))}
              </div>
            ) : filteredDogs.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.07,
                      delayChildren: 0.2,
                    },
                  },
                }}
                initial="hidden"
                animate="visible"
              >
                {filteredDogs.map((dog, index) => (
                  <motion.div key={dog.id} variants={itemVariants}>
                    <DogCard dog={dog} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <GradientText showBorder={true} className="h-full" animationSpeed={5}>
                <div className="text-center py-12 border-none">
                  <h3 className="text-xl font-semibold">No dogs found matching your criteria.</h3>
                  <p className="text-muted-foreground mt-2">
                    Try adjusting your filters or searching a different location.
                  </p>
                </div>
              </GradientText>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}