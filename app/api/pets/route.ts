import { NextResponse } from 'next/server';
import { getAdoptableAnimals, getAnimalById } from '@/lib/petfinder'; // Updated import

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get('location');
  const limit = searchParams.get('limit');
  const id = searchParams.get('id');
  const type = searchParams.get('type'); // New: get animal type

  try {
    if (id) {
      const animal = await getAnimalById(parseInt(id as string));
      if (animal) {
        return NextResponse.json(animal);
      } else {
        return new NextResponse('Animal not found', { status: 404 });
      }
    } else if (location) {
      const animals = await getAdoptableAnimals(location, type || 'dog', limit ? parseInt(limit) : 48); // Pass type
      return NextResponse.json(animals);
    } else {
      return new NextResponse('Missing location or ID parameter', { status: 400 });
    }
  } catch (error) {
    console.error('API Route Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}