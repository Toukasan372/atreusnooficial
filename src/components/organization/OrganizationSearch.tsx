import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface OrganizationSearchProps {
  onSearch: (query: string) => void;
  onFilterType: (type: string | "all") => void;
}

export function OrganizationSearch({ onSearch, onFilterType }: OrganizationSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Buscar organización..."
          className="pl-10"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </div>
      
      <div className="flex gap-2">
        <div className="w-48">
          <Select onValueChange={(value) => onFilterType(value)}>
            <SelectTrigger>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Tipo" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Todos los tipos</SelectItem>
                <SelectItem value="small">Pequeña</SelectItem>
                <SelectItem value="medium">Mediana</SelectItem>
                <SelectItem value="enterprise">Empresa</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}