import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Users, Calendar, TrendingUp, Plus, CheckCircle, XCircle, Bell, Settings, Building } from "lucide-react";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";

const mockNGOData = {
  name: "Green Earth Foundation",
  activeEvents: 3,
  totalVolunteers: 156,
  impactScore: 94,
  events: [
    { id: "1", title: "Community Tree Plantation", date: "Apr 15", volunteers: 32, status: "active" },
    { id: "2", title: "River Cleanup Drive", date: "Apr 28", volunteers: 18, status: "active" },
    { id: "3", title: "Eco Workshop for Schools", date: "May 5", volunteers: 12, status: "upcoming" },
  ],
  applications: [
    { id: "a1", name: "Priya Sharma", event: "Tree Plantation", skills: ["Event Planning"], status: "pending" },
    { id: "a2", name: "Arjun Patel", event: "Tree Plantation", skills: ["Construction"], status: "pending" },
    { id: "a3", name: "Sneha Reddy", event: "River Cleanup", skills: ["Photography"], status: "pending" },
  ],
  monthlyVolunteers: [
    { month: "Jan", count: 22 },
    { month: "Feb", count: 28 },
    { month: "Mar", count: 35 },
    { month: "Apr", count: 42 },
  ],
};

const NGODashboard = () => {
  const [applications, setApplications] = useState(mockNGOData.applications);

  const handleApplication = (id: string, action: "accept" | "reject") => {
    setApplications((prev) => prev.filter((a) => a.id !== id));
    toast.success(`Application ${action}ed!`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center">
                <Building className="w-8 h-8 text-secondary" />
              </div>
              <div>
                <h1 className="font-heading text-2xl font-bold">{mockNGOData.name}</h1>
                <p className="text-muted-foreground">NGO Dashboard</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2.5 rounded-xl border hover:bg-muted transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center">{applications.length}</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                <Plus className="w-4 h-4" /> Create Event
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { icon: Calendar, label: "Active Events", value: mockNGOData.activeEvents, color: "text-primary", bg: "bg-primary/10" },
              { icon: Users, label: "Total Volunteers", value: mockNGOData.totalVolunteers, color: "text-secondary", bg: "bg-secondary/10" },
              { icon: TrendingUp, label: "Impact Score", value: mockNGOData.impactScore, color: "text-success", bg: "bg-success/10" },
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
            {/* Volunteer Growth */}
            <div className="lg:col-span-2 glass-card rounded-xl p-6">
              <h3 className="font-heading font-bold text-lg mb-4">Volunteer Growth</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={mockNGOData.monthlyVolunteers}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={12} />
                  <YAxis axisLine={false} tickLine={false} fontSize={12} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(220 14% 90%)", fontSize: "13px" }} />
                  <Bar dataKey="count" fill="hsl(30, 80%, 55%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Applications */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-heading font-bold text-lg mb-4">Pending Applications</h3>
              <div className="space-y-3">
                {applications.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">No pending applications</p>
                ) : (
                  applications.map((a) => (
                    <div key={a.id} className="p-3 rounded-xl bg-muted/50">
                      <p className="font-medium text-sm">{a.name}</p>
                      <p className="text-xs text-muted-foreground mb-2">for {a.event} • {a.skills.join(", ")}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApplication(a.id, "accept")}
                          className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-success/10 text-success text-xs font-medium hover:bg-success/20 transition-colors"
                        >
                          <CheckCircle className="w-3 h-3" /> Accept
                        </button>
                        <button
                          onClick={() => handleApplication(a.id, "reject")}
                          className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-destructive/10 text-destructive text-xs font-medium hover:bg-destructive/20 transition-colors"
                        >
                          <XCircle className="w-3 h-3" /> Reject
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Events List */}
          <div className="glass-card rounded-xl p-6 mt-6">
            <h3 className="font-heading font-bold text-lg mb-4">📅 Your Events</h3>
            <div className="space-y-3">
              {mockNGOData.events.map((e) => (
                <div key={e.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{e.title}</p>
                      <p className="text-sm text-muted-foreground">{e.date} • {e.volunteers} volunteers</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    e.status === "active" ? "bg-success/10 text-success" : "bg-primary/10 text-primary"
                  }`}>
                    {e.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NGODashboard;
