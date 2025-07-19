"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { MapPin, AlertTriangle, Tag, PawPrint, Stethoscope, Home, Loader, ChevronLeft, ChevronRight } from "lucide-react"
import { notFound, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { GradientText } from "@/components/animations/gradient-text"
import { Separator } from "@/components/ui/separator"
import type { Pet, PetfinderAnimal } from "@/lib/types" // Updated import
import { mapPetfinderAnimalToInternalPet } from "@/lib/utils" // Updated import
import { toast } from "sonner"
import { useEffect, useState, useCallback } from "react"

interface PetProfilePageProps {
  params: {
    id: string;
  };
}

export default function PetProfilePage({ params }: PetProfilePageProps) {
  const router = useRouter();
  const [pet, setPet] = useState<Pet | null>(null);
  const [isLoadingPet, setIsLoadingPet] = useState(true);
  const [hasErrorPet, setHasErrorPet] = useState(false);

  const [allPets, setAllPets] = useState<Pet[]>([]);
  const [isLoadingAllPets, setIsLoadingAllPets] = useState(true);
  const [currentPetIndex, setCurrentPetIndex] = useState<number>(-1);

  const defaultLocation = "San Francisco, CA"; // Default location for fetching the list

  // Fetch details for the specific pet
  const fetchSpecificPetData = useCallback(async () => {
    setIsLoadingPet(true);
    setHasErrorPet(false);
    setPet(null);

    try {
      // Fetch from our API route, which uses getAnimalById internally
      const response = await fetch(`/api/pets?id=${params.id}`);
      if (!response.ok) {
        if (response.status === 404) {
          notFound();
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const fetchedPfAnimal: PetfinderAnimal = await response.json();
      const mappedPet = mapPetfinderAnimalToInternalPet(fetchedPfAnimal);
      setPet(mappedPet);
      toast.success(`Successfully loaded ${mappedPet.name}'s profile!`);
    } catch (error: any) {
      console.error("Error fetching specific pet profile data:", error);
      setHasErrorPet(true);
      toast.error("Failed to load pet profile. Please try again.");
    } finally {
      setIsLoadingPet(false);
    }
  }, [params.id]);

  // Fetch a list of pets for navigation context
  const fetchAllPetsForNavigation = useCallback(async () => {
    setIsLoadingAllPets(true);
    try {
      const response = await fetch(`/api/pets?location=${encodeURIComponent(defaultLocation)}&limit=96`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const fetchedPfAnimals: PetfinderAnimal[] = await response.json();
      const mappedPets = fetchedPfAnimals.map(mapPetfinderAnimalToInternalPet);
      setAllPets(mappedPets);
      const index = mappedPets.findIndex((p: Pet) => p.id === parseInt(params.id));
      setCurrentPetIndex(index);
    } catch (error) {
      console.error("Error fetching all pets for navigation:", error);
      setAllPets([]); // Clear list on error
      setCurrentPetIndex(-1);
    } finally {
      setIsLoadingAllPets(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchSpecificPetData();
    fetchAllPetsForNavigation(); // Fetch the list of pets in parallel
  }, [fetchSpecificPetData, fetchAllPetsForNavigation]);

  const navigateToPet = useCallback((indexOffset: number) => {
    if (allPets.length === 0) return;

    let newIndex = currentPetIndex + indexOffset;

    // Handle wrapping around the list
    if (newIndex < 0) {
      newIndex = allPets.length - 1;
    } else if (newIndex >= allPets.length) {
      newIndex = 0;
    }

    const nextPet = allPets[newIndex];
    if (nextPet) {
      router.push(`/pets/${nextPet.id}`);
      // Update current index immediately for smoother UI, data will re-fetch
      setCurrentPetIndex(newIndex);
      setPet(nextPet); // Optimistically set pet data if available in allPets list
      setIsLoadingPet(false);
      setHasErrorPet(false);
    } else {
      toast.error("Could not find the next pet to navigate to.");
    }
  }, [allPets, currentPetIndex, router]);

  const handlePrev = () => navigateToPet(-1);
  const handleNext = () => navigateToPet(1);

  const showNavigation = !isLoadingAllPets && allPets.length > 1;

  if (isLoadingPet) {
    return (
      <div className="py-12 md:py-24 bg-muted/20 flex items-center justify-center min-h-[500px] text-center">
        <GradientText showBorder={true} className="h-full" animationSpeed={5}>
          <Card className="p-8 border-none">
            <CardTitle className="text-2xl mb-4">Loading Pet Profile...</CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              <Loader className="w-8 h-8 animate-spin mx-auto mb-4" />
              Please wait while we fetch the details.
            </CardDescription>
          </Card>
        </GradientText>
      </div>
    );
  }

  if (hasErrorPet || !pet) {
    return (
      <div className="py-12 md:py-24 bg-muted/20 flex items-center justify-center min-h-[500px] text-center">
        <GradientText showBorder={true} className="h-full" animationSpeed={5}>
          <Card className="p-8 border-none">
            <CardTitle className="text-2xl mb-4">Oops! Something went wrong.</CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              We couldn't load this pet's profile right now. This might be a temporary network issue or the profile no longer exists.
            </CardDescription>
            <Button onClick={fetchSpecificPetData} className="mt-6">
              Try Again
            </Button>
          </Card>
        </GradientText>
      </div>
    );
  }

  const imageUrl = pet.photos[0]?.medium || pet.photos[0]?.small || "/placeholder.svg";
  console.log(`PetProfilePage: Pet ${pet.name} (ID: ${pet.id}) using image URL: ${imageUrl}`);

  return (
    <div className="py-12 md:py-24 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <GradientText showBorder={true} className="h-full" animationSpeed={5}>
          <Card className="overflow-hidden animate-fade-in-up border-none">
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-square bg-gradient-to-br from-blue-50 to-green-50">
                <Image
                  src={imageUrl}
                  alt={pet.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold">{pet.name}</h1>
                    <p className="text-lg text-muted-foreground">{pet.breed}</p>
                  </div>
                  {pet.urgent && (
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Urgent
                    </Badge>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Age</Badge>
                    <span>{pet.age}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Gender</Badge>
                    <span>{pet.gender}</span>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">{pet.description}</p>

                <Separator className="my-4" />

                {pet.characteristics && pet.characteristics.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <PawPrint className="w-5 h-5 text-primary" />
                      About {pet.name} (Characteristics)
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {pet.characteristics.map((char: string, index: number) => (
                        <Badge key={index} variant="secondary">{char}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {pet.health && pet.health.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <Stethoscope className="w-5 h-5 text-primary" />
                      Health
                    </h3>
                    <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                      {pet.health.map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {pet.goodInHomeWith && pet.goodInHomeWith.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <Home className="w-5 h-5 text-primary" />
                      Good in a home with
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {pet.goodInHomeWith.map((item: string, index: number) => (
                        <Badge key={index} variant="secondary">{item}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {pet.adoptionFee !== null && typeof pet.adoptionFee === 'number' && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <Tag className="w-5 h-5 text-primary" />
                      Adoption Fee
                    </h3>
                    <p className="text-2xl font-bold text-primary">${pet.adoptionFee.toFixed(2)}</p>
                  </div>
                )}

                <Separator className="my-4" />

                <div className="space-y-3 text-sm pt-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{pet.shelter}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{pet.distance} away</span>
                  </div>
                </div>
                <Button className="w-full mt-6" asChild>
                  <a href={pet.url} target="_blank" rel="noopener noreferrer">
                    View on Petfinder
                  </a>
                </Button>

                {showNavigation && (
                  <div className="flex justify-between mt-4 gap-2">
                    <Button variant="outline" onClick={handlePrev} disabled={isLoadingAllPets}>
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Previous Pet
                    </Button>
                    <Button variant="outline" onClick={handleNext} disabled={isLoadingAllPets}>
                      Next Pet
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </GradientText>
      </div>
    </div>
  )
}