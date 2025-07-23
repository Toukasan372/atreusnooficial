import { Building2, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Organization {
  id: string;
  name: string;
  businessCount: number;
  employeeCount: number;
  type: "small" | "medium" | "enterprise";
}

const getTypeColor = (type: Organization["type"]) => {
  switch (type) {
    case "small":
      return "bg-chart-3"; // Pink
    case "medium":
      return "bg-primary"; // Blue
    case "enterprise":
      return "bg-chart-4"; // Green
    default:
      return "bg-gray-500";
  }
};

interface OrganizationCardProps {
  organization: Organization;
  onClick: () => void;
}

export function OrganizationCard({ organization, onClick }: OrganizationCardProps) {
  return (
    <div className="organization-card" onClick={onClick}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <Building2 className="h-6 w-6 text-primary" />
          <h3 className="font-semibold">{organization.name}</h3>
        </div>
        <span className={cn("px-2 py-1 text-xs font-medium rounded-full text-white", getTypeColor(organization.type))}>
          {organization.type}
        </span>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <Building className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{organization.businessCount} negocios</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{organization.employeeCount} empleados</span>
        </div>
      </div>
    </div>
  );
}