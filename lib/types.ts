export type Dog = {
  id: number
  name: string
  breed: string // Primary breed from Petfinder
  age: string
  gender: "Male" | "Female" | string // Petfinder uses "Male", "Female", "Unknown"
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

  // Custom fields, might not come directly from Petfinder API
  shelter?: string // Name of the shelter/organization, derived from Petfinder data
  distance?: string // Distance, if available from Petfinder or calculated
  urgent?: boolean // Custom flag, not directly from Petfinder
  characteristics?: string[]
  health?: string[]
  goodInHomeWith?: string[]
  adoptionFee?: number | null
}

export type Shelter = {
  id: number
  name: string
  location: string
  distance: string
  dogsCount: number
  urgentCount: number
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