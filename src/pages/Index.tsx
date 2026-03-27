import { mockStats, mockTestimonials, mockLeaderboard, mockEvents } from "@/lib/mockData";
import { ArrowRight, Heart, Users, Clock, Calendar, Star, TrendingUp, Shield, MapPin, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-illustration.jpg";
import EventCard from "@/components/EventCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6" style={{ animation: "fade-in-up 0.8s ease-out forwards" }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Sparkles className="w-4 h-4" /> Smart Volunteer Matching Platform
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                Bridge the gap between <span className="text-gradient">passion</span> and <span className="text-gradient">purpose</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Soul Bridge uses AI-powered matching to connect volunteers with NGOs based on skills, interests, availability, and location.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/signup">
                  <button className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
                    Get Started <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <Link to="/events">
                  <button className="px-6 py-3 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary/5 transition-all">
                    Explore Events
                  </button>
                </Link>
              </div>
            </div>
            <div className="relative" style={{ animation: "fade-in-up 1s ease-out 0.2s forwards", opacity: 0 }}>
              <div className="absolute -inset-4 rounded-3xl gradient-hero opacity-10 blur-3xl" />
              <img
                src={heroImage}
                alt="Volunteers working together"
                className="relative rounded-2xl shadow-2xl w-full"
                width={1280}
                height={720}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, label: "Volunteers", value: mockStats.totalVolunteers.toLocaleString(), color: "text-primary" },
              { icon: Heart, label: "NGOs", value: mockStats.totalNGOs.toLocaleString(), color: "text-secondary" },
              { icon: Clock, label: "Hours Served", value: mockStats.totalHours.toLocaleString(), color: "text-accent" },
              { icon: Calendar, label: "Events Held", value: mockStats.totalEvents.toLocaleString(), color: "text-success" },
            ].map((s, i) => (
              <div key={s.label} className="text-center" style={{ animation: `count-up 0.5s ease-out ${i * 0.1}s forwards`, opacity: 0 }}>
                <s.icon className={`w-8 h-8 mx-auto mb-2 ${s.color}`} />
                <div className="font-heading text-2xl md:text-3xl font-bold">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
              Why <span className="text-gradient">Soul Bridge</span>?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A complete ecosystem for volunteers and NGOs to connect, collaborate, and create impact.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Sparkles, title: "AI-Powered Matching", desc: "Smart recommendations based on your skills, interests, and location." },
              { icon: Calendar, title: "Smart Scheduling", desc: "Calendar integration with availability tracking and automated reminders." },
              { icon: TrendingUp, title: "Impact Analytics", desc: "Track hours, domain contributions, and earn badges for milestones." },
              { icon: Shield, title: "Verified Profiles", desc: "Aadhaar-based verification for trust and authenticity." },
              { icon: MapPin, title: "Location-Based Discovery", desc: "Find opportunities near you with map integration." },
              { icon: Star, title: "Gamification", desc: "Earn badges, climb leaderboards, and showcase achievements." },
            ].map((f, i) => (
              <div
                key={f.title}
                className="glass-card rounded-xl p-6 hover-lift"
                style={{ animation: `fade-in-up 0.6s ease-out ${i * 0.1}s forwards`, opacity: 0 }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Events */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-heading text-3xl font-bold">Recommended Opportunities</h2>
              <p className="text-muted-foreground mt-1">AI-matched events based on popular skills</p>
            </div>
            <Link to="/events" className="hidden md:flex items-center gap-1 text-primary font-medium hover:underline">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockEvents.slice(0, 3).map((e) => (
              <EventCard key={e.id} {...e} />
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">🏆 Top Volunteers</h2>
            <p className="text-muted-foreground">This month's most impactful contributors</p>
          </div>
          <div className="max-w-2xl mx-auto space-y-3">
            {mockLeaderboard.map((v, i) => (
              <div
                key={v.rank}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                  i === 0 ? "glass-card border-2 border-warning/50 shadow-lg" : "glass-card"
                }`}
                style={{ animation: `slide-in-left 0.5s ease-out ${i * 0.1}s forwards`, opacity: 0 }}
              >
                <span className="text-2xl font-heading font-bold w-8 text-center">
                  {v.badge || `#${v.rank}`}
                </span>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                  {v.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{v.name}</p>
                  <p className="text-xs text-muted-foreground">{v.domain}</p>
                </div>
                <div className="text-right">
                  <p className="font-heading font-bold text-primary">{v.hours}h</p>
                  <p className="text-xs text-muted-foreground">this month</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link to="/leaderboard" className="text-primary font-medium hover:underline">
              View Full Leaderboard →
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
            What People Say
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {mockTestimonials.map((t, i) => (
              <div
                key={i}
                className="glass-card rounded-xl p-6 hover-lift"
              >
                <div className="flex gap-1 mb-3">
                  {Array(t.rating).fill(0).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="gradient-hero rounded-3xl p-10 md:p-16 text-center text-primary-foreground relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-50" />
            <div className="relative">
              <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
                Ready to make a difference?
              </h2>
              <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
                Join thousands of volunteers and NGOs creating impact together.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/signup">
                  <button className="px-8 py-3 rounded-xl bg-card text-foreground font-semibold hover:bg-card/90 transition-all shadow-lg">
                    Join as Volunteer
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="px-8 py-3 rounded-xl border-2 border-card/50 text-primary-foreground font-semibold hover:bg-card/10 transition-all">
                    Register NGO
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
