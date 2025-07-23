import { useState } from "react";
import { X, Building, Users } from "lucide-react";
import { Business } from "./BusinessCard";
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
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Organization } from "@/components/organization/OrganizationCard";

interface BusinessModalProps {
  business: Business | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organizations?: Organization[];
}

export interface SalesRep {
  id: string;
  name: string;
  email: string;
  phone: string;
}

const sampleSalesReps: SalesRep[] = [
  { id: "1", name: "Carlos Rodríguez", email: "carlos@zeus.com", phone: "600123456" },
  { id: "2", name: "María López", email: "maria@zeus.com", phone: "600789012" },
  { id: "3", name: "Juan García", email: "juan@zeus.com", phone: "600345678" },
];

export function BusinessModal({ business, open, onOpenChange, organizations = [] }: BusinessModalProps) {
  const [activeTab, setActiveTab] = useState("general");
  const [selectedOrganization, setSelectedOrganization] = useState<string>("");
  const [selectedSalesRep, setSelectedSalesRep] = useState<string>("");
  
  if (!business) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-bold">Detalles del Negocio</DialogTitle>
          <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="mt-2 flex items-center justify-center">
          <div className="w-24 h-24 rounded-lg bg-muted flex items-center justify-center">
            <Building className="h-12 w-12 text-muted-foreground" />
          </div>
        </div>
        
        <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="general">Generales</TabsTrigger>
            <TabsTrigger value="contacts">Contactos</TabsTrigger>
            <TabsTrigger value="organization">Organización</TabsTrigger>
            <TabsTrigger value="sales">Comercial</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Negocio</Label>
                <Input id="name" defaultValue={business.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="level">Nivel</Label>
                <Select defaultValue={business.level}>
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
                <Label htmlFor="type">Tipo de Negocio</Label>
                <Select defaultValue={business.type}>
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
                <Label htmlFor="subscriptionDays">Días de Suscripción</Label>
                <Input id="subscriptionDays" type="number" defaultValue={business.subscriptionDays.toString()} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="legalName">Nombre Legal</Label>
                <Input id="legalName" defaultValue="" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dni">DNI / NIF</Label>
                <Input id="dni" defaultValue="" />
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
          
          <TabsContent value="contacts" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" defaultValue="" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <Input id="address" defaultValue="" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Sitio Web</Label>
                <Input id="website" defaultValue="" />
              </div>
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
              <Button>Guardar Cambios</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="organization" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="organization">Organización</Label>
                <Select 
                  value={selectedOrganization}
                  onValueChange={setSelectedOrganization}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar organización" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Sin organización</SelectItem>
                    {organizations.map(org => (
                      <SelectItem key={org.id} value={org.id}>
                        {org.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedOrganization && (
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Detalles de la Organización</h3>
                  <div className="space-y-1 text-sm">
                    {organizations.find(org => org.id === selectedOrganization) && (
                      <>
                        <p><span className="font-medium">Nombre:</span> {organizations.find(org => org.id === selectedOrganization)?.name}</p>
                        <p><span className="font-medium">Tipo:</span> {organizations.find(org => org.id === selectedOrganization)?.type}</p>
                        <p><span className="font-medium">Negocios:</span> {organizations.find(org => org.id === selectedOrganization)?.businessCount}</p>
                        <p><span className="font-medium">Empleados:</span> {organizations.find(org => org.id === selectedOrganization)?.employeeCount}</p>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
              <Button>Guardar Cambios</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="sales" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="salesRep">Comercial Asignado</Label>
                <Select 
                  value={selectedSalesRep}
                  onValueChange={setSelectedSalesRep}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar comercial" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Sin asignar</SelectItem>
                    {sampleSalesReps.map(rep => (
                      <SelectItem key={rep.id} value={rep.id}>
                        {rep.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedSalesRep && (
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Información del Comercial</h3>
                  <div className="space-y-1 text-sm">
                    {sampleSalesReps.find(rep => rep.id === selectedSalesRep) && (
                      <>
                        <p><span className="font-medium">Nombre:</span> {sampleSalesReps.find(rep => rep.id === selectedSalesRep)?.name}</p>
                        <p><span className="font-medium">Email:</span> {sampleSalesReps.find(rep => rep.id === selectedSalesRep)?.email}</p>
                        <p><span className="font-medium">Teléfono:</span> {sampleSalesReps.find(rep => rep.id === selectedSalesRep)?.phone}</p>
                      </>
                    )}
                  </div>
                </div>
              )}
              
              <div className="mt-4">
                <h3 className="font-medium mb-2">Historial de Seguimiento</h3>
                <div className="border rounded-lg p-4 text-center text-muted-foreground">
                  <p>No hay registros de seguimiento disponibles</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
              <Button>Guardar Cambios</Button>
            </div>
          </TabsContent>
          
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}