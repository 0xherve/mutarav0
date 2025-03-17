
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import LivestockCard from "./LivestockCard";

interface LivestockGridProps {
  data: Array<{
    id: string;
    name: string;
    breed: string;
    gender: string;
    age: string;
    weight: string;
    healthStatus: "healthy" | "attention" | "sick";
    imageUrl?: string;
  }>;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const LivestockGrid = ({ data, onView, onEdit, onDelete }: LivestockGridProps) => {
  const { toast } = useToast();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((animal) => (
        <LivestockCard
          key={animal.id}
          id={animal.id}
          name={animal.name}
          breed={animal.breed}
          gender={animal.gender}
          age={animal.age}
          weight={animal.weight}
          healthStatus={animal.healthStatus}
          imageUrl={animal.imageUrl}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default LivestockGrid;
