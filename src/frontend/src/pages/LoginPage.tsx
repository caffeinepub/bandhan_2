import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Heart, Loader2, Shield, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function LoginPage() {
  const { login, isLoggingIn, identity, isLoginError } = useInternetIdentity();
  const { actor, isFetching } = useActor();
  const navigate = useNavigate();

  useEffect(() => {
    if (!identity || isFetching || !actor) return;
    actor.isProfileComplete().then((complete) => {
      if (complete) {
        navigate({ to: "/browse" });
      } else {
        navigate({ to: "/complete-profile" });
      }
    });
  }, [identity, actor, isFetching, navigate]);

  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-4 py-16">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-card p-8 md:p-10">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-full bg-maroon flex items-center justify-center shadow-md mb-3">
              <Heart className="w-7 h-7 text-gold fill-gold" strokeWidth={0} />
            </div>
            <h1 className="font-display text-3xl font-bold text-maroon">
              Welcome Back
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Sign in to continue your journey
            </p>
          </div>

          {/* Auth button */}
          <Button
            className="w-full bg-maroon hover:bg-maroon-deep text-white h-12 text-base font-semibold rounded-xl"
            onClick={login}
            disabled={isLoggingIn}
            data-ocid="login.submit_button"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="mr-2 w-5 h-5 animate-spin" /> Signing In...
              </>
            ) : (
              "Sign In with Internet Identity"
            )}
          </Button>

          {isLoginError && (
            <p
              className="text-destructive text-sm text-center mt-3"
              data-ocid="login.error_state"
            >
              Login failed. Please try again.
            </p>
          )}

          {/* Features */}
          <div className="mt-8 pt-6 border-t border-border space-y-3">
            {[
              { icon: Shield, text: "Secure & privacy-first authentication" },
              { icon: Sparkles, text: "Access thousands of verified profiles" },
              { icon: Heart, text: "Start your matchmaking journey" },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-3 text-sm text-muted-foreground"
              >
                <Icon className="w-4 h-4 text-maroon shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            New to Bandhan?{" "}
            <Link
              to="/register"
              className="text-maroon font-semibold hover:underline"
              data-ocid="login.link"
            >
              Register Free
            </Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
}
