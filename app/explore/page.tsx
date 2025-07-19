"use client"

import { useEffect, useState, useCallback, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Loader, Filter } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"

import { getAdoptableDogs, type PetfinderDog } from "@/lib/petfinder"
import { PetCard } from "@/components/PetCard"
import { LocationInput } from "@/components/LocationInput"
import { DogCardSkeleton } from "@/components/skeletons/card-skeletons"
import { GradientText } from "@/components/animations/gradient-text"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export default function ExplorePage() {
  const [dogs, setDogs] = useState<PetfinderDog[]>([])
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
      const fetchedDogs = await getAdoptableDogs(location, 48)
      setDogs(fetchedDogs)
      setCurrentLocation(location) // Update current location after successful fetch
      toast.success(`Found ${fetchedDogs.length} dogs near ${location}!`)
    } catch (error) {
      console.error("Error in fetchDogs:", error)
      setDogs([])
      toast.error("Failed to fetch dogs. Please try a different location.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    // Initial fetch for San Francisco, CA on component mount
    fetchDogs("San Francisco, CA");
  }, [fetchDogs]);

  // Extract unique filter options from fetched dogs
  const uniqueBreeds = useMemo(() => ["all", ...Array.from(new Set(dogs.map((dog) => dog.breeds.primary)))], [dogs])
  const uniqueAges = useMemo(() => ["all", ...Array.from(new Set(dogs.map((dog) => dog.age)))], [dogs])
  const uniqueGenders = useMemo(() => ["all", ...Array.from(new Set(dogs.map((dog) => dog.gender)))], [dogs])
  const uniqueSizes = useMemo(() => ["all", ...Array.from(new Set(dogs.map((dog) => dog.size)))], [dogs])

  // Filtered dogs based on selected filters
  const filteredDogs = useMemo(() => {
    return dogs.filter((dog) => {
      const breedMatch = breedFilter === "all" || dog.breeds.primary === breedFilter
      const ageMatch = ageFilter === "all" || dog.age === ageFilter
      const genderMatch = genderFilter === "all" || dog.gender === genderFilter
      const sizeMatch = sizeFilter === "all" || dog.size === sizeFilter
      return breedMatch && ageMatch && genderMatch && sizeMatch
    })
  }, [dogs, breedFilter, ageFilter, genderFilter, sizeFilter])

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
        <div className="text-center mb-8 animate-fade-in-up"> {/* Reduced mb-16 to mb-8 */}
          <Badge variant="secondary" className="mb-4">
            Explore Adoptable Dogs
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4"> {/* Reduced mb-6 to mb-4 */}
            Find Your New Best Friend
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Showing dogs near {currentLocation}.
          </p>
        </div>

        {/* Location Input now compact */}
        <div className="mb-12 animate-fade-in-up">
          <LocationInput onSearch={fetchDogs} initialLocation={currentLocation} isLoading={isLoading} />
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <DogCardSkeleton key={index} />
            ))}
          </div>
        )}

        {!isLoading && dogs.length > 0 && (
          <GradientText showBorder={true} className="h-full" animationSpeed={5}>
            <Card className="mb-8 p-4 border-none">
              <div className="flex flex-wrap items-center gap-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </h3>
                <div className="grid gap-2">
                  <Label htmlFor="breed-filter">Breed</Label>
                  <Select value={breedFilter} onValueChange={setBreedFilter}>
                    <SelectTrigger id="breed-filter" className="w-[180px]">
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
                    <SelectTrigger id="age-filter" className="w-[120px]">
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
                    <SelectTrigger id="gender-filter" className="w-[120px]">
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
                    <SelectTrigger id="size-filter" className="w-[120px]">
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
        )}

        {!isLoading && filteredDogs.length > 0 && (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredDogs.map((dog) => (
              <motion.div key={dog.id} variants={itemVariants}>
                <PetCard dog={dog} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {!isLoading && filteredDogs.length === 0 && (
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
  )
}