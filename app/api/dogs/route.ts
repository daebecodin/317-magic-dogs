import { NextResponse } from "next/server";
import { getAdoptableDogs } from "@/lib/petfinder";
import { mapPetfinderDogToDog } from "@/lib/utils";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get("location") || "San Francisco, CA";
  const limit = parseInt(searchParams.get("limit") || "48", 10);

  try {
    const pfDogs = await getAdoptableDogs(location, limit);
    const dogs = pfDogs.map(mapPetfinderDogToDog);
    return NextResponse.json(dogs);
  } catch (error) {
    console.error("API Route /api/dogs: Error fetching dogs:", error);
    return NextResponse.json({ message: "Failed to fetch dogs", error: (error as Error).message }, { status: 500 });
  }
}