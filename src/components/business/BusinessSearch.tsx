import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BusinessLevel } from "./BusinessCard";

interface BusinessSearchProps {
  onSearch: (query: string) => void;
  onFilterLevel: (level: BusinessLevel | "all") => void;
  onFilterType: (type: string | "all") => void;
}

export function BusinessSearch({ onSearch, onFilterLevel, onFilterType }: BusinessSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar negocios..."
          className="pl-9"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      
      <div className="flex gap-2">
        <div className="w-40">
          <Select onValueChange={(value) => onFilterLevel(value as BusinessLevel | "all")}>
            <SelectTrigger>
              <SelectValue placeholder="Nivel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los niveles</SelectItem>
              <SelectItem value="LEVEL_1">Nivel 1</SelectItem>
              <SelectItem value="LEVEL_2">Nivel 2</SelectItem>
              <SelectItem value="LEVEL_3">Nivel 3</SelectItem>
              <SelectItem value="LEVEL_4">Nivel 4</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-40">
          <Select onValueChange={(value) => onFilterType(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los tipos</SelectItem>
              <SelectItem value="store">Tienda</SelectItem>
              <SelectItem value="restaurant">Restaurante</SelectItem>
              <SelectItem value="service">Servicio</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}