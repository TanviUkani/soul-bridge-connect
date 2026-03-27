import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-card border-t py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
              <Heart className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-lg">Soul Bridge</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Connecting volunteers with NGOs to create lasting impact in communities worldwide.
          </p>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-3">Platform</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <Link to="/events" className="block hover:text-foreground transition-colors">Browse Events</Link>
            <Link to="/leaderboard" className="block hover:text-foreground transition-colors">Leaderboard</Link>
            <Link to="/signup" className="block hover:text-foreground transition-colors">Join as Volunteer</Link>
            <Link to="/signup" className="block hover:text-foreground transition-colors">Register NGO</Link>
          </div>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-3">Support</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <span className="block">Help Center</span>
            <span className="block">Privacy Policy</span>
            <span className="block">Terms of Service</span>
            <span className="block">Contact Us</span>
          </div>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-3">Stay Connected</h4>
          <p className="text-sm text-muted-foreground mb-3">Get updates on new opportunities.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-3 py-2 rounded-lg border bg-background text-sm"
            />
            <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
              Join
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
        © 2026 Soul Bridge. Made with ❤️ for communities everywhere.
      </div>
    </div>
  </footer>
);

export default Footer;
