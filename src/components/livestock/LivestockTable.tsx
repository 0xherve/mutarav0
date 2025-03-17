
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, FileDown, Printer, Eye, Edit, Trash2 } from "lucide-react";

type HealthStatus = "healthy" | "attention" | "sick";

interface LivestockTableProps {
  data: Array<{
    id: string;
    name: string;
    breed: string;
    gender: string;
    age: string;
    weight: string;
    healthStatus: HealthStatus;
    imageUrl: string;
  }>;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onExport?: (id: string) => void;
  onPrint?: (id: string) => void;
}

const LivestockTable = ({
  data,
  onView,
  onEdit,
  onDelete,
  onExport,
  onPrint,
}: LivestockTableProps) => {
  const getHealthStatusColor = (status: HealthStatus) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "attention":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "sick":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <Table>
      <TableCaption>A list of your livestock.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Breed</TableHead>
          <TableHead>Gender</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>Weight</TableHead>
          <TableHead>Health Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((animal) => (
          <TableRow key={animal.id}>
            <TableCell className="font-medium">{animal.id}</TableCell>
            <TableCell>{animal.name}</TableCell>
            <TableCell>{animal.breed}</TableCell>
            <TableCell>{animal.gender}</TableCell>
            <TableCell>{animal.age}</TableCell>
            <TableCell>{animal.weight}</TableCell>
            <TableCell>
              <Badge 
                variant="outline" 
                className={getHealthStatusColor(animal.healthStatus)}
              >
                {animal.healthStatus.charAt(0).toUpperCase() + animal.healthStatus.slice(1)}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onView(animal.id)}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onEdit(animal.id)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  {onExport && (
                    <DropdownMenuItem onClick={() => onExport(animal.id)}>
                      <FileDown className="mr-2 h-4 w-4" />
                      Export
                    </DropdownMenuItem>
                  )}
                  {onPrint && (
                    <DropdownMenuItem onClick={() => onPrint(animal.id)}>
                      <Printer className="mr-2 h-4 w-4" />
                      Print
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => onDelete(animal.id)}
                    className="text-red-600 focus:text-red-600"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LivestockTable;
