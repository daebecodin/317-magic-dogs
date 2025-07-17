import type { Metadata } from "next"
import PricingClientPage from "./PricingClientPage"

export const metadata: Metadata = {
  title: "Pricing - SafeDawgs",
  description: "Choose the right plan for your rescue organization or shelter. Flexible pricing to fit your needs.",
}

export default function PricingPage() {
  return <PricingClientPage />
}
