import { FC, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import BusinessCard from "./BusinessCard";
import { useToast } from "@/hooks/use-toast";

// Placeholder data
const BUSINESSES = [
  {
    id: "1",
    name: "Café Aroma",
    level: "LEVEL_2" as const,
    type: "Restauración",
    subscriptionDaysLeft: 3,
    subscriptionTotalDays: 30,
  },
  {
    id: "2",
    name: "Restaurante El Fogón",
    level: "LEVEL_3" as const,
    type: "Restauración",
    subscriptionDaysLeft: 5,
    subscriptionTotalDays: 30,
  },
  {
    id: "3",
    name: "Tienda Moda Express",
    level: "LEVEL_1" as const,
    type: "Retail",
    subscriptionDaysLeft: 7,
    subscriptionTotalDays: 30,
  },
  {
    id: "4",
    name: "Clínica Dental Sonrisa",
    level: "LEVEL_4" as const,
    type: "Salud",
    subscriptionDaysLeft: 14,
    subscriptionTotalDays: 30,
  },
  {
    id: "5",
    name: "Librería Sabiduría",
    level: "LEVEL_1" as const,
    type: "Retail",
    subscriptionDaysLeft: 21,
    subscriptionTotalDays: 30,
  },
  {
    id: "6",
    name: "Gimnasio FitLife",
    level: "LEVEL_2" as const,
    type: "Deporte",
    subscriptionDaysLeft: 18,
    subscriptionTotalDays: 30,
  },
];

const RecentBusinesses: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredBusinesses = BUSINESSES.filter((business) =>
    business.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBusinessClick = (id: string) => {
    toast({
      title: "Negocio seleccionado",
      description: `Has seleccionado el negocio con ID: ${id}`,
    });
  };

  const handleAddBusiness = () => {
    toast({
      title: "Añadir negocio",
      description: "Funcionalidad para añadir nuevo negocio (próximamente)",
    });
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="text-base font-medium">Negocios Recientes</CardTitle>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar negocios..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              onClick={handleAddBusiness}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Añadir</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {filteredBusinesses.map((business) => (
            <BusinessCard
              key={business.id}
              id={business.id}
              name={business.name}
              level={business.level}
              type={business.type}
              subscriptionDaysLeft={business.subscriptionDaysLeft}
              subscriptionTotalDays={business.subscriptionTotalDays}
              onClick={handleBusinessClick}
            />
          ))}
        </div>
        {filteredBusinesses.length === 0 && (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No se encontraron negocios</p>
          </div>
        )}
        <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
          <span>Mostrando {filteredBusinesses.length} de {BUSINESSES.length} negocios</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentBusinesses;