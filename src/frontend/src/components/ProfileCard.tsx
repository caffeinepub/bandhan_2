import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { BookOpen, Briefcase, CheckCircle, MapPin } from "lucide-react";

interface ProfileCardProps {
  id: string;
  name: string;
  age: number;
  city: string;
  state: string;
  profession: string;
  religion: string;
  education: string;
  photoUrl: string;
  isVerified?: boolean;
  index?: number;
}

export default function ProfileCard({
  id,
  name,
  age,
  city,
  state,
  profession,
  religion,
  education,
  photoUrl,
  isVerified = false,
  index = 1,
}: ProfileCardProps) {
  const navigate = useNavigate();
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group flex flex-col"
      data-ocid={`profiles.item.${index}`}
    >
      {/* Photo */}
      <div className="relative h-52 bg-secondary overflow-hidden">
        <img
          src={photoUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {isVerified && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-gold text-white border-0 flex items-center gap-1 text-xs">
              <CheckCircle className="w-3 h-3" />
              Verified
            </Badge>
          </div>
        )}
        {/* gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <div className="mb-3">
          <h3 className="font-display text-lg font-semibold text-foreground">
            {name}, {age}
          </h3>
          <div className="flex items-center gap-1 text-muted-foreground text-sm mt-0.5">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>
              {city}, {state}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 mb-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Briefcase className="w-3.5 h-3.5 shrink-0 text-maroon" />
            <span>{profession}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <BookOpen className="w-3.5 h-3.5 shrink-0 text-maroon" />
            <span>{education}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <Badge
            variant="secondary"
            className="text-xs text-maroon bg-secondary border-0"
          >
            {religion}
          </Badge>

          <Button
            size="sm"
            className="bg-gold hover:bg-gold/90 text-white text-xs px-4"
            onClick={() => navigate({ to: "/profile/$id", params: { id } })}
            data-ocid={`profiles.item.${index}`}
          >
            View Profile
          </Button>
        </div>
      </div>
    </div>
  );
}
