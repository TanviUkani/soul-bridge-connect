import { useParams, Link } from "react-router-dom";
import { mockEvents } from "@/lib/mockData";
import { MapPin, Calendar, Users, ArrowLeft, Clock, CheckCircle2, Share2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const EventDetails = () => {
  const { id } = useParams();
  const event = mockEvents.find((e) => e.id === id);
  const [applied, setApplied] = useState(false);
  const { toast } = useToast();

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-12 text-center">
          <h1 className="font-heading text-2xl font-bold mb-2">Event Not Found</h1>
          <p className="text-muted-foreground mb-6">The event you're looking for doesn't exist.</p>
          <Link to="/events" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold">
            <ArrowLeft className="w-4 h-4" /> Back to Events
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const progress = Math.round((event.volunteersJoined / event.volunteersNeeded) * 100);

  const handleApply = () => {
    setApplied(true);
    toast({
      title: "Application Submitted! 🎉",
      description: `You've applied to "${event.title}". The NGO will review your application.`,
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: "Link copied!", description: "Event link copied to clipboard." });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back */}
          <Link to="/events" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Events
          </Link>

          {/* Header Card */}
          <div className="glass-card rounded-2xl p-8 mb-6">
            <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-3xl">
                  {event.ngoLogo}
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{event.ngo}</p>
                  <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">{event.title}</h1>
                </div>
              </div>
              {event.matchScore && (
                <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold">
                  {event.matchScore}% Match
                </span>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-8">{event.description}</p>

            {/* Info Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm font-medium text-foreground">{event.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                <Calendar className="w-5 h-5 text-secondary shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="text-sm font-medium text-foreground">{event.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                <Clock className="w-5 h-5 text-accent shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Time</p>
                  <p className="text-sm font-medium text-foreground">{event.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                <Users className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Volunteers</p>
                  <p className="text-sm font-medium text-foreground">{event.volunteersJoined} / {event.volunteersNeeded} joined</p>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Volunteer slots filled</span>
                <span className="font-semibold text-foreground">{progress}%</span>
              </div>
              <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {/* Skills */}
            <div className="mb-8">
              <h3 className="font-heading font-bold text-sm mb-3 text-foreground">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {event.skills.map((s) => (
                  <span key={s} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Interests */}
            {event.interests && (
              <div className="mb-8">
                <h3 className="font-heading font-bold text-sm mb-3 text-foreground">Related Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {event.interests.map((i) => (
                    <span key={i} className="px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              {applied ? (
                <button disabled className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-muted text-muted-foreground font-semibold cursor-not-allowed">
                  <CheckCircle2 className="w-5 h-5" /> Applied Successfully
                </button>
              ) : (
                <button
                  onClick={handleApply}
                  className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                >
                  Apply Now
                </button>
              )}
              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border bg-card text-foreground font-semibold hover:bg-muted transition-colors"
              >
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventDetails;
