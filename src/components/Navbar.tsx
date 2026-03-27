import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Heart, Menu, X, LogIn, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import DarkModeToggle from "@/components/DarkModeToggle";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const mainLinks = [
    { to: "/", label: "Home" },
    { to: "/events", label: "Explore Events" },
    { to: "/leaderboard", label: "Leaderboard" },
    { to: "/calendar", label: "Calendar" },
  ];

  const moreLinks = [
    { to: "/volunteer/dashboard", label: "Volunteer Dashboard" },
    { to: "/volunteer/profile", label: "Volunteer Profile" },
    { to: "/ngo/dashboard", label: "NGO Dashboard" },
    { to: "/ngo/profile", label: "NGO Profile" },
    { to: "/chat", label: "Messages" },
    { to: "/certificates", label: "Certificates" },
    { to: "/attendance", label: "Attendance" },
    { to: "/payments", label: "Payments" },
    { to: "/reviews", label: "Reviews" },
    { to: "/notifications", label: "Notifications" },
    { to: "/admin", label: "Admin Panel" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg gradient-hero flex items-center justify-center">
            <Heart className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-heading font-bold text-xl text-foreground">Soul Bridge</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {mainLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === l.to
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {l.label}
            </Link>
          ))}
          {/* More dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex items-center gap-1"
            >
              More <ChevronDown className={`w-3 h-3 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {dropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                <div className="absolute top-full right-0 mt-1 w-52 bg-card border rounded-xl shadow-xl z-50 py-1 max-h-[70vh] overflow-y-auto">
                  {moreLinks.map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      onClick={() => setDropdownOpen(false)}
                      className={`block px-4 py-2.5 text-sm transition-colors ${
                        location.pathname === l.to ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <DarkModeToggle />
          <Link to="/login">
            <Button variant="ghost" size="sm" className="gap-2">
              <LogIn className="w-4 h-4" /> Log In
            </Button>
          </Link>
          <Link to="/signup">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Sign Up
            </Button>
          </Link>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <DarkModeToggle />
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t bg-card p-4 space-y-1 max-h-[80vh] overflow-y-auto">
          {[...mainLinks, ...moreLinks].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === l.to ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <div className="flex gap-2 pt-2">
            <Link to="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
              <Button variant="outline" className="w-full" size="sm">Log In</Button>
            </Link>
            <Link to="/signup" className="flex-1" onClick={() => setMobileOpen(false)}>
              <Button className="w-full bg-primary text-primary-foreground" size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
