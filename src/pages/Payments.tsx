import { useState } from "react";
import { CreditCard, QrCode, Heart, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const Payments = () => {
  const [amount, setAmount] = useState("");
  const [ngo, setNgo] = useState("Green Earth Foundation");
  const [showQR, setShowQR] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [type, setType] = useState<"donation" | "stipend">("donation");

  const presetAmounts = [100, 500, 1000, 5000];
  const ngos = ["Green Earth Foundation", "Digital Literacy India", "Health For All NGO", "Smile Foundation", "Ocean Warriors"];

  const handlePay = () => {
    if (!amount || Number(amount) <= 0) { toast.error("Enter a valid amount"); return; }
    setShowQR(true);
  };

  const confirmPayment = () => {
    setShowQR(false);
    setPaymentSuccess(true);
    toast.success(`₹${amount} ${type} successful! 🎉`);
    setTimeout(() => setPaymentSuccess(false), 5000);
  };

  const recentPayments = [
    { id: "p1", ngo: "Green Earth Foundation", amount: 1000, date: "Mar 20, 2026", type: "Donation" },
    { id: "p2", ngo: "Digital Literacy India", amount: 500, date: "Feb 15, 2026", type: "Stipend Received" },
    { id: "p3", ngo: "Ocean Warriors", amount: 2000, date: "Jan 10, 2026", type: "Donation" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="mb-8">
            <h1 className="font-heading text-3xl font-bold mb-2 flex items-center gap-3">
              <CreditCard className="w-8 h-8 text-primary" /> Payments
            </h1>
            <p className="text-muted-foreground">Donate to NGOs or manage stipends</p>
          </div>

          {/* Type Toggle */}
          <div className="flex p-1 bg-muted rounded-xl mb-6 max-w-xs">
            {(["donation", "stipend"] as const).map((t) => (
              <button key={t} onClick={() => setType(t)} className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all capitalize ${type === t ? "bg-card shadow-sm" : "text-muted-foreground"}`}>
                {t === "donation" ? "💝 Donate" : "💰 Stipend"}
              </button>
            ))}
          </div>

          {/* Payment Form */}
          <div className="glass-card rounded-2xl p-6 mb-6">
            <h3 className="font-heading font-bold mb-4">{type === "donation" ? "Make a Donation" : "Request Stipend"}</h3>

            <div className="mb-4">
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Select NGO</label>
              <select value={ngo} onChange={(e) => setNgo(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border bg-background text-sm">
                {ngos.map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>

            <div className="mb-4">
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Amount (₹)</label>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border bg-background text-sm" placeholder="Enter amount" />
              <div className="flex gap-2 mt-2">
                {presetAmounts.map((a) => (
                  <button key={a} onClick={() => setAmount(String(a))} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    amount === String(a) ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}>₹{a}</button>
                ))}
              </div>
            </div>

            <button onClick={handlePay} className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
              <Heart className="w-5 h-5" /> {type === "donation" ? "Donate Now" : "Request Stipend"}
            </button>
          </div>

          {/* QR Modal */}
          {showQR && (
            <div className="fixed inset-0 z-50 bg-foreground/50 flex items-center justify-center p-4" onClick={() => setShowQR(false)}>
              <div className="bg-card rounded-2xl p-8 max-w-sm w-full text-center" onClick={(e) => e.stopPropagation()}>
                <QrCode className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-heading font-bold text-lg mb-1">Scan to Pay</h3>
                <p className="text-sm text-muted-foreground mb-4">₹{amount} to {ngo}</p>
                <div className="w-48 h-48 mx-auto bg-card border-2 border-primary/20 rounded-xl flex items-center justify-center mb-4">
                  <div className="grid grid-cols-7 gap-0.5">
                    {Array(49).fill(0).map((_, i) => (
                      <div key={i} className={`w-4 h-4 rounded-sm ${Math.random() > 0.35 ? "bg-foreground" : "bg-card"}`} />
                    ))}
                  </div>
                </div>
                <button onClick={confirmPayment} className="w-full py-3 rounded-xl bg-success text-success-foreground font-semibold hover:bg-success/90 transition-colors">
                  Confirm Payment ✓
                </button>
              </div>
            </div>
          )}

          {/* Success Message */}
          {paymentSuccess && (
            <div className="glass-card rounded-2xl p-6 mb-6 text-center border-2 border-success/30 bg-success/5">
              <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-3" />
              <h3 className="font-heading font-bold text-lg">Payment Successful!</h3>
              <p className="text-sm text-muted-foreground">₹{amount} {type} to {ngo} has been processed.</p>
            </div>
          )}

          {/* Recent Transactions */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-heading font-bold mb-4">Recent Transactions</h3>
            <div className="space-y-3">
              {recentPayments.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                  <div>
                    <p className="font-medium text-sm">{p.ngo}</p>
                    <p className="text-xs text-muted-foreground">{p.date} • {p.type}</p>
                  </div>
                  <span className={`font-heading font-bold ${p.type === "Stipend Received" ? "text-success" : "text-foreground"}`}>
                    {p.type === "Stipend Received" ? "+" : "-"}₹{p.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Payments;
