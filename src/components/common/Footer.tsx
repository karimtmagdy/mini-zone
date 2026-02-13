import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Github,
  Mail,
  MapPin,
  Phone,
  ArrowRight
} from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribe:", email);
    setEmail("");
  };

  const footerLinks = {
    product: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Documentation", href: "/docs" },
      { label: "API Reference", href: "/api" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Security", href: "/security" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Github, href: "https://github.com", label: "GitHub" },
  ];

  return (
    <footer className="relative bg-linear-to-br from-background via-background to-muted/20 border-t border-border/50">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/2 to-primary/5 pointer-events-none" />
      
      {/* Main footer content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Top section with logo and newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-border/50">
          {/* Brand and description */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <Link to="/" className="inline-block group">
                <h2 className="text-2xl lg:text-3xl font-bold bg-linear-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent transition-all duration-500 group-hover:scale-105">
                  MiniZone
                </h2>
              </Link>
              <p className="text-muted-foreground text-sm lg:text-base leading-relaxed max-w-md">
                Building the future of digital experiences. Join thousands of users who trust us to deliver innovative solutions.
              </p>
            </div>

            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 group">
                <div className="p-2 rounded-lg bg-muted/50 group-hover:bg-primary/10 transition-colors duration-300">
                  <Mail className="w-4 h-4" />
                </div>
                <span>contact@minizone.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 group">
                <div className="p-2 rounded-lg bg-muted/50 group-hover:bg-primary/10 transition-colors duration-300">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 group">
                <div className="p-2 rounded-lg bg-muted/50 group-hover:bg-primary/10 transition-colors duration-300">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>123 Business St, San Francisco, CA 94107</span>
              </div>
            </div>
          </div>

          {/* Newsletter signup */}
          <div className="lg:col-span-7 space-y-6">
            <div className="max-w-xl lg:ml-auto">
              <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Subscribe to our newsletter for the latest updates, features, and exclusive content.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1 group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 bg-background/50 border-border/50 focus:bg-background focus:border-primary/50 transition-all duration-300"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    size="lg"
                    className="group h-12 px-6 bg-primary hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                  >
                    Subscribe
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  By subscribing, you agree to our Privacy Policy and consent to receive updates.
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Middle section with links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
          {/* Product links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-foreground/90">
              Product
            </h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 inline-flex items-center group"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-foreground/90">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 inline-flex items-center group"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-foreground/90">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 inline-flex items-center group"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-foreground/90">
              Follow Us
            </h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="group relative p-2.5 rounded-lg bg-muted/50 hover:bg-primary/10 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/10"
                  >
                    <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} MiniZone. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                to="/accessibility"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Accessibility
              </Link>
              <Link
                to="/sitemap"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Sitemap
              </Link>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Made with</span>
                <span className="text-red-500 animate-pulse">❤️</span>
                <span>by the MiniZone Team</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
