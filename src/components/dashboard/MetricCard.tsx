import { FC } from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const MetricCard: FC<MetricCardProps> = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  className,
}) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="p-2 bg-secondary rounded-md">
            <Icon size={18} className="text-primary" />
          </div>
        </div>
        <div className="mt-2">
          <p className="text-2xl font-bold">{value}</p>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
          {trend && (
            <div className="flex items-center mt-2">
              <div
                className={cn(
                  "text-xs font-medium px-2 py-0.5 rounded",
                  trend.isPositive
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                )}
              >
                {trend.isPositive ? "+" : "-"}
                {Math.abs(trend.value)}%
              </div>
              <span className="text-xs text-muted-foreground ml-2">vs último mes</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;