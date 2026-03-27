import { useState } from "react";
import { Building, Upload, Save, Camera, FileText, Globe, Target } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const NGOProfile = () => {
  const [name, setName] = useState("Green Earth Foundation");
  const [email] = useState("contact@greenearth.org");
  const [phone, setPhone] = useState("+91 80 4567 8901");
  const [address, setAddress] = useState("Cubbon Park Road, Bangalore, Karnataka");
  const [regNo] = useState("NGO-KA-2020-1234");
  const [website, setWebsite] = useState("https://greenearth.org");
  const [mission, setMission] = useState("To create a greener, cleaner planet through community-driven environmental initiatives. We focus on tree plantation, waste management, and environmental education.");
  const [goals, setGoals] = useState("Plant 1 million trees by 2030. Conduct 500 cleanup drives annually. Educate 100,000 students on environmental conservation.");
  const [certUploaded, setCertUploaded] = useState(false);

  const save = () => toast.success("NGO profile saved! ✅");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="glass-card rounded-2xl p-8 mb-6">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl bg-secondary/10 flex items-center justify-center text-4xl">
                  🌿
                </div>
                <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center shadow-lg">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 space-y-4 w-full">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground mb-1 block">Organization Name</label>
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
                    <label className="text-xs font-semibold text-muted-foreground mb-1 block flex items-center gap-1"><Globe className="w-3 h-3" /> Website</label>
                    <input value={website} onChange={(e) => setWebsite(e.target.value)} className="w-full px-3 py-2 rounded-xl border bg-background text-sm" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">Address</label>
                  <input value={address} onChange={(e) => setAddress(e.target.value)} className="w-full px-3 py-2 rounded-xl border bg-background text-sm" />
                </div>
              </div>
            </div>
          </div>

          {/* Registration */}
          <div className="glass-card rounded-2xl p-6 mb-6">
            <h3 className="font-heading font-bold mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-primary" /> Registration Details</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Registration Number</label>
                <input value={regNo} disabled className="w-full px-3 py-2 rounded-xl border bg-muted text-sm text-muted-foreground" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Government Certificate</label>
                <button
                  onClick={() => { setCertUploaded(true); toast.success("Certificate uploaded (mock)!"); }}
                  className={`w-full px-3 py-2 rounded-xl border text-sm flex items-center justify-center gap-2 transition-colors ${
                    certUploaded ? "bg-success/10 text-success border-success/30" : "bg-background text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  {certUploaded ? "Certificate Uploaded ✓" : "Upload Certificate (PDF)"}
                </button>
              </div>
            </div>
          </div>

          {/* Mission */}
          <div className="glass-card rounded-2xl p-6 mb-6">
            <h3 className="font-heading font-bold mb-4 flex items-center gap-2"><Target className="w-5 h-5 text-secondary" /> Mission & Goals</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Mission Statement</label>
                <textarea value={mission} onChange={(e) => setMission(e.target.value)} rows={3} className="w-full px-3 py-2 rounded-xl border bg-background text-sm resize-none" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Goals</label>
                <textarea value={goals} onChange={(e) => setGoals(e.target.value)} rows={3} className="w-full px-3 py-2 rounded-xl border bg-background text-sm resize-none" />
              </div>
            </div>
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

export default NGOProfile;
