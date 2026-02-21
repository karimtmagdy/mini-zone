import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@/assets/icon/icons";
import { useState } from "react";
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
  { icon: Icon.FacebookIcon, href: "https://facebook.com", label: "Facebook" },
  { icon: Icon.TwitterIcon, href: "https://twitter.com", label: "Twitter" },
  {
    icon: Icon.InstagramIcon,
    href: "https://instagram.com",
    label: "Instagram",
  },
  { icon: Icon.LinkedinIcon, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Icon.GithubIcon, href: "https://github.com", label: "GitHub" },
];
export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribe:", email);
    setEmail("");
  };

  return (
    <footer className="from-background via-background to-muted/20 border-border/50 relative border-t bg-linear-to-br">
      {/* Decorative gradient overlay */}
      <div className="via-primary/2 to-primary/5 pointer-events-none absolute inset-0 bg-linear-to-b from-transparent" />

      {/* Main footer content */}
      <div className="relative container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Top section with logo and newsletter */}
        <div className="border-border/50 grid grid-cols-1 gap-12 border-b pb-12 lg:grid-cols-12">
          {/* Brand and description */}
          <div className="space-y-6 lg:col-span-5">
            {/*  */}
            <div className="space-y-4">
              <Link to="/" className="group inline-block">
                <h2 className="from-primary via-primary/80 to-primary/60 bg-linear-to-r bg-clip-text text-2xl font-bold text-transparent transition-all duration-500 group-hover:scale-105 lg:text-3xl">
                  MiniZone
                </h2>
              </Link>
              <p className="text-muted-foreground max-w-md text-sm leading-relaxed lg:text-base">
                Building the future of digital experiences. Join thousands of
                users who trust us to deliver innovative solutions.
              </p>
            </div>
            <ContactInfo />
          </div>
          {/* Newsletter signup */}
          <NewsletterSubscribe
            handleSubscribe={handleSubscribe}
            email={email}
            setEmail={setEmail}
          />
        </div>

        {/* Middle section with links */}
        <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
          <ProductLinks />
          <CompanyLinks />
          <LegalLinks />
          <SocialMediaLinks />
        </div>
        <ButtomSection />
      </div>
    </footer>
  );
}
function SocialMediaLinks() {
  return (
    <div className="space-y-4">
      <h4 className="text-foreground/90 text-sm font-semibold tracking-wider uppercase">
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
              className="group bg-muted/50 hover:bg-primary/10 border-border/50 hover:border-primary/30 hover:shadow-primary/10 relative rounded-lg border p-2.5 transition-all duration-300 hover:scale-110 hover:shadow-lg"
            >
              <Icon className="text-muted-foreground group-hover:text-primary h-4 w-4 transition-colors duration-300" />
            </a>
          );
        })}
      </div>
    </div>
  );
}
function ButtomSection() {
  return (
    <div className="border-border/50 border-t pt-8">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-muted-foreground text-center text-sm md:text-left">
          © {new Date().getFullYear()} MiniZone. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <Link
            to="/accessibility"
            className="text-muted-foreground hover:text-primary text-sm transition-colors duration-300"
          >
            Accessibility
          </Link>
          <Link
            to="/sitemap"
            className="text-muted-foreground hover:text-primary text-sm transition-colors duration-300"
          >
            Sitemap
          </Link>
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <span>Made with</span>
            <span className="animate-pulse">❤️</span>
            <span>by the MiniZone Team</span>
          </div>
        </div>
      </div>
    </div>
  );
}
function LegalLinks() {
  return (
    <div className="space-y-4">
      <h4 className="text-foreground/90 text-sm font-semibold tracking-wider uppercase">
        Legal
      </h4>
      <ul className="space-y-3">
        {footerLinks.legal.map((link) => (
          <li key={link.label}>
            <Link
              to={link.href}
              className="text-muted-foreground hover:text-primary group inline-flex items-center text-sm transition-colors duration-300"
            >
              <span className="relative">
                {link.label}
                <span className="bg-primary absolute -bottom-0.5 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
function ContactInfo() {
  return (
    <div className="space-y-3">
      <div className="text-muted-foreground hover:text-foreground group flex items-center gap-3 text-sm transition-colors duration-300">
        <div className="bg-muted/50 group-hover:bg-primary/10 rounded-lg p-2 transition-colors duration-300">
          <Icon.MailIcon />
        </div>
        <span>contact@minizone.com</span>
      </div>
      <div className="text-muted-foreground hover:text-foreground group flex items-center gap-3 text-sm transition-colors duration-300">
        <div className="bg-muted/50 group-hover:bg-primary/10 rounded-lg p-2 transition-colors duration-300">
          <Icon.PhoneIcon />
        </div>
        <span>+1 (555) 123-4567</span>
      </div>
      <div className="text-muted-foreground hover:text-foreground group flex items-center gap-3 text-sm transition-colors duration-300">
        <div className="bg-muted/50 group-hover:bg-primary/10 rounded-lg p-2 transition-colors duration-300">
          <Icon.MapPinIcon />
        </div>
        <span>123 Business St, San Francisco, CA 94107</span>
      </div>
    </div>
  );
}
function CompanyLinks() {
  return (
    <div className="space-y-4">
      <h4 className="text-foreground/90 text-sm font-semibold tracking-wider uppercase">
        Company
      </h4>
      <ul className="space-y-3">
        {footerLinks.company.map((link) => (
          <li key={link.label}>
            <Link
              to={link.href}
              className="text-muted-foreground hover:text-primary group inline-flex items-center text-sm transition-colors duration-300"
            >
              <span className="relative">
                {link.label}
                <span className="bg-primary absolute -bottom-0.5 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
function ProductLinks() {
  return (
    <div className="space-y-4">
      <h4 className="text-foreground/90 text-sm font-semibold tracking-wider uppercase">
        Product
      </h4>
      <ul className="space-y-3">
        {footerLinks.product.map((link) => (
          <li key={link.label}>
            <Link
              to={link.href}
              className="text-muted-foreground hover:text-primary group inline-flex items-center text-sm transition-colors duration-300"
            >
              <span className="relative">
                {link.label}
                <span className="bg-primary absolute -bottom-0.5 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
function NewsletterSubscribe({ handleSubscribe, email, setEmail }: any) {
  return (
    <div className="space-y-6 lg:col-span-7">
      <div className="max-w-xl lg:ml-auto">
        <h3 className="mb-2 text-lg font-semibold">Stay Updated</h3>
        <p className="text-muted-foreground mb-6 text-sm">
          Subscribe to our newsletter for the latest updates, features, and
          exclusive content.
        </p>
        <form onSubmit={handleSubscribe} className="space-y-3">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="group relative flex-1">
              <Icon.MailIcon className="text-muted-foreground group-focus-within:text-primary absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transition-colors" />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/50 border-border/50 focus:bg-background focus:border-primary/50 h-12 pl-10 transition-all duration-300"
                required
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="group bg-primary hover:bg-primary/90 hover:shadow-primary/20 h-12 px-6 transition-all duration-300 hover:shadow-lg"
            >
              Subscribe
              <Icon.ArrowRightIcon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
          <p className="text-muted-foreground text-xs">
            By subscribing, you agree to our Privacy Policy and consent to
            receive updates.
          </p>
        </form>
      </div>
    </div>
  );
}
