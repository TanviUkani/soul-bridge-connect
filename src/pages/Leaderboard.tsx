import { mockLeaderboard } from "@/lib/mockData";
import { Trophy, Medal, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">🏆 Leaderboard</h1>
            <p className="text-muted-foreground">Celebrating our most impactful volunteers</p>
          </div>

          {/* Top 3 Podium */}
          <div className="flex items-end justify-center gap-4 mb-12">
            {[mockLeaderboard[1], mockLeaderboard[0], mockLeaderboard[2]].map((v, i) => {
              const heights = ["h-28", "h-36", "h-24"];
              const sizes = ["w-14 h-14", "w-18 h-18", "w-14 h-14"];
              const colors = ["bg-muted", "bg-warning/10 border-2 border-warning/50", "bg-muted"];
              return (
                <div key={v.rank} className="flex flex-col items-center">
                  <div className={`${i === 1 ? "w-[72px] h-[72px]" : "w-14 h-14"} rounded-full ${colors[i]} flex items-center justify-center font-bold text-lg text-primary mb-2`}>
                    {v.avatar}
                  </div>
                  <p className="font-medium text-sm text-center">{v.name}</p>
                  <p className="text-xs text-muted-foreground">{v.hours}h</p>
                  <div className={`${heights[i]} w-20 mt-3 rounded-t-xl ${i === 1 ? "gradient-hero" : "bg-primary/20"} flex items-end justify-center pb-3`}>
                    <span className="text-xl">{v.badge}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Full List */}
          <div className="space-y-3">
            {mockLeaderboard.map((v, i) => (
              <div
                key={v.rank}
                className={`flex items-center gap-4 p-4 rounded-xl glass-card ${i === 0 ? "border-2 border-warning/30" : ""}`}
              >
                <span className="text-lg font-heading font-bold w-8 text-center">
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Leaderboard;
