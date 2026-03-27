// Simple in-memory store for app state
import { useState, useEffect } from "react";

// Dark mode
const DARK_KEY = "soul-bridge-dark";
export const useDarkMode = () => {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(DARK_KEY) === "true";
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem(DARK_KEY, String(dark));
  }, [dark]);

  return [dark, setDark] as const;
};

// Bookmarks
const BOOKMARKS_KEY = "soul-bridge-bookmarks";
export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(BOOKMARKS_KEY) || "[]");
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggle = (id: string) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  return { bookmarks, toggle, isBookmarked: (id: string) => bookmarks.includes(id) };
};

// Notifications
export const mockNotifications = [
  { id: "1", title: "Application Accepted! 🎉", message: "Green Earth Foundation accepted your application for Tree Plantation Drive.", time: "2 hours ago", read: false },
  { id: "2", title: "New Event Near You", message: "Beach Cleanup Marathon is happening 5km from your location.", time: "5 hours ago", read: false },
  { id: "3", title: "Badge Earned! 🏅", message: "You've earned the 'Community Hero' badge for 150+ hours.", time: "1 day ago", read: true },
  { id: "4", title: "Reminder", message: "Code for Kids Workshop starts tomorrow at 10:00 AM.", time: "1 day ago", read: false },
  { id: "5", title: "New Review", message: "Digital Literacy India gave you a 5-star review.", time: "2 days ago", read: true },
];

// Chat messages mock
export const mockChatConversations = [
  {
    id: "c1",
    name: "Green Earth Foundation",
    avatar: "🌿",
    lastMessage: "Thanks for applying! See you on April 15th.",
    time: "2h ago",
    unread: 2,
    messages: [
      { id: "m1", sender: "ngo", text: "Hi Priya! Thanks for applying to the Tree Plantation Drive.", time: "10:00 AM" },
      { id: "m2", sender: "user", text: "Hi! I'm really excited about this event. What should I bring?", time: "10:05 AM" },
      { id: "m3", sender: "ngo", text: "Great question! Just comfortable clothes, a water bottle, and gardening gloves if you have them.", time: "10:10 AM" },
      { id: "m4", sender: "ngo", text: "Thanks for applying! See you on April 15th.", time: "10:12 AM" },
    ],
  },
  {
    id: "c2",
    name: "Digital Literacy India",
    avatar: "💻",
    lastMessage: "Can you teach Python basics?",
    time: "1d ago",
    unread: 0,
    messages: [
      { id: "m5", sender: "ngo", text: "Welcome to Code for Kids! We noticed you have coding skills.", time: "Yesterday" },
      { id: "m6", sender: "user", text: "Yes! I'd love to help teach kids programming.", time: "Yesterday" },
      { id: "m7", sender: "ngo", text: "Can you teach Python basics?", time: "Yesterday" },
    ],
  },
  {
    id: "c3",
    name: "Ocean Warriors",
    avatar: "🌊",
    lastMessage: "The cleanup drive was a huge success!",
    time: "3d ago",
    unread: 0,
    messages: [
      { id: "m8", sender: "ngo", text: "The cleanup drive was a huge success! We collected 500kg of waste.", time: "3 days ago" },
      { id: "m9", sender: "user", text: "That's amazing! Happy to be part of it. 🎉", time: "3 days ago" },
    ],
  },
];

// Reviews mock
export const mockReviews = [
  { id: "r1", reviewer: "Priya Sharma", reviewerAvatar: "PS", target: "Green Earth Foundation", rating: 5, text: "Amazing organization! Very well organized events.", date: "Mar 20, 2026", type: "volunteer-to-ngo" as const },
  { id: "r2", reviewer: "Green Earth Foundation", reviewerAvatar: "🌿", target: "Priya Sharma", rating: 5, text: "Priya is an excellent volunteer. Very dedicated and punctual.", date: "Mar 21, 2026", type: "ngo-to-volunteer" as const },
  { id: "r3", reviewer: "Arjun Patel", reviewerAvatar: "AP", target: "Digital Literacy India", rating: 4, text: "Great cause and good coordination. Could improve on communication.", date: "Mar 18, 2026", type: "volunteer-to-ngo" as const },
  { id: "r4", reviewer: "Health For All NGO", reviewerAvatar: "🏥", target: "Sneha Reddy", rating: 5, text: "Sneha brought incredible energy and medical knowledge.", date: "Mar 15, 2026", type: "ngo-to-volunteer" as const },
];
