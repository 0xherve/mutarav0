
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, Utensils, Clock } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import PageHeader from "../components/common/PageHeader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomCard from "../components/ui/CustomCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Mock feeding data
const mockFeedingSchedules = [
  {
    id: "FS001",
    name: "Morning Feed - Dairy Group",
    feedType: "Hay and Grain Mix",
    animalGroup: "Dairy Cows",
    quantity: "250 kg",
    time: "06:00 AM",
    frequency: "Daily",
    assignee: "John Smith",
    status: "active",
  },
  {
    id: "FS002",
    name: "Evening Feed - Dairy Group",
    feedType: "Silage and Mineral Supplement",
    animalGroup: "Dairy Cows",
    quantity: "200 kg",
    time: "05:00 PM",
    frequency: "Daily",
    assignee: "Maria Rodriguez",
    status: "active",
  },
  {
    id: "FS003",
    name: "Morning Feed - Beef Group",
    feedType: "Grain and Protein Mix",
    animalGroup: "Beef Cattle",
    quantity: "180 kg",
    time: "07:00 AM",
    frequency: "Daily",
    assignee: "Michael Johnson",
    status: "active",
  },
  {
    id: "FS004",
    name: "Special Supplement - Calves",
    feedType: "Calf Starter and Milk Replacer",
    animalGroup: "Calves",
    quantity: "50 kg",
    time: "08:00 AM",
    frequency: "Daily",
    assignee: "Sarah Williams",
    status: "active",
  },
  {
    id: "FS005",
    name: "Winter Feed Program",
    feedType: "High-Energy Feed Mix",
    animalGroup: "All Cattle",
    quantity: "300 kg",
    time: "Various",
    frequency: "Seasonal",
    assignee: "David Wilson",
    status: "inactive",
  }
];

// Mock feed inventory data
const mockFeedInventory = [
  {
    id: "FI001",
    name: "Alfalfa Hay",
    category: "Forage",
    quantityAvailable: "5,000 kg",
    unit: "kg",
    lastPurchase: "2023-10-15",
    supplier: "Green Valley Farms",
    cost: "$0.15/kg",
    status: "In Stock"
  },
  {
    id: "FI002",
    name: "Corn Silage",
    category: "Forage",
    quantityAvailable: "8,200 kg",
    unit: "kg",
    lastPurchase: "2023-11-02",
    supplier: "Harvest Solutions",
    cost: "$0.10/kg", 
    status: "In Stock"
  },
  {
    id: "FI003",
    name: "Grain Mix",
    category: "Concentrate",
    quantityAvailable: "2,800 kg",
    unit: "kg",
    lastPurchase: "2023-12-10",
    supplier: "Premium Feed Co.",
    cost: "$0.40/kg",
    status: "Low Stock"
  },
  {
    id: "FI004",
    name: "Mineral Supplement",
    category: "Supplement",
    quantityAvailable: "500 kg",
    unit: "kg",
    lastPurchase: "2024-01-05",
    supplier: "Animal Nutrition Inc.",
    cost: "$1.25/kg",
    status: "In Stock"
  },
  {
    id: "FI005",
    name: "Protein Pellets",
    category: "Supplement",
    quantityAvailable: "350 kg",
    unit: "kg",
    lastPurchase: "2024-01-15",
    supplier: "Premium Feed Co.",
    cost: "$0.75/kg",
    status: "Low Stock"
  }
];

const Feeding = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("schedules");
  const { toast } = useToast();
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const handleAddSchedule = () => {
    toast({
      title: "Create Feeding Schedule",
      description: "This feature will be implemented soon.",
    });
  };
  
  const handleAddInventory = () => {
    toast({
      title: "Add Feed Inventory",
      description: "This feature will be implemented soon.",
    });
  };
  
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 flex flex-col ml-[70px] lg:ml-[240px]">
        <Navbar toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 p-6 bg-gray-50/30 min-h-[calc(100vh-4rem)] animate-fade-in">
          <PageHeader
            title="Feeding Management"
            description="Manage feeding schedules and inventory"
            action={
              <Button size="sm" onClick={activeTab === "schedules" ? handleAddSchedule : handleAddInventory}>
                <Plus className="mr-2 h-4 w-4" />
                {activeTab === "schedules" ? "Add Schedule" : "Add Inventory"}
              </Button>
            }
          />
          
          <Tabs defaultValue="schedules" className="mt-6" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="schedules">
                <Clock className="h-4 w-4 mr-2" />
                Feeding Schedules
              </TabsTrigger>
              <TabsTrigger value="inventory">
                <Utensils className="h-4 w-4 mr-2" />
                Feed Inventory
              </TabsTrigger>
            </TabsList>
            
            <div className="flex flex-col md:flex-row gap-4 mb-6 mt-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={activeTab === "schedules" ? "Search feeding schedules..." : "Search feed inventory..."}
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-3">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder={activeTab === "schedules" ? "Status" : "Category"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {activeTab === "schedules" ? (
                      <>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="forage">Forage</SelectItem>
                        <SelectItem value="concentrate">Concentrate</SelectItem>
                        <SelectItem value="supplement">Supplement</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
                
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">Filter</span>
                </Button>
              </div>
            </div>
            
            <TabsContent value="schedules">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockFeedingSchedules.map((schedule) => (
                  <CustomCard key={schedule.id} className="overflow-hidden">
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{schedule.name}</h3>
                          <p className="text-muted-foreground text-sm mt-1">{schedule.feedType}</p>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          schedule.status === "active" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-gray-100 text-gray-800"
                        }`}>
                          {schedule.status === "active" ? "Active" : "Inactive"}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Animal Group</p>
                          <p className="font-medium">{schedule.animalGroup}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Quantity</p>
                          <p className="font-medium">{schedule.quantity}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Time</p>
                          <p className="font-medium">{schedule.time}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Frequency</p>
                          <p className="font-medium">{schedule.frequency}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4 pt-4 border-t">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Assigned to:</span> {schedule.assignee}
                        </div>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </div>
                  </CustomCard>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="inventory">
              <div className="rounded-md border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-3 px-4 text-left font-medium">Feed Name</th>
                      <th className="py-3 px-4 text-left font-medium">Category</th>
                      <th className="py-3 px-4 text-left font-medium">Quantity</th>
                      <th className="py-3 px-4 text-left font-medium">Last Purchase</th>
                      <th className="py-3 px-4 text-left font-medium">Cost</th>
                      <th className="py-3 px-4 text-left font-medium">Status</th>
                      <th className="py-3 px-4 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockFeedInventory.map((feed) => (
                      <tr key={feed.id} className="border-b hover:bg-muted/30">
                        <td className="py-3 px-4">{feed.name}</td>
                        <td className="py-3 px-4">{feed.category}</td>
                        <td className="py-3 px-4">{feed.quantityAvailable}</td>
                        <td className="py-3 px-4">{new Date(feed.lastPurchase).toLocaleDateString()}</td>
                        <td className="py-3 px-4">{feed.cost}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            feed.status === "In Stock" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {feed.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="outline" size="sm">Details</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Feeding;
