
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, Utensils, Clock, Loader2 } from "lucide-react";
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
import { fetchFeedingSchedules, fetchFeedInventory } from "../lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { Database } from "@/integrations/supabase/types";

// Define types based on Supabase database
type FeedingSchedule = Database['public']['Tables']['feeding_schedules']['Row'];
type FeedInventory = Database['public']['Tables']['feed_inventory']['Row'];

const Feeding = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("schedules");
  const { toast } = useToast();
  
  // Fetch feeding schedules from Supabase
  const { 
    data: feedingSchedules, 
    isLoading: isLoadingSchedules,
    error: schedulesError 
  } = useQuery({
    queryKey: ['feedingSchedules'],
    queryFn: fetchFeedingSchedules
  });
  
  // Fetch feed inventory from Supabase
  const { 
    data: feedInventory, 
    isLoading: isLoadingInventory,
    error: inventoryError 
  } = useQuery({
    queryKey: ['feedInventory'],
    queryFn: fetchFeedInventory
  });
  
  useEffect(() => {
    if (schedulesError) {
      toast({
        title: "Error loading feeding schedules",
        description: "Please try again later.",
        variant: "destructive",
      });
      console.error(schedulesError);
    }
    
    if (inventoryError) {
      toast({
        title: "Error loading feed inventory",
        description: "Please try again later.",
        variant: "destructive",
      });
      console.error(inventoryError);
    }
  }, [schedulesError, inventoryError, toast]);
  
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
  
  // Filter data based on search query with proper type checking
  const filteredSchedules = feedingSchedules?.filter(schedule => 
    schedule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    schedule.feed_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    schedule.animal_group.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];
  
  const filteredInventory = feedInventory?.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];
  
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
              {isLoadingSchedules ? (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : filteredSchedules.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredSchedules.map((schedule) => (
                    <CustomCard key={schedule.id} className="overflow-hidden">
                      <div className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">{schedule.name}</h3>
                            <p className="text-muted-foreground text-sm mt-1">{schedule.feed_type}</p>
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
                            <p className="font-medium">{schedule.animal_group}</p>
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
              ) : (
                <div className="text-center py-20">
                  <p className="text-muted-foreground mb-4">No feeding schedules found</p>
                  <Button onClick={handleAddSchedule}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Feeding Schedule
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="inventory">
              {isLoadingInventory ? (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : filteredInventory.length > 0 ? (
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
                      {filteredInventory.map((feed) => (
                        <tr key={feed.id} className="border-b hover:bg-muted/30">
                          <td className="py-3 px-4">{feed.name}</td>
                          <td className="py-3 px-4">{feed.category}</td>
                          <td className="py-3 px-4">{feed.quantity_available}</td>
                          <td className="py-3 px-4">{feed.last_purchase ? new Date(feed.last_purchase).toLocaleDateString() : 'N/A'}</td>
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
              ) : (
                <div className="text-center py-20">
                  <p className="text-muted-foreground mb-4">No feed inventory found</p>
                  <Button onClick={handleAddInventory}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Feed Inventory
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Feeding;
