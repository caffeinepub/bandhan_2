import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { CheckCircle, Heart, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function RegisterPage() {
  const { login, isLoggingIn, identity, isLoginError } = useInternetIdentity();
  const navigate = useNavigate();

  useEffect(() => {
    if (identity) {
      navigate({ to: "/complete-profile" });
    }
  }, [identity, navigate]);

  const BENEFITS = [
    "Create a detailed profile with photos",
    "Browse thousands of verified profiles",
    "Connect with compatible matches",
    "Personalized matchmaking assistance",
    "100% free to join",
  ];

  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-4 py-16">
      <motion.div
        className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left: Benefits */}
        <div className="bg-maroon rounded-2xl p-8 text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center">
                <Heart
                  className="w-5 h-5 text-maroon fill-maroon"
                  strokeWidth={0}
                />
              </div>
              <span className="font-display text-2xl font-bold">Bandhan</span>
            </div>
            <h2 className="font-display text-3xl font-bold mb-3">
              Start Your Journey to <span className="text-gold">Forever</span>
            </h2>
            <p className="text-white/70 text-sm leading-relaxed mb-8">
              Join millions of families who found their perfect match on
              Bandhan. Create your free profile and begin your love story.
            </p>
            <ul className="space-y-3">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-center gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-gold shrink-0" />
                  <span className="text-white/85">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-white/40 text-xs mt-8">
            Trusted by 5 Million+ families across India
          </p>
        </div>

        {/* Right: Register form */}
        <div className="bg-white rounded-2xl shadow-card p-8 flex flex-col justify-center">
          <h1 className="font-display text-2xl font-bold text-maroon mb-2">
            Create Free Account
          </h1>
          <p className="text-muted-foreground text-sm mb-8">
            Register using Internet Identity — secure, private, no passwords
            needed.
          </p>

          <Button
            className="w-full bg-maroon hover:bg-maroon-deep text-white h-12 text-base font-semibold rounded-xl mb-4"
            onClick={login}
            disabled={isLoggingIn}
            data-ocid="register.submit_button"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="mr-2 w-5 h-5 animate-spin" /> Creating
                Account...
              </>
            ) : (
              "Register with Internet Identity"
            )}
          </Button>

          {isLoginError && (
            <p
              className="text-destructive text-sm text-center"
              data-ocid="register.error_state"
            >
              Registration failed. Please try again.
            </p>
          )}

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-maroon font-semibold hover:underline"
              data-ocid="register.link"
            >
              Sign In
            </Link>
          </p>

          <p className="text-xs text-muted-foreground text-center mt-4 leading-relaxed">
            By registering, you agree to our{" "}
            <a href="/" className="underline hover:text-maroon">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/" className="underline hover:text-maroon">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </motion.div>
    </main>
  );
}
