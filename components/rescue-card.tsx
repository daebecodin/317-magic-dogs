"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Users } from "lucide-react"
import type { Rescue } from "@/lib/types"
import { GradientText } from "@/components/animations/gradient-text"

export function RescueCard({ rescue }: { rescue: Rescue }) {
  return (
    <GradientText showBorder={true} className="h-full" animationSpeed={5}>
      <Card className="hover:shadow-lg transition-shadow border-none">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{rescue.name}</CardTitle>
              <CardDescription className="flex items-center gap-1 mt-1">
                <MapPin className="w-4 h-4" />
                {rescue.location} • {rescue.distance}
              </CardDescription>
            </div>
            {rescue.available > 0 && <Badge variant="secondary">{rescue.available} Available</Badge>}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4 h-12 overflow-hidden">{rescue.description}</p>
          <div className="flex items-center gap-4 mb-4 text-sm">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-blue-500" />
              <span>
                {rescue.available}/{rescue.capacity} capacity
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>{rescue.phone}</span>
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
    </GradientText>
  )
}