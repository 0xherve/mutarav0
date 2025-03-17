
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Filter,
  Plus,
  Search,
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import PageHeader from "../components/common/PageHeader";
import LivestockGrid from "../components/livestock/LivestockGrid";

const Livestock = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 flex flex-col ml-[70px] lg:ml-[240px]">
        <Navbar toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 p-6 bg-gray-50/30 min-h-[calc(100vh-4rem)] animate-fade-in">
          <PageHeader
            title="Livestock Management"
            description="View and manage your livestock records"
            action={
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Livestock
              </Button>
            }
          />
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by ID, name, or breed..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-3">
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Health Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="healthy">Healthy</SelectItem>
                  <SelectItem value="attention">Needs Attention</SelectItem>
                  <SelectItem value="sick">Sick</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Breed" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Breeds</SelectItem>
                  <SelectItem value="angus">Angus</SelectItem>
                  <SelectItem value="hereford">Hereford</SelectItem>
                  <SelectItem value="holstein">Holstein</SelectItem>
                  <SelectItem value="jersey">Jersey</SelectItem>
                  <SelectItem value="brahman">Brahman</SelectItem>
                  <SelectItem value="charolais">Charolais</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>
          </div>
          
          <LivestockGrid />
        </main>
      </div>
    </div>
  );
};

export default Livestock;
