import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { MapPin, AlertTriangle, Tag, PawPrint, Stethoscope, Home } from "lucide-react"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { GradientText } from "@/components/animations/gradient-text"
import { Separator } from "@/components/ui/separator"
import { getAnimalById, type PetfinderDog } from "@/lib/petfinder" // Import Petfinder API function
import type { Dog } from "@/lib/types" // Import our internal Dog type
import { decodeHtmlEntities } from "@/lib/utils" // Import utility function

interface DogProfilePageProps {
  params: {
    id: string;
  };
}

// Utility function to map PetfinderDog to our internal Dog type for the profile page
function mapPetfinderDogToInternalDogProfile(pfDog: PetfinderDog): Dog {
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

export default async function DogProfilePage({ params }: DogProfilePageProps) {
  const pfDog = await getAnimalById(parseInt(params.id));

  if (!pfDog) {
    notFound();
  }

  const dog = mapPetfinderDogToInternalDogProfile(pfDog);

  const imageUrl = dog.photos[0]?.medium || dog.photos[0]?.small || "/placeholder.svg";
  console.log(`DogProfilePage: Dog ${dog.name} (ID: ${dog.id}) using image URL: ${imageUrl}`);

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
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold">{dog.name}</h1>
                    <p className="text-lg text-muted-foreground">{dog.breed}</p>
                  </div>
                  {dog.urgent && ( // This 'urgent' flag is not from Petfinder API, will always be false unless custom logic is added
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Urgent
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
                <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">{dog.description}</p>

                <Separator className="my-4" />

                {dog.characteristics && dog.characteristics.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <PawPrint className="w-5 h-5 text-primary" />
                      About {dog.name} (Characteristics)
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {dog.characteristics.map((char, index) => (
                        <Badge key={index} variant="secondary">{char}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {dog.health && dog.health.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <Stethoscope className="w-5 h-5 text-primary" />
                      Health
                    </h3>
                    <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                      {dog.health.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {dog.goodInHomeWith && dog.goodInHomeWith.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <Home className="w-5 h-5 text-primary" />
                      Good in a home with
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {dog.goodInHomeWith.map((item, index) => (
                        <Badge key={index} variant="secondary">{item}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {dog.adoptionFee !== null && typeof dog.adoptionFee === 'number' && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <Tag className="w-5 h-5 text-primary" />
                      Adoption Fee
                    </h3>
                    <p className="text-2xl font-bold text-primary">${dog.adoptionFee.toFixed(2)}</p>
                  </div>
                )}

                <Separator className="my-4" />

                <div className="space-y-3 text-sm pt-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{dog.shelter}</span>
                  </div>
                  {/* Removed Calendar icon as 'distance' is not a date */}
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" /> {/* Re-using MapPin for distance */}
                    <span>{dog.distance} away</span>
                  </div>
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