import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  FileText,
  Handshake,
  MessageCircle,
  Search,
  UserPlus,
} from "lucide-react";
import { motion } from "motion/react";

const steps = [
  {
    step: 1,
    icon: UserPlus,
    title: "Register for Free",
    description:
      "Create your account using Internet Identity — no passwords, no data breaches. Your identity, secured by blockchain technology.",
  },
  {
    step: 2,
    icon: FileText,
    title: "Build Your Profile",
    description:
      "Complete your detailed profile in 5 easy steps: personal info, family background, education & career, location preferences, and a photo.",
  },
  {
    step: 3,
    icon: Search,
    title: "Browse Matches",
    description:
      "Explore thousands of verified profiles filtered by age, religion, city, and lifestyle. Our smart algorithm surfaces your most compatible matches first.",
  },
  {
    step: 4,
    icon: MessageCircle,
    title: "Connect & Communicate",
    description:
      "Send interest, exchange messages, and get to know your match in a safe, moderated environment. Your contact details stay private until you choose to share.",
  },
  {
    step: 5,
    icon: Handshake,
    title: "Meet & Begin Your Journey",
    description:
      "When the time feels right, take the connection offline. Millions of couples began their forever on Bandhan — yours could be next.",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen" data-ocid="how_it_works.page">
      {/* Hero */}
      <section className="bg-maroon text-white py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-gold/20 text-gold text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              Simple Steps
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              How Bandhan Works
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Finding your life partner should be a beautiful journey, not a
              chore. Here's how we make it simple.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gold/30 hidden md:block" />

            <div className="space-y-12">
              {steps.map((s, i) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex gap-6 items-start"
                >
                  {/* Icon circle */}
                  <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-maroon flex items-center justify-center shadow-lg">
                    <s.icon className="w-7 h-7 text-gold" />
                  </div>

                  <div className="pt-2">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold text-gold uppercase tracking-widest">
                        Step {s.step}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-maroon mb-2">
                      {s.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mt-16"
          >
            <h3 className="font-display text-2xl font-bold text-maroon mb-4">
              Ready to find your match?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join over 5 lakh families who found their perfect match on
              Bandhan.
            </p>
            <Link to="/register">
              <Button
                size="lg"
                className="bg-maroon hover:bg-maroon/90 text-white px-10"
                data-ocid="how_it_works.primary_button"
              >
                Get Started Free
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
