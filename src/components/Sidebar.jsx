import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import {
  LayoutDashboard,
  Briefcase,
  BarChart3,
  LogOut,
  X,
  Sparkles,
} from "lucide-react";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/applications", icon: Briefcase, label: "Applications" },
  { to: "/analytics", icon: BarChart3, label: "Analytics" },
];

const Sidebar = ({ isOpen, isCollapsed, onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Failed to log out");
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full bg-surface-900 backdrop-blur-xl border-r border-surface-800 flex flex-col transition-all duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${isCollapsed ? "w-20" : "w-64"}`}
      >
        {/* Logo */}
        <div className={`flex items-center h-16 border-b border-surface-800/50 px-4 transition-all duration-300 ${isCollapsed ? "justify-center" : "justify-between"}`}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center shadow-lg shadow-primary-900/20 shadow-inner shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            {!isCollapsed && (
              <span className="text-lg font-bold text-surface-50 tracking-tight whitespace-nowrap overflow-hidden">
                JobTrackr
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg hover:bg-surface-800 text-surface-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto overflow-x-hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              title={isCollapsed ? item.label : ""}
              className={({ isActive }) =>
                `flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  isCollapsed ? "justify-center" : "gap-3"
                } ${
                  isActive
                    ? "text-primary-400 bg-surface-800/70 border border-surface-700/50 shadow-[inset_4px_0_0_0_var(--color-primary-500)]"
                    : "text-surface-400 hover:text-surface-100 hover:bg-surface-800/30 border border-transparent"
                }`
              }
            >
              <item.icon className="w-5 h-5 transition-transform group-hover:scale-110 shrink-0 mr-3" />
              {!isCollapsed && <span className="whitespace-nowrap font-medium text-[15px]">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 pb-4">
          <button
            onClick={handleLogout}
            title={isCollapsed ? "Logout" : ""}
            className={`flex items-center w-full rounded-xl text-sm font-medium text-surface-400 hover:text-danger-400 hover:bg-danger-500/10 transition-all duration-200 group ${
              isCollapsed ? "justify-center px-0 py-2.5" : "gap-3 px-3 py-2.5"
            }`}
          >
            <LogOut className="w-5 h-5 transition-transform group-hover:scale-110 shrink-0 mr-3" />
            {!isCollapsed && <span className="whitespace-nowrap text-[15px]">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
