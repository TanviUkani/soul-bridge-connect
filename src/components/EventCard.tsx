import { MapPin, Calendar, Users, ArrowRight, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import { useBookmarks } from "@/lib/store";

interface EventCardProps {
  id: string;
  title: string;
  ngo: string;
  ngoLogo: string;
  description: string;
  location: string;
  date: string;
  time: string;
  skills: string[];
  volunteersNeeded: number;
  volunteersJoined: number;
  matchScore?: number;
}

const EventCard = ({ id, title, ngo, ngoLogo, description, location, date, time, skills, volunteersNeeded, volunteersJoined, matchScore }: EventCardProps) => {
  const progress = Math.round((volunteersJoined / volunteersNeeded) * 100);
  const { toggle, isBookmarked } = useBookmarks();
  const bookmarked = isBookmarked(id);

  return (
    <div className="group glass-card rounded-xl overflow-hidden hover-lift">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-xl">
              {ngoLogo}
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{ngo}</p>
              <h3 className="font-heading font-bold text-foreground">{title}</h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => toggle(id)} className="p-1.5 rounded-lg hover:bg-muted transition-colors" title={bookmarked ? "Remove bookmark" : "Bookmark"}>
              <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-warning text-warning" : "text-muted-foreground"}`} />
            </button>
            {matchScore && (
              <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                {matchScore}% match
              </span>
            )}
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            {location}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 text-secondary" />
            {date} • {time}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4 text-accent" />
            {volunteersJoined}/{volunteersNeeded} volunteers
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {skills.map((s) => (
            <span key={s} className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-medium">
              {s}
            </span>
          ))}
        </div>

        <div className="mb-4">
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <Link
          to={`/events/${id}`}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
        >
          View Details <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
