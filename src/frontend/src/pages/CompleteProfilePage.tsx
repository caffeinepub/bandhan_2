import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import { Camera, CheckCircle, Heart, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { toast } from "sonner";
import { Caste, Education, Gender, Profession, Religion } from "../backend.d";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useCreateOrUpdateProfile,
  useOwnProfile,
  useUploadPhoto,
} from "../hooks/useQueries";

const STEPS = [
  { id: 1, title: "Basic Info", description: "Name, age, gender" },
  { id: 2, title: "Background", description: "Religion, caste, language" },
  { id: 3, title: "Career", description: "Education, profession" },
  { id: 4, title: "Location", description: "City & state" },
  { id: 5, title: "About You", description: "Your story & photo" },
];

export default function CompleteProfilePage() {
  const { identity } = useInternetIdentity();
  const navigate = useNavigate();
  const { data: ownProfile } = useOwnProfile();
  const createProfile = useCreateOrUpdateProfile();
  const uploadPhoto = useUploadPhoto();

  const [step, setStep] = useState(1);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "" as Gender | "",
    religion: "" as Religion | "",
    caste: "" as Caste | "",
    motherTongue: "",
    education: "" as Education | "",
    profession: "" as Profession | "",
    city: "",
    state: "",
    aboutMe: "",
  });

  useEffect(() => {
    if (!identity) {
      navigate({ to: "/login" });
    }
  }, [identity, navigate]);

  useEffect(() => {
    if (ownProfile) {
      setForm({
        name: ownProfile.name,
        age: String(ownProfile.age),
        gender: ownProfile.gender,
        religion: ownProfile.religion,
        caste: ownProfile.caste,
        motherTongue: ownProfile.motherTongue,
        education: ownProfile.education,
        profession: ownProfile.profession,
        city: ownProfile.city,
        state: ownProfile.state,
        aboutMe: ownProfile.aboutMe,
      });
      if (ownProfile.photoUrl) setPhotoPreview(ownProfile.photoUrl);
    }
  }, [ownProfile]);

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    try {
      let photoUrl = ownProfile?.photoUrl;
      if (photoFile) {
        photoUrl = await uploadPhoto.mutateAsync({
          fileName: photoFile.name,
          file: photoFile,
        });
      }
      await createProfile.mutateAsync({
        name: form.name,
        age: BigInt(form.age || 0),
        gender: form.gender as Gender,
        religion: form.religion as Religion,
        caste: form.caste as Caste,
        motherTongue: form.motherTongue,
        education: form.education as Education,
        profession: form.profession as Profession,
        city: form.city,
        state: form.state,
        aboutMe: form.aboutMe,
        photoUrl,
        isProfileComplete: true,
      });
      toast.success("Profile saved successfully!");
      navigate({ to: "/browse" });
    } catch {
      toast.error("Failed to save profile. Please try again.");
    }
  };

  const isPending = createProfile.isPending || uploadPhoto.isPending;

  return (
    <main className="min-h-screen bg-cream py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Heart
              className="w-6 h-6 text-maroon fill-maroon"
              strokeWidth={0}
            />
            <span className="font-display text-2xl font-bold text-maroon">
              Bandhan
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Complete Your Profile
          </h1>
          <p className="text-muted-foreground">
            Let's help you find your perfect match
          </p>
        </motion.div>

        {/* Steps indicator */}
        <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <button
                type="button"
                className={`flex flex-col items-center min-w-[60px] ${
                  step === s.id
                    ? "opacity-100"
                    : step > s.id
                      ? "opacity-80"
                      : "opacity-40"
                }`}
                onClick={() => step > s.id && setStep(s.id)}
                data-ocid="profile.tab"
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold mb-1 transition-colors ${
                    step > s.id
                      ? "bg-gold text-white"
                      : step === s.id
                        ? "bg-maroon text-white"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step > s.id ? <CheckCircle className="w-5 h-5" /> : s.id}
                </div>
                <span className="text-xs text-center hidden sm:block">
                  {s.title}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <div
                  className={`h-px w-8 md:w-16 mx-1 ${
                    step > s.id ? "bg-gold" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form card */}
        <motion.div
          key={step}
          className="bg-white rounded-2xl shadow-card p-8"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="font-display text-xl font-bold text-foreground mb-6">
                Basic Information
              </h2>
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Enter your full name"
                  className="mt-1"
                  data-ocid="profile.input"
                />
              </div>
              <div>
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  value={form.age}
                  onChange={(e) => update("age", e.target.value)}
                  placeholder="Your age"
                  min={18}
                  max={60}
                  className="mt-1"
                  data-ocid="profile.input"
                />
              </div>
              <div>
                <Label>Gender *</Label>
                <Select
                  value={form.gender}
                  onValueChange={(v) => update("gender", v)}
                >
                  <SelectTrigger className="mt-1" data-ocid="profile.select">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={Gender.male}>Male</SelectItem>
                    <SelectItem value={Gender.female}>Female</SelectItem>
                    <SelectItem value={Gender.other}>Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <h2 className="font-display text-xl font-bold text-foreground mb-6">
                Cultural Background
              </h2>
              <div>
                <Label>Religion *</Label>
                <Select
                  value={form.religion}
                  onValueChange={(v) => update("religion", v)}
                >
                  <SelectTrigger className="mt-1" data-ocid="profile.select">
                    <SelectValue placeholder="Select religion" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={Religion.hindu}>Hindu</SelectItem>
                    <SelectItem value={Religion.muslim}>Muslim</SelectItem>
                    <SelectItem value={Religion.christian}>
                      Christian
                    </SelectItem>
                    <SelectItem value={Religion.sikh}>Sikh</SelectItem>
                    <SelectItem value={Religion.other}>Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Caste *</Label>
                <Select
                  value={form.caste}
                  onValueChange={(v) => update("caste", v)}
                >
                  <SelectTrigger className="mt-1" data-ocid="profile.select">
                    <SelectValue placeholder="Select caste" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={Caste.general}>General</SelectItem>
                    <SelectItem value={Caste.obc}>OBC</SelectItem>
                    <SelectItem value={Caste.sc}>SC</SelectItem>
                    <SelectItem value={Caste.st}>ST</SelectItem>
                    <SelectItem value={Caste.other}>Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="motherTongue">Mother Tongue *</Label>
                <Input
                  id="motherTongue"
                  value={form.motherTongue}
                  onChange={(e) => update("motherTongue", e.target.value)}
                  placeholder="e.g. Hindi, Tamil, Telugu"
                  className="mt-1"
                  data-ocid="profile.input"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <h2 className="font-display text-xl font-bold text-foreground mb-6">
                Career & Education
              </h2>
              <div>
                <Label>Education *</Label>
                <Select
                  value={form.education}
                  onValueChange={(v) => update("education", v)}
                >
                  <SelectTrigger className="mt-1" data-ocid="profile.select">
                    <SelectValue placeholder="Select education" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={Education.highSchool}>
                      High School
                    </SelectItem>
                    <SelectItem value={Education.bachelor}>
                      Bachelor's Degree
                    </SelectItem>
                    <SelectItem value={Education.master}>
                      Master's Degree
                    </SelectItem>
                    <SelectItem value={Education.phd}>PhD</SelectItem>
                    <SelectItem value={Education.other}>Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Profession *</Label>
                <Select
                  value={form.profession}
                  onValueChange={(v) => update("profession", v)}
                >
                  <SelectTrigger className="mt-1" data-ocid="profile.select">
                    <SelectValue placeholder="Select profession" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={Profession.software}>
                      Software Engineer
                    </SelectItem>
                    <SelectItem value={Profession.engineer}>
                      Engineer
                    </SelectItem>
                    <SelectItem value={Profession.doctor}>Doctor</SelectItem>
                    <SelectItem value={Profession.teacher}>Teacher</SelectItem>
                    <SelectItem value={Profession.business}>
                      Business Owner
                    </SelectItem>
                    <SelectItem value={Profession.government}>
                      Government Officer
                    </SelectItem>
                    <SelectItem value={Profession.artist}>Artist</SelectItem>
                    <SelectItem value={Profession.other}>Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5">
              <h2 className="font-display text-xl font-bold text-foreground mb-6">
                Location
              </h2>
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  placeholder="Your city"
                  className="mt-1"
                  data-ocid="profile.input"
                />
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  value={form.state}
                  onChange={(e) => update("state", e.target.value)}
                  placeholder="Your state"
                  className="mt-1"
                  data-ocid="profile.input"
                />
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-5">
              <h2 className="font-display text-xl font-bold text-foreground mb-6">
                About You
              </h2>

              {/* Photo upload */}
              <div>
                <Label>Profile Photo</Label>
                <div className="mt-2 flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center overflow-hidden border-2 border-dashed border-border">
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Camera className="w-8 h-8 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-maroon text-maroon hover:bg-maroon hover:text-white"
                      onClick={() => fileInputRef.current?.click()}
                      data-ocid="profile.upload_button"
                    >
                      Upload Photo
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">
                      JPG, PNG up to 5MB
                    </p>
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </div>

              <div>
                <Label htmlFor="aboutMe">About Me *</Label>
                <Textarea
                  id="aboutMe"
                  value={form.aboutMe}
                  onChange={(e) => update("aboutMe", e.target.value)}
                  placeholder="Tell potential matches about yourself, your interests, and what you're looking for..."
                  rows={5}
                  className="mt-1 resize-none"
                  data-ocid="profile.textarea"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {form.aboutMe.length}/500 characters
                </p>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
              className="border-maroon text-maroon hover:bg-secondary"
              data-ocid="profile.secondary_button"
            >
              Back
            </Button>

            {step < STEPS.length ? (
              <Button
                onClick={() => setStep((s) => Math.min(STEPS.length, s + 1))}
                className="bg-maroon hover:bg-maroon-deep text-white px-8"
                data-ocid="profile.primary_button"
              >
                Continue
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isPending}
                className="bg-gold hover:bg-gold/90 text-white px-8"
                data-ocid="profile.submit_button"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Saving...
                  </>
                ) : (
                  "Save Profile"
                )}
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
