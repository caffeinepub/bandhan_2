import { Badge } from "@/components/ui/badge";
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
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useEffect } from "react";
import { Religion } from "../backend.d";
import type { ProfileFilter } from "../backend.d";
import ProfileCard from "../components/ProfileCard";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useBrowseProfiles } from "../hooks/useQueries";

export default function BrowsePage() {
  const { identity } = useInternetIdentity();
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const [appliedFilter, setAppliedFilter] = useState<ProfileFilter | null>(
    null,
  );
  const [form, setForm] = useState({
    minAge: "",
    maxAge: "",
    religion: "" as Religion | "",
    city: "",
  });

  useEffect(() => {
    if (!identity) {
      navigate({ to: "/login" });
    }
  }, [identity, navigate]);

  const { data: profiles, isLoading } = useBrowseProfiles(appliedFilter);

  const applyFilter = () => {
    const filter: ProfileFilter = {};
    if (form.minAge) filter.minAge = BigInt(form.minAge);
    if (form.maxAge) filter.maxAge = BigInt(form.maxAge);
    if (form.religion) filter.religion = form.religion as Religion;
    if (form.city) filter.city = form.city;
    setAppliedFilter(Object.keys(filter).length > 0 ? filter : null);
  };

  const clearFilter = () => {
    setForm({ minAge: "", maxAge: "", religion: "", city: "" });
    setAppliedFilter(null);
  };

  const hasFilters = !!(
    form.minAge ||
    form.maxAge ||
    form.religion ||
    form.city
  );

  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Browse Matches
          </h1>
          <p className="text-muted-foreground">
            {profiles
              ? `${profiles.length} profiles found`
              : "Finding your perfect match..."}
          </p>
        </div>

        <div className="flex gap-6">
          {/* Filter Sidebar */}
          <div
            className={`${
              filterOpen ? "fixed inset-0 z-50 bg-black/50" : "hidden lg:block"
            }`}
            role="presentation"
            onClick={(e) =>
              e.target === e.currentTarget && setFilterOpen(false)
            }
            onKeyDown={(e) => e.key === "Escape" && setFilterOpen(false)}
          >
            <div
              className={`${
                filterOpen
                  ? "absolute right-0 top-0 h-full w-80 bg-white overflow-y-auto"
                  : "w-72 bg-white rounded-2xl shadow-card"
              } p-6`}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-semibold text-lg text-foreground">
                  Filters
                </h2>
                <div className="flex gap-2">
                  {hasFilters && (
                    <button
                      type="button"
                      onClick={clearFilter}
                      className="text-xs text-maroon hover:underline"
                      data-ocid="browse.secondary_button"
                    >
                      Clear All
                    </button>
                  )}
                  {filterOpen && (
                    <button
                      type="button"
                      onClick={() => setFilterOpen(false)}
                      data-ocid="browse.close_button"
                    >
                      <X className="w-5 h-5 text-muted-foreground" />
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <Label className="text-sm font-medium">Age Range</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      placeholder="Min"
                      type="number"
                      value={form.minAge}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, minAge: e.target.value }))
                      }
                      data-ocid="browse.input"
                    />
                    <Input
                      placeholder="Max"
                      type="number"
                      value={form.maxAge}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, maxAge: e.target.value }))
                      }
                      data-ocid="browse.input"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Religion</Label>
                  <Select
                    value={form.religion}
                    onValueChange={(v) =>
                      setForm((f) => ({ ...f, religion: v as Religion }))
                    }
                  >
                    <SelectTrigger className="mt-2" data-ocid="browse.select">
                      <SelectValue placeholder="Any religion" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={" "}>Any</SelectItem>
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
                  <Label className="text-sm font-medium">City</Label>
                  <Input
                    placeholder="Enter city"
                    value={form.city}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, city: e.target.value }))
                    }
                    className="mt-2"
                    data-ocid="browse.search_input"
                  />
                </div>

                <Button
                  className="w-full bg-maroon hover:bg-maroon-deep text-white"
                  onClick={() => {
                    applyFilter();
                    setFilterOpen(false);
                  }}
                  data-ocid="browse.primary_button"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Mobile filter toggle + active badges */}
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <Button
                variant="outline"
                className="lg:hidden border-maroon text-maroon flex items-center gap-2"
                onClick={() => setFilterOpen(true)}
                data-ocid="browse.toggle"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </Button>
              {appliedFilter?.religion && (
                <Badge className="bg-secondary text-maroon border-0">
                  {appliedFilter.religion}
                </Badge>
              )}
              {appliedFilter?.city && (
                <Badge className="bg-secondary text-maroon border-0">
                  {appliedFilter.city}
                </Badge>
              )}
              {(appliedFilter?.minAge || appliedFilter?.maxAge) && (
                <Badge className="bg-secondary text-maroon border-0">
                  Age: {String(appliedFilter.minAge || "")}–
                  {String(appliedFilter.maxAge || "")}
                </Badge>
              )}
            </div>

            {/* Loading state */}
            {isLoading && (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                data-ocid="browse.loading_state"
              >
                {["a", "b", "c", "d", "e", "f"].map((sk) => (
                  <div
                    key={sk}
                    className="bg-white rounded-2xl overflow-hidden shadow-card"
                  >
                    <Skeleton className="h-52 w-full" />
                    <div className="p-4 space-y-2">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Profiles grid */}
            {!isLoading && profiles && profiles.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {profiles.map((profile) => (
                  <motion.div
                    key={profile.name}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <ProfileCard
                      id={profile.name}
                      name={profile.name}
                      age={Number(profile.age)}
                      city={profile.city}
                      state={profile.state}
                      profession={profile.profession}
                      religion={profile.religion}
                      education={profile.education}
                      photoUrl={
                        profile.photoUrl ||
                        `https://api.dicebear.com/7.x/personas/svg?seed=${profile.name}`
                      }
                      isVerified={profile.isProfileComplete}
                      index={1}
                    />
                  </motion.div>
                ))}
              </div>
            )}

            {/* Empty state */}
            {!isLoading && profiles && profiles.length === 0 && (
              <div className="text-center py-20" data-ocid="browse.empty_state">
                <div className="text-5xl mb-4">💔</div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  No profiles found
                </h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters to find more matches.
                </p>
                <Button
                  variant="outline"
                  className="border-maroon text-maroon hover:bg-maroon hover:text-white"
                  onClick={clearFilter}
                  data-ocid="browse.secondary_button"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
