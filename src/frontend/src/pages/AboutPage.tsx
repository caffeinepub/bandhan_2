import { Card, CardContent } from "@/components/ui/card";
import { Heart, Star, Users } from "lucide-react";
import { motion } from "motion/react";

const stats = [
  { value: "5 Lakh+", label: "Successful Matches" },
  { value: "10 Years", label: "Trusted Heritage" },
  { value: "50+ Cities", label: "Pan-India Presence" },
  { value: "98%", label: "Verified Profiles" },
];

const values = [
  {
    icon: Heart,
    title: "Trust & Authenticity",
    description:
      "Every profile on Bandhan is verified manually. We prioritize genuine connections over volume, ensuring families can trust the people they meet.",
  },
  {
    icon: Users,
    title: "Family-Centric Matchmaking",
    description:
      "We understand that in India, marriage is a union of two families. Our platform is designed to honour that tradition while embracing modern values.",
  },
  {
    icon: Star,
    title: "Privacy & Dignity",
    description:
      "Your personal details, photos, and contact information are shown only when you choose. You are always in control of your matrimonial journey.",
  },
];

const team = [
  {
    name: "Arjun Mehta",
    role: "Co-Founder & CEO",
    bio: "IIT Delhi alumnus with 15 years in consumer internet. Passionate about bridging tradition with technology.",
    initials: "AM",
  },
  {
    name: "Priya Sharma",
    role: "Co-Founder & CPO",
    bio: "Ex-Shaadi.com product lead. Believes great design can make life's most important decision feel joyful.",
    initials: "PS",
  },
  {
    name: "Rahul Nair",
    role: "CTO",
    bio: "Distributed systems engineer. Building the infrastructure that connects millions of hearts reliably and securely.",
    initials: "RN",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen" data-ocid="about.page">
      {/* Hero */}
      <section className="bg-maroon text-white py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-gold/20 text-gold text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              Our Story
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
              About Bandhan
            </h1>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Founded on the timeless values of Indian matrimonial heritage,
              Bandhan is where sacred bonds begin. We blend the warmth of family
              traditions with the precision of modern matchmaking.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gold/10 py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="font-display text-3xl font-bold text-maroon">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-maroon mb-4">
              Our Mission & Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We exist to make the most important decision of your life a little
              easier, a little safer, and a lot more joyful.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
              >
                <Card className="h-full border-gold/20 hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-full bg-maroon/10 flex items-center justify-center mb-4">
                      <v.icon className="w-6 h-6 text-maroon" />
                    </div>
                    <h3 className="font-display font-semibold text-lg text-maroon mb-2">
                      {v.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {v.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 bg-cream/30">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-maroon mb-4">
              Meet Our Founders
            </h2>
            <p className="text-muted-foreground">
              The people behind India's most trusted matrimonial platform.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-full bg-maroon flex items-center justify-center mx-auto mb-4">
                  <span className="font-display text-xl font-bold text-gold">
                    {member.initials}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-lg text-maroon">
                  {member.name}
                </h3>
                <p className="text-gold text-sm font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
