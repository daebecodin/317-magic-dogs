"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { SplitText } from "@/components/animations/split-text"

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        url: string
        className?: string
      }
    }
  }
}

export function Hero() {
  const [mounted, setMounted] = useState(false)
  const [isSplineReady, setIsSplineReady] = useState(false)

  useEffect(() => {
    setMounted(true)

    const scriptId = "spline-viewer-script"
    let intervalId: ReturnType<typeof setInterval> | null = null
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    const attemptLogoRemoval = () => {
      const viewer = document.querySelector("spline-viewer")
      if (viewer?.shadowRoot) {
        const branding =
          viewer.shadowRoot.querySelector('[part="branding"]') || // legacy
          viewer.shadowRoot.querySelector('a[href*="spline.design"]') || // fallback
          viewer.shadowRoot.querySelector('div[class*="branding"]') // future-proof

        if (branding) {
          console.log("Spline branding found, removing...")
          branding.remove()
          if (intervalId) clearInterval(intervalId)
          if (timeoutId) clearTimeout(timeoutId)
          return true
        }
      }
      return false
    }

    if (document.getElementById(scriptId)) {
      setIsSplineReady(true)
      if (!attemptLogoRemoval()) {
        intervalId = setInterval(attemptLogoRemoval, 500)
        timeoutId = setTimeout(() => {
          if (intervalId) clearInterval(intervalId)
        }, 5000)
      }
    } else {
      const script = document.createElement("script")
      script.id = scriptId
      script.type = "module"
      script.src = "https://unpkg.com/@splinetool/viewer@1.10.33/build/spline-viewer.js"
      script.async = true

      script.onload = () => {
        console.log("Spline script loaded.")
        setIsSplineReady(true)
        intervalId = setInterval(attemptLogoRemoval, 500)
        timeoutId = setTimeout(() => {
          if (intervalId) clearInterval(intervalId)
        }, 10000)
      }

      script.onerror = () => {
        console.error("Failed to load Spline script.")
      }

      document.body.appendChild(script)
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  if (!mounted) return null

  return (
    <section className="relative py-12 md:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4 animate-fade-in-up text-center lg:text-left">
              <Badge variant="secondary" className="w-fit mx-auto lg:mx-0">
                🐾 Saving Lives Through Technology {/* Updated emoji */}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                <SplitText text="Helping Every Pet Find" className="justify-center lg:justify-start" /> {/* Updated text */}
                <SplitText text="Their Forever Home" className="text-primary justify-center lg:justify-start" /> {/* Updated text */}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                We connect at-risk pets in high-kill shelters with a network of vetted, loving animal rescues. Together, {/* Updated text */}
                we can give every pet a chance at a happy life. {/* Updated text */}
              </p>
            </div>

            <div
              className="flex flex-col sm:flex-row gap-4 animate-fade-in-up justify-center lg:justify-start"
              style={{ animationDelay: "200ms" }}
            >
              <Button size="lg" asChild className="group">
                <Link href="/explore"> {/* Updated link */}
                  Browse Pets {/* Updated text */}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/signup">For Shelters</Link>
              </Button>
            </div>

            {/* Removed the stats section */}
          </div>

          {/* Right - Spline 3D Model */}
          <div className="relative w-full h-[600px] animate-fade-in-up" style={{ animationDelay: "400ms" }}>
            {isSplineReady && (
              <spline-viewer
                url="https://prod.spline.design/SKxVlf1Budt1XkBJ/scene.splinecode"
                className="w-full h-full scale-110 pointer-events-none"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}