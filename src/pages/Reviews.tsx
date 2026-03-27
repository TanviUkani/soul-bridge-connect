import { useState } from "react";
import { Star, Send } from "lucide-react";
import { mockReviews } from "@/lib/store";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const Reviews = () => {
  const [reviews, setReviews] = useState(mockReviews);
  const [tab, setTab] = useState<"all" | "given" | "received">("all");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewTarget, setReviewTarget] = useState("Green Earth Foundation");

  const targets = ["Green Earth Foundation", "Digital Literacy India", "Health For All NGO", "Ocean Warriors"];

  const filtered = tab === "all" ? reviews :
    tab === "given" ? reviews.filter((r) => r.type === "volunteer-to-ngo") :
    reviews.filter((r) => r.type === "ngo-to-volunteer");

  const submitReview = () => {
    if (rating === 0 || !reviewText.trim()) { toast.error("Please add rating and review text"); return; }
    const newReview = {
      id: `r-${Date.now()}`,
      reviewer: "Priya Sharma",
      reviewerAvatar: "PS",
      target: reviewTarget,
      rating,
      text: reviewText.trim(),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      type: "volunteer-to-ngo" as const,
    };
    setReviews((prev) => [newReview, ...prev]);
    setRating(0);
    setReviewText("");
    toast.success("Review submitted! ⭐");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="mb-8">
            <h1 className="font-heading text-3xl font-bold mb-2">⭐ Reviews & Testimonials</h1>
            <p className="text-muted-foreground">Rate your volunteering experiences</p>
          </div>

          {/* Write Review */}
          <div className="glass-card rounded-2xl p-6 mb-8">
            <h3 className="font-heading font-bold mb-4">Write a Review</h3>
            <div className="mb-4">
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">For</label>
              <select value={reviewTarget} onChange={(e) => setReviewTarget(e.target.value)} className="w-full px-3 py-2 rounded-xl border bg-background text-sm">
                {targets.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="mb-4">
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button key={s} onMouseEnter={() => setHoverRating(s)} onMouseLeave={() => setHoverRating(0)} onClick={() => setRating(s)}>
                    <Star className={`w-7 h-7 transition-colors ${s <= (hoverRating || rating) ? "fill-warning text-warning" : "text-muted"}`} />
                  </button>
                ))}
              </div>
            </div>
            <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} rows={3} className="w-full px-3 py-2 rounded-xl border bg-background text-sm resize-none mb-4" placeholder="Share your experience..." />
            <button onClick={submitReview} className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
              <Send className="w-4 h-4" /> Submit Review
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {[
              { key: "all" as const, label: "All Reviews" },
              { key: "given" as const, label: "Given" },
              { key: "received" as const, label: "Received" },
            ].map((t) => (
              <button key={t.key} onClick={() => setTab(t.key)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${tab === t.key ? "bg-primary text-primary-foreground" : "bg-card border text-muted-foreground"}`}>
                {t.label}
              </button>
            ))}
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {filtered.map((r) => (
              <div key={r.id} className="glass-card rounded-xl p-5">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                      {r.reviewerAvatar}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{r.reviewer}</p>
                      <p className="text-xs text-muted-foreground">reviewed <span className="text-foreground font-medium">{r.target}</span></p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{r.date}</span>
                </div>
                <div className="flex gap-0.5 mb-2 ml-[52px]">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`w-4 h-4 ${s <= r.rating ? "fill-warning text-warning" : "text-muted"}`} />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground ml-[52px]">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Reviews;
