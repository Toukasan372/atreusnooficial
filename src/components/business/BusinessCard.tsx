import { FC } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface BusinessCardProps {
  id: string;
  name: string;
  level: "LEVEL_1" | "LEVEL_2" | "LEVEL_3" | "LEVEL_4";
  type: string;
  subscriptionDaysLeft: number;
  subscriptionTotalDays: number;
  onClick: (id: string) => void;
}

const BusinessCard: FC<BusinessCardProps> = ({
  id,
  name,
  level,
  type,
  subscriptionDaysLeft,
  subscriptionTotalDays,
  onClick,
}) => {
  // Calculate subscription progress
  const progress = Math.round((subscriptionDaysLeft / subscriptionTotalDays) * 100);
  
  // Map level to color and display name
  const levelConfig = {
    LEVEL_1: { color: "bg-blue-500", label: "Nivel 1" },
    LEVEL_2: { color: "bg-green-500", label: "Nivel 2" },
    LEVEL_3: { color: "bg-amber-500", label: "Nivel 3" },
    LEVEL_4: { color: "bg-pink-500", label: "Nivel 4" },
  };

  return (
    <Card 
      className="business-card cursor-pointer hover:shadow-md transition-all" 
      onClick={() => onClick(id)}
    >
      <CardContent className="p-4">
        {/* Level indicator */}
        <div className={cn("level-indicator mb-3", levelConfig[level].color)} />
        
        <h3 className="font-medium text-base mb-1 truncate">{name}</h3>
        
        <div className="flex items-center justify-between mb-3">
          <Badge variant="outline" className="text-xs">
            {type}
          </Badge>
          <Badge className={cn("text-xs", 
            level === "LEVEL_1" ? "bg-blue-500" :
            level === "LEVEL_2" ? "bg-green-500" :
            level === "LEVEL_3" ? "bg-amber-500" :
            "bg-pink-500"
          )}>
            {levelConfig[level].label}
          </Badge>
        </div>
        
        {/* Subscription progress */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Suscripción</span>
            <span className="font-medium">{subscriptionDaysLeft} días restantes</span>
          </div>
          <Progress value={progress} className="h-1" />
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessCard;