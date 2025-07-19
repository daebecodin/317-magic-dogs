import { NextResponse } from 'next/server';
import { getAdoptableAnimals, getAnimalById } from '@/lib/petfinder';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get('location');
  const limit = searchParams.get('limit');
  const id = searchParams.get('id');
  const type = searchParams.get('type');

  try {
    if (id) {
      const animal = await getAnimalById(parseInt(id as string));
      if (animal) {
        return NextResponse.json(animal);
      } else {
        // If animal is null (not found or error in getAnimalById)
        return new NextResponse('Animal not found or could not be fetched', { status: 404 });
      }
    } else if (location) {
      const animals = await getAdoptableAnimals(location, type || 'dog', limit ? parseInt(limit) : 48);
      // Ensure animals is an array, even if getAdoptableAnimals returns empty or null
      return NextResponse.json(animals || []);
    } else {
      return new NextResponse('Missing location or ID parameter', { status: 400 });
    }
  } catch (error: any) {
    console.error('API Route Error:', error.message || error);
    // Return a more specific error message if possible, or a generic one
    return new NextResponse(`Internal Server Error: ${error.message || 'Unknown API error'}`, { status: 500 });
  }
}