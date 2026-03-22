import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Menu, Bell, Search, PanelLeftClose, PanelLeft, Check } from "lucide-react";

const Navbar = ({ onMenuClick, isCollapsed, onToggleCollapse }) => {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);

  const [notifications] = useState([
    { id: 1, text: "Your application at Google was updated", time: "2h ago", unread: true },
    { id: 2, text: "New matching job found: Senior React Engineer", time: "5h ago", unread: true },
    { id: 3, text: "Upcoming interview tomorrow at 10:00 AM", time: "1d ago", unread: false },
  ]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials = user?.displayName
    ? user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : user?.email?.[0]?.toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-30 h-16 glass border-x-0 border-t-0 flex items-center justify-between px-4 lg:px-6">
      {/* Left side */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-surface-800 text-surface-400 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex p-2 rounded-lg hover:bg-surface-800 text-surface-400 transition-colors"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <PanelLeft className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
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
        <div className="relative" ref={notificationRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative p-2 rounded-lg hover:bg-surface-800 transition-colors ${showNotifications ? 'bg-surface-800 text-primary-400' : 'text-surface-400'}`}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary-500 rounded-full" />
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 glass-card rounded-2xl shadow-2xl overflow-hidden animate-scale-in origin-top-right z-50">
              <div className="p-4 border-b border-surface-800/50 flex items-center justify-between bg-surface-900/40">
                <h3 className="text-sm font-semibold text-surface-100">Notifications</h3>
                <span className="text-[10px] uppercase font-bold text-primary-500 bg-primary-500/10 px-1.5 py-0.5 rounded">3 New</span>
              </div>
              <div className="max-h-[320px] overflow-y-auto">
                {notifications.map((notif) => (
                  <div key={notif.id} className="p-4 hover:bg-surface-800/50 border-b border-surface-800/30 transition-colors cursor-pointer group">
                    <div className="flex gap-3">
                      <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${notif.unread ? 'bg-primary-500' : 'bg-transparent'}`} />
                      <div>
                        <p className="text-sm text-surface-200 group-hover:text-surface-50">{notif.text}</p>
                        <p className="text-xs text-surface-500 mt-1">{notif.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-surface-950/50 text-center">
                <button className="text-xs font-medium text-surface-400 hover:text-primary-400 transition-colors">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 pl-3 border-l border-surface-800">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-surface-200 leading-none mb-1">
              {user?.displayName || "User"}
            </p>
            <p className="text-[11px] text-surface-500 leading-none">{user?.email}</p>
          </div>
          <div className="w-9 h-9 rounded-lg bg-surface-800 border border-surface-700 flex items-center justify-center text-surface-200 text-sm font-medium shadow-sm">
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
