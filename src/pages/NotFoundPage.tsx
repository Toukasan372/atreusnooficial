import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-4">
      <div className="flex items-center flex-col gap-2 text-center">
        <AlertCircle className="w-16 h-16 text-muted-foreground mb-2" />
        <h1 className="text-4xl font-bold">404 - Página no encontrada</h1>
        <p className="text-muted-foreground max-w-md mt-2">
          La página que estás buscando no existe o ha sido movida a otra ubicación.
        </p>
      </div>
      <Button asChild size="lg" className="mt-4">
        <Link to="/">Volver al Panel</Link>
      </Button>
    </div>
  );
}

export default NotFoundPage;