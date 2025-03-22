import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import LivestockGrid from "./LivestockGrid";
import LivestockTable from "./LivestockTable";
import LivestockDetailModal from "./LivestockDetailModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, DownloadCloud, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { fetchLivestock, deleteLivestock } from "@/lib/supabase";

// Health status type
type HealthStatus = "healthy" | "attention" | "sick";

// Database response type
type LivestockFromDB = {
  id: string;
  name: string;
  breed: string;
  gender: string;
  age: string | null;
  weight: string | null;
  health_status: string; // Changed from enum to string since DB might return any string
  image_url: string | null;
  birth_date: string | null;
  purchase_date: string | null;
  purchase_price: string | null;
  notes: string | null;
  created_at?: string;
  updated_at?: string;
};

// Livestock type after validation/transformation
type Livestock = {
  id: string;
  name: string;
  breed: string;
  gender: string;
  age: string | null;
  weight: string | null;
  health_status: HealthStatus; // This is the validated enum type
  image_url: string | null;
  birth_date: string | null;
  purchase_date: string | null;
  purchase_price: string | null;
  notes: string | null;
};

// Type for the components that expect different property names
type LivestockComponentData = {
  id: string;
  name: string;
  breed: string;
  gender: string;
  age: string;
  weight: string;
  healthStatus: HealthStatus;
  imageUrl: string; // Changed to required with default value in mapping
  purchaseDate?: string;
  purchasePrice?: string;
  birthDate?: string;
  notes?: string;
};

const LivestockView = () => {
  const [livestock, setLivestock] = useState<Livestock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<"grid" | "table">("grid");
  const [selectedLivestock, setSelectedLivestock] = useState<LivestockComponentData | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const { toast } = useToast();
  
  // Fetch livestock data from Supabase using the utility function
  const loadLivestock = async () => {
    try {
      setIsLoading(true);
      const data = await fetchLivestock();
      
      // Validate and transform the health_status to ensure it matches our HealthStatus type
      const validatedData: Livestock[] = data.map((item: LivestockFromDB) => {
        // Ensure health_status is one of the allowed values
        let health_status: HealthStatus = "healthy"; // Default
        
        if (item.health_status === "healthy" || 
            item.health_status === "attention" || 
            item.health_status === "sick") {
          health_status = item.health_status as HealthStatus;
        } else {
          console.warn(`Invalid health_status value "${item.health_status}" for livestock ${item.id}, defaulting to "healthy"`);
        }
        
        return {
          ...item,
          health_status
        };
      });
      
      setLivestock(validatedData);
    } catch (error) {
      console.error('Error fetching livestock:', error);
      toast({
        title: "Error",
        description: "Failed to load livestock data.",
        variant: "destructive",
      });
      // Fallback to empty array if fetch fails
      setLivestock([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Load data on component mount
  useEffect(() => {
    loadLivestock();
  }, []);
  
  // Convert database format to component format
  const mapToComponentFormat = (animals: Livestock[]): LivestockComponentData[] => {
    return animals.map(animal => ({
      id: animal.id,
      name: animal.name,
      breed: animal.breed,
      gender: animal.gender,
      age: animal.age || 'Unknown',
      weight: animal.weight || 'Unknown',
      healthStatus: animal.health_status,
      imageUrl: animal.image_url || 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Default image
      purchaseDate: animal.purchase_date || undefined,
      purchasePrice: animal.purchase_price || undefined,
      birthDate: animal.birth_date || undefined,
      notes: animal.notes || undefined,
    }));
  };
  
  const handleView = (id: string) => {
    const selected = livestock.find(item => item.id === id);
    if (selected) {
      const formattedData: LivestockComponentData = {
        id: selected.id,
        name: selected.name,
        breed: selected.breed,
        gender: selected.gender,
        age: selected.age || 'Unknown',
        weight: selected.weight || 'Unknown',
        healthStatus: selected.health_status,
        imageUrl: selected.image_url || 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Default image
        purchaseDate: selected.purchase_date || undefined,
        purchasePrice: selected.purchase_price || undefined,
        birthDate: selected.birth_date || undefined,
        notes: selected.notes || undefined,
      };
      setSelectedLivestock(formattedData);
      setIsDetailModalOpen(true);
    }
  };
  
  const handleEdit = (id: string) => {
    // For now just show a toast, but this would be updated to show an edit form
    toast({
      title: "Editing Livestock",
      description: `You are editing ${id}`,
    });
  };
  
  const handleDelete = async (id: string) => {
    try {
      // Use the utility function to delete from Supabase
      await deleteLivestock(id);
      
      // Update UI state
      setLivestock(livestock.filter(item => item.id !== id));
      
      toast({
        title: "Livestock Deleted",
        description: `Livestock ${id} has been deleted`,
      });
    } catch (error) {
      console.error('Error deleting livestock:', error);
      toast({
        title: "Error",
        description: "Failed to delete livestock.",
        variant: "destructive",
      });
    }
  };
  
  const handleExport = (id: string) => {
    toast({
      title: "Export PDF",
      description: `Exporting details for ${id} as PDF`,
    });
    // In a real application, this would trigger PDF generation
  };
  
  const handlePrint = (id: string) => {
    toast({
      title: "Print Record",
      description: `Printing record for ${id}`,
    });
    // In a real application, this would trigger print functionality
  };

  const handleBatchExport = () => {
    toast({
      title: "Export All Records",
      description: "Exporting all livestock records as PDF",
    });
    // In a real application, this would generate a PDF with all records
  };

  const handleBatchPrint = () => {
    toast({
      title: "Print All Records",
      description: "Printing all livestock records",
    });
    // In a real application, this would print all records
  };
  
  const handleGenerateReport = () => {
    toast({
      title: "Generate Report",
      description: "Generating comprehensive livestock report",
    });
    // In a real application, this would generate a detailed report
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading livestock data...</div>;
  }

  const formattedLivestock = mapToComponentFormat(livestock);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Tabs value={view} onValueChange={(v) => setView(v as "grid" | "table")} className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="table">Table View</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleGenerateReport}>
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button variant="outline" size="sm" onClick={handleBatchExport}>
            <DownloadCloud className="mr-2 h-4 w-4" />
            Export All
          </Button>
          <Button variant="outline" size="sm" onClick={handleBatchPrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print All
          </Button>
        </div>
      </div>
      
      {livestock.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <p className="text-muted-foreground mb-4">No livestock records found</p>
          <Button>Add Livestock</Button>
        </div>
      ) : view === "grid" ? (
        <LivestockGrid 
          data={formattedLivestock}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <LivestockTable 
          data={formattedLivestock}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onExport={handleExport}
          onPrint={handlePrint}
        />
      )}
      
      <LivestockDetailModal 
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        livestock={selectedLivestock}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default LivestockView;
