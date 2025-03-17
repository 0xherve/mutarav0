
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  Plus,
  Tag,
  TimerReset
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import PageHeader from "../components/common/PageHeader";
import CustomCard from "../components/ui/CustomCard";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const breedingRecords = [
  {
    id: "BR001",
    cowId: "LV1001",
    cowName: "Bella",
    bullId: "LV1002",
    bullName: "Duke",
    method: "Natural",
    date: "2023-10-05",
    status: "confirmed",
    expectedCalvingDate: "2023-07-14",
    notes: "Observed breeding"
  },
  {
    id: "BR002",
    cowId: "LV1003",
    cowName: "Daisy",
    bullId: "AI-123",
    bullName: "Premium Semen",
    method: "AI",
    date: "2023-10-12",
    status: "pending",
    notes: "AI performed by Dr. Johnson"
  },
  {
    id: "BR003",
    cowId: "LV1005",
    cowName: "Rosie",
    bullId: "LV1004",
    bullName: "Rocky",
    method: "Natural",
    date: "2023-09-28",
    status: "confirmed",
    expectedCalvingDate: "2023-07-05",
    notes: ""
  }
];

const heatCycles = [
  {
    id: "HC001",
    cowId: "LV1001",
    cowName: "Bella",
    lastHeat: "2023-10-25",
    nextHeat: "2023-11-15",
    status: "normal"
  },
  {
    id: "HC002",
    cowId: "LV1003",
    cowName: "Daisy",
    lastHeat: "2023-10-20",
    nextHeat: "2023-11-10",
    status: "normal"
  },
  {
    id: "HC003",
    cowId: "LV1005",
    cowName: "Rosie",
    lastHeat: "2023-10-12",
    nextHeat: "2023-11-01",
    status: "irregular"
  }
];

const statusColors = {
  confirmed: "bg-green-100 text-green-800",
  pending: "bg-amber-100 text-amber-800",
  failed: "bg-red-100 text-red-800"
};

const Breeding = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const toggleExpand = (id: string) => {
    if (expandedItems.includes(id)) {
      setExpandedItems(expandedItems.filter(item => item !== id));
    } else {
      setExpandedItems([...expandedItems, id]);
    }
  };
  
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 flex flex-col ml-[70px] lg:ml-[240px]">
        <Navbar toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 p-6 bg-gray-50/30 min-h-[calc(100vh-4rem)] animate-fade-in">
          <PageHeader
            title="Breeding Management"
            description="Track breeding records and heat cycles"
            action={
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                New Breeding Record
              </Button>
            }
          />
          
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Breeding Records</h2>
            <div className="space-y-4">
              {breedingRecords.map((record) => {
                const isExpanded = expandedItems.includes(record.id);
                
                return (
                  <CustomCard key={record.id} className="hover:border-farm-accent/30">
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">Breeding #{record.id}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${statusColors[record.status as keyof typeof statusColors]}`}>
                              {record.status === "confirmed" ? "Confirmed" : record.status === "pending" ? "Pending Confirmation" : "Failed"}
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap gap-4 mb-3">
                            <div>
                              <p className="text-xs text-muted-foreground">Cow</p>
                              <p className="font-medium">{record.cowName} ({record.cowId})</p>
                            </div>
                            
                            <div>
                              <p className="text-xs text-muted-foreground">Bull/Semen</p>
                              <p className="font-medium">{record.bullName} ({record.bullId})</p>
                            </div>
                            
                            <div>
                              <p className="text-xs text-muted-foreground">Method</p>
                              <p className="font-medium">{record.method}</p>
                            </div>
                            
                            <div>
                              <p className="text-xs text-muted-foreground">Date</p>
                              <p className="font-medium">{new Date(record.date).toLocaleDateString()}</p>
                            </div>
                          </div>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => toggleExpand(record.id)}
                        >
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </Button>
                      </div>
                      
                      {isExpanded && (
                        <div className="pt-4 mt-4 border-t">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {record.status === "confirmed" && (
                              <div>
                                <p className="text-xs text-muted-foreground">Expected Calving Date</p>
                                <p className="font-medium">{new Date(record.expectedCalvingDate).toLocaleDateString()}</p>
                              </div>
                            )}
                            
                            <div>
                              <p className="text-xs text-muted-foreground">Notes</p>
                              <p className="font-medium">{record.notes || "No notes"}</p>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex justify-end gap-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            {record.status === "pending" && (
                              <Button size="sm">Confirm Pregnancy</Button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </CustomCard>
                );
              })}
            </div>
          </div>
          
          <div className="mt-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Heat Cycles</h2>
              <Button variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Record Heat
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {heatCycles.map((cycle) => (
                <CustomCard key={cycle.id} className="hover:border-farm-primary/30">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-muted-foreground" />
                        <h3 className="font-semibold">{cycle.cowName}</h3>
                      </div>
                      
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        cycle.status === "normal" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                      }`}>
                        {cycle.status === "normal" ? "Normal" : "Irregular"}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>Last Heat</span>
                        </div>
                        <p className="font-medium">{new Date(cycle.lastHeat).toLocaleDateString()}</p>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>Next Expected</span>
                        </div>
                        <p className="font-medium">{new Date(cycle.nextHeat).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-3 border-t">
                      <p className="text-sm text-muted-foreground">{cycle.cowId}</p>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <TimerReset className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Reset Cycle</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </CustomCard>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Breeding;
