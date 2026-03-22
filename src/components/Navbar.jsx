/* eslint-disable react-refresh/only-export-components, react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { subscribeToNotifications, markAllRead } from "../services/notificationService";
import {
  Menu,
  Bell,
  Search,
  PanelLeftClose,
  PanelLeft,
  Plus,
  Pencil,
  Trash2,
  Check,
} from "lucide-react";

const ICON_MAP = {
  added: Plus,
  updated: Pencil,
  deleted: Trash2,
};

const COLOR_MAP = {
  added: "bg-accent-500/20 text-accent-400",
  updated: "bg-primary-500/20 text-primary-400",
  deleted: "bg-danger-500/20 text-danger-400",
};

const formatTimeAgo = (timestamp) => {
  if (!timestamp?.toDate) return "just now";
  const seconds = Math.floor((Date.now() - timestamp.toDate().getTime()) / 1000);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
};

const Navbar = ({ onMenuClick, isCollapsed, onToggleCollapse }) => {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const notificationRef = useRef(null);

  const uid = user?.uid;

  // Subscribe to real-time notifications
  useEffect(() => {
    if (!uid) {
      setNotifications([]);
      return;
    }
    const unsubscribe = subscribeToNotifications(uid, (data) => {
      setNotifications(data);
    });
    return () => unsubscribe();
  }, [uid]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = async () => {
    await markAllRead(notifications);
  };

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
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[18px] h-[18px] flex items-center justify-center bg-primary-500 text-[10px] font-bold text-white rounded-full px-1">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-96 glass-card rounded-2xl shadow-2xl overflow-hidden animate-scale-in origin-top-right z-50">
              <div className="p-4 border-b border-surface-800/50 flex items-center justify-between bg-surface-900/40">
                <h3 className="text-sm font-semibold text-surface-100">Notifications</h3>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <span className="text-[10px] uppercase font-bold text-primary-500 bg-primary-500/10 px-1.5 py-0.5 rounded">
                      {unreadCount} New
                    </span>
                  )}
                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllRead}
                      className="text-[10px] uppercase font-bold text-surface-400 hover:text-surface-200 bg-surface-800/50 px-1.5 py-0.5 rounded transition-colors flex items-center gap-1"
                    >
                      <Check className="w-3 h-3" />
                      Read all
                    </button>
                  )}
                </div>
              </div>
              <div className="max-h-[380px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <Bell className="w-8 h-8 text-surface-600 mx-auto mb-2" />
                    <p className="text-sm text-surface-500">No notifications yet</p>
                    <p className="text-xs text-surface-600 mt-1">Actions you take will appear here</p>
                  </div>
                ) : (
                  notifications.map((notif) => {
                    const IconComponent = ICON_MAP[notif.type] || Bell;
                    const iconColor = COLOR_MAP[notif.type] || "bg-surface-800 text-surface-400";
                    return (
                      <div
                        key={notif.id}
                        className={`px-4 py-3 border-b border-surface-800/30 transition-colors cursor-default group ${
                          notif.read ? "opacity-60" : "hover:bg-surface-800/30"
                        }`}
                      >
                        <div className="flex gap-3 items-start">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${iconColor}`}>
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm leading-snug ${notif.read ? "text-surface-400" : "text-surface-100"}`}>
                              {notif.message}
                            </p>
                            <p className="text-xs text-surface-500 mt-1">
                              {formatTimeAgo(notif.createdAt)}
                            </p>
                          </div>
                          {!notif.read && (
                            <div className="w-2 h-2 rounded-full bg-primary-500 mt-2 shrink-0" />
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              {notifications.length > 0 && (
                <div className="p-3 bg-surface-950/50 text-center border-t border-surface-800/30">
                  <p className="text-xs text-surface-500">
                    Showing latest {notifications.length} notifications
                  </p>
                </div>
              )}
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
