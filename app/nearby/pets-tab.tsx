"use client"
import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Filter } from "lucide-react"
import { PetCardSkeleton } from "@/components/skeletons/card-skeletons"
import type { Pet } from "@/lib/types"
import { GradientText } from "@/components/animations/gradient-text"
import dynamic from "next/dynamic"

const DynamicPetCard = dynamic(() => import("@/components/pet-card").then(mod => mod.PetCard), {
  ssr: false,
  loading: () => <PetCardSkeleton />,
});

interface PetsTabProps {
  pets: Pet[]
  isLoading: boolean
}

export function PetsTab({ pets, isLoading }: PetsTabProps) {
  const [animalTypeFilter, setAnimalTypeFilter] = useState("all")
  const [breedFilter, setBreedFilter] = useState("all")
  const [genderFilter, setGenderFilter] = useState("all")
  const [urgentOnly, setUrgentOnly] = useState(false)

  const animalTypes = useMemo(() => ["all", ...Array.from(new Set(pets.map((pet) => pet.type)))], [pets])
  const breeds = useMemo(() => ["all", ...Array.from(new Set(pets.filter(pet => animalTypeFilter === "all" || pet.type === animalTypeFilter).map((pet) => pet.breed)))], [pets, animalTypeFilter])
  const genders = ["all", "Male", "Female", "Unknown"]

  const filteredPets = useMemo(
    () =>
      pets.filter((pet) => {
        const typeMatch = animalTypeFilter === "all" || pet.type === animalTypeFilter
        const breedMatch = breedFilter === "all" || pet.breed === breedFilter
        const genderMatch = genderFilter === "all" || pet.gender === genderFilter
        const urgentMatch = !urgentOnly || pet.urgent
        return typeMatch && breedMatch && genderMatch && urgentMatch
      }),
    [pets, animalTypeFilter, breedFilter, genderFilter, urgentOnly],
  )

  const renderSkeletons = (count: number) =>
    Array(count)
      .fill(0)
      .map((_, index) => (
        <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
          <PetCardSkeleton />
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
            {/* New Animal Type Filter */}
            <div className="grid gap-2">
              <Label htmlFor="animal-type-filter">Animal Type</Label>
              <Select value={animalTypeFilter} onValueChange={setAnimalTypeFilter}>
                <SelectTrigger id="animal-type-filter" className="w-[180px]">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  {animalTypes.map((type) => (
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
                <SelectTrigger id="breed-filter" className="w-[180px]">
                  <SelectValue placeholder="Select Breed" />
                </SelectTrigger>
                <SelectContent>
                  {breeds.map((breed) => (
                    <SelectItem key={breed} value={breed}>
                      {breed === "all" ? "All Breeds" : breed}
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
                  {genders.map((gender) => (
                    <SelectItem key={gender} value={gender}>
                      {gender === "all" ? "All Genders" : gender}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2 pt-5">
              <Switch id="urgent-only" checked={urgentOnly} onCheckedChange={setUrgentOnly} />
              <Label htmlFor="urgent-only">Urgent Only</Label>
            </div>
          </div>
        </Card>
      </GradientText>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? renderSkeletons(6)
          : filteredPets.map((pet, index) => (
              <div key={pet.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <DynamicPetCard pet={pet} />
              </div>
            ))}
        {!isLoading && filteredPets.length === 0 && (
          <div className="col-span-full text-center py-12">
            <h3 className="text-xl font-semibold">No pets match your criteria</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your filters to find more furry friends.</p>
          </div>
        )}
      </div>
    </div>
  )
}