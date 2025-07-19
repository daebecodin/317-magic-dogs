"use client"
import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Filter } from "lucide-react"
import { DogCard } from "@/components/dog-card"
import { DogCardSkeleton } from "@/components/skeletons/card-skeletons"
import type { PetfinderDog } from "@/lib/petfinder" // Changed import to PetfinderDog
import { GradientText } from "@/components/animations/gradient-text"

interface DogsTabProps {
  dogs: PetfinderDog[] // Changed type to PetfinderDog[]
  isLoading: boolean
}

export function DogsTab({ dogs, isLoading }: DogsTabProps) {
  const [breedFilter, setBreedFilter] = useState("all")
  const [ageFilter, setAgeFilter] = useState("all")
  const [genderFilter, setGenderFilter] = useState("all")
  const [sizeFilter, setSizeFilter] = useState("all")

  // Derive unique filter options from the fetched dogs
  const uniqueBreeds = useMemo(() => ["all", ...Array.from(new Set(dogs.map((dog) => dog.breeds.primary)))], [dogs])
  const uniqueAges = useMemo(() => ["all", ...Array.from(new Set(dogs.map((dog) => dog.age)))], [dogs])
  const uniqueGenders = useMemo(() => ["all", ...Array.from(new Set(dogs.map((dog) => dog.gender)))], [dogs])
  const uniqueSizes = useMemo(() => ["all", ...Array.from(new Set(dogs.map((dog) => dog.size)))], [dogs])

  const filteredDogs = useMemo(
    () =>
      dogs.filter((dog) => {
        const breedMatch = breedFilter === "all" || dog.breeds.primary === breedFilter
        const ageMatch = ageFilter === "all" || dog.age === ageFilter
        const genderMatch = genderFilter === "all" || dog.gender === genderFilter
        const sizeMatch = sizeFilter === "all" || dog.size === sizeFilter
        return breedMatch && ageMatch && genderMatch && sizeMatch
      }),
    [dogs, breedFilter, ageFilter, genderFilter, sizeFilter],
  )

  const renderSkeletons = (count: number) =>
    Array(count)
      .fill(0)
      .map((_, index) => (
        <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
          <DogCardSkeleton />
        </div>
      ))

  return (
    <div>
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
            {/* Removed Urgent Only switch as Petfinder API does not provide this directly */}
          </div>
        </Card>
      </GradientText>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? renderSkeletons(6)
          : filteredDogs.map((dog, index) => (
              <div key={dog.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <DogCard dog={dog} />
              </div>
            ))}
        {!isLoading && filteredDogs.length === 0 && (
          <div className="col-span-full text-center py-12">
            <h3 className="text-xl font-semibold">No dogs match your criteria</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your filters to find more furry friends.</p>
          </div>
        )}
      </div>
    </div>
  )
}