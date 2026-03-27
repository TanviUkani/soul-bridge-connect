import { useState } from "react";
import { Bell, Check, Trash2, CheckCheck } from "lucide-react";
import { mockNotifications } from "@/lib/store";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Notifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markRead = (id: string) => setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const remove = (id: string) => setNotifications((prev) => prev.filter((n) => n.id !== id));

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-heading text-3xl font-bold flex items-center gap-3">
                <Bell className="w-8 h-8 text-primary" /> Notifications
              </h1>
              <p className="text-muted-foreground">{unreadCount} unread</p>
            </div>
            {unreadCount > 0 && (
              <button onClick={markAllRead} className="px-4 py-2 rounded-xl bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors flex items-center gap-2">
                <CheckCheck className="w-4 h-4" /> Mark all read
              </button>
            )}
          </div>

          <div className="space-y-3">
            {notifications.length === 0 ? (
              <div className="glass-card rounded-xl p-12 text-center">
                <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="font-heading font-bold">All caught up!</p>
                <p className="text-sm text-muted-foreground">No notifications</p>
              </div>
            ) : notifications.map((n) => (
              <div key={n.id} className={`glass-card rounded-xl p-4 flex items-start gap-4 transition-all ${!n.read ? "border-l-4 border-l-primary" : "opacity-75"}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${!n.read ? "bg-primary/10" : "bg-muted"}`}>
                  <Bell className={`w-5 h-5 ${!n.read ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${!n.read ? "font-semibold" : "font-medium"}`}>{n.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  {!n.read && (
                    <button onClick={() => markRead(n.id)} className="p-1.5 rounded-lg hover:bg-muted transition-colors" title="Mark read">
                      <Check className="w-4 h-4 text-success" />
                    </button>
                  )}
                  <button onClick={() => remove(n.id)} className="p-1.5 rounded-lg hover:bg-muted transition-colors" title="Delete">
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </button>
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

export default Notifications;
