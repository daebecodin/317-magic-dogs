"use client"
import { RescueCard } from "@/components/rescue-card"
import { OrgCardSkeleton } from "@/components/skeletons/card-skeletons"
import type { Rescue } from "@/lib/types"

interface RescuesTabProps {
  rescues: Rescue[]
  isLoading: boolean
}

export function RescuesTab({ rescues, isLoading }: RescuesTabProps) {
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
        : rescues.map((rescue, index) => (
            <div key={rescue.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
              <RescueCard rescue={rescue} />
            </div>
          ))}
    </div>
  )
}