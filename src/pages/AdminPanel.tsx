import { useState } from "react";
import { Users, Building, Calendar, TrendingUp, CheckCircle, XCircle, Shield, Search, BarChart3 } from "lucide-react";
import Navbar from "@/components/Navbar";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { toast } from "sonner";

const mockAdminData = {
  stats: { totalUsers: 12500, totalNGOs: 450, totalEvents: 3200, engagement: 78 },
  pendingNGOs: [
    { id: "n1", name: "EduBridge Trust", email: "contact@edubridge.org", regNo: "NGO-2026-4521", date: "Mar 25, 2026" },
    { id: "n2", name: "Rural Health Initiative", email: "info@rhi.org", regNo: "NGO-2026-4522", date: "Mar 26, 2026" },
    { id: "n3", name: "TechForGood", email: "admin@techforgood.in", regNo: "NGO-2026-4523", date: "Mar 27, 2026" },
  ],
  pendingVolunteers: [
    { id: "v1", name: "Rahul Verma", email: "rahul@email.com", aadhaar: "XXXX-XXXX-1234", date: "Mar 26, 2026" },
    { id: "v2", name: "Kavita Nair", email: "kavita@email.com", aadhaar: "XXXX-XXXX-5678", date: "Mar 27, 2026" },
  ],
  reportedAccounts: [
    { id: "f1", name: "FakeNGO123", type: "NGO", reason: "Fake certificate", reports: 5 },
    { id: "f2", name: "SpamUser", type: "Volunteer", reason: "Spam applications", reports: 3 },
  ],
  userGrowth: [
    { month: "Oct", users: 8500 }, { month: "Nov", users: 9200 }, { month: "Dec", users: 10100 },
    { month: "Jan", users: 10800 }, { month: "Feb", users: 11600 }, { month: "Mar", users: 12500 },
  ],
  eventsByDomain: [
    { domain: "Education", count: 820 }, { domain: "Environment", count: 650 },
    { domain: "Healthcare", count: 580 }, { domain: "Community", count: 450 },
    { domain: "Child Welfare", count: 380 }, { domain: "Arts", count: 320 },
  ],
};

