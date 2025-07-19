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
    console.log("HomePage useEffect: Fetching dogs...");
    const fetchDogsForHomepage = async () => {
      setIsLoadingDogs(true)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      try {
        const response = await fetch(`/api/dogs?location=90210&limit=12`, { signal: controller.signal });
        clearTimeout(timeoutId); // Clear timeout if fetch completes within time

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
        const fetchedPfDogs: PetfinderDog[] = await response.json();
        const mappedDogs = fetchedPfDogs.map(mapPetfinderDogToInternalDog);
        console.log("Fetched and mapped dogs successfully:", mappedDogs.length, "dogs");
        setDogs(mappedDogs);
      } catch (error: any) {
        if (error.name === 'AbortError') {
          console.error("Fetch for dogs timed out:", error);
          toast.error("Loading dogs timed out. Please try refreshing the page.");
        } else {
          console.error("Error fetching dogs for homepage:", error);
          toast.error("Failed to load some furry friends for the homepage.");
        }
        setDogs([]); // Ensure dogs array is empty on error
      } finally {
        setIsLoadingDogs(false);
        console.log("Finished fetching dogs. isLoadingDogs set to false.");
      }
    };

    fetchDogsForHomepage();
  }, []);

  // Map the fetched Dog data to the format required by CircularGallery
  const galleryItems = dogs.map(dog => ({
    image: dog.photos[0]?.medium || dog.photos[0]?.small || "/placeholder.svg",
    text: dog.name,
  }));

  console.log("HomePage render: isLoadingDogs =", isLoadingDogs, "dogs.length =", dogs.length);
  console.log("Gallery items for CircularGallery:", galleryItems);

  return (
    <>
      <Hero />
      <section className="py-16 md:py-24 bg-background">
        {/* Title and description remain centered and contained */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">Meet Our Adoptable Dogs</h2>
          <p className="text-xl text-muted-foreground">Swipe to see more furry friends!</p>
        </div>

        {/* Circular Gallery container - now outside the max-width container */}
        <div className="w-full px-0" style={{ height: '600px', position: 'relative' }}>
          {isLoadingDogs ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              {Array.from({ length: 6 }).map((_, index) => (
                <DogCardSkeleton key={index} />
              ))}
            </div>
          ) : dogs.length > 0 ? (
            <CircularGallery
              items={galleryItems}
              bend={3}
              textColor="#ffffff"
              borderRadius={0.05}
              scrollEase={0.02}
            />
          ) : (
            <p className="text-muted-foreground text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">No dogs available right now. Check back soon!</p>
          )}
        </div>
      </section>
      <HowItWorksPreview />
      <CallToAction />
    </>
  )
}