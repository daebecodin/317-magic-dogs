import { NextResponse } from 'next/server';
import { getAdoptableDogs, getAnimalById as getPetfinderAnimalById } from '@/lib/petfinder';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get('location');
  const limit = searchParams.get('limit');
  const id = searchParams.get('id');

  try {
    if (id) {
      const animal = await getPetfinderAnimalById(parseInt(id as string));
      if (animal) {
        return NextResponse.json(animal);
      } else {
        return new NextResponse('Animal not found', { status: 404 });
      }
    } else if (location) {
      const dogs = await getAdoptableDogs(location, limit ? parseInt(limit) : 48);
      return NextResponse.json(dogs);
    } else {
      return new NextResponse('Missing location or ID parameter', { status: 400 });
    }
  } catch (error) {
    console.error('API Route Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}