import { Hero } from "@/components/hero"
import { HowItWorksPreview } from "@/components/how-it-works-preview"
import { ImpactPreview } from "@/components/impact-preview"
import { CallToAction } from "@/components/call-to-action"

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorksPreview />
      <ImpactPreview />
      <CallToAction />
    </>
  )
}
