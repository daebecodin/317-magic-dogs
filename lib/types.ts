export type Dog = {
  id: number
  name: string
  breed: string
  age: string
  gender: "Male" | "Female"
  shelter: string
  distance: string
  photos: Array<{
    small: string;
    medium: string;
    large: string;
    full: string;
  }>;
  urgent: boolean
  description: string
  characteristics: string[]
  health: string[]
  goodInHomeWith: string[]
  adoptionFee: number | null
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