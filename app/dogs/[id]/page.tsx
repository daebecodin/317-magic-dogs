"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { MapPin, AlertTriangle, Tag, PawPrint, Stethoscope, Home, Loader, ChevronLeft, ChevronRight } from "lucide-react" // Added Chevron icons
import { notFound, useRouter } from "next/navigation" // Added useRouter
import { Button } from "@/components/ui/button"
import { GradientText } from "@/components/animations/gradient-text"
import { Separator } from "@/components/ui/separator"
import type { Dog, PetfinderDog } from "@/lib/types"
import { mapPetfinderDogToInternalDog } from "@/lib/utils"
import { toast } from "sonner"
import { useEffect, useState, useCallback } from "react"

interface DogProfilePageProps {
  params: {
    id: string;
  };
}

export default function DogProfilePage({ params }: DogProfilePageProps) {
  const router = useRouter();
  const [dog, setDog] = useState<Dog | null>(null);
  const [isLoadingDog, setIsLoadingDog] = useState(true);
  const [hasErrorDog, setHasErrorDog] = useState(false);

  const [allDogs, setAllDogs] = useState<Dog[]>([]); // State to hold the list of all dogs
  const [isLoadingAllDogs, setIsLoadingAllDogs] = useState(true);
  const [currentDogIndex, setCurrentDogIndex] = useState<number>(-1);

  const defaultLocation = "San Francisco, CA"; // Default location for fetching the list

  // Fetch details for the specific dog
  const fetchSpecificDogData = useCallback(async () => {
    setIsLoadingDog(true);
    setHasErrorDog(false);
    setDog(null);

    try {
      // Fetch from our API route, which uses getAnimalById internally
      const response = await fetch(`/api/dogs?id=${params.id}`);
      if (!response.ok) {
        if (response.status === 404) {
          notFound(); // Use Next.js notFound for actual 404s
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const fetchedPfDog: PetfinderDog = await response.json();
      const mappedDog = mapPetfinderDogToInternalDog(fetchedPfDog);
      setDog(mappedDog);
      toast.success(`Successfully loaded ${mappedDog.name}'s profile!`);
    } catch (error: any) {
      console.error("Error fetching specific dog profile data:", error);
      setHasErrorDog(true);
      toast.error("Failed to load dog profile. Please try again.");
    } finally {
      setIsLoadingDog(false);
    }
  }, [params.id]);

  // Fetch a list of dogs for navigation context
  const fetchAllDogsForNavigation = useCallback(async () => {
    setIsLoadingAllDogs(true);
    try {
      const response = await fetch(`/api/dogs?location=${encodeURIComponent(defaultLocation)}&limit=96`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const fetchedPfDogs: PetfinderDog[] = await response.json();
      const mappedDogs = fetchedPfDogs.map(mapPetfinderDogToInternalDog);
      setAllDogs(mappedDogs);
      const index = mappedDogs.findIndex(d => d.id === parseInt(params.id));
      setCurrentDogIndex(index);
    } catch (error) {
      console.error("Error fetching all dogs for navigation:", error);
      setAllDogs([]); // Clear list on error
      setCurrentDogIndex(-1);
    } finally {
      setIsLoadingAllDogs(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchSpecificDogData();
    fetchAllDogsForNavigation(); // Fetch the list of dogs in parallel
  }, [fetchSpecificDogData, fetchAllDogsForNavigation]);

  const navigateToDog = useCallback((indexOffset: number) => {
    if (allDogs.length === 0) return;

    let newIndex = currentDogIndex + indexOffset;

    // Handle wrapping around the list
    if (newIndex < 0) {
      newIndex = allDogs.length - 1;
    } else if (newIndex >= allDogs.length) {
      newIndex = 0;
    }

    const nextDog = allDogs[newIndex];
    if (nextDog) {
      router.push(`/dogs/${nextDog.id}`);
      // Update current index immediately for smoother UI, data will re-fetch
      setCurrentDogIndex(newIndex);
      setDog(nextDog); // Optimistically set dog data if available in allDogs list
      setIsLoadingDog(false); // Assume loaded for optimistic update
      setHasErrorDog(false);
    } else {
      toast.error("Could not find the next dog to navigate to.");
    }
  }, [allDogs, currentDogIndex, router]);

  const handlePrev = () => navigateToDog(-1);
  const handleNext = () => navigateToDog(1);

  const showNavigation = !isLoadingAllDogs && allDogs.length > 1;

  if (isLoadingDog) {
    return (
      <div className="py-12 md:py-24 bg-muted/20 flex items-center justify-center min-h-[500px] text-center">
        <GradientText showBorder={true} className="h-full" animationSpeed={5}>
          <Card className="p-8 border-none">
            <CardTitle className="text-2xl mb-4">Loading Dog Profile...</CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              <Loader className="w-8 h-8 animate-spin mx-auto mb-4" />
              Please wait while we fetch the details.
            </CardDescription>
          </Card>
        </GradientText>
      </div>
    );
  }

  if (hasErrorDog || !dog) {
    return (
      <div className="py-12 md:py-24 bg-muted/20 flex items-center justify-center min-h-[500px] text-center">
        <GradientText showBorder={true} className="h-full" animationSpeed={5}>
          <Card className="p-8 border-none">
            <CardTitle className="text-2xl mb-4">Oops! Something went wrong.</CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              We couldn't load this dog's profile right now. This might be a temporary network issue or the profile no longer exists.
            </CardDescription>
            <Button onClick={fetchSpecificDogData} className="mt-6">
              Try Again
            </Button>
          </Card>
        </GradientText>
      </div>
    );
  }

  const imageUrl = dog.photos[0]?.medium || dog.photos[0]?.small || "/placeholder.svg";
  console.log(`DogProfilePage: Dog ${dog.name} (ID: ${dog.id}) using image URL: ${imageUrl}`);

  return (
    <div className="py-12 md:py-24 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <GradientText showBorder={true} className="h-full" animationSpeed={5}>
          <Card className="overflow-hidden animate-fade-in-up border-none">
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-square bg-gradient-to-br from-blue-50 to-green-50">
                <Image
                  src={imageUrl}
                  alt={dog.name}
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
                    <h1 className="text-3xl md:text-4xl font-bold">{dog.name}</h1>
                    <p className="text-lg text-muted-foreground">{dog.breed}</p>
                  </div>
                  {dog.urgent && (
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Urgent
                    </Badge>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Age</Badge>
                    <span>{dog.age}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Gender</Badge>
                    <span>{dog.gender}</span>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">{dog.description}</p>

                <Separator className="my-4" />

                {dog.characteristics && dog.characteristics.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <PawPrint className="w-5 h-5 text-primary" />
                      About {dog.name} (Characteristics)
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {dog.characteristics.map((char, index) => (
                        <Badge key={index} variant="secondary">{char}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {dog.health && dog.health.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <Stethoscope className="w-5 h-5 text-primary" />
                      Health
                    </h3>
                    <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                      {dog.health.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {dog.goodInHomeWith && dog.goodInHomeWith.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <Home className="w-5 h-5 text-primary" />
                      Good in a home with
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {dog.goodInHomeWith.map((item, index) => (
                        <Badge key={index} variant="secondary">{item}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {dog.adoptionFee !== null && typeof dog.adoptionFee === 'number' && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <Tag className="w-5 h-5 text-primary" />
                      Adoption Fee
                    </h3>
                    <p className="text-2xl font-bold text-primary">${dog.adoptionFee.toFixed(2)}</p>
                  </div>
                )}

                <Separator className="my-4" />

                <div className="space-y-3 text-sm pt-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{dog.shelter}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{dog.distance} away</span>
                  </div>
                </div>
                <Button className="w-full mt-6" asChild>
                  <a href={dog.url} target="_blank" rel="noopener noreferrer">
                    View on Petfinder
                  </a>
                </Button>

                {showNavigation && (
                  <div className="flex justify-between mt-4 gap-2">
                    <Button variant="outline" onClick={handlePrev} disabled={isLoadingAllDogs}>
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Previous Dog
                    </Button>
                    <Button variant="outline" onClick={handleNext} disabled={isLoadingAllDogs}>
                      Next Dog
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