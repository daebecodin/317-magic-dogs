import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Dog, PetfinderDog } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Function to decode HTML entities
export function decodeHtmlEntities(text: string): string {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

// Utility function to map PetfinderDog to our internal Dog type
export function mapPetfinderDogToInternalDog(pfDog: PetfinderDog): Dog {
  return {
    id: pfDog.id,
    name: pfDog.name,
    breed: pfDog.breeds.primary,
    age: pfDog.age,
    gender: pfDog.gender,
    size: pfDog.size,
    photos: pfDog.photos,
    description: pfDog.description ? decodeHtmlEntities(pfDog.description) : "No description available.",
    url: pfDog.url,
    status: pfDog.status,
    shelter: pfDog.contact.organization_id || `${pfDog.contact.address.city}, ${pfDog.contact.address.state}`, // Use org ID or city/state
    distance: pfDog.distance ? `${pfDog.distance.toFixed(1)} miles` : "N/A",
    urgent: false, // Default to false, as Petfinder doesn't have this directly
    characteristics: pfDog.tags || [], // Mapped from Petfinder 'tags'
    health: [ // Mapped from Petfinder 'attributes'
      pfDog.attributes.spayed_neutered ? "Spayed / Neutered" : null,
      pfDog.attributes.shots_current ? "Vaccinations up to date" : null,
      pfDog.attributes.special_needs ? "Special Needs" : null,
      pfDog.attributes.house_trained ? "House Trained" : null,
    ].filter(Boolean) as string[],
    goodInHomeWith: [ // Mapped from Petfinder 'environment'
      pfDog.environment.children ? "Children" : null,
      pfDog.environment.dogs ? "Other dogs" : null,
      pfDog.environment.cats ? "Cats" : null,
    ].filter(Boolean) as string[],
    adoptionFee: pfDog.adoption_fee,
  };
}