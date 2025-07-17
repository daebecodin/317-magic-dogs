import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Heart, Users } from "lucide-react"
import Image from "next/image"
import { CountUp } from "@/components/animations/count-up"
import { SplitText } from "@/components/animations/split-text"

export function Hero() {
  return (
    <section className="relative py-12 md:py-24 lg:py-32 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 -z-10" />

      <div className="container px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4 animate-fade-in-up">
              <Badge variant="secondary" className="w-fit">
                🐕 Saving Lives Through Technology
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                <SplitText text="Saving Dogs Through" />
                <SplitText text="Smarter Rescue Matching" className="text-primary" />
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                We connect at-risk dogs in high-kill shelters with a network of vetted, loving animal rescues. Together,
                we can give every dog a chance at a happy life.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              <Button size="lg" asChild className="group">
                <Link href="/signup">
                  For Rescues
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/signup">For Shelters</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8 border-t animate-fade-in-up" style={{ animationDelay: "300ms" }}>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    <CountUp to={1247} />
                  </div>
                  <div className="text-sm text-muted-foreground">Dogs Saved</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    <CountUp to={245} />
                  </div>
                  <div className="text-sm text-muted-foreground">Partner Organizations</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div className="relative z-10">
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="Happy rescued dogs"
                width={600}
                height={600}
                className="rounded-2xl object-cover shadow-2xl"
                priority
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-green-200/30 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}