import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function OrgCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-3/5" />
        <Skeleton className="h-4 w-2/5 mt-1" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-9 w-9" />
        </div>
      </CardContent>
    </Card>
  )
}

export function DogCardSkeleton() {
  return (
    <Card className="h-full flex flex-col">
      <Skeleton className="aspect-square w-full rounded-t-lg" />
      <CardContent className="p-4 flex flex-col flex-grow space-y-3">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-6 w-16" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <div className="flex-grow" />
        <Skeleton className="h-9 w-full mt-4" />
      </CardContent>
    </Card>
  )
}