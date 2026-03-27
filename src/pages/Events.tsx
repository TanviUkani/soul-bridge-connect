import { useState } from "react";
import { mockEvents, interests } from "@/lib/mockData";
import { Search, MapPin, Filter, Bookmark, X } from "lucide-react";
import EventCard from "@/components/EventCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useBookmarks } from "@/lib/store";

const Events = () => {
  const [search, setSearch] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("All");
  const [selectedInterest, setSelectedInterest] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [showBookmarked, setShowBookmarked] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const { bookmarks } = useBookmarks();

  const skillFilters = ["All", "Teaching", "Coding", "Healthcare", "Event Planning", "Designing", "Counseling", "Cooking", "Photography", "Construction", "Marketing"];
  const locations = ["All", ...Array.from(new Set(mockEvents.map((e) => e.location.split(",").pop()?.trim() || "")))];

  const filtered = mockEvents.filter((e) => {
    const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase()) || e.ngo.toLowerCase().includes(search.toLowerCase());
    const matchesSkill = selectedSkill === "All" || e.skills.includes(selectedSkill);
    const matchesInterest = selectedInterest === "All" || e.interests.includes(selectedInterest);
    const matchesLocation = selectedLocation === "All" || e.location.includes(selectedLocation);
    const matchesBookmark = !showBookmarked || bookmarks.includes(e.id);
    return matchesSearch && matchesSkill && matchesInterest && matchesLocation && matchesBookmark;
  });

  const activeFilters = [selectedSkill, selectedInterest, selectedLocation].filter((f) => f !== "All").length + (showBookmarked ? 1 : 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">Explore Opportunities</h1>
            <p className="text-muted-foreground">Find events that match your skills and interests</p>
          </div>

          {/* Search + Filter Toggle */}
          <div className="flex gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search events or NGOs..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border bg-card text-sm"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2.5 rounded-xl border text-sm font-medium flex items-center gap-2 transition-colors ${
                showFilters || activeFilters > 0 ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              <Filter className="w-4 h-4" /> Filters {activeFilters > 0 && `(${activeFilters})`}
            </button>
            <button
              onClick={() => setShowBookmarked(!showBookmarked)}
              className={`px-4 py-2.5 rounded-xl border text-sm font-medium flex items-center gap-2 transition-colors ${
                showBookmarked ? "bg-warning text-warning-foreground border-warning" : "bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              <Bookmark className={`w-4 h-4 ${showBookmarked ? "fill-current" : ""}`} />
              <span className="hidden sm:inline">Saved</span>
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="glass-card rounded-xl p-4 mb-6 space-y-4" style={{ animation: "fade-in-up 0.3s ease-out" }}>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-2 block">Skills</label>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {skillFilters.map((s) => (
                    <button key={s} onClick={() => setSelectedSkill(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                      selectedSkill === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}>{s}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-2 block">Interests</label>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  <button onClick={() => setSelectedInterest("All")} className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${selectedInterest === "All" ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"}`}>All</button>
                  {interests.map((i) => (
                    <button key={i} onClick={() => setSelectedInterest(i)} className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                      selectedInterest === i ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}>{i}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-2 block">Location</label>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {locations.map((l) => (
                    <button key={l} onClick={() => setSelectedLocation(l)} className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                      selectedLocation === l ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}>{l}</button>
                  ))}
                </div>
              </div>
              {activeFilters > 0 && (
                <button onClick={() => { setSelectedSkill("All"); setSelectedInterest("All"); setSelectedLocation("All"); setShowBookmarked(false); }} className="text-xs text-destructive hover:underline flex items-center gap-1">
                  <X className="w-3 h-3" /> Clear all filters
                </button>
              )}
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-heading font-bold text-lg mb-1">No events found</h3>
              <p className="text-muted-foreground text-sm">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((e) => (
                <EventCard key={e.id} {...e} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Events;
