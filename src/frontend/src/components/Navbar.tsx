import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { Crown, Heart, Menu, MessageCircle, Shield, X } from "lucide-react";
import { useState } from "react";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function Navbar() {
  const { clear, identity, isLoggingIn } = useInternetIdentity();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { actor, isFetching } = useActor();

  const isLoggedIn = !!identity;

  const { data: isAdmin } = useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching && isLoggedIn,
  });

  const handleLogout = () => {
    clear();
    navigate({ to: "/" });
  };

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Search", to: "/browse" },
    { label: "Profiles", to: "/my-profile" },
    { label: "Success Stories", to: "/success-stories" },
    { label: "Premium", to: "/membership" },
    { label: "Help", to: "/help" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-border">
      {/* Announcement bar */}
      <div className="bg-maroon text-white text-center py-1.5 px-4 text-sm font-sans">
        ✨ Premium Indian Matrimonial Matchmaking Website
      </div>

      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 shrink-0"
          data-ocid="nav.link"
        >
          <div className="w-9 h-9 rounded-full bg-maroon flex items-center justify-center shadow-md">
            <Heart className="w-5 h-5 text-gold fill-gold" strokeWidth={0} />
          </div>
          <span className="font-display text-2xl font-bold text-maroon">
            Bandhan
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                to={link.to}
                className="text-sm font-medium text-foreground hover:text-maroon transition-colors"
                data-ocid="nav.link"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth actions */}
        <div className="hidden lg:flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <Link to="/browse" data-ocid="nav.link">
                <Button
                  variant="ghost"
                  className="text-maroon hover:text-maroon hover:bg-secondary"
                >
                  Browse
                </Button>
              </Link>
              <Link to="/messages" data-ocid="nav.link">
                <Button
                  variant="ghost"
                  className="text-maroon hover:text-maroon hover:bg-secondary gap-1.5"
                >
                  <MessageCircle className="w-4 h-4" /> Messages
                </Button>
              </Link>
              <Link to="/membership" data-ocid="nav.link">
                <Button
                  variant="ghost"
                  className="text-gold hover:text-gold hover:bg-secondary gap-1.5"
                >
                  <Crown className="w-4 h-4" /> Membership
                </Button>
              </Link>
              {isAdmin && (
                <Link to="/admin" data-ocid="nav.link">
                  <Button
                    variant="ghost"
                    className="text-maroon hover:text-maroon hover:bg-secondary gap-1.5"
                  >
                    <Shield className="w-4 h-4" /> Admin
                  </Button>
                </Link>
              )}
              <Link to="/my-profile" data-ocid="nav.link">
                <Button
                  variant="ghost"
                  className="text-maroon hover:text-maroon hover:bg-secondary"
                >
                  My Profile
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-maroon text-maroon hover:bg-maroon hover:text-white"
                onClick={handleLogout}
                data-ocid="nav.button"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" data-ocid="nav.link">
                <Button
                  variant="outline"
                  className="border-maroon text-maroon hover:bg-maroon hover:text-white rounded-full px-6"
                >
                  Login
                </Button>
              </Link>
              <Link to="/register" data-ocid="nav.link">
                <Button className="bg-maroon hover:bg-maroon-deep text-white rounded-full px-6">
                  Register Free
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="lg:hidden p-2 text-maroon"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          data-ocid="nav.toggle"
        >
          {mobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-border px-4 pb-4">
          <ul className="flex flex-col gap-1 py-2">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="block px-3 py-2 text-sm font-medium rounded-md hover:bg-secondary text-foreground hover:text-maroon"
                  onClick={() => setMobileOpen(false)}
                  data-ocid="nav.link"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2 pt-2 border-t border-border">
            {isLoggedIn ? (
              <>
                <Link
                  to="/messages"
                  onClick={() => setMobileOpen(false)}
                  data-ocid="nav.link"
                >
                  <Button
                    variant="outline"
                    className="w-full border-maroon text-maroon gap-2"
                  >
                    <MessageCircle className="w-4 h-4" /> Messages
                  </Button>
                </Link>
                <Link
                  to="/membership"
                  onClick={() => setMobileOpen(false)}
                  data-ocid="nav.link"
                >
                  <Button
                    variant="outline"
                    className="w-full border-gold text-gold gap-2"
                  >
                    <Crown className="w-4 h-4" /> Membership
                  </Button>
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileOpen(false)}
                    data-ocid="nav.link"
                  >
                    <Button
                      variant="outline"
                      className="w-full border-maroon text-maroon gap-2"
                    >
                      <Shield className="w-4 h-4" /> Admin Panel
                    </Button>
                  </Link>
                )}
                <Link
                  to="/my-profile"
                  onClick={() => setMobileOpen(false)}
                  data-ocid="nav.link"
                >
                  <Button
                    variant="outline"
                    className="w-full border-maroon text-maroon"
                  >
                    My Profile
                  </Button>
                </Link>
                <Button
                  className="w-full bg-maroon text-white"
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                  data-ocid="nav.button"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  data-ocid="nav.link"
                >
                  <Button
                    variant="outline"
                    className="w-full border-maroon text-maroon"
                  >
                    Login
                  </Button>
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  data-ocid="nav.link"
                >
                  <Button
                    className="w-full bg-maroon text-white"
                    disabled={isLoggingIn}
                  >
                    Register Free
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
