import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { SiFacebook, SiInstagram, SiX, SiYoutube } from "react-icons/si";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="bg-maroon text-white">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-gold flex items-center justify-center">
                <Heart
                  className="w-5 h-5 text-maroon fill-maroon"
                  strokeWidth={0}
                />
              </div>
              <span className="font-display text-2xl font-bold text-white">
                Bandhan
              </span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-4 max-w-xs">
              India's most trusted matrimonial platform. Connecting hearts and
              families across the nation with verified profiles and personalized
              matchmaking.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="/"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold/80 transition-colors"
                aria-label="Facebook"
              >
                <SiFacebook className="w-4 h-4" />
              </a>
              <a
                href="/"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold/80 transition-colors"
                aria-label="Instagram"
              >
                <SiInstagram className="w-4 h-4" />
              </a>
              <a
                href="/"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold/80 transition-colors"
                aria-label="X"
              >
                <SiX className="w-4 h-4" />
              </a>
              <a
                href="/"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold/80 transition-colors"
                aria-label="YouTube"
              >
                <SiYoutube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-gold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link to="/about" className="hover:text-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/how-it-works"
                  className="hover:text-gold transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  to="/success-stories"
                  className="hover:text-gold transition-colors"
                >
                  Success Stories
                </Link>
              </li>
              <li>
                <Link
                  to="/membership"
                  className="hover:text-gold transition-colors"
                >
                  Premium Plans
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="hover:text-gold transition-colors"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-semibold text-gold mb-4">
              Support
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link to="/help" className="hover:text-gold transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-gold transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-gold transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/safety"
                  className="hover:text-gold transition-colors"
                >
                  Safety Tips
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-gold transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-4">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/50">
          <span>© {currentYear} Bandhan. All rights reserved.</span>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/80 transition-colors"
          >
            Built with{" "}
            <Heart
              className="inline w-3 h-3 text-gold fill-gold mx-0.5"
              strokeWidth={0}
            />{" "}
            using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
