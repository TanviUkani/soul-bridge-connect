import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AIChatbot from "@/components/AIChatbot";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Events from "./pages/Events";
import Leaderboard from "./pages/Leaderboard";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import NGODashboard from "./pages/NGODashboard";
import EventDetails from "./pages/EventDetails";
import CalendarView from "./pages/CalendarView";
import AdminPanel from "./pages/AdminPanel";
import VolunteerProfile from "./pages/VolunteerProfile";
import NGOProfile from "./pages/NGOProfile";
import Chat from "./pages/Chat";
import Certificates from "./pages/Certificates";
import Attendance from "./pages/Attendance";
import Payments from "./pages/Payments";
import Reviews from "./pages/Reviews";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/volunteer/dashboard" element={<VolunteerDashboard />} />
          <Route path="/volunteer/profile" element={<VolunteerProfile />} />
          <Route path="/ngo/dashboard" element={<NGODashboard />} />
          <Route path="/ngo/profile" element={<NGOProfile />} />
          <Route path="/calendar" element={<CalendarView />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <AIChatbot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
