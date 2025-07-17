"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Heart } from "lucide-react"
import type { Shelter } from "@/lib/types"

export function ShelterCard({ shelter }: { shelter: Shelter }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{shelter.name}</CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <MapPin className="w-4 h-4" />
              {shelter.location} • {shelter.distance}
            </CardDescription>
          </div>
          {shelter.urgentCount > 0 && <Badge variant="destructive">{shelter.urgentCount} Urgent</Badge>}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4 h-12 overflow-hidden">{shelter.description}</p>
        <div className="flex items-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4 text-red-500" />
            <span>{shelter.dogsCount} dogs</span>
          </div>
          <div className="flex items-center gap-1">
            <Phone className="w-4 h-4" />
            <span>{shelter.phone}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" className="flex-1">
            Connect
          </Button>
          <Button size="sm" variant="outline">
            <Mail className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}