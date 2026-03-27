import { useState } from "react";
import { mockEvents } from "@/lib/mockData";
import { Search, Filter, MapPin } from "lucide-react";
import EventCard from "@/components/EventCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Events = () => {
  const [search, setSearch] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("All");

  const skillFilters = ["All", "Teaching", "Coding", "Healthcare", "Event Planning", "Designing"];

  const filtered = mockEvents.filter((e) => {
    const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase()) || e.ngo.toLowerCase().includes(search.toLowerCase());
    const matchesSkill = selectedSkill === "All" || e.skills.includes(selectedSkill);
    return matchesSearch && matchesSkill;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">Explore Opportunities</h1>
            <p className="text-muted-foreground">Find events that match your skills and interests</p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
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
            <div className="flex gap-2 overflow-x-auto pb-1">
              {skillFilters.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSkill(s)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    selectedSkill === s
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

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
