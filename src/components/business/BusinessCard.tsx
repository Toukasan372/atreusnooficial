import { Building, Store, Coffee } from "lucide-react";
import { cn } from "@/lib/utils";

export type BusinessLevel = "LEVEL_1" | "LEVEL_2" | "LEVEL_3" | "LEVEL_4";

export interface Business {
  id: string;
  name: string;
  level: BusinessLevel;
  type: "store" | "restaurant" | "service";
  subscriptionDays: number;
  subscriptionTotal: number;
}

const getLevelColor = (level: BusinessLevel) => {
  switch (level) {
    case "LEVEL_1":
      return "bg-chart-3"; // Pink
    case "LEVEL_2":
      return "bg-primary"; // Blue
    case "LEVEL_3":
      return "bg-chart-4"; // Green
    case "LEVEL_4":
      return "bg-accent"; // Orange
    default:
      return "bg-gray-500";
  }
};

const getBusinessIcon = (type: string) => {
  switch (type) {
    case "store":
      return <Store className="h-6 w-6 text-primary" />;
    case "restaurant":
      return <Coffee className="h-6 w-6 text-accent" />;
    case "service":
      return <Building className="h-6 w-6 text-chart-3" />;
    default:
      return <Building className="h-6 w-6 text-muted-foreground" />;
  }
};

interface BusinessCardProps {
  business: Business;
  onClick: () => void;
}

export function BusinessCard({ business, onClick }: BusinessCardProps) {
  const progressPercentage = (business.subscriptionDays / business.subscriptionTotal) * 100;
  
  return (
    <div className="business-card" onClick={onClick}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {getBusinessIcon(business.type)}
          <h3 className="font-semibold">{business.name}</h3>
        </div>
        <span className={cn("px-2 py-1 text-xs font-medium rounded-full text-white", getLevelColor(business.level))}>
          {business.level}
        </span>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between text-xs mb-1">
          <span>Suscripción</span>
          <span>{business.subscriptionDays} / {business.subscriptionTotal} días</span>
        </div>
        <div className="progress-bar">
          <div 
            className={cn("progress-value", getLevelColor(business.level))}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}