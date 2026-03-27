import { useState } from "react";
import { mockEvents } from "@/lib/mockData";
import { Calendar, ChevronLeft, ChevronRight, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1)); // April 2026

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const eventsForMonth = mockEvents.filter((e) => {
    const d = new Date(e.date);
    return d.getMonth() === month && d.getFullYear() === year;
  });

  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return mockEvents.filter((e) => e.date === dateStr);
  };

  const prev = () => setCurrentDate(new Date(year, month - 1, 1));
  const next = () => setCurrentDate(new Date(year, month + 1, 1));

  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const selectedEvents = selectedDay ? getEventsForDay(selectedDay) : [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-8">
            <h1 className="font-heading text-3xl font-bold mb-2 flex items-center gap-3">
              <Calendar className="w-8 h-8 text-primary" /> My Calendar
            </h1>
            <p className="text-muted-foreground">Track your upcoming volunteering events</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <div className="lg:col-span-2 glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <button onClick={prev} className="p-2 rounded-xl hover:bg-muted transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h2 className="font-heading font-bold text-xl">{months[month]} {year}</h2>
                <button onClick={next} className="p-2 rounded-xl hover:bg-muted transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Weekday headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {weekDays.map((d) => (
                  <div key={d} className="text-center text-xs font-semibold text-muted-foreground py-2">{d}</div>
                ))}
              </div>

              {/* Days */}
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-12" />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dayEvents = getEventsForDay(day);
                  const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
                  const isSelected = selectedDay === day;

                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day === selectedDay ? null : day)}
                      className={`h-12 rounded-xl text-sm font-medium relative transition-all ${
                        isSelected ? "bg-primary text-primary-foreground" :
                        isToday ? "bg-primary/10 text-primary font-bold" :
                        "hover:bg-muted"
                      }`}
                    >
                      {day}
                      {dayEvents.length > 0 && (
                        <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${
                          isSelected ? "bg-primary-foreground" : "bg-primary"
                        }`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Side panel */}
            <div className="space-y-4">
              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-heading font-bold mb-4">
                  {selectedDay
                    ? `Events on ${months[month]} ${selectedDay}`
                    : `Events in ${months[month]}`}
                </h3>
                {(selectedDay ? selectedEvents : eventsForMonth).length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">No events scheduled</p>
                ) : (
                  <div className="space-y-3">
                    {(selectedDay ? selectedEvents : eventsForMonth).map((e) => (
                      <Link
                        key={e.id}
                        to={`/events/${e.id}`}
                        className="block p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{e.ngoLogo}</span>
                          <p className="font-medium text-sm">{e.title}</p>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{e.location.split(",")[0]}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{e.time}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Status Legend */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-heading font-bold mb-3 text-sm">Application Status</h3>
                <div className="space-y-2">
                  {[
                    { label: "Accepted", color: "bg-success", count: 3 },
                    { label: "Pending", color: "bg-warning", count: 2 },
                    { label: "Upcoming", color: "bg-primary", count: 1 },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${s.color}`} />
                        <span className="text-muted-foreground">{s.label}</span>
                      </div>
                      <span className="font-medium">{s.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CalendarView;
