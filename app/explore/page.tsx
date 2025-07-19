"use client"

import { useEffect, useState, useCallback, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Loader, Filter } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"

import type { Pet, PetfinderAnimal } from "@/lib/types"
import { LocationInput } from "@/components/LocationInput"
import { PetCardSkeleton } from "@/components/skeletons/card-skeletons"
import { GradientText } from "@/components/animations/gradient-text"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { mapPetfinderAnimalToInternalPet } from "@/lib/utils"
import dynamic from "next/dynamic"

const DynamicPetCard = dynamic(() => import("@/components/pet-card").then(mod => mod.PetCard), {
  ssr: false,
  loading: () => <PetCardSkeleton />,
});

export default function ExplorePage() {
  const [pets, setPets] = useState<Pet[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentLocation, setCurrentLocation] = useState<string>("San Francisco, CA")

  // Filter states
  const [animalTypeFilter, setAnimalTypeFilter] = useState("all")
  const [breedFilter, setBreedFilter] = useState("all")
  const [ageFilter, setAgeFilter] = useState("all")
  const [genderFilter, setGenderFilter] = useState("all")
  const [sizeFilter, setSizeFilter] = useState("all")

  const fetchPets = useCallback(async (location: string, type: string) => {
    console.log("fetchPets called with location:", location, "and type:", type);
    setIsLoading(true)
    try {
      // Pass the 'type' parameter directly from the filter state
      const response = await fetch(`/api/pets?location=${encodeURIComponent(location)}&type=${encodeURIComponent(type)}&limit=96`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const fetchedPfAnimals: PetfinderAnimal[] = await response.json();
      const mappedPets = fetchedPfAnimals.map(mapPetfinderAnimalToInternalPet);
      setPets(mappedPets)
      setCurrentLocation(location)
      toast.success(`Found ${mappedPets.length} ${type === 'all' ? 'pets' : type.toLowerCase() + 's'} near ${location}!`)
    } catch (error) {
      console.error("Error in fetchPets:", error)
      setPets([])
      toast.error("Failed to fetch pets. Please try a different location.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    // Initial fetch with default location and 'all' animal types
    fetchPets("San Francisco, CA", animalTypeFilter);
  }, [fetchPets, animalTypeFilter]);

  // Extract unique filter options from fetched pets
  const uniqueAnimalTypes = useMemo(() => ["all", ...Array.from(new Set(pets.map((pet) => pet.type)))], [pets])
  const uniqueBreeds = useMemo(() => ["all", ...Array.from(new Set(pets.filter(pet => animalTypeFilter === "all" || pet.type === animalTypeFilter).map((pet) => pet.breed)))], [pets, animalTypeFilter])
  const uniqueAges = useMemo(() => ["all", ...Array.from(new Set(pets.filter(pet => animalTypeFilter === "all" || pet.type === animalTypeFilter).map((pet) => pet.age)))], [pets, animalTypeFilter])
  const uniqueGenders = useMemo(() => ["all", ...Array.from(new Set(pets.filter(pet => animalTypeFilter === "all" || pet.type === animalTypeFilter).map((pet) => pet.gender)))], [pets, animalTypeFilter])
  const uniqueSizes = useMemo(() => ["all", ...Array.from(new Set(pets.filter(pet => animalTypeFilter === "all" || pet.type === animalTypeFilter).map((pet) => pet.size)))], [pets, animalTypeFilter])

  // Filtered pets based on selected filters
  const filteredPets = useMemo(() => {
    return pets.filter((pet) => {
      const typeMatch = animalTypeFilter === "all" || pet.type === animalTypeFilter
      const breedMatch = breedFilter === "all" || pet.breed === breedFilter
      const ageMatch = ageFilter === "all" || pet.age === ageFilter
      const genderMatch = genderFilter === "all" || pet.gender === genderFilter
      const sizeMatch = sizeFilter === "all" || pet.size === sizeFilter
      return typeMatch && breedMatch && ageMatch && genderMatch && sizeMatch
    })
  }, [pets, animalTypeFilter, breedFilter, ageFilter, genderFilter, sizeFilter])

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-8 animate-fade-in-up">
          <Badge variant="secondary" className="mb-4">
            Explore Adoptable Pets
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Find Your New Best Friend
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Showing pets near {currentLocation}.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
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
                  <LocationInput onSearch={(loc) => fetchPets(loc, animalTypeFilter)} initialLocation={currentLocation} isLoading={isLoading} />

                  {/* New Animal Type Filter */}
                  <div className="grid gap-2">
                    <Label htmlFor="animal-type-filter">Animal Type</Label>
                    <Select value={animalTypeFilter} onValueChange={setAnimalTypeFilter}>
                      <SelectTrigger id="animal-type-filter">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {uniqueAnimalTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type === "all" ? "All Types" : type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

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

          {/* Right Column: Pet Listings */}
          <div className="min-h-[500px]">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 12 }).map((_, index) => (
                  <PetCardSkeleton key={index} />
                ))}
              </div>
            ) : filteredPets.length > 0 ? (
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
                {filteredPets.map((pet, index) => (
                  <motion.div key={pet.id} variants={itemVariants}>
                    <DynamicPetCard pet={pet} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <GradientText showBorder={true} className="h-full" animationSpeed={5}>
                <div className="text-center py-12 border-none">
                  <h3 className="text-xl font-semibold">No pets found matching your criteria.</h3>
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