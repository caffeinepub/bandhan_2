import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useParams } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  Briefcase,
  CheckCircle,
  ChevronLeft,
  Globe,
  Heart,
  MapPin,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { SAMPLE_PROFILES } from "../data/sampleProfiles";

export default function ProfileDetailPage() {
  const params = useParams({ strict: false }) as { id?: string };
  const id = params.id ?? "1";

  const profile =
    SAMPLE_PROFILES.find((p) => p.id === id) || SAMPLE_PROFILES[0];

  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Back */}
        <Link
          to="/browse"
          className="inline-flex items-center gap-1 text-muted-foreground hover:text-maroon text-sm mb-6"
          data-ocid="profile_detail.link"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Browse
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            {/* Header banner */}
            <div className="h-32 bg-maroon relative">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, white 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
            </div>

            <div className="px-8 pb-8">
              {/* Avatar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-16 mb-6">
                <div className="w-28 h-28 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-secondary shrink-0">
                  <img
                    src={profile.photoUrl}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 pb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="font-display text-2xl font-bold text-foreground">
                      {profile.name}, {profile.age}
                    </h1>
                    {profile.isVerified && (
                      <Badge className="bg-gold text-white border-0 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                    <MapPin className="w-4 h-4" />
                    {profile.city}, {profile.state}
                  </div>
                </div>
                <Button
                  className="bg-gold hover:bg-gold/90 text-white shrink-0"
                  data-ocid="profile_detail.primary_button"
                >
                  <Heart className="mr-2 w-4 h-4" />
                  Express Interest
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Details */}
                <div>
                  <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                    Profile Details
                  </h2>
                  <div className="space-y-3">
                    {[
                      {
                        icon: Briefcase,
                        label: "Profession",
                        value: profile.profession,
                      },
                      {
                        icon: BookOpen,
                        label: "Education",
                        value: profile.education,
                      },
                      {
                        icon: Globe,
                        label: "Religion",
                        value: profile.religion,
                      },
                      {
                        icon: Users,
                        label: "Mother Tongue",
                        value: profile.motherTongue,
                      },
                      {
                        icon: MapPin,
                        label: "Location",
                        value: `${profile.city}, ${profile.state}`,
                      },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-maroon" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            {label}
                          </p>
                          <p className="text-sm font-medium text-foreground capitalize">
                            {value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* About */}
                <div>
                  <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                    About
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {profile.aboutMe}
                  </p>

                  <div className="mt-6 pt-6 border-t border-border">
                    <h3 className="font-display font-semibold text-foreground mb-3">
                      Looking For
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Seeking a sincere, family-oriented partner who values both
                      tradition and modern perspectives. Open to different
                      backgrounds with a focus on compatibility and mutual
                      respect.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
