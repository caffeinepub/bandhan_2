import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Clock,
  Globe,
  Heart,
  MapPin,
  Rocket,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const culture = [
  {
    icon: Rocket,
    title: "Move Fast",
    desc: "We ship weekly. Your ideas reach millions within days of inception.",
  },
  {
    icon: Heart,
    title: "Mission-Driven",
    desc: "Every line of code helps a family find their perfect match.",
  },
  {
    icon: Users,
    title: "Diverse & Inclusive",
    desc: "Team of 80+ across 12 Indian cities. All backgrounds, one mission.",
  },
  {
    icon: Globe,
    title: "Remote-First",
    desc: "Work from anywhere in India with quarterly in-person offsites.",
  },
];

const roles = [
  {
    title: "Senior Frontend Engineer",
    location: "Bengaluru / Remote",
    type: "Full-time",
    team: "Product",
    description:
      "Build beautiful, performant React interfaces used by millions of Indians on their matchmaking journey.",
  },
  {
    title: "Backend Developer (Motoko / ICP)",
    location: "Remote",
    type: "Full-time",
    team: "Engineering",
    description:
      "Design and maintain our Internet Computer canisters handling profiles, messaging, and membership at scale.",
  },
  {
    title: "Product Manager",
    location: "Mumbai / Remote",
    type: "Full-time",
    team: "Product",
    description:
      "Own end-to-end product features from discovery to launch. Deep empathy for Indian families required.",
  },
  {
    title: "Data Analyst",
    location: "Bengaluru",
    type: "Full-time",
    team: "Growth",
    description:
      "Turn billions of matchmaking signals into insights that improve compatibility algorithms and user experience.",
  },
  {
    title: "Customer Success Specialist",
    location: "Delhi / Mumbai",
    type: "Full-time",
    team: "Support",
    description:
      "Guide premium members through their matrimonial journey with personalised attention and care.",
  },
];

export default function CareersPage() {
  return (
    <main className="min-h-screen" data-ocid="careers.page">
      {/* Hero */}
      <section className="bg-maroon text-white py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-gold/20 text-gold text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              We're Hiring
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Join the Bandhan Family
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Help us build India's most trusted matrimonial platform.
              Meaningful work, exceptional colleagues, and a mission that
              changes lives.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Culture */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-display text-3xl font-bold text-maroon text-center mb-12">
            Life at Bandhan
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {culture.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border-gold/20 text-center p-2">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-full bg-maroon/10 flex items-center justify-center mx-auto mb-4">
                      <c.icon className="w-6 h-6 text-maroon" />
                    </div>
                    <h3 className="font-display font-semibold text-maroon mb-2">
                      {c.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{c.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="py-16 px-4 bg-cream/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-display text-3xl font-bold text-maroon text-center mb-12">
            Open Positions
          </h2>
          <div className="space-y-4" data-ocid="careers.list">
            {roles.map((role, i) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                data-ocid={`careers.item.${i + 1}`}
              >
                <Card className="border-gold/20 hover:shadow-md transition-shadow">
                  <CardContent className="py-5 px-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge
                            variant="secondary"
                            className="bg-maroon/10 text-maroon text-xs"
                          >
                            {role.team}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {role.type}
                          </Badge>
                        </div>
                        <h3 className="font-display font-semibold text-lg text-maroon">
                          {role.title}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{role.location}</span>
                          <Clock className="w-3.5 h-3.5 ml-2" />
                          <span>{role.type}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          {role.description}
                        </p>
                      </div>
                      <a
                        href={`mailto:careers@bandhan.ai?subject=Application: ${role.title}`}
                      >
                        <Button
                          className="bg-maroon hover:bg-maroon/90 text-white flex items-center gap-2 whitespace-nowrap"
                          data-ocid={`careers.apply_button.${i + 1}`}
                        >
                          Apply Now <ArrowRight className="w-4 h-4" />
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
