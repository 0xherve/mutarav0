
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import LivestockCard from "./LivestockCard";

// Mock livestock data
const mockLivestock = [
  {
    id: "LV1001",
    name: "Bella",
    breed: "Angus",
    gender: "Female",
    age: "3 years",
    weight: "550 kg",
    healthStatus: "healthy" as const,
    imageUrl: "https://images.unsplash.com/photo-1584935496024-506443d6f664?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "LV1002",
    name: "Duke",
    breed: "Hereford",
    gender: "Male",
    age: "4 years",
    weight: "850 kg",
    healthStatus: "healthy" as const,
    imageUrl: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "LV1003",
    name: "Daisy",
    breed: "Holstein",
    gender: "Female",
    age: "2 years",
    weight: "450 kg",
    healthStatus: "attention" as const,
    imageUrl: "https://images.unsplash.com/photo-1545468258-95573b2a901f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "LV1004",
    name: "Rocky",
    breed: "Brahman",
    gender: "Male",
    age: "5 years",
    weight: "920 kg",
    healthStatus: "healthy" as const,
    imageUrl: "https://images.unsplash.com/photo-1527152440941-d93afd8e1eda?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "LV1005",
    name: "Rosie",
    breed: "Jersey",
    gender: "Female",
    age: "3 years",
    weight: "420 kg",
    healthStatus: "sick" as const,
    imageUrl: "https://images.unsplash.com/photo-1546445317-29f4545e9d53?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "LV1006",
    name: "Bruno",
    breed: "Charolais",
    gender: "Male",
    age: "2 years",
    weight: "680 kg",
    healthStatus: "healthy" as const,
    imageUrl: "https://images.unsplash.com/photo-1511374322434-82c9c47d07da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const LivestockGrid = () => {
  const [livestock, setLivestock] = useState(mockLivestock);
  const { toast } = useToast();
  
  const handleView = (id: string) => {
    toast({
      title: "Viewing Livestock",
      description: `You are viewing details for ${id}`,
    });
  };
  
  const handleEdit = (id: string) => {
    toast({
      title: "Editing Livestock",
      description: `You are editing ${id}`,
    });
  };
  
  const handleDelete = (id: string) => {
    toast({
      title: "Livestock Deleted",
      description: `Livestock ${id} has been deleted`,
      variant: "destructive",
    });
    
    // Update state to remove the deleted livestock
    setLivestock(livestock.filter(item => item.id !== id));
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {livestock.map((animal) => (
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
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default LivestockGrid;
