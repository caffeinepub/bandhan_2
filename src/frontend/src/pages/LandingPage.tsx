import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ChevronRight,
  Heart,
  Shield,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import ProfileCard from "../components/ProfileCard";
import { SAMPLE_PROFILES, SUCCESS_STORIES } from "../data/sampleProfiles";

const FEATURES = [
  {
    icon: Shield,
    title: "Verified Profiles",
    description:
      "Every profile is manually reviewed and verified for authenticity and safety.",
  },
  {
    icon: Users,
    title: "Personal Matchmakers",
    description:
      "Our expert team provides personalized assistance to find your ideal match.",
  },
  {
    icon: Sparkles,
    title: "Modern Technology",
    description:
      "Smart algorithms powered by AI help you find compatible matches faster.",
  },
];

export default function LandingPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-bandhan.dim_1920x900.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />

        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            className="max-w-xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Badge className="bg-gold/20 text-gold border-gold/40 mb-4">
              <Heart className="w-3 h-3 mr-1 fill-gold" strokeWidth={0} /> #1
              Matrimonial Platform
            </Badge>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              Find Your <span className="text-gold">Perfect</span> Life Partner
            </h1>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Join millions of families who trust Bandhan for their most
              important decision. Verified profiles, personal matchmakers, and a
              journey guided by love.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <Button
                  size="lg"
                  className="bg-gold hover:bg-gold/90 text-white font-semibold px-8 shadow-gold"
                  data-ocid="hero.primary_button"
                >
                  Get Started — Free Registration
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/browse">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-8"
                  data-ocid="hero.secondary_button"
                >
                  Browse Profiles
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-10">
              {[
                { value: "5M+", label: "Members" },
                { value: "150K+", label: "Marriages" },
                { value: "98%", label: "Verified" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-gold font-display text-2xl font-bold">
                    {stat.value}
                  </div>
                  <div className="text-white/60 text-xs">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Bandhan */}
      <section className="py-6 px-4">
        <div className="container mx-auto">
          <motion.div
            className="bg-maroon rounded-2xl p-8 md:p-10 shadow-maroon -mt-16 relative z-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white text-center mb-8">
              Why Choose <span className="text-gold">Bandhan?</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {FEATURES.map((feature) => (
                <div
                  key={feature.title}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center mb-4">
                    <feature.icon className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/65 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Profiles */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm font-medium text-gold mb-1 uppercase tracking-widest">
                Discover
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Featured Profiles
              </h2>
            </div>
            <Link to="/browse" data-ocid="profiles.link">
              <Button
                variant="outline"
                className="border-maroon text-maroon hover:bg-maroon hover:text-white"
              >
                View All
                <ChevronRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SAMPLE_PROFILES.map((profile, i) => (
              <motion.div
                key={profile.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <ProfileCard {...profile} index={i + 1} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 px-4 bg-cream" id="success">
        <div className="container mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm font-medium text-gold mb-1 uppercase tracking-widest">
                Testimonials
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Success Stories
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SUCCESS_STORIES.map((story, i) => (
              <motion.div
                key={story.id}
                className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                data-ocid={`stories.item.${i + 1}`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={story.imageUrl}
                    alt={story.coupleName}
                    className="w-14 h-14 rounded-full object-cover bg-secondary"
                  />
                  <div>
                    <h4 className="font-display font-semibold text-foreground">
                      {story.coupleName}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {story.location}
                    </p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {["1", "2", "3", "4", "5"].map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4 text-gold fill-gold"
                      strokeWidth={0}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed italic mb-3">
                  "{story.story}"
                </p>
                <p className="text-xs font-medium text-gold">{story.date}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section
        className="py-20 px-4 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.28 0.12 15) 0%, oklch(0.22 0.11 15) 100%)",
        }}
      >
        {/* Decorative pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative z-10 container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Heart
              className="w-10 h-10 text-gold fill-gold mx-auto mb-4"
              strokeWidth={0}
            />
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
              Ready to Find Your Match?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              Join thousands of happy couples who found their life partner on
              Bandhan. Start your journey today — it's completely free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button
                  size="lg"
                  className="bg-gold hover:bg-gold/90 text-white px-10 shadow-gold"
                  data-ocid="cta.primary_button"
                >
                  Create Free Profile
                </Button>
              </Link>
              <Link to="/browse">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-10"
                  data-ocid="cta.secondary_button"
                >
                  Browse Matches
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
