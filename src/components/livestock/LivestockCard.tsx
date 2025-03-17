
import { motion } from "framer-motion";
import { Clock, Edit, MoreVertical, Tag, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CustomCard from "../ui/CustomCard";

interface LivestockCardProps {
  id: string;
  name: string;
  breed: string;
  gender: string;
  age: string;
  weight: string;
  imageUrl?: string;
  healthStatus: "healthy" | "attention" | "sick";
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const healthStatusColors = {
  healthy: "bg-green-100 text-green-800 border-green-200",
  attention: "bg-amber-100 text-amber-800 border-amber-200",
  sick: "bg-red-100 text-red-800 border-red-200"
};

const LivestockCard = ({
  id,
  name,
  breed,
  gender,
  age,
  weight,
  imageUrl,
  healthStatus,
  onView,
  onEdit,
  onDelete
}: LivestockCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <CustomCard
        className="overflow-hidden hover:border-farm-primary/30 transition-colors"
        hoverEffect
        onClick={() => onView(id)}
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl || "https://images.unsplash.com/photo-1596733430284-f7437764b1a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
            alt={name}
            className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
          />
          
          <div className="absolute top-2 right-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/80 backdrop-blur-sm rounded-full">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={(e) => {
                  e.stopPropagation();
                  onView(id);
                }}>
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => {
                  e.stopPropagation();
                  onEdit(id);
                }}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-destructive focus:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(id);
                  }}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent text-white">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">{name}</h3>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  healthStatusColors[healthStatus]
                }`}
              >
                {healthStatus === "healthy" ? "Healthy" : healthStatus === "attention" ? "Needs Attention" : "Sick"}
              </span>
            </div>
          </div>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Breed</p>
              <p className="font-medium">{breed}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Gender</p>
              <p className="font-medium">{gender}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Age</p>
              <p className="font-medium">{age}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Weight</p>
              <p className="font-medium">{weight}</p>
            </div>
          </div>
          
          <div className="pt-3 flex items-center justify-between border-t">
            <div className="flex items-center text-muted-foreground text-sm">
              <Tag className="mr-1 h-4 w-4" />
              <span>ID: {id}</span>
            </div>
            
            <div className="flex items-center text-muted-foreground text-sm">
              <Clock className="mr-1 h-4 w-4" />
              <span>Updated 3d ago</span>
            </div>
          </div>
        </div>
      </CustomCard>
    </motion.div>
  );
};

export default LivestockCard;
