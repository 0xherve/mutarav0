
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  FileText,
  Plus,
  Stethoscope,
  Syringe,
  Thermometer,
  Clock8
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import PageHeader from "../components/common/PageHeader";
import CustomCard from "../components/ui/CustomCard";

const healthRecords = [
  {
    id: "HR001",
    animalId: "LV1001",
    animalName: "Bella",
    type: "Vaccination",
    date: "2023-10-15",
    description: "Annual vaccination against blackleg",
    performedBy: "Dr. Smith"
  },
  {
    id: "HR002",
    animalId: "LV1003",
    animalName: "Daisy",
    type: "Treatment",
    date: "2023-11-02",
    description: "Treatment for mild respiratory infection",
    performedBy: "Dr. Johnson"
  },
  {
    id: "HR003",
    animalId: "LV1005",
    animalName: "Rosie",
    type: "Examination",
    date: "2023-11-10",
    description: "General health examination, signs of fatigue",
    performedBy: "Dr. Martinez"
  },
  {
    id: "HR004",
    animalId: "LV1002",
    animalName: "Duke",
    type: "Vaccination",
    date: "2023-09-28",
    description: "Vaccination against BVD",
    performedBy: "Dr. Smith"
  }
];

const vaccinationSchedule = [
  {
    id: "VS001",
    animalIds: ["LV1001", "LV1004", "LV1006"],
    animalCount: 3,
    vaccineName: "Blackleg Vaccine",
    dueDate: "2023-12-15",
    status: "upcoming"
  },
  {
    id: "VS002",
    animalIds: ["LV1002", "LV1003"],
    animalCount: 2,
    vaccineName: "BVD Vaccine",
    dueDate: "2023-12-10",
    status: "upcoming"
  },
  {
    id: "VS003",
    animalIds: ["LV1005"],
    animalCount: 1,
    vaccineName: "Respiratory Vaccine",
    dueDate: "2023-11-05",
    status: "overdue"
  }
];

const typeIcons = {
  "Vaccination": <Syringe className="h-4 w-4" />,
  "Treatment": <FileText className="h-4 w-4" />,
  "Examination": <Stethoscope className="h-4 w-4" />
};

const Health = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
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
            title="Health Management"
            description="Monitor health records and vaccination schedules"
            action={
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                New Health Record
              </Button>
            }
          />
          
          <Tabs defaultValue="records" className="mt-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="records">Health Records</TabsTrigger>
              <TabsTrigger value="vaccinations">Vaccination Schedule</TabsTrigger>
            </TabsList>
            
            <TabsContent value="records" className="mt-6 space-y-6">
              {healthRecords.map((record) => (
                <CustomCard key={record.id} className="hover:border-farm-secondary/30">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          {typeIcons[record.type as keyof typeof typeIcons]}
                          <h3 className="font-semibold">{record.type}</h3>
                          <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700">
                            {record.id}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {record.description}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(record.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap justify-between pt-3 border-t mt-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Animal</p>
                        <p className="font-medium">{record.animalName} ({record.animalId})</p>
                      </div>
                      
                      <div>
                        <p className="text-xs text-muted-foreground">Performed By</p>
                        <p className="font-medium">{record.performedBy}</p>
                      </div>
                    </div>
                  </div>
                </CustomCard>
              ))}
            </TabsContent>
            
            <TabsContent value="vaccinations" className="mt-6 space-y-6">
              {vaccinationSchedule.map((schedule) => (
                <CustomCard 
                  key={schedule.id} 
                  className={
                    schedule.status === "overdue" 
                      ? "hover:border-red-300 border-red-200" 
                      : "hover:border-farm-accent/30"
                  }
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <Syringe className="h-4 w-4" />
                          <h3 className="font-semibold">{schedule.vaccineName}</h3>
                          {schedule.status === "overdue" && (
                            <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">
                              Overdue
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Due: {new Date(schedule.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap justify-between pt-3 border-t mt-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Animals to Vaccinate</p>
                        <p className="font-medium">{schedule.animalCount} animals</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {schedule.animalIds.map((id) => (
                            <span key={id} className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700">
                              {id}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="text-xs">Reschedule</Button>
                        <Button size="sm" className="text-xs">Mark Complete</Button>
                      </div>
                    </div>
                  </div>
                </CustomCard>
              ))}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Health;
