import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { MapPin, AlertTriangle, Calendar } from "lucide-react"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { GradientText } from "@/components/animations/gradient-text"
import { Separator } from "@/components/ui/separator"
import { PetfinderDog } from "@/lib/petfinder"

// Function to decode HTML entities
function decodeHtmlEntities(text: string): string {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

interface DogProfilePageProps {
  params: {
    id: string;
  };
}

export default async function DogProfilePage({ params }: DogProfilePageProps) {
  const { id } = params;
  let dog: PetfinderDog | null = null;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/dogs/${id}`);
    if (!response.ok) {
      console.error(`Failed to fetch dog data for ID ${id}:`, response.status, response.statusText);
      notFound();
    }
    dog = await response.json();
  } catch (error) {
    console.error(`Error fetching dog with ID ${id}:`, error);
    notFound();
  }

  if (!dog) {
    notFound();
  }

  const primaryBreed = dog.breeds.primary;
  const secondaryBreed = dog.breeds.secondary;
  const breedText = secondaryBreed && !dog.breeds.mixed ? `${primaryBreed}, ${secondaryBreed}` : primaryBreed;
  const locationText = `${dog.contact.address.city}, ${dog.contact.address.state}`;

  // Clean description
  const cleanedDescription = dog.description ? decodeHtmlEntities(dog.description) : "No description available.";

  // Determine image source, prioritizing medium, then small, then fallback
  const imageUrl = dog.photos[0]?.medium || dog.photos[0]?.small || "/placeholder.svg";

  return (
    <div className="py-12 md:py-24 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <GradientText showBorder={true} className="h-full" animationSpeed={5}>
          <Card className="overflow-hidden animate-fade-in-up border-none">
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-square bg-gradient-to-br from-blue-50 to-green-50">
                <Image
                  src={imageUrl}
                  alt={dog.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg"; // Fallback image on error
                  }}
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold">{dog.name}</h1>
                    <p className="text-lg text-muted-foreground">{breedText}</p>
                  </div>
                  {dog.status === "adoptable" && ( // Assuming 'urgent' status can be inferred or added later
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Adoptable
                    </Badge>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Age</Badge>
                    <span>{dog.age}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Gender</Badge>
                    <span>{dog.gender}</span>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">{cleanedDescription}</p>

                <Separator className="my-4" />

                <div className="space-y-3 text-sm pt-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{locationText}</span>
                  </div>
                  {/* Petfinder API does not directly provide 'distance' for a single animal lookup without a specific origin point */}
                  {/* <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{dog.distance} away</span>
                  </div> */}
                </div>
                <Button className="w-full mt-6" asChild>
                  <a href={dog.url} target="_blank" rel="noopener noreferrer">
                    View on Petfinder
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        </GradientText>
      </div>
    </div>
  )
}