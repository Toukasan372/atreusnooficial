import { FC } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Building2,
  Store,
  Bell,
  LogOut,
  ChevronLeft,
  Crown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar: FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const isMobile = useIsMobile();

  const navItems = [
    {
      label: "Panel",
      icon: <LayoutDashboard size={20} />,
      href: "/",
      active: true,
    },
    {
      label: "Organizaciones",
      icon: <Building2 size={20} />,
      href: "/organizations",
      active: false,
    },
    {
      label: "Negocios",
      icon: <Store size={20} />,
      href: "/businesses",
      active: false,
    },
  ];

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-black text-white border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Sidebar header with logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center font-bold text-xl text-white">
            <Crown size={24} className="mr-2" />
            ATREUS
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-[#1F1F1F]"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronLeft
            size={20}
            className={cn("transition-transform", collapsed && "rotate-180")}
          />
        </Button>
      </div>

      {/* Navigation links */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={cn(
              "flex items-center px-2 py-2 rounded-md transition-colors",
              item.active
                ? "bg-[#1F1F1F] text-[#00ADB5]"
                : "text-white hover:bg-[#1F1F1F] hover:text-[#00ADB5]"
            )}
          >
            <span className="flex items-center justify-center">{item.icon}</span>
            {!collapsed && <span className="ml-3">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-[#00ADB5] flex items-center justify-center text-white">
              A
            </div>
          </div>
          {!collapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium">Admin</p>
            </div>
          )}
        </div>

        {/* Footer icons */}
        <div className={cn("flex mt-4", collapsed ? "justify-center" : "justify-between")}>
          <Button variant="ghost" size="icon" className="text-white hover:bg-[#1F1F1F] hover:text-[#00ADB5]">
            <Bell size={18} />
          </Button>
          {!collapsed && (
            <Button variant="ghost" size="icon" className="text-white hover:bg-[#1F1F1F] hover:text-[#00ADB5]">
              <LogOut size={18} />
            </Button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;