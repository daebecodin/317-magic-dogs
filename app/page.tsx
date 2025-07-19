import { Hero } from "@/components/hero"
import { HowItWorksPreview } from "@/components/how-it-works-preview"
import { CallToAction } from "@/components/call-to-action"

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorksPreview />
      {/* Removed ImpactPreview component */}
      <CallToAction />
    </>
  )
}