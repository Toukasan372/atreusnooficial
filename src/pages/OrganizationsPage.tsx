import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Building2, Plus, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { OrganizationCard, Organization } from "@/components/organization/OrganizationCard";
import { OrganizationSearch } from "@/components/organization/OrganizationSearch";
import { OrganizationModal } from "@/components/organization/OrganizationModal";
import { Business } from "@/components/business/BusinessCard";
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
  },
  {
    id: "4",
    name: "Tiendas Gamma",
    businessCount: 2,
    employeeCount: 18,
    type: "small"
  },
  {
    id: "5",
    name: "Servicios Técnicos Omega",
    businessCount: 1,
    employeeCount: 12,
    type: "small"
  },
  {
    id: "6",
    name: "Centros Comerciales Epsilon",
    businessCount: 4,
    employeeCount: 80,
    type: "medium"
  }
];

// Sample businesses for demonstration
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
  }
];

export function OrganizationsPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [filteredOrganizations, setFilteredOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { toast } = useToast();
  
  // Simulating API call to fetch organizations
  useEffect(() => {
    const timer = setTimeout(() => {
      setOrganizations(sampleOrganizations);
      setFilteredOrganizations(sampleOrganizations);
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (query: string) => {
    const filtered = organizations.filter(organization => 
      organization.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredOrganizations(filtered);
  };

  const handleFilterType = (type: string | "all") => {
    if (type === "all") {
      setFilteredOrganizations(organizations);
    } else {
      const filtered = organizations.filter(organization => organization.type === type);
      setFilteredOrganizations(filtered);
    }
  };

  const handleOrganizationClick = (organization: Organization) => {
    setSelectedOrganization(organization);
    setIsModalOpen(true);
  };
  
  const handleAddOrganization = () => {
    setSelectedOrganization({
      id: `new-${Date.now()}`,
      name: "",
      businessCount: 0,
      employeeCount: 0,
      type: "small"
    });
    setIsCreateModalOpen(true);
  };

  const handleCreateOrganization = () => {
    // Simulación de creación
    if (selectedOrganization) {
      const newOrganization = {
        ...selectedOrganization,
        id: `org-${Date.now()}`,
        name: selectedOrganization.name || "Nueva Organización",
      };
      
      setOrganizations(prev => [newOrganization, ...prev]);
      setFilteredOrganizations(prev => [newOrganization, ...prev]);
      setIsCreateModalOpen(false);
      
      toast({
        title: "Organización creada",
        description: `${newOrganization.name} ha sido creada exitosamente.`
      });
    }
  };

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Organizaciones</h1>
          <Button onClick={handleAddOrganization} className="gap-2">
            <Plus className="h-4 w-4" />
            Nueva Organización
          </Button>
        </div>

        <OrganizationSearch 
          onSearch={handleSearch}
          onFilterType={handleFilterType}
        />

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground">Cargando organizaciones...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOrganizations.map((organization) => (
                <OrganizationCard
                  key={organization.id}
                  organization={organization}
                  onClick={() => handleOrganizationClick(organization)}
                />
              ))}
            </div>
            
            {filteredOrganizations.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No se encontraron organizaciones que coincidan con los filtros.</p>
              </div>
            )}
            
            {filteredOrganizations.length > 0 && (
              <div className="text-sm text-muted-foreground text-center mt-6">
                Mostrando {filteredOrganizations.length} de {organizations.length} resultados
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal para ver/editar organización existente */}
      <OrganizationModal 
        organization={selectedOrganization} 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen}
        businesses={sampleBusinesses}
      />

      {/* Modal para crear nueva organización */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle className="text-xl font-bold">Nueva Organización</DialogTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsCreateModalOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          
          <div className="mt-2 flex items-center justify-center">
            <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center">
              <Building2 className="h-10 w-10 text-muted-foreground" />
            </div>
          </div>
          
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre de la Organización</Label>
              <Input 
                id="name" 
                placeholder="Ej. Grupo Empresarial Zeus" 
                onChange={(e) => {
                  if (selectedOrganization) {
                    setSelectedOrganization({...selectedOrganization, name: e.target.value});
                  }
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Tipo</Label>
              <Select 
                defaultValue="small"
                onValueChange={(value) => {
                  if (selectedOrganization) {
                    setSelectedOrganization({
                      ...selectedOrganization, 
                      type: value as "small" | "medium" | "enterprise"
                    });
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Pequeña</SelectItem>
                  <SelectItem value="medium">Mediana</SelectItem>
                  <SelectItem value="enterprise">Empresa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Input id="description" placeholder="Breve descripción de la organización" />
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>Cancelar</Button>
              <Button onClick={handleCreateOrganization}>Crear Organización</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}