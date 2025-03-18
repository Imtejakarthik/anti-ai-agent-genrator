import Link from "next/link"
import { Bot } from "lucide-react"
import { productLinks, resourceLinks, companyLinks, socialLinks } from "@/constants/navigation"
import { Icon, type IconName } from "@/components/ui/icon"

export default function Footer() {
  return (
      <footer className="border-t border-border/30 bg-background/50 backdrop-blur-sm relative">
        {/* Background Elements */}
        <div
            className="absolute inset-0 opacity-20 z-0"
            style={{
              backgroundImage:
                  "linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px), linear-gradient(to right, hsl(var(--primary) / 0.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background/80 z-0" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand and Social */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <Bot className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">AgentBuilder</span>
              </Link>
              <p className="text-muted-foreground mb-6 max-w-md">
                The complete platform for building AI agents powered by the latest LLMs. Create, deploy, and scale AI
                solutions without code.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className="text-muted-foreground hover:text-primary p-2 rounded-full hover:bg-primary/10 transform hover:scale-110 transition-all duration-300"
                        aria-label={link.name}
                    >
                      <Icon name={link.icon as IconName} />
                    </Link>
                ))}
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-3">
                {productLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                          href={link.href}
                          className="text-muted-foreground hover:text-primary transition-colors relative group"
                      >
                        {link.name}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                      </Link>
                    </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-3">
                {resourceLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                          href={link.href}
                          className="text-muted-foreground hover:text-primary transition-colors relative group"
                      >
                        {link.name}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                      </Link>
                    </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                          href={link.href}
                          className="text-muted-foreground hover:text-primary transition-colors relative group"
                      >
                        {link.name}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                      </Link>
                    </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-border/30 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © {new Date().getFullYear()} AgentBuilder. All rights reserved.
            </p>
            <div className="flex gap-6"></div>
          </div>
        </div>
      </footer>
  )
}

