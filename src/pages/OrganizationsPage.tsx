import { FC } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";

const OrganizationsPage: FC = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Organizaciones</h1>
        <p className="text-muted-foreground">
          Gestiona las organizaciones empresariales
        </p>
      </div>

      <Card className="mt-6">
        <CardHeader className="pb-0">
          <CardTitle className="text-xl flex items-center gap-2">
            <Building2 className="h-5 w-5" /> 
            Próximamente
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mb-4">
              <Building2 className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium mb-2">Módulo de Organizaciones</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Este módulo permitirá visualizar, crear y gestionar organizaciones empresariales. 
              Podrás organizar negocios por organización y establecer jerarquías.
            </p>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default OrganizationsPage;