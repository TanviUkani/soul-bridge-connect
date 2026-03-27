import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Mail, Lock, User, Phone, MapPin, Eye, EyeOff, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { saveUser } from "@/lib/store";
import { skills, interests } from "@/lib/mockData";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<"volunteer" | "ngo">("volunteer");
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", password: "" });
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSignup = () => {
    saveUser({
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      role,
      skills: selectedSkills,
      interests: selectedInterests,
      avatar: "",
    });
    toast.success(`Account created as ${role}!`);
    navigate(role === "volunteer" ? "/volunteer/dashboard" : "/ngo/dashboard");
  };

  const update = (field: string, value: string) => setForm({ ...form, [field]: value });
  const toggleSkill = (s: string) => setSelectedSkills((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  const toggleInterest = (i: string) => setSelectedInterests((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);

  const fields = [
    { key: "name", label: role === "ngo" ? "Organization Name" : "Full Name", icon: User, type: "text", placeholder: role === "ngo" ? "NGO name" : "John Doe" },
    { key: "email", label: "Email", icon: Mail, type: "email", placeholder: "you@email.com" },
    { key: "phone", label: "Contact Number", icon: Phone, type: "tel", placeholder: "+91 98765 43210" },
    { key: "address", label: "Address", icon: MapPin, type: "text", placeholder: "City, State" },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-2xl">Soul Bridge</span>
          </Link>
          <h1 className="font-heading text-2xl font-bold">
            {step === 1 ? "Create your account" : "Select your skills & interests"}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {step === 1 ? "Join the community and start making an impact" : "Help us match you with the right opportunities"}
          </p>
          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className={`w-8 h-1.5 rounded-full ${step === 1 ? "bg-primary" : "bg-muted"}`} />
            <div className={`w-8 h-1.5 rounded-full ${step === 2 ? "bg-primary" : "bg-muted"}`} />
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          {step === 1 ? (
            <>
              <div className="flex p-1 bg-muted rounded-xl mb-6">
                {(["volunteer", "ngo"] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setRole(r)}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      role === r ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {r === "volunteer" ? "👤 Volunteer" : "🏢 NGO"}
                  </button>
                ))}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep(2);
                }}
                className="space-y-4"
              >
                {fields.map((f) => (
                  <div key={f.key}>
                    <label className="text-sm font-medium mb-1.5 block">{f.label}</label>
                    <div className="relative">
                      <f.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type={f.type}
                        value={form[f.key as keyof typeof form]}
                        onChange={(e) => update(f.key, e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border bg-background text-sm"
                        placeholder={f.placeholder}
                        required
                      />
                    </div>
                  </div>
                ))}

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type={showPass ? "text" : "password"}
                      value={form.password}
                      onChange={(e) => update("password", e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border bg-background text-sm"
                      placeholder="Min 8 characters"
                      required
                      minLength={8}
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl py-5 gap-2">
                  Next <ArrowRight className="w-4 h-4" />
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t" /></div>
                <div className="relative flex justify-center text-xs text-muted-foreground">
                  <span className="bg-card px-2">or continue with</span>
                </div>
              </div>

              <button
                onClick={() => {
                  toast.success("Google signup (mock)");
                  saveUser({ name: "Google User", email: "google@user.com", phone: "", address: "", role, skills: [], interests: [], avatar: "" });
                  navigate(role === "volunteer" ? "/volunteer/dashboard" : "/ngo/dashboard");
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border hover:bg-muted transition-colors text-sm font-medium"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Continue with Google
              </button>

              <p className="text-center text-sm text-muted-foreground mt-6">
                Already have an account?{" "}
                <Link to="/login" className="text-primary font-medium hover:underline">Log in</Link>
              </p>
            </>
          ) : (
            <>
              {/* Step 2: Skills & Interests */}
              <div className="mb-6">
                <h3 className="font-heading font-bold mb-3">🎯 Select Your Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <button
                      key={s}
                      onClick={() => toggleSkill(s)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        selectedSkills.includes(s) ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-heading font-bold mb-3">💡 Select Your Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {interests.map((i) => (
                    <button
                      key={i}
                      onClick={() => toggleInterest(i)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        selectedInterests.includes(i) ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {i}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1 rounded-xl py-5 gap-2">
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
                <Button onClick={handleSignup} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl py-5">
                  Create Account
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
