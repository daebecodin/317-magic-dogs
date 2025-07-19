const PETFINDER_API_KEY = process.env.PETFINDER_API_KEY;
const PETFINDER_SECRET = process.env.PETFINDER_SECRET;

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getPetfinderToken(): Promise<string> {
  if (!PETFINDER_API_KEY || !PETFINDER_SECRET) {
    console.error("Petfinder API Key or Secret is not set in environment variables.");
    throw new Error("Petfinder API credentials are not configured.");
  }

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
      console.error("Petfinder token fetch failed:", response.status, errorData);
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

import type { PetfinderDog } from "./types"; // Import PetfinderDog from types

export async function getAdoptableDogs(location: string, limit = 48): Promise<PetfinderDog[]> {
  console.log(`Attempting to fetch adoptable dogs for location: ${location}`);
  try {
    const token = await getPetfinderToken();
    const apiUrl = `https://api.petfinder.com/v2/animals?type=dog&location=${encodeURIComponent(location)}&limit=${limit}`;
    console.log("Fetching dogs from URL:", apiUrl);
    const response = await fetch(apiUrl,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { revalidate: 3600 }, // Revalidate dog data every hour
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Petfinder dogs fetch failed:", response.status, errorData);
      throw new Error(`Failed to fetch adoptable dogs: ${errorData.detail || response.statusText}`);
    }

    const data = await response.json();
    console.log(`Successfully fetched ${data.animals.length} dogs.`);
    return data.animals;
  } catch (error) {
    console.error("Error fetching adoptable dogs:", error);
    throw error;
  }
}

export async function getAnimalById(id: number): Promise<PetfinderDog | null> {
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
      console.error(`Petfinder animal fetch failed for ID ${id}:`, response.status, errorData);
      throw new Error(`Failed to fetch animal by ID: ${errorData.detail || response.statusText}`);
    }

    const data = await response.json();
    console.log(`Successfully fetched animal with ID ${id}.`);
    return data.animal;
  } catch (error) {
    console.error(`Error fetching animal by ID ${id}:`, error);
    throw error;
  }
}