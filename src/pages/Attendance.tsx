import { useState } from "react";
import { QrCode, LogIn, LogOut, Clock, CheckCircle2, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

interface AttendanceEvent {
  id: string; event: string; ngo: string; date: string; time: string; location: string;
  checkedIn: boolean; checkedOut: boolean; checkInTime?: string; checkOutTime?: string; totalHours?: number;
}

const mockAttendanceEvents: AttendanceEvent[] = [
  { id: "a1", event: "Community Tree Plantation Drive", ngo: "Green Earth Foundation", date: "Apr 15, 2026", time: "7:00 AM - 12:00 PM", location: "Cubbon Park, Bangalore", checkedIn: false, checkedOut: false },
  { id: "a2", event: "Code for Kids Workshop", ngo: "Digital Literacy India", date: "Apr 20, 2026", time: "10:00 AM - 4:00 PM", location: "Community Hall, Mumbai", checkedIn: true, checkedOut: false, checkInTime: "9:55 AM" },
  { id: "a3", event: "Beach Cleanup Marathon", ngo: "Ocean Warriors", date: "Mar 15, 2026", time: "6:00 AM - 10:00 AM", location: "Juhu Beach, Mumbai", checkedIn: true, checkedOut: true, checkInTime: "5:50 AM", checkOutTime: "10:05 AM", totalHours: 4.25 },
];

const Attendance = () => {
  const [events, setEvents] = useState(mockAttendanceEvents);
  const [showQR, setShowQR] = useState<string | null>(null);

  const checkIn = (id: string) => {
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setEvents((prev) => prev.map((e) => e.id === id ? { ...e, checkedIn: true, checkInTime: now } : e));
    toast.success("Checked in successfully! ✅");
  };

  const checkOut = (id: string) => {
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setEvents((prev) => prev.map((e) => e.id === id ? { ...e, checkedOut: true, checkOutTime: now, totalHours: 4.5 } : e));
    toast.success("Checked out! Total hours recorded. ⏱");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <h1 className="font-heading text-3xl font-bold mb-2 flex items-center gap-3">
              <QrCode className="w-8 h-8 text-primary" /> Attendance
            </h1>
            <p className="text-muted-foreground">Check in/out for your volunteering events</p>
          </div>

          <div className="space-y-4">
            {events.map((e) => (
              <div key={e.id} className="glass-card rounded-2xl p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-heading font-bold">{e.event}</h3>
                    <p className="text-sm text-muted-foreground">{e.ngo}</p>
                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">📅 {e.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {e.time}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {e.location}</span>
                    </div>
                  </div>
                  {e.checkedIn && e.checkedOut && (
                    <span className="px-3 py-1.5 rounded-full bg-success/10 text-success text-xs font-bold flex items-center gap-1 self-start">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Completed • {e.totalHours}h
                    </span>
                  )}
                </div>

                {/* Timeline */}
                <div className="flex items-center gap-4 mb-4">
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm ${e.checkedIn ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                    <LogIn className="w-4 h-4" />
                    {e.checkedIn ? `Checked in at ${e.checkInTime}` : "Not checked in"}
                  </div>
                  <div className="flex-1 h-0.5 bg-muted rounded-full">
                    <div className={`h-full rounded-full bg-success transition-all ${e.checkedOut ? "w-full" : e.checkedIn ? "w-1/2" : "w-0"}`} />
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm ${e.checkedOut ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                    <LogOut className="w-4 h-4" />
                    {e.checkedOut ? `Checked out at ${e.checkOutTime}` : "Not checked out"}
                  </div>
                </div>

                {/* Actions */}
                {!e.checkedOut && (
                  <div className="flex gap-3">
                    {!e.checkedIn ? (
                      <>
                        <button onClick={() => checkIn(e.id)} className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                          <LogIn className="w-4 h-4" /> Check In
                        </button>
                        <button onClick={() => setShowQR(showQR === e.id ? null : e.id)} className="px-4 py-2.5 rounded-xl border text-sm font-medium hover:bg-muted transition-colors flex items-center gap-2">
                          <QrCode className="w-4 h-4" /> QR Scan
                        </button>
                      </>
                    ) : (
                      <button onClick={() => checkOut(e.id)} className="flex-1 py-2.5 rounded-xl bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/90 transition-colors flex items-center justify-center gap-2">
                        <LogOut className="w-4 h-4" /> Check Out
                      </button>
                    )}
                  </div>
                )}

                {/* Mock QR */}
                {showQR === e.id && (
                  <div className="mt-4 p-6 bg-muted/50 rounded-xl text-center">
                    <div className="w-40 h-40 mx-auto bg-card border-2 border-dashed border-primary/30 rounded-xl flex items-center justify-center mb-3">
                      <div className="grid grid-cols-5 gap-1">
                        {Array(25).fill(0).map((_, i) => (
                          <div key={i} className={`w-4 h-4 rounded-sm ${Math.random() > 0.4 ? "bg-foreground" : "bg-card"}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">Scan this QR code to check in</p>
                    <button
                      onClick={() => { checkIn(e.id); setShowQR(null); }}
                      className="mt-3 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium"
                    >
                      Simulate QR Scan ✓
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Attendance;
