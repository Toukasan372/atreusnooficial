import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { BusinessSearch } from "@/components/business/BusinessSearch";
import { BusinessCard, Business, BusinessLevel } from "@/components/business/BusinessCard";
import { BusinessModal } from "@/components/business/BusinessModal";
import { Plus, Loader2, X, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Organization } from "@/components/organization/OrganizationCard";

// Sample data for businesses
const sampleBusinesses: Business[] = [
  {
    id: "1",
    name: "Cafetería El Aroma",
    level: "LEVEL_1",
    type: "restaurant",
    subscriptionDays: 25,
    subscriptionTotal: 30,
  },
  {
    id: "2",
    name: "Tienda Modas Express",
    level: "LEVEL_2",
    type: "store",
    subscriptionDays: 15,
    subscriptionTotal: 30,
  },
  {
    id: "3",
    name: "Servicios Técnicos Pro",
    level: "LEVEL_3",
    type: "service",
    subscriptionDays: 30,
    subscriptionTotal: 30,
  },
  {
    id: "4",
    name: "Restaurante Sabor Latino",
    level: "LEVEL_2",
    type: "restaurant",
    subscriptionDays: 10,
    subscriptionTotal: 30,
  },
  {
    id: "5",
    name: "Boutique Fashion Style",
    level: "LEVEL_1",
    type: "store",
    subscriptionDays: 5,
    subscriptionTotal: 30,
  },
  {
    id: "6",
    name: "Consultoría Empresarial",
    level: "LEVEL_4",
    type: "service",
    subscriptionDays: 28,
    subscriptionTotal: 30,
  },
  {
    id: "7",
    name: "Pizzería Bella Italia",
    level: "LEVEL_2",
    type: "restaurant",
    subscriptionDays: 18,
    subscriptionTotal: 30,
  },
  {
    id: "8",
    name: "Electrónica Digital",
    level: "LEVEL_3",
    type: "store",
    subscriptionDays: 22,
    subscriptionTotal: 30,
  },
  {
    id: "9",
    name: "Servicios Legales Lex",
    level: "LEVEL_4",
    type: "service",
    subscriptionDays: 12,
    subscriptionTotal: 30,
  },
  {
    id: "10",
    name: "Panadería La Espiga",
    level: "LEVEL_1",
    type: "restaurant",
    subscriptionDays: 8,
    subscriptionTotal: 30,
  },
  {
    id: "11",
    name: "Juguetería Feliz",
    level: "LEVEL_2",
    type: "store",
    subscriptionDays: 20,
    subscriptionTotal: 30,
  },
  {
    id: "12",
    name: "Agencia de Marketing",
    level: "LEVEL_3",
    type: "service",
    subscriptionDays: 15,
    subscriptionTotal: 30,
  },
];

// Sample data for organizations
const sampleOrganizations: Organization[] = [
  {
    id: "1",
    name: "Grupo Corporativo Alfa",
    businessCount: 5,
    employeeCount: 120,
    type: "enterprise"
  },
  {
    id: "2",
    name: "Comercios Locales Beta",
    businessCount: 3,
    employeeCount: 45,
    type: "medium"
  },
  {
    id: "3",
    name: "Franquicia Delta",
    businessCount: 8,
    employeeCount: 200,
    type: "enterprise"
  }
];

interface BusinessFormData {
  id: string;
  name: string;
  level: BusinessLevel;
  type: "store" | "restaurant" | "service";
  subscriptionDays: number;
  subscriptionTotal: number;
}

