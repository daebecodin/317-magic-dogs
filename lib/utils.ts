import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { PetfinderDog } from "./petfinder"
import type { Dog } from "./types"

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
export function mapPetfinderDogToDog(pfDog: PetfinderDog): Dog {
  const characteristics: string[] = pfDog.tags || [];
  const health: string[] = [];
  if (pfDog.attributes.spayed_neutered) health.push("Spayed / Neutered");
  if (pfDog.attributes.shots_current) health.push("Vaccinations up to date");
  if (pfDog.attributes.special_needs) health.push("Special Needs");
  if (pfDog.attributes.house_trained) health.push("House Trained");

  const goodInHomeWith: string[] = [];
  if (pfDog.environment.children === true) goodInHomeWith.push("Children");
  if (pfDog.environment.dogs === true) goodInHomeWith.push("Other dogs");
  if (pfDog.environment.cats === true) goodInHomeWith.push("Cats");

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
    shelter: pfDog.contact.organization_id || `${pfDog.contact.address.city}, ${pfDog.contact.address.state}`,
    distance: pfDog.distance ? `${pfDog.distance.toFixed(1)} miles` : "N/A",
    urgent: false, // Petfinder API doesn't have a direct 'urgent' flag, default to false
    characteristics: characteristics,
    health: health,
    goodInHomeWith: goodInHomeWith,
    adoptionFee: pfDog.adoption_fee,
  };
}