const AdminPanel = () => {
  const [tab, setTab] = useState<"overview" | "ngos" | "volunteers" | "reports">("overview");
  const [pendingNGOs, setPendingNGOs] = useState(mockAdminData.pendingNGOs);
  const [pendingVols, setPendingVols] = useState(mockAdminData.pendingVolunteers);
  const [reported, setReported] = useState(mockAdminData.reportedAccounts);

  const handleNGO = (id: string, action: "approve" | "reject") => {
    setPendingNGOs((prev) => prev.filter((n) => n.id !== id));
    toast.success(`NGO ${action}d successfully!`);
  };

  const handleVol = (id: string, action: "verify" | "reject") => {
    setPendingVols((prev) => prev.filter((v) => v.id !== id));
    toast.success(`Volunteer ${action === "verify" ? "verified" : "rejected"}!`);
  };

  const handleRemove = (id: string) => {
    setReported((prev) => prev.filter((r) => r.id !== id));
    toast.success("Account removed!");
  };

  const tabs = [
    { key: "overview" as const, label: "Overview", icon: BarChart3 },
    { key: "ngos" as const, label: "NGO Approvals", icon: Building },
    { key: "volunteers" as const, label: "Verify Volunteers", icon: Users },
    { key: "reports" as const, label: "Reported", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="font-heading text-2xl font-bold flex items-center gap-3">
              <Shield className="w-7 h-7 text-primary" /> Admin Panel
            </h1>
            <p className="text-muted-foreground">Manage users, NGOs, and platform analytics</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  tab === t.key ? "bg-primary text-primary-foreground" : "bg-card border text-muted-foreground hover:text-foreground"
                }`}
              >
                <t.icon className="w-4 h-4" /> {t.label}
              </button>
            ))}
          </div>

          {tab === "overview" && (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { icon: Users, label: "Total Users", value: mockAdminData.stats.totalUsers.toLocaleString(), color: "text-primary", bg: "bg-primary/10" },
                  { icon: Building, label: "Registered NGOs", value: mockAdminData.stats.totalNGOs.toLocaleString(), color: "text-secondary", bg: "bg-secondary/10" },
                  { icon: Calendar, label: "Total Events", value: mockAdminData.stats.totalEvents.toLocaleString(), color: "text-accent", bg: "bg-accent/10" },
                  { icon: TrendingUp, label: "Engagement", value: `${mockAdminData.stats.engagement}%`, color: "text-success", bg: "bg-success/10" },
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

              <div className="grid lg:grid-cols-2 gap-6">
                <div className="glass-card rounded-xl p-6">
                  <h3 className="font-heading font-bold mb-4">User Growth</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={mockAdminData.userGrowth}>
                      <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={12} />
                      <YAxis axisLine={false} tickLine={false} fontSize={12} />
                      <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(220 14% 90%)" }} />
                      <Line type="monotone" dataKey="users" stroke="hsl(174, 60%, 40%)" strokeWidth={3} dot={{ r: 5 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="glass-card rounded-xl p-6">
                  <h3 className="font-heading font-bold mb-4">Events by Domain</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={mockAdminData.eventsByDomain} layout="vertical">
                      <XAxis type="number" axisLine={false} tickLine={false} fontSize={12} />
                      <YAxis type="category" dataKey="domain" axisLine={false} tickLine={false} fontSize={12} width={90} />
                      <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(220 14% 90%)" }} />
                      <Bar dataKey="count" fill="hsl(30, 80%, 55%)" radius={[0, 6, 6, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}

          {tab === "ngos" && (
            <div className="space-y-4">
              {pendingNGOs.length === 0 ? (
                <div className="glass-card rounded-xl p-12 text-center">
                  <CheckCircle className="w-12 h-12 text-success mx-auto mb-3" />
                  <p className="font-heading font-bold">All caught up!</p>
                  <p className="text-sm text-muted-foreground">No pending NGO registrations</p>
                </div>
              ) : pendingNGOs.map((n) => (
                <div key={n.id} className="glass-card rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                    <Building className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold">{n.name}</p>
                    <p className="text-sm text-muted-foreground">{n.email} • Reg: {n.regNo}</p>
                    <p className="text-xs text-muted-foreground">Applied: {n.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleNGO(n.id, "approve")} className="px-4 py-2 rounded-xl bg-success/10 text-success text-sm font-medium hover:bg-success/20 transition-colors flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" /> Approve
                    </button>
                    <button onClick={() => handleNGO(n.id, "reject")} className="px-4 py-2 rounded-xl bg-destructive/10 text-destructive text-sm font-medium hover:bg-destructive/20 transition-colors flex items-center gap-1">
                      <XCircle className="w-4 h-4" /> Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "volunteers" && (
            <div className="space-y-4">
              {pendingVols.length === 0 ? (
                <div className="glass-card rounded-xl p-12 text-center">
                  <CheckCircle className="w-12 h-12 text-success mx-auto mb-3" />
                  <p className="font-heading font-bold">All verified!</p>
                  <p className="text-sm text-muted-foreground">No pending volunteer verifications</p>
                </div>
              ) : pendingVols.map((v) => (
                <div key={v.id} className="glass-card rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold">{v.name}</p>
                    <p className="text-sm text-muted-foreground">{v.email} • Aadhaar: {v.aadhaar}</p>
                    <p className="text-xs text-muted-foreground">Joined: {v.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleVol(v.id, "verify")} className="px-4 py-2 rounded-xl bg-success/10 text-success text-sm font-medium hover:bg-success/20 transition-colors flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" /> Verify
                    </button>
                    <button onClick={() => handleVol(v.id, "reject")} className="px-4 py-2 rounded-xl bg-destructive/10 text-destructive text-sm font-medium hover:bg-destructive/20 transition-colors flex items-center gap-1">
                      <XCircle className="w-4 h-4" /> Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "reports" && (
            <div className="space-y-4">
              {reported.length === 0 ? (
                <div className="glass-card rounded-xl p-12 text-center">
                  <Shield className="w-12 h-12 text-success mx-auto mb-3" />
                  <p className="font-heading font-bold">All clear!</p>
                  <p className="text-sm text-muted-foreground">No reported accounts</p>
                </div>
              ) : reported.map((r) => (
                <div key={r.id} className="glass-card rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0">
                    <Shield className="w-6 h-6 text-destructive" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold">{r.name} <span className="text-xs font-normal bg-muted px-2 py-0.5 rounded-full ml-1">{r.type}</span></p>
                    <p className="text-sm text-muted-foreground">Reason: {r.reason} • {r.reports} reports</p>
                  </div>
                  <button onClick={() => handleRemove(r.id)} className="px-4 py-2 rounded-xl bg-destructive text-destructive-foreground text-sm font-medium hover:bg-destructive/90 transition-colors">
                    Remove Account
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
