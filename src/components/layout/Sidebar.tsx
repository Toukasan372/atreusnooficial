import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Building2, 
  Building, 
  LogOut, 
  Bell 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const SidebarLink = ({ to, icon, label, isActive }: SidebarLinkProps) => {
  return (
    <Link 
      to={to} 
      className={cn("sidebar-link", isActive && "active")}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export function Sidebar() {
  const location = useLocation();
  const [notifications] = useState(3);

  return (
    <aside className="sidebar">
      <div className="p-4 border-b border-white/10">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Building2 className="h-8 w-8" />
          ZEUS
        </h1>
        <p className="text-xs text-white/60 mt-1">Business Hub</p>
      </div>

      <nav className="flex-1 py-4">
        <SidebarLink 
          to="/" 
          icon={<LayoutDashboard size={20} />} 
          label="Panel" 
          isActive={location.pathname === "/"}
        />
        <SidebarLink 
          to="/organizations" 
          icon={<Building2 size={20} />} 
          label="Organizaciones" 
          isActive={location.pathname === "/organizations"}
        />
        <SidebarLink 
          to="/businesses" 
          icon={<Building size={20} />} 
          label="Negocios" 
          isActive={location.pathname.startsWith("/businesses")}
        />
      </nav>

      <div className="border-t border-white/10 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">Juan Pérez</p>
            <p className="text-xs text-white/60">Admin</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="relative">
            <Bell size={20} className="text-white/70 hover:text-white transition-colors" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent rounded-full text-[10px] w-4 h-4 flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>
          <button>
            <LogOut size={20} className="text-white/70 hover:text-white transition-colors" />
          </button>
        </div>
      </div>
    </aside>
  );
}