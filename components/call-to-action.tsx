import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Users, ArrowRight } from "lucide-react"
import { GradientText } from "@/components/animations/gradient-text"

export function CallToAction() {
  return (
    <section className="py-16 md:py-24 bg-primary/5">
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Save Lives?</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of shelters and rescues working together to give every dog a chance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <GradientText showBorder={true} animationSpeed={5}>
              <Card className="text-center h-full border-none">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">For Rescue Organizations</CardTitle>
                  <CardDescription>Connect with shelters in need and expand your impact</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" asChild>
                    <Link href="/signup">
                      Join as a Rescue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </GradientText>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-red-600" />
                </div>
                <CardTitle className="text-xl">For Shelters</CardTitle>
                <CardDescription>Find rescue partners and save more dogs</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" asChild>
                  <Link href="/signup">
                    Join as a Shelter
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Newsletter Signup */}
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle>Stay Updated</CardTitle>
              <CardDescription>Get the latest success stories and platform updates</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="flex gap-2">
                <Input type="email" placeholder="Enter your email" className="flex-1" />
                <Button type="submit">Subscribe</Button>
              </form>
              <p className="text-xs text-muted-foreground text-center mt-2">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}