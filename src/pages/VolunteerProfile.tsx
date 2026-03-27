import { useState } from "react";
import { Camera, MapPin, Clock, Award, Briefcase, Save, ChevronDown, ChevronUp } from "lucide-react";
import { skills, interests } from "@/lib/mockData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const timeSlots = ["9AM-12PM", "12PM-3PM", "3PM-6PM", "6PM-9PM"];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const VolunteerProfile = () => {
  const [name, setName] = useState("Priya Sharma");
  const [email] = useState("priya@email.com");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [address, setAddress] = useState("Bangalore, Karnataka");
  const [bio, setBio] = useState("Passionate volunteer dedicated to education and community development. Love teaching kids coding and organizing community events.");
  const [selectedSkills, setSelectedSkills] = useState(["Teaching", "Coding", "Event Planning"]);
  const [selectedInterests, setSelectedInterests] = useState(["Education", "Environment", "Child Welfare"]);
  const [availability, setAvailability] = useState<Record<string, string[]>>({
    Mon: ["9AM-12PM"], Tue: ["3PM-6PM"], Wed: [], Thu: ["9AM-12PM", "3PM-6PM"],
    Fri: [], Sat: ["9AM-12PM", "12PM-3PM", "3PM-6PM"], Sun: ["9AM-12PM"],
  });
  const [showExp, setShowExp] = useState(true);

  const toggleSkill = (s: string) => setSelectedSkills((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  const toggleInterest = (i: string) => setSelectedInterests((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);
  const toggleSlot = (day: string, slot: string) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: prev[day].includes(slot) ? prev[day].filter((s) => s !== slot) : [...prev[day], slot],
    }));
  };

  const save = () => toast.success("Profile saved successfully! ✅");

  const experiences = [
    { title: "Tree Plantation Drive", org: "Green Earth Foundation", date: "Mar 2026", hours: 6, desc: "Planted 50 saplings in Cubbon Park" },
    { title: "Code for Kids", org: "Digital Literacy India", date: "Feb 2026", hours: 8, desc: "Taught Scratch programming to 20 children" },
    { title: "Beach Cleanup", org: "Ocean Warriors", date: "Jan 2026", hours: 4, desc: "Cleaned Juhu Beach, collected 50kg waste" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="glass-card rounded-2xl p-8 mb-6">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl font-bold text-primary">
                  PS
                </div>
                <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 space-y-4 w-full">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground mb-1 block">Full Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 rounded-xl border bg-background text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground mb-1 block">Email</label>
                    <input value={email} disabled className="w-full px-3 py-2 rounded-xl border bg-muted text-sm text-muted-foreground" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground mb-1 block">Phone</label>
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-3 py-2 rounded-xl border bg-background text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground mb-1 block flex items-center gap-1"><MapPin className="w-3 h-3" /> Location</label>
                    <input value={address} onChange={(e) => setAddress(e.target.value)} className="w-full px-3 py-2 rounded-xl border bg-background text-sm" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">Bio</label>
                  <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={2} className="w-full px-3 py-2 rounded-xl border bg-background text-sm resize-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="glass-card rounded-2xl p-6 mb-6">
            <h3 className="font-heading font-bold mb-4">🎯 Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <button key={s} onClick={() => toggleSkill(s)} className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedSkills.includes(s) ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}>{s}</button>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="glass-card rounded-2xl p-6 mb-6">
            <h3 className="font-heading font-bold mb-4">💡 Interests</h3>
            <div className="flex flex-wrap gap-2">
              {interests.map((i) => (
                <button key={i} onClick={() => toggleInterest(i)} className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedInterests.includes(i) ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}>{i}</button>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="glass-card rounded-2xl p-6 mb-6">
            <h3 className="font-heading font-bold mb-4 flex items-center gap-2"><Clock className="w-5 h-5 text-primary" /> Weekly Availability</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left py-2 px-3 text-muted-foreground font-medium">Day</th>
                    {timeSlots.map((t) => <th key={t} className="py-2 px-2 text-muted-foreground font-medium text-center">{t}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {days.map((d) => (
                    <tr key={d}>
                      <td className="py-2 px-3 font-medium">{d}</td>
                      {timeSlots.map((t) => (
                        <td key={t} className="py-2 px-2 text-center">
                          <button
                            onClick={() => toggleSlot(d, t)}
                            className={`w-full py-1.5 rounded-lg text-xs font-medium transition-all ${
                              availability[d]?.includes(t) ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                            }`}
                          >
                            {availability[d]?.includes(t) ? "✓" : "—"}
                          </button>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Past Experience */}
          <div className="glass-card rounded-2xl p-6 mb-6">
            <button onClick={() => setShowExp(!showExp)} className="w-full flex items-center justify-between">
              <h3 className="font-heading font-bold flex items-center gap-2"><Briefcase className="w-5 h-5 text-secondary" /> Past Experience</h3>
              {showExp ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {showExp && (
              <div className="space-y-4 mt-4">
                {experiences.map((exp) => (
                  <div key={exp.title} className="p-4 rounded-xl bg-muted/50 border-l-4 border-primary">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-bold text-sm">{exp.title}</p>
                        <p className="text-xs text-muted-foreground">{exp.org} • {exp.date}</p>
                        <p className="text-sm text-muted-foreground mt-1">{exp.desc}</p>
                      </div>
                      <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">{exp.hours}h</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Save */}
          <button onClick={save} className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
            <Save className="w-5 h-5" /> Save Profile
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VolunteerProfile;
