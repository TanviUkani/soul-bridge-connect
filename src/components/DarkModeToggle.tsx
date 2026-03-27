import { Moon, Sun } from "lucide-react";
import { useDarkMode } from "@/lib/store";

const DarkModeToggle = () => {
  const [dark, setDark] = useDarkMode();
  return (
    <button
      onClick={() => setDark(!dark)}
      className="p-2 rounded-xl border hover:bg-muted transition-colors"
      aria-label="Toggle dark mode"
    >
      {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
};

export default DarkModeToggle;
