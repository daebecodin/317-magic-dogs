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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4 animate-fade-in-up text-center lg:text-left">
              <Badge variant="secondary" className="w-fit mx-auto lg:mx-0">
                🐕 Saving Lives Through Technology
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                <SplitText text="Saving Dogs Through" className="justify-center lg:justify-start" />
                <SplitText text="Smarter Rescue Matching" className="text-primary justify-center lg:justify-start" />
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                We connect at-risk dogs in high-kill shelters with a network of vetted, loving animal rescues. Together,
                we can give every dog a chance at a happy life.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up justify-center lg:justify-start" style={{ animationDelay: "200ms" }}>
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
            <div className="flex flex-wrap gap-8 pt-8 border-t animate-fade-in-up justify-center lg:justify-start" style={{ animationDelay: "300ms" }}>
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
            <div className="w-full aspect-video rounded-2xl shadow-2xl overflow-hidden relative z-10">
              <iframe
                title="Lowpoly Dogs Pack"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; fullscreen; xr-spatial-tracking"
                xr-spatial-tracking
                execution-while-out-of-viewport
                execution-while-not-rendered
                web-share
                className="w-full h-full transform scale-[1.5] origin-center pointer-events-none" // Scale to make dogs bigger and disable pointer events
                src="https://sketchfab.com/models/183ca044e42543a68fa0ec5ef9b7584d/embed?autostart=1&camera=0&preload=1&transparent=1&ui_hint=0"
              >
              </iframe>
            </div>
            <p className="text-xs font-normal mt-2 text-muted-foreground text-center">
              <a href="https://sketchfab.com/3d-models/lowpoly-dogs-pack-183ca044e42543a68fa0ec5ef9b7584d?utm_medium=embed&utm_campaign=share-popup&utm_content=183ca044e42543a68fa0ec5ef9b7584d" target="_blank" rel="nofollow" className="font-bold text-primary hover:underline"> Lowpoly Dogs Pack </a> by <a href="https://sketchfab.com/billl90?utm_medium=embed&utm_campaign=share-popup&utm_content=183ca044e42543a68fa0ec5ef9b7584d" target="_blank" rel="nofollow" className="font-bold text-primary hover:underline"> RedDeer </a> on <a href="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=183ca044e42543a68fa0ec5ef9b7584d" target="_blank" rel="nofollow" className="font-bold text-primary hover:underline">Sketchfab</a>
            </p>
            {/* Decorative elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-green-200/30 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}