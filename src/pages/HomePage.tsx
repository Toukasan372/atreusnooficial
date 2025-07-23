import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import DashboardSummary from "@/components/dashboard/DashboardSummary";
import RecentBusinesses from "@/components/business/RecentBusinesses";

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <MainLayout>
      <WelcomeHeader isLoading={isLoading} />
      
      <div className="space-y-6">
        {isLoading ? (
          // Loading skeleton
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-card rounded-lg p-6 h-[120px] animate-pulse-slow" />
              ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="bg-card rounded-lg p-6 h-[250px] animate-pulse-slow" />
              <div className="bg-card rounded-lg p-6 h-[250px] lg:col-span-2 animate-pulse-slow" />
            </div>
            
            <div className="bg-card rounded-lg p-6 h-[400px] animate-pulse-slow" />
          </div>
        ) : (
          // Actual content
          <>
            <DashboardSummary />
            <RecentBusinesses />
          </>
        )}
      </div>
    </MainLayout>
  );
}

export default HomePage;