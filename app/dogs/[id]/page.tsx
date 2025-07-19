"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { MapPin, AlertTriangle, Tag, PawPrint, Stethoscope, Home, Loader } from "lucide-react" // Added Loader
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { GradientText } from "@/components/animations/gradient-text"
import { Separator } from "@/components/ui/separator"
import { getAnimalById } from "@/lib/petfinder"
import type { Dog, PetfinderDog } from "@/lib/types"
import { mapPetfinderDogToInternalDog } from "@/lib/utils"
import { toast } from "sonner"
import { useEffect, useState, useCallback } from "react" // Added hooks

interface DogProfilePageProps {
  params: {
    id: string;
  };
}

export default function DogProfilePage({ params }: DogProfilePageProps) {
  const [dog, setDog] = useState<Dog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const fetchDogData = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);
    setDog(null); // Clear previous dog data

    try {
      const pfDog = await getAnimalById(parseInt(params.id));

      if (!pfDog) {
        setHasError(true);
        toast.error("Dog profile not found.");
        // Optionally, you could still call notFound() here if you want a hard 404 for truly non-existent IDs
        // notFound();
        return;
      }

      const mappedDog = mapPetfinderDogToInternalDog(pfDog);
      setDog(mappedDog);
      toast.success(`Successfully loaded ${mappedDog.name}'s profile!`);
    } catch (error: any) {
      console.error("Error fetching dog profile data:", error);
      setHasError(true);
      toast.error("Failed to load dog profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchDogData();
  }, [fetchDogData]);

  if (isLoading) {
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

  if (hasError || !dog) {
    return (
      <div className="py-12 md:py-24 bg-muted/20 flex items-center justify-center min-h-[500px] text-center">
        <GradientText showBorder={true} className="h-full" animationSpeed={5}>
          <Card className="p-8 border-none">
            <CardTitle className="text-2xl mb-4">Oops! Something went wrong.</CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              We couldn't load this dog's profile right now. This might be a temporary network issue or the profile no longer exists.
            </CardDescription>
            <Button onClick={fetchDogData} className="mt-6">
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
              </div>
            </div>
          </Card>
        </GradientText>
      </div>
    </div>
  )
}