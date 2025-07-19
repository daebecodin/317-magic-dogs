import { NextResponse } from 'next/server';
import { getPetfinderToken, PetfinderDog } from '@/lib/petfinder';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Dog ID is required' }, { status: 400 });
  }

  try {
    const token = await getPetfinderToken();
    const apiUrl = `https://api.petfinder.com/v2/animals/${id}`;

    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 3600 }, // Revalidate dog data every hour
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Petfinder single dog fetch failed for ID ${id}:`, response.status, errorData);
      return NextResponse.json(
        { error: `Failed to fetch dog data: ${errorData.detail || response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const dog: PetfinderDog = data.animal;

    return NextResponse.json(dog);
  } catch (error) {
    console.error(`Error fetching dog with ID ${id}:`, error);
    return NextResponse.json(
      { error: 'Internal server error while fetching dog data.' },
      { status: 500 }
    );
  }
}