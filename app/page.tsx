"use client"

import { useEffect, useState } from "react"
import { Hero } from "@/components/hero"
import { HowItWorksPreview } from "@/components/how-it-works-preview"
import { CallToAction } from "@/components/call-to-action"
import CircularGallery from "@/components/animations/circular-gallery"
import { PetCardSkeleton } from "@/components/skeletons/card-skeletons" // Updated import
import { toast } from "sonner"
import type { Pet, PetfinderAnimal } from "@/lib/types" // Updated import
import { mapPetfinderAnimalToInternalPet } from "@/lib/utils" // Updated import

export default function HomePage() {
  const [pets, setPets] = useState<Pet[]>([]) // Renamed state
  const [isLoadingPets, setIsLoadingPets] = useState(true) // Renamed loading state

  useEffect(() => {
    console.log("HomePage useEffect: Fetching pets..."); // Updated console message
    const fetchPetsForHomepage = async () => { // Renamed function
      setIsLoadingPets(true)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      try {
        const response = await fetch(`/api/pets?location=90210&limit=12&type=dog`, { signal: controller.signal });
        clearTimeout(timeoutId); // Clear timeout if fetch completes within time

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
        const fetchedPfAnimals: PetfinderAnimal[] = await response.json(); // Updated type
        // Map to internal Pet type and filter out pets without photos
        const mappedPets = fetchedPfAnimals
          .map(mapPetfinderAnimalToInternalPet) // Updated mapping function
          .filter(pet => pet.photos && pet.photos.length > 0); // Filter out pets without photos
        
        console.log("Fetched and mapped pets successfully:", mappedPets.length, "pets"); // Updated console message
        setPets(mappedPets); // Updated state
      } catch (error: any) {
        if (error.name === 'AbortError') {
          console.error("Fetch for pets timed out:", error); // Updated console message
          toast.error("Loading pets timed out. Please try refreshing the page."); // Updated toast message
        } else {
          console.error("Error fetching pets for homepage:", error); // Updated console message
          toast.error("Failed to load some furry friends for the homepage."); // Updated toast message
        }
        setPets([]); // Ensure pets array is empty on error
      } finally {
        setIsLoadingPets(false);
        console.log("Finished fetching pets. isLoadingPets set to false."); // Updated console message
      }
    };

    fetchPetsForHomepage();
  }, []);

  // Map the fetched Pet data to the format required by CircularGallery
  const galleryItems = pets.map(pet => ({ // Renamed variable
    image: pet.photos[0]?.medium || pet.photos[0]?.small || "/placeholder.svg",
    text: pet.name,
  }));

  console.log("HomePage render: isLoadingPets =", isLoadingPets, "pets.length =", pets.length); // Updated console message
  console.log("Gallery items for CircularGallery:", galleryItems);

  return (
    <>
      <Hero />
      <section className="py-16 md:py-24 bg-background">
        {/* Title and description remain centered and contained */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">Meet Our Adoptable Pets</h2> {/* Updated text */}
          <p className="text-xl text-muted-foreground">Swipe to see more furry friends!</p>
        </div>

        {/* Circular Gallery container - now outside the max-width container */}
        <div className="w-full px-0" style={{ height: '600px', position: 'relative' }}>
          {isLoadingPets ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              {Array.from({ length: 6 }).map((_, index) => (
                <PetCardSkeleton key={index} />
              ))}
            </div>
          ) : pets.length > 0 ? (
            <CircularGallery
              items={galleryItems}
              bend={3}
              textColor="#ffffff"
              borderRadius={0.05}
              scrollEase={0.02}
            />
          ) : (
            <p className="text-muted-foreground text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">No pets available right now. Check back soon!</p>
          )}
        </div>
      </section>
      <HowItWorksPreview />
      <CallToAction />
    </>
  )
}