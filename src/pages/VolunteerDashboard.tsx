import { mockVolunteerStats } from "@/lib/mockData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Clock, Calendar, Award, TrendingUp, Bell, MapPin, User, Settings } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useUser } from "@/lib/store";

const VolunteerDashboard = () => {
  const stats = mockVolunteerStats;
  const { user } = useUser();
  const displayName = user?.name?.split(" ")[0] || "Volunteer";
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="font-heading text-2xl font-bold">Welcome back, {displayName}! 👋</h1>
                <p className="text-muted-foreground">Your impact journey continues</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2.5 rounded-xl border hover:bg-muted transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center">3</span>
              </button>
              <button className="p-2.5 rounded-xl border hover:bg-muted transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Clock, label: "Total Hours", value: stats.totalHours, color: "text-primary", bg: "bg-primary/10" },
              { icon: Calendar, label: "Events Done", value: stats.eventsCompleted, color: "text-secondary", bg: "bg-secondary/10" },
              { icon: Award, label: "Badges Earned", value: stats.badgeCount, color: "text-accent", bg: "bg-accent/10" },
              { icon: TrendingUp, label: "Impact Score", value: stats.impactScore, color: "text-success", bg: "bg-success/10" },
            ].map((s) => (
              <div key={s.label} className="glass-card rounded-xl p-5">
                <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center mb-3`}>
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <p className="font-heading text-2xl font-bold">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Weekly Hours Chart */}
            <div className="lg:col-span-2 glass-card rounded-xl p-6">
              <h3 className="font-heading font-bold text-lg mb-4">Weekly Contribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={stats.weeklyHours}>
                  <XAxis dataKey="week" axisLine={false} tickLine={false} fontSize={12} />
                  <YAxis axisLine={false} tickLine={false} fontSize={12} />
                  <Tooltip
                    contentStyle={{ borderRadius: "12px", border: "1px solid hsl(220 14% 90%)", fontSize: "13px" }}
                  />
                  <Bar dataKey="hours" fill="hsl(174, 60%, 40%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Domain Breakdown */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-heading font-bold text-lg mb-4">Domain Breakdown</h3>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={stats.domainBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    dataKey="hours"
                    nameKey="domain"
                  >
                    {stats.domainBreakdown.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-2">
                {stats.domainBreakdown.map((d) => (
                  <div key={d.domain} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                      <span>{d.domain}</span>
                    </div>
                    <span className="font-medium">{d.hours}h</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="glass-card rounded-xl p-6 mt-6">
            <h3 className="font-heading font-bold text-lg mb-4">🏆 Badges & Achievements</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {stats.badges.map((b) => (
                <div
                  key={b.name}
                  className={`text-center p-4 rounded-xl border transition-all ${
                    b.earned
                      ? "bg-primary/5 border-primary/20"
                      : "bg-muted/50 border-border opacity-50"
                  }`}
                >
                  <span className="text-3xl block mb-2">{b.icon}</span>
                  <p className="text-sm font-medium">{b.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{b.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="glass-card rounded-xl p-6 mt-6">
            <h3 className="font-heading font-bold text-lg mb-4">📅 Upcoming Events</h3>
            <div className="space-y-3">
              {stats.upcomingEvents.map((e) => (
                <div key={e.title} className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{e.title}</p>
                    <p className="text-sm text-muted-foreground">{e.ngo}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5" />
                    {e.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
