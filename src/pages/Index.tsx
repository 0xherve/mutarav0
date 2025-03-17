
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import DashboardOverview from "../components/dashboard/DashboardOverview";

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className="flex min-h-screen bg-background">
      <AnimatePresence>
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </AnimatePresence>
      
      <div className="flex-1 flex flex-col ml-[70px] lg:ml-[240px]">
        <Navbar toggleSidebar={toggleSidebar} />
        <DashboardOverview />
      </div>
    </div>
  );
};

export default Index;
