import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Pet, PetfinderAnimal } from "./types" // Updated import

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Function to decode HTML entities
export function decodeHtmlEntities(text: string): string {
  if (typeof document !== 'undefined') {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  }
  // If running on the server (where 'document' is not defined), return the text as is.
  // The client-side rendering will handle the decoding once the component hydrates.
  return text;
}

// Utility function to map PetfinderAnimal to our internal Pet type
export function mapPetfinderAnimalToInternalPet(pfAnimal: PetfinderAnimal): Pet {
  return {
    id: pfAnimal.id,
    type: pfAnimal.type, // Map the animal type
    name: pfAnimal.name,
    breed: pfAnimal.breeds.primary,
    age: pfAnimal.age,
    gender: pfAnimal.gender,
    size: pfAnimal.size,
    photos: pfAnimal.photos,
    description: pfAnimal.description ? decodeHtmlEntities(pfAnimal.description) : "No description available.",
    url: pfAnimal.url,
    status: pfAnimal.status,
    shelter: pfAnimal.contact.organization_id || `${pfAnimal.contact.address.city}, ${pfAnimal.contact.address.state}`, // Use org ID or city/state
    distance: pfAnimal.distance ? `${pfAnimal.distance.toFixed(1)} miles` : "N/A",
    urgent: false, // Default to false, as Petfinder doesn't have this directly
    characteristics: pfAnimal.tags || [], // Mapped from Petfinder 'tags'
    health: [ // Mapped from Petfinder 'attributes'
      pfAnimal.attributes.spayed_neutered ? "Spayed / Neutered" : null,
      pfAnimal.attributes.shots_current ? "Vaccinations up to date" : null,
      pfAnimal.attributes.special_needs ? "Special Needs" : null,
      pfAnimal.attributes.house_trained ? "House Trained" : null,
    ].filter(Boolean) as string[],
    goodInHomeWith: [ // Mapped from Petfinder 'environment'
      pfAnimal.environment.children ? "Children" : null,
      pfAnimal.environment.dogs ? "Other pets (dogs)" : null, // Generalized
      pfAnimal.environment.cats ? "Other pets (cats)" : null, // Generalized
    ].filter(Boolean) as string[],
    adoptionFee: pfAnimal.adoption_fee,
  };
}