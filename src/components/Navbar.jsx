import { useAuth } from "../context/AuthContext";
import { Menu, Bell, Search } from "lucide-react";

const Navbar = ({ onMenuClick }) => {
  const { user } = useAuth();

  const initials = user?.displayName
    ? user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : user?.email?.[0]?.toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-30 h-16 bg-surface-950/80 backdrop-blur-xl border-b border-surface-800/50 flex items-center justify-between px-4 lg:px-6">
      {/* Left side */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-surface-800 text-surface-400 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-surface-900/80 border border-surface-800 rounded-xl px-3 py-2 min-w-[280px]">
          <Search className="w-4 h-4 text-surface-500" />
          <input
            type="text"
            placeholder="Search applications..."
            className="bg-transparent border-none outline-none text-sm text-surface-200 placeholder:text-surface-500 w-full"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-lg hover:bg-surface-800 text-surface-400 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary-500 rounded-full" />
        </button>

        <div className="flex items-center gap-3 pl-3 border-l border-surface-800">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-surface-200">
              {user?.displayName || "User"}
            </p>
            <p className="text-xs text-surface-500">{user?.email}</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-sm font-bold">
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
