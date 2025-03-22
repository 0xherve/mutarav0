
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import LivestockGrid from "./LivestockGrid";
import LivestockTable from "./LivestockTable";
import LivestockDetailModal from "./LivestockDetailModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, DownloadCloud, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

// Livestock type based on the database schema
type Livestock = {
  id: string;
  name: string;
  breed: string;
  gender: string;
  age: string | null;
  weight: string | null;
  health_status: "healthy" | "attention" | "sick";
  image_url: string | null;
  birth_date: string | null;
  purchase_date: string | null;
  purchase_price: string | null;
  notes: string | null;
};

const LivestockView = () => {
  const [livestock, setLivestock] = useState<Livestock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<"grid" | "table">("grid");
  const [selectedLivestock, setSelectedLivestock] = useState<Livestock | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const { toast } = useToast();
  
  // Fetch livestock data from Supabase
  const fetchLivestock = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('livestock')
        .select('*');
      
      if (error) {
        throw error;
      }
      
      if (data) {
        // Convert database format to component format if needed
        const formattedData: Livestock[] = data.map(item => ({
          ...item,
          health_status: item.health_status as "healthy" | "attention" | "sick",
        }));
        
        setLivestock(formattedData);
      }
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
    fetchLivestock();
  }, []);
  
  const handleView = (id: string) => {
    const selected = livestock.find(item => item.id === id);
    if (selected) {
      setSelectedLivestock(selected);
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
      // Delete from Supabase
      const { error } = await supabase
        .from('livestock')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
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
          data={livestock}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <LivestockTable 
          data={livestock}
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
