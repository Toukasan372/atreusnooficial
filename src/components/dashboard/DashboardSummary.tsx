import { FC } from "react";
import { Building2, Store, AlertCircle, Activity } from "lucide-react";
import MetricCard from "./MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardSummary: FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Negocios"
          value={84}
          icon={Store}
          trend={{ value: 12, isPositive: true }}
        />
        <MetricCard
          title="Organizaciones"
          value={15}
          icon={Building2}
          trend={{ value: 4, isPositive: true }}
        />
        <MetricCard
          title="Alertas Activas"
          value={3}
          icon={AlertCircle}
          description="Suscripciones próximas a vencer"
        />
        <MetricCard
          title="Tasa de Crecimiento"
          value="18%"
          icon={Activity}
          description="Últimos 30 días"
          trend={{ value: 7, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Level Distribution Card */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Distribución por Niveles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { level: "Nivel 1", count: 32, color: "bg-blue-500", percentage: 38 },
                { level: "Nivel 2", count: 28, color: "bg-green-500", percentage: 33 },
                { level: "Nivel 3", count: 15, color: "bg-amber-500", percentage: 18 },
                { level: "Nivel 4", count: 9, color: "bg-pink-500", percentage: 11 },
              ].map((item) => (
                <div key={item.level} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{item.level}</span>
                    <span className="font-medium">{item.count}</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className={`${item.color} h-2 rounded-full`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts Card */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Alertas Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  business: "Café Aroma",
                  level: "LEVEL_2",
                  alert: "Suscripción vence en 3 días",
                },
                {
                  business: "Restaurante El Fogón",
                  level: "LEVEL_3",
                  alert: "Suscripción vence en 5 días",
                },
                {
                  business: "Tienda Moda Express",
                  level: "LEVEL_1",
                  alert: "Suscripción vence en 7 días",
                },
              ].map((alert, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted/40 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-10 rounded-full ${
                        alert.level === "LEVEL_1"
                          ? "bg-blue-500"
                          : alert.level === "LEVEL_2"
                          ? "bg-green-500"
                          : alert.level === "LEVEL_3"
                          ? "bg-amber-500"
                          : "bg-pink-500"
                      }`}
                    ></div>
                    <div>
                      <p className="font-medium">{alert.business}</p>
                      <p className="text-sm text-muted-foreground">{alert.alert}</p>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-red-500">
                    Acción requerida
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardSummary;