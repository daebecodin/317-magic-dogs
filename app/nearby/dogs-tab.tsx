"use client"
import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Filter } from "lucide-react"
import { DogCard } from "@/components/dog-card"
import { DogCardSkeleton } from "@/components/skeletons/card-skeletons"
import type { Dog } from "@/lib/types"
import { GradientText } from "@/components/animations/gradient-text"

interface DogsTabProps {
  dogs: Dog[]
  isLoading: boolean
}

export function DogsTab({ dogs, isLoading }: DogsTabProps) {
  const [breedFilter, setBreedFilter] = useState("all")
  const [genderFilter, setGenderFilter] = useState("all")
  const [urgentOnly, setUrgentOnly] = useState(false)

  const breeds = useMemo(() => ["all", ...Array.from(new Set(dogs.map((dog) => dog.breed)))], [dogs])
  const genders = ["all", "Male", "Female"]

  const filteredDogs = useMemo(
    () =>
      dogs.filter((dog) => {
        const breedMatch = breedFilter === "all" || dog.breed === breedFilter
        const genderMatch = genderFilter === "all" || dog.gender === genderFilter
        const urgentMatch = !urgentOnly || dog.urgent
        return breedMatch && genderMatch && urgentMatch
      }),
    [dogs, breedFilter, genderFilter, urgentOnly],
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