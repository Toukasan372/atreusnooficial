import { FC } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Store } from "lucide-react";

const BusinessesPage: FC = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Negocios</h1>
        <p className="text-muted-foreground">
          Administra todos los negocios registrados en el sistema
        </p>
      </div>

      <Card className="mt-6">
        <CardHeader className="pb-0">
          <CardTitle className="text-xl flex items-center gap-2">
            <Store className="h-5 w-5" /> 
            Próximamente
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mb-4">
              <Store className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium mb-2">Módulo de Negocios</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Este módulo permitirá la gestión completa de negocios, incluyendo información general,
              contactos, servicios contratados, seguimiento, documentación, comerciales, dispositivos
              físicos y configuración de notificaciones.
            </p>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default BusinessesPage;