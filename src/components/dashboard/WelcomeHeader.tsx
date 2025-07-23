import { FC } from "react";

interface WelcomeHeaderProps {
  username?: string;
  isLoading?: boolean;
}

const WelcomeHeader: FC<WelcomeHeaderProps> = ({ 
  username = "Admin", 
  isLoading = false 
}) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold mb-1">
        {isLoading ? (
          <div className="h-8 w-64 bg-muted rounded-md animate-pulse-slow"></div>
        ) : (
          <>Bienvenido, <span className="text-primary">{username}</span></>
        )}
      </h1>
      <p className="text-muted-foreground">
        {isLoading ? (
          <div className="h-5 w-96 bg-muted rounded-md animate-pulse-slow"></div>
        ) : (
          "Visualiza y gestiona tus negocios desde un solo lugar"
        )}
      </p>
    </div>
  );
};

export default WelcomeHeader;