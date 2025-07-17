"use client"

import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { Icon } from "leaflet"
import type { Shelter, Rescue } from "@/lib/types"
import { Heart, Users } from "lucide-react"

interface InteractiveMapProps {
  shelters: Shelter[]
  rescues: Rescue[]
}

const shelterIcon = new Icon({
  iconUrl: "/shelter-marker.svg",
  iconSize: [32, 32],
})

const rescueIcon = new Icon({
  iconUrl: "/rescue-marker.svg",
  iconSize: [32, 32],
})

export default function InteractiveMap({ shelters, rescues }: InteractiveMapProps) {
  return (
    <MapContainer center={[37.7749, -122.4194]} zoom={10} scrollWheelZoom={false} className="w-full h-full rounded-xl">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {shelters.map((shelter) => (
        <Marker key={`shelter-${shelter.id}`} position={[shelter.lat, shelter.lng]} icon={shelterIcon}>
          <Popup>
            <div className="font-bold flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500" /> {shelter.name}
            </div>
            <p>{shelter.location}</p>
            <p>{shelter.dogsCount} dogs, {shelter.urgentCount} urgent</p>
          </Popup>
        </Marker>
      ))}
      {rescues.map((rescue) => (
        <Marker key={`rescue-${rescue.id}`} position={[rescue.lat, rescue.lng]} icon={rescueIcon}>
          <Popup>
            <div className="font-bold flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-500" /> {rescue.name}
            </div>
            <p>{rescue.location}</p>
            <p>{rescue.available} / {rescue.capacity} spaces available</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}