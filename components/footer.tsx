import Link from "next/link"
import { Heart, Mail, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  const footerLinks = {
    platform: [
      { name: "How It Works", href: "/how-it-works" },
      { name: "Pricing", href: "/pricing" },
      { name: "Nearby", href: "/nearby" },
      { name: "Dashboard", href: "/dashboard" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Impact", href: "/impact" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Contact", href: "/contact" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  }

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Heart className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">OnlyPets</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              Connecting at-risk dogs in high-kill shelters with vetted, loving rescue organizations. Together, we can
              give every dog a chance at a happy life.
            </p>

            {/* Newsletter */}
            <div className="space-y-2">
              <h4 className="font-semibold">Join the Mission</h4>
              <form className="flex gap-2">
                <Input type="email" placeholder="Your email" className="max-w-xs" />
                <Button type="submit" size="sm">
                  <Mail className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Discord Link */}
            <div className="mt-6">
              <Button variant="outline" size="sm" asChild>
                <Link href="https://discord.gg/onlypets" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Join Discord
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">© {new Date().getFullYear()} OnlyPets. All Rights Reserved.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className="text-sm text-muted-foreground">Made with</span>
            <Heart className="w-4 h-4 text-red-500" />
            <span className="text-sm text-muted-foreground">for dogs everywhere</span>
          </div>
        </div>
      </div>
    </footer>
  )
}