import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";

export function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("Usuario");
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
      setUserName("Juan Pérez");
      toast({
        title: "¡Bienvenido de nuevo!",
        description: "Panel de control de ZEUS Business Hub cargado correctamente."
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">
            Bienvenido, {loading ? "..." : userName}
          </h1>
          <p className="text-muted-foreground">
            Administre sus negocios y organizaciones desde este panel de control
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground">Cargando información del panel...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="business-card">
              <h3 className="text-lg font-medium mb-2">Negocios Activos</h3>
              <p className="text-4xl font-bold text-primary">24</p>
              <div className="mt-2 text-sm text-muted-foreground">
                <span className="text-chart-4">↑ 3 nuevos</span> este mes
              </div>
            </div>
            
            <div className="business-card">
              <h3 className="text-lg font-medium mb-2">Organizaciones</h3>
              <p className="text-4xl font-bold text-accent">6</p>
              <div className="mt-2 text-sm text-muted-foreground">
                Gestionando 48 negocios
              </div>
            </div>
            
            <div className="business-card">
              <h3 className="text-lg font-medium mb-2">Notificaciones</h3>
              <p className="text-4xl font-bold text-chart-3">12</p>
              <div className="mt-2 text-sm text-muted-foreground">
                <span className="text-chart-3">5 sin leer</span> en su bandeja
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-4">Actividad Reciente</h2>
          <div className="business-card overflow-hidden">
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b">
                <div>
                  <p className="font-medium">Cafetería El Aroma</p>
                  <p className="text-sm text-muted-foreground">Actualización de datos</p>
                </div>
                <span className="text-xs text-muted-foreground">Hace 2 horas</span>
              </div>
              
              <div className="flex justify-between items-center pb-2 border-b">
                <div>
                  <p className="font-medium">Tienda Modas Express</p>
                  <p className="text-sm text-muted-foreground">Nueva suscripción</p>
                </div>
                <span className="text-xs text-muted-foreground">Hace 5 horas</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Servicios Técnicos Pro</p>
                  <p className="text-sm text-muted-foreground">Actualización de nivel</p>
                </div>
                <span className="text-xs text-muted-foreground">Hace 1 día</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}