export function BusinessesPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { toast } = useToast();
  
  const [newBusiness, setNewBusiness] = useState<BusinessFormData>({
    id: `new-${Date.now()}`,
    name: "",
    level: "LEVEL_1",
    type: "store",
    subscriptionDays: 0,
    subscriptionTotal: 30
  });
  
  // Simulating API call to fetch businesses
  useEffect(() => {
    const timer = setTimeout(() => {
      setBusinesses(sampleBusinesses);
      setFilteredBusinesses(sampleBusinesses);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (query: string) => {
    const filtered = businesses.filter(business => 
      business.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBusinesses(filtered);
  };

  const handleFilterLevel = (level: BusinessLevel | "all") => {
    if (level === "all") {
      setFilteredBusinesses(businesses);
    } else {
      const filtered = businesses.filter(business => business.level === level);
      setFilteredBusinesses(filtered);
    }
  };

  const handleFilterType = (type: string | "all") => {
    if (type === "all") {
      setFilteredBusinesses(businesses);
    } else {
      const filtered = businesses.filter(business => business.type === type);
      setFilteredBusinesses(filtered);
    }
  };

  const handleBusinessClick = (business: Business) => {
    setSelectedBusiness(business);
    setIsModalOpen(true);
  };
  
  const handleAddNewBusiness = () => {
    setIsCreateModalOpen(true);
  };
  
  const handleCreateBusiness = () => {
    // Validación básica
    if (!newBusiness.name.trim()) {
      toast({
        title: "Error en el formulario",
        description: "El nombre del negocio es obligatorio.",
        variant: "destructive"
      });
      return;
    }
    
    // Crear nuevo negocio
    const createdBusiness: Business = {
      ...newBusiness,
      id: `business-${Date.now()}`
    };
    
    setBusinesses(prev => [createdBusiness, ...prev]);
    setFilteredBusinesses(prev => [createdBusiness, ...prev]);
    setIsCreateModalOpen(false);
    
    toast({
      title: "Negocio creado",
      description: `${createdBusiness.name} ha sido creado exitosamente.`
    });
    
    // Resetear el formulario
    setNewBusiness({
      id: `new-${Date.now()}`,
      name: "",
      level: "LEVEL_1",
      type: "store",
      subscriptionDays: 0,
      subscriptionTotal: 30
    });
  };
  
  const updateNewBusinessField = (field: keyof BusinessFormData, value: any) => {
    setNewBusiness(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Negocios</h1>
          <Button onClick={handleAddNewBusiness} className="gap-2">
            <Plus className="h-4 w-4" />
            Nuevo Negocio
          </Button>
        </div>

        <BusinessSearch 
          onSearch={handleSearch}
          onFilterLevel={handleFilterLevel}
          onFilterType={handleFilterType}
        />

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground">Cargando negocios...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBusinesses.map((business) => (
                <BusinessCard
                  key={business.id}
                  business={business}
                  onClick={() => handleBusinessClick(business)}
                />
              ))}
            </div>
            
            {filteredBusinesses.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No se encontraron negocios que coincidan con los filtros.</p>
              </div>
            )}
            
            <div className="text-sm text-muted-foreground text-center mt-6">
              Mostrando {filteredBusinesses.length} de {businesses.length} resultados
            </div>
          </>
        )}
      </div>

      {/* Modal para ver/editar negocio existente */}
      <BusinessModal 
        business={selectedBusiness} 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
        organizations={sampleOrganizations}
      />
      
      {/* Modal para crear nuevo negocio */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle className="text-xl font-bold">Nuevo Negocio</DialogTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsCreateModalOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          
          <div className="mt-2 flex items-center justify-center">
            <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center">
              <Building className="h-10 w-10 text-muted-foreground" />
            </div>
          </div>
          
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del Negocio *</Label>
              <Input 
                id="name" 
                placeholder="Ej. Cafetería Central" 
                value={newBusiness.name}
                onChange={(e) => updateNewBusinessField("name", e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Negocio</Label>
                <Select 
                  value={newBusiness.type}
                  onValueChange={(value) => updateNewBusinessField("type", value as "store" | "restaurant" | "service")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="store">Tienda</SelectItem>
                    <SelectItem value="restaurant">Restaurante</SelectItem>
                    <SelectItem value="service">Servicio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="level">Nivel</Label>
                <Select 
                  value={newBusiness.level}
                  onValueChange={(value) => updateNewBusinessField("level", value as BusinessLevel)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LEVEL_1">LEVEL_1</SelectItem>
                    <SelectItem value="LEVEL_2">LEVEL_2</SelectItem>
                    <SelectItem value="LEVEL_3">LEVEL_3</SelectItem>
                    <SelectItem value="LEVEL_4">LEVEL_4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subscriptionDays">Días de Suscripción</Label>
                <Input 
                  id="subscriptionDays" 
                  type="number" 
                  min="0"
                  max="30"
                  value={newBusiness.subscriptionDays}
                  onChange={(e) => updateNewBusinessField("subscriptionDays", parseInt(e.target.value) || 0)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="organization">Organización</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar organización" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Sin organización</SelectItem>
                    {sampleOrganizations.map(org => (
                      <SelectItem key={org.id} value={org.id}>
                        {org.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Input id="description" placeholder="Breve descripción del negocio" />
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>Cancelar</Button>
              <Button onClick={handleCreateBusiness}>Crear Negocio</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}