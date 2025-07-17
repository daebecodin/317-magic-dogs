"use client"
import { ShelterCard } from "@/components/shelter-card"
import { OrgCardSkeleton } from "@/components/skeletons/card-skeletons"
import type { Shelter } from "@/lib/types"

interface SheltersTabProps {
  shelters: Shelter[]
  isLoading: boolean
}

export function SheltersTab({ shelters, isLoading }: SheltersTabProps) {
  const renderSkeletons = (count: number) =>
    Array(count)
      .fill(0)
      .map((_, index) => (
        <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
          <OrgCardSkeleton />
        </div>
      ))

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {isLoading
        ? renderSkeletons(4)
        : shelters.map((shelter, index) => (
            <div key={shelter.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
              <ShelterCard shelter={shelter} />
            </div>
          ))}
    </div>
  )
}