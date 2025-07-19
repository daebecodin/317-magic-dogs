const PETFINDER_API_KEY = process.env.PETFINDER_API_KEY || "s2CkkeMwAE6luISbtabkbE7hf4Ur0DGvNmuRQdJJ9MpN1eEpq3";
const PETFINDER_SECRET = process.env.PETFINDER_SECRET || "L8ZggyFRfYaMKgPJuA3RshPKMprcR3wIu3VSmghj";

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getPetfinderToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    console.log("Using cached Petfinder token.");
    return cachedToken.token;
  }

  console.log("Fetching new Petfinder token...");
  try {
    const response = await fetch("https://api.petfinder.com/v2/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${PETFINDER_API_KEY}&client_secret=${PETFINDER_SECRET}`,
      next: { revalidate: 3600 }, // Revalidate token every hour
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Petfinder token fetch failed:", response.status, response.statusText, errorData);
      throw new Error(`Failed to get Petfinder token: ${errorData.detail || response.statusText}`);
    }

    const data = await response.json();
    cachedToken = {
      token: data.access_token,
      expiresAt: Date.now() + data.expires_in * 1000 - 60000, // Cache for (expires_in - 60) seconds to be safe
    };
    console.log("Successfully fetched Petfinder token. Expires in:", data.expires_in, "seconds.");
    return data.access_token;
  } catch (error) {
    console.error("Error fetching Petfinder token:", error);
    throw error;
  }
}

import type { PetfinderAnimal } from "./types";

export async function getAdoptableAnimals(location: string, type: string = 'dog', limit = 48): Promise<PetfinderAnimal[]> {
  console.log(`Attempting to fetch adoptable ${type}s for location: ${location}`);
  try {
    const token = await getPetfinderToken();
    let apiUrl = `https://api.petfinder.com/v2/animals?location=${encodeURIComponent(location)}&limit=${limit}`;
    
    // If type is 'all', omit the type parameter from the URL
    if (type !== 'all') {
      apiUrl += `&type=${encodeURIComponent(type)}`;
    }

    console.log("Fetching animals from URL:", apiUrl);
    const response = await fetch(apiUrl,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { revalidate: 3600 }, // Revalidate animal data every hour
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Petfinder animals fetch failed:", response.status, response.statusText, errorData);
      throw new Error(`Failed to fetch adoptable animals: ${errorData.detail || response.statusText}`);
    }

    const data = await response.json();
    // Ensure data.animals is an array, otherwise return empty
    if (!data || !Array.isArray(data.animals)) {
      console.error("Petfinder API returned unexpected data structure for animals:", data);
      return []; 
    }
    console.log(`Successfully fetched ${data.animals.length} ${type}s.`);
    return data.animals;
  } catch (error) {
    console.error("Error fetching adoptable animals:", error);
    throw error;
  }
}

export async function getAnimalById(id: number): Promise<PetfinderAnimal | null> {
  console.log(`Attempting to fetch animal by ID: ${id}`);
  try {
    const token = await getPetfinderToken();
    const apiUrl = `https://api.petfinder.com/v2/animals/${id}`;
    console.log("Fetching animal from URL:", apiUrl);
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 3600 }, // Revalidate animal data every hour
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`Animal with ID ${id} not found.`);
        return null;
      }
      const errorData = await response.json();
      console.error(`Petfinder animal fetch failed for ID ${id}:`, response.status, response.statusText, errorData);
      throw new Error(`Failed to fetch animal by ID: ${errorData.detail || response.statusText}`);
    }

    const data = await response.json();
    // Ensure data.animal is an object, otherwise return null
    if (!data || typeof data.animal !== 'object' || data.animal === null) {
      console.error("Petfinder API returned unexpected data structure for single animal:", data);
      return null;
    }
    console.log(`Successfully fetched animal with ID ${id}.`);
    return data.animal;
  } catch (error) {
    console.error(`Error fetching animal by ID ${id}:`, error);
    throw error;
  }
}