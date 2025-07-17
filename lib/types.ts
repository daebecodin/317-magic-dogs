export type Dog = {
  id: number
  name: string
  breed: string
  age: string
  gender: "Male" | "Female"
  shelter: string
  distance: string
  image: string
  urgent: boolean
  description: string
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