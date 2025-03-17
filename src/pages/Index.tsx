
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import DashboardOverview from "../components/dashboard/DashboardOverview";
import PageHeader from "../components/common/PageHeader";
import LivestockStats from "../components/livestock/LivestockStats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileDown, Activity, PieChart, BarChart3 } from "lucide-react";

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const handleExportDashboard = () => {
    // In a real application, this would trigger PDF export of dashboard
    console.log("Exporting dashboard as PDF");
  };
  
  return (
    <div className="flex min-h-screen bg-background">
      <AnimatePresence>
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </AnimatePresence>
      
      <div className="flex-1 flex flex-col ml-[70px] lg:ml-[240px]">
        <Navbar toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 p-6 bg-gray-50/30 min-h-[calc(100vh-4rem)] animate-fade-in">
          <PageHeader
            title="Mutara Dashboard"
            description="Monitor your farm's performance and activities"
            action={
              <Button size="sm" onClick={handleExportDashboard}>
                <FileDown className="mr-2 h-4 w-4" />
                Export Dashboard
              </Button>
            }
          />
          
          <Tabs defaultValue="overview" className="mt-6">
            <TabsList>
              <TabsTrigger value="overview">
                <Activity className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="livestock-stats">
                <PieChart className="h-4 w-4 mr-2" />
                Livestock Analytics
              </TabsTrigger>
              <TabsTrigger value="financial-stats">
                <BarChart3 className="h-4 w-4 mr-2" />
                Financial Analytics
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <DashboardOverview />
            </TabsContent>
            
            <TabsContent value="livestock-stats">
              <div className="mt-6">
                <LivestockStats />
              </div>
            </TabsContent>
            
            <TabsContent value="financial-stats">
              <div className="mt-6">
                <div className="p-10 text-center">
                  <h3 className="text-xl font-medium">Financial Analytics Coming Soon</h3>
                  <p className="text-muted-foreground mt-2">This section will display financial data and analytics.</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Index;
