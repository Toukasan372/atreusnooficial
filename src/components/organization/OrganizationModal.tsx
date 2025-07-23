import { useState } from "react";
import { X, Building2, Plus, Users, Building } from "lucide-react";
import { Organization } from "./OrganizationCard";
import { Business } from "@/components/business/BusinessCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface OrganizationModalProps {
  organization: Organization | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  businesses?: Business[];
}

export function OrganizationModal({ organization, open, onOpenChange, businesses = [] }: OrganizationModalProps) {
  const [activeTab, setActiveTab] = useState("general");
  const [selectedBusinesses, setSelectedBusinesses] = useState<string[]>([]);
  
  if (!organization) return null;

  const handleBusinessSelection = (businessId: string) => {
    setSelectedBusinesses(prev => {
      if (prev.includes(businessId)) {
        return prev.filter(id => id !== businessId);
      } else {
        return [...prev, businessId];
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-bold">Detalles de la Organización</DialogTitle>
          <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="mt-2 flex items-center justify-center">
          <div className="w-24 h-24 rounded-lg bg-muted flex items-center justify-center">
            <Building2 className="h-12 w-12 text-muted-foreground" />
          </div>
        </div>
        
        <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="businesses">Negocios</TabsTrigger>
            <TabsTrigger value="employees">Empleados</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre de la Organización</Label>
                <Input id="name" defaultValue={organization.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Tipo</Label>
                <Select defaultValue={organization.type}>
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
                <Label htmlFor="businessCount">Cantidad de Negocios</Label>
                <Input id="businessCount" defaultValue={organization.businessCount.toString()} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employeeCount">Cantidad de Empleados</Label>
                <Input id="employeeCount" defaultValue={organization.employeeCount.toString()} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="description">Descripción</Label>
                <Input id="description" defaultValue="" />
              </div>
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
              <Button>Guardar Cambios</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="businesses" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Negocios Vinculados</h3>
              <Button size="sm" variant="outline" className="gap-1">
                <Plus className="h-4 w-4" />
                Vincular Negocio
              </Button>
            </div>
            
            {businesses.length > 0 ? (
              <div className="space-y-2">
                {businesses.map(business => (
                  <div key={business.id} className="flex items-center justify-between border p-3 rounded-md">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedBusinesses.includes(business.id)}
                        onChange={() => handleBusinessSelection(business.id)}
                        className="rounded"
                      />
                      <span>{business.name}</span>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full text-white ${
                      business.level === "LEVEL_1" ? "bg-chart-3" : 
                      business.level === "LEVEL_2" ? "bg-primary" :
                      business.level === "LEVEL_3" ? "bg-chart-4" : "bg-accent"
                    }`}>
                      {business.level}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border-2 border-dashed rounded-lg">
                <Building className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No hay negocios vinculados</p>
                <Button variant="outline" size="sm" className="mt-2 gap-1">
                  <Plus className="h-4 w-4" />
                  Agregar Negocio
                </Button>
              </div>
            )}
            
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
              <Button>Guardar Cambios</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="employees" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Empleados</h3>
              <Button size="sm" variant="outline" className="gap-1">
                <Plus className="h-4 w-4" />
                Agregar Empleado
              </Button>
            </div>
            
            <div className="text-center py-8 border-2 border-dashed rounded-lg">
              <Users className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No hay empleados registrados</p>
              <Button variant="outline" size="sm" className="mt-2 gap-1">
                <Plus className="h-4 w-4" />
                Agregar Empleado
              </Button>
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>Cerrar</Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}