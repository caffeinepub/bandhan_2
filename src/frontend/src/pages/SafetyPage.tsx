import { Card, CardContent } from "@/components/ui/card";
import {
  AlertTriangle,
  Camera,
  Eye,
  Lock,
  MessageCircleWarning,
  Phone,
  Shield,
  UserCheck,
} from "lucide-react";
import { motion } from "motion/react";

const tips = [
  {
    icon: UserCheck,
    title: "Verify Before You Trust",
    description:
      "Look for the blue verification checkmark on profiles. Verified members have had their identity and photos confirmed by our safety team. Be cautious of profiles without verification.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Lock,
    title: "Guard Your Personal Info",
    description:
      "Never share your home address, workplace, Aadhaar number, bank details, or passwords on the platform. Bandhan staff will never ask for this information. Report anyone who does.",
    color: "bg-maroon/10 text-maroon",
  },
  {
    icon: Phone,
    title: "Meet in Public First",
    description:
      "Always arrange your first few meetings in well-lit public spaces. Inform a trusted family member or friend about your plans. Do not accept rides from someone you've just met online.",
    color: "bg-green-50 text-green-700",
  },
  {
    icon: Camera,
    title: "Video Call Before Meeting",
    description:
      "Before agreeing to an in-person meeting, do a video call. This confirms the person matches their profile photos and helps build initial comfort. Bandhan's in-app video feature is coming soon.",
    color: "bg-amber-50 text-amber-700",
  },
  {
    icon: Eye,
    title: "Spot Red Flags Early",
    description:
      "Be wary of people who: ask for money or claim financial emergencies, refuse to video call, pressure you to move off-platform quickly, or seem too eager too fast. Trust your instincts.",
    color: "bg-orange-50 text-orange-600",
  },
  {
    icon: AlertTriangle,
    title: "Beware of Scams",
    description:
      "Romance scams are real. Anyone who professes strong feelings very quickly, has an elaborate life story, is 'overseas', or requests financial help should be treated with extreme caution.",
    color: "bg-red-50 text-red-600",
  },
  {
    icon: MessageCircleWarning,
    title: "Report Suspicious Behaviour",
    description:
      "If a member makes you uncomfortable, use the Block & Report feature in any conversation. Our safety team reviews all reports within 24 hours and takes firm action against violators.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: Shield,
    title: "Trust the Platform",
    description:
      "Bandhan uses AI-powered fraud detection, manual profile verification, and a dedicated trust & safety team to keep the platform safe. We act swiftly on verified reports.",
    color: "bg-maroon/10 text-maroon",
  },
];

export default function SafetyPage() {
  return (
    <main className="min-h-screen" data-ocid="safety.page">
      {/* Hero */}
      <section className="bg-maroon text-white py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-gold" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Safety Tips
            </h1>
            <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto">
              Your safety is our highest priority. These guidelines will help
              you navigate online matchmaking with confidence and caution.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tips Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tips.map((tip, i) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="h-full border-gold/20 hover:shadow-md transition-shadow">
                  <CardContent className="pt-6 flex gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${tip.color}`}
                    >
                      <tip.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-maroon mb-2">
                        {tip.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {tip.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency */}
      <section className="py-12 px-4 bg-maroon/5">
        <div className="container mx-auto max-w-3xl text-center">
          <Shield className="w-8 h-8 text-maroon mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold text-maroon mb-3">
            Need Help Right Now?
          </h2>
          <p className="text-muted-foreground mb-4">
            If you believe you are in immediate danger, call emergency services
            (112). For platform-related safety concerns, our safety team is
            available 24/7.
          </p>
          <a
            href="mailto:safety@bandhan.ai"
            className="text-maroon font-semibold hover:underline"
          >
            safety@bandhan.ai
          </a>
        </div>
      </section>
    </main>
  );
}
