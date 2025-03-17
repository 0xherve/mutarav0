
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import LivestockGrid from "./LivestockGrid";
import LivestockTable from "./LivestockTable";
import LivestockDetailModal from "./LivestockDetailModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, DownloadCloud, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

// Enhanced mock livestock data with additional fields
const mockLivestock = [
  {
    id: "LV1001",
    name: "Bella",
    breed: "Angus",
    gender: "Female",
    age: "3 years",
    weight: "550 kg",
    healthStatus: "healthy" as const,
    imageUrl: "https://images.unsplash.com/photo-1584935496024-506443d6f664?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    birthDate: "2021-03-15",
    purchaseDate: "2021-06-20",
    purchasePrice: "$1,200",
    notes: "Excellent milk producer. First calf born in spring 2023."
  },
  {
    id: "LV1002",
    name: "Duke",
    breed: "Hereford",
    gender: "Male",
    age: "4 years",
    weight: "850 kg",
    healthStatus: "healthy" as const,
    imageUrl: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    birthDate: "2020-02-10",
    purchaseDate: "2020-05-15",
    purchasePrice: "$1,500",
    notes: "Primary breeding bull. Excellent genetics."
  },
  {
    id: "LV1003",
    name: "Daisy",
    breed: "Holstein",
    gender: "Female",
    age: "2 years",
    weight: "450 kg",
    healthStatus: "attention" as const,
    imageUrl: "https://images.unsplash.com/photo-1545468258-95573b2a901f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    birthDate: "2022-05-22",
    purchaseDate: "2022-08-10",
    purchasePrice: "$900",
    notes: "Recently showing signs of reduced appetite. Under observation."
  },
  {
    id: "LV1004",
    name: "Rocky",
    breed: "Brahman",
    gender: "Male",
    age: "5 years",
    weight: "920 kg",
    healthStatus: "healthy" as const,
    imageUrl: "https://images.unsplash.com/photo-1527152440941-d93afd8e1eda?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    birthDate: "2019-01-05",
    purchaseDate: "2019-06-30",
    purchasePrice: "$1,800",
    notes: "Secondary breeding bull. Heat-resistant."
  },
  {
    id: "LV1005",
    name: "Rosie",
    breed: "Jersey",
    gender: "Female",
    age: "3 years",
    weight: "420 kg",
    healthStatus: "sick" as const,
    imageUrl: "https://images.unsplash.com/photo-1546445317-29f4545e9d53?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    birthDate: "2021-07-12",
    purchaseDate: "2021-10-05",
    purchasePrice: "$950",
    notes: "Currently on antibiotics for respiratory infection."
  },
  {
    id: "LV1006",
    name: "Bruno",
    breed: "Charolais",
    gender: "Male",
    age: "2 years",
    weight: "680 kg",
    healthStatus: "healthy" as const,
    imageUrl: "https://images.unsplash.com/photo-1511374322434-82c9c47d07da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    birthDate: "2022-02-18",
    purchaseDate: "2022-05-30",
    purchasePrice: "$1,350",
    notes: "Fast growing. Potential for beef production."
  }
];

const LivestockView = () => {
  const [livestock, setLivestock] = useState(mockLivestock);
  const [view, setView] = useState<"grid" | "table">("grid");
  const [selectedLivestock, setSelectedLivestock] = useState<typeof mockLivestock[0] | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const { toast } = useToast();
  
  const handleView = (id: string) => {
    const selected = livestock.find(item => item.id === id);
    if (selected) {
      setSelectedLivestock(selected);
      setIsDetailModalOpen(true);
    }
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
      
      {view === "grid" ? (
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
