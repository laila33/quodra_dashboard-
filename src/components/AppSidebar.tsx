import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Wrench,
  Award,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  // { title: "لوحة التحكم", icon: LayoutDashboard, path: "/" },
  { title: "إدارة الورش", icon: Wrench, path: "/" },
  { title: "إضافة ورشة جديدة", icon: PlusCircle, path: "/add-workshop" },
];

export function AppSidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <aside
      className={cn(
        "sticky top-0 h-screen bg-card border-l border-border flex flex-col transition-all duration-300",
        collapsed ? "w-[72px]" : "w-[260px]",
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-border px-4">
        {!collapsed && (
          <div className="mt-1 flex items-center justify-center w-12 h-12 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200">
            {/* <img
              src="/logo.jpeg"
              alt="Logo"
              className="w-full h-full object-cover"
            /> */}
            <span className="text-xl font-bold text-primary">Q</span>
          </div>
        )}
        {collapsed && <span className="text-xl font-bold text-primary">Q</span>}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-6 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-muted",
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="h-12 w-full flex items-center justify-center border-t border-border text-muted-foreground hover:text-foreground transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </button>
    </aside>
  );
}
