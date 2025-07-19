export type PetfinderAnimal = {
  id: number;
  type: string; // e.g., 'Dog', 'Cat', 'Rabbit'
  name: string;
  breeds: {
    primary: string;
    secondary: string | null;
    mixed: boolean;
    unknown: boolean;
  };
  age: string;
  gender: string;
  size: string;
  photos: Array<{
    small: string;
    medium: string;
    large: string;
    full: string;
  }>;
  contact: {
    email: string | null;
    phone: string | null;
    address: {
      address1: string | null;
      address2: string | null;
      city: string;
      state: string;
      postcode: string;
      country: string;
    };
    organization_id?: string;
  };
  url: string;
  description: string | null;
  status: string;
  distance?: number;
  attributes: {
    spayed_neutered: boolean;
    house_trained: boolean;
    declawed: boolean | null;
    special_needs: boolean;
    shots_current: boolean;
  };
  environment: {
    children: boolean | null;
    dogs: boolean | null;
    cats: boolean | null;
  };
  tags: string[];
  adoption_fee: number | null;
};

export type Pet = {
  id: number
  type: string // e.g., 'Dog', 'Cat', 'Rabbit'
  name: string
  breed: string // Primary breed from Petfinder
  age: string
  gender: "Male" | "Female" | string // Petfinder can use "Unknown"
  size: string // From Petfinder
  photos: Array<{
    small: string;
    medium: string;
    large: string;
    full: string;
  }>;
  description: string | null // From Petfinder, will be cleaned
  url: string // From Petfinder, for external link
  status: string // From Petfinder (e.g., 'adoptable')

  // Custom fields, now mapped from Petfinder API
  shelter?: string // Name of the shelter/organization, derived from Petfinder data
  distance?: string // Distance, if available from Petfinder or calculated
  urgent?: boolean // Custom flag, not directly from Petfinder, but can be inferred or set
  characteristics?: string[] // Mapped from Petfinder 'tags'
  health?: string[] // Mapped from Petfinder 'attributes'
  goodInHomeWith?: string[] // Mapped from Petfinder 'environment'
  adoptionFee?: number | null // Mapped from Petfinder 'adoption_fee'
}

export type Shelter = {
  id: number
  name: string
  location: string
  distance: string
  dogsCount: number // This will remain dogsCount for now as per mock data
  urgentCount: number // This will remain urgentCount for now as per mock data
  phone: string
  email: string
  description: string
  lat: number
  lng: number
}

export type Rescue = {
  id: number
  name:string
  location: string
  distance: string
  capacity: number
  available: number
  phone: string
  email: string
  description: string
  lat: number
  lng: number
}