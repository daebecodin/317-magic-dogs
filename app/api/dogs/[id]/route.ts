import { NextResponse } from "next/server";
import { getAnimalById } from "@/lib/petfinder";
import { mapPetfinderDogToDog } from "@/lib/utils";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);

  if (isNaN(id)) {
    return NextResponse.json({ message: "Invalid dog ID" }, { status: 400 });
  }

  try {
    const pfDog = await getAnimalById(id);

    if (!pfDog) {
      return NextResponse.json({ message: "Dog not found" }, { status: 404 });
    }

    const dog = mapPetfinderDogToDog(pfDog);
    return NextResponse.json(dog);
  } catch (error) {
    console.error(`API Route /api/dogs/${id}: Error fetching dog:`, error);
    return NextResponse.json({ message: "Failed to fetch dog details", error: (error as Error).message }, { status: 500 });
  }
}