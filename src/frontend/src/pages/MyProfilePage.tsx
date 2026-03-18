import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  BookOpen,
  Briefcase,
  CheckCircle,
  Edit,
  Globe,
  Heart,
  MapPin,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useOwnProfile } from "../hooks/useQueries";

export default function MyProfilePage() {
  const { identity } = useInternetIdentity();
  const navigate = useNavigate();
  const { data: profile, isLoading } = useOwnProfile();

  useEffect(() => {
    if (!identity) {
      navigate({ to: "/login" });
    }
  }, [identity, navigate]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div
            className="bg-white rounded-2xl shadow-card overflow-hidden"
            data-ocid="my_profile.loading_state"
          >
            <Skeleton className="h-32 w-full" />
            <div className="p-8 space-y-4">
              <div className="flex gap-4">
                <Skeleton className="w-28 h-28 rounded-2xl" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="min-h-screen bg-background py-8 px-4 flex items-center justify-center">
        <div className="text-center" data-ocid="my_profile.empty_state">
          <Heart className="w-12 h-12 text-maroon mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">
            No Profile Yet
          </h2>
          <p className="text-muted-foreground mb-6">
            Complete your profile to start finding matches.
          </p>
          <Link to="/complete-profile">
            <Button
              className="bg-maroon hover:bg-maroon-deep text-white"
              data-ocid="my_profile.primary_button"
            >
              Create Profile
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  const professionLabel: Record<string, string> = {
    software: "Software Engineer",
    engineer: "Engineer",
    doctor: "Doctor",
    teacher: "Teacher",
    business: "Business Owner",
    government: "Government Officer",
    artist: "Artist",
    other: "Other",
  };

  const educationLabel: Record<string, string> = {
    highSchool: "High School",
    bachelor: "Bachelor's Degree",
    master: "Master's Degree",
    phd: "PhD",
    other: "Other",
  };

  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="bg-white rounded-2xl shadow-card overflow-hidden"
            data-ocid="my_profile.card"
          >
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
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-16 mb-6">
                <div className="w-28 h-28 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-secondary shrink-0">
                  {profile.photoUrl ? (
                    <img
                      src={profile.photoUrl}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Heart className="w-10 h-10 text-maroon" />
                    </div>
                  )}
                </div>
                <div className="flex-1 pb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="font-display text-2xl font-bold text-foreground">
                      {profile.name}, {Number(profile.age)}
                    </h1>
                    {profile.isProfileComplete && (
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
                <Link to="/complete-profile">
                  <Button
                    variant="outline"
                    className="border-maroon text-maroon hover:bg-maroon hover:text-white shrink-0"
                    data-ocid="my_profile.edit_button"
                  >
                    <Edit className="mr-2 w-4 h-4" />
                    Edit Profile
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                    Profile Details
                  </h2>
                  <div className="space-y-3">
                    {[
                      {
                        icon: Briefcase,
                        label: "Profession",
                        value:
                          professionLabel[profile.profession] ||
                          profile.profession,
                      },
                      {
                        icon: BookOpen,
                        label: "Education",
                        value:
                          educationLabel[profile.education] ||
                          profile.education,
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

                <div>
                  <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                    About Me
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {profile.aboutMe}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
