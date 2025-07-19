"use client"

import { useEffect, useState } from "react"
import { Hero } from "@/components/hero"
import { HowItWorksPreview } from "@/components/how-it-works-preview"
import { CallToAction } from "@/components/call-to-action"
import CircularGallery from "@/components/animations/circular-gallery" // Import CircularGallery
import { DogCardSkeleton } from "@/components/skeletons/card-skeletons" // For loading state
import { toast } from "sonner"
import type { Dog, PetfinderDog } from "@/lib/types"
import { mapPetfinderDogToInternalDog } from "@/lib/utils"

export default function HomePage() {
  const [dogs, setDogs] = useState<Dog[]>([])
  const [isLoadingDogs, setIsLoadingDogs] = useState(true)

  useEffect(() => {
    const fetchDogsForHomepage = async () => {
      setIsLoadingDogs(true)
      try {
        const response = await fetch(`/api/dogs?location=90210&limit=12`); // Fetch 12 dogs for the gallery
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const fetchedPfDogs: PetfinderDog[] = await response.json();
        const mappedDogs = fetchedPfDogs.map(mapPetfinderDogToInternalDog);
        setDogs(mappedDogs);
      } catch (error) {
        console.error("Error fetching dogs for homepage:", error);
        setDogs([]);
        toast.error("Failed to load some furry friends for the homepage.");
      } finally {
        setIsLoadingDogs(false);
      }
    };

    fetchDogsForHomepage();
  }, []);

  // Map the fetched Dog data to the format required by CircularGallery
  const galleryItems = dogs.map(dog => ({
    image: dog.photos[0]?.medium || dog.photos[0]?.small || "/placeholder.svg",
    text: dog.name,
  }));

  return (
    <>
      <Hero />
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Meet Our Adoptable Dogs</h2>
          {isLoadingDogs ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <DogCardSkeleton key={index} />
              ))}
            </div>
          ) : dogs.length > 0 ? (
            <div style={{ height: '600px', position: 'relative' }}>
              <CircularGallery
                items={galleryItems}
                bend={3}
                textColor="#ffffff"
                borderRadius={0.05}
                scrollEase={0.02}
              />
            </div>
          ) : (
            <p className="text-muted-foreground">No dogs available right now. Check back soon!</p>
          )}
        </div>
      </section>
      <HowItWorksPreview />
      <CallToAction />
    </>
  )
}