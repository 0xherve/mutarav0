
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { FileDown, Printer, Calendar as CalendarIcon, ArrowLeft, Edit } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface LivestockDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  livestock: {
    id: string;
    name: string;
    breed: string;
    gender: string;
    age: string;
    weight: string;
    healthStatus: "healthy" | "attention" | "sick";
    imageUrl?: string;
    purchaseDate?: string;
    purchasePrice?: string;
    birthDate?: string;
    notes?: string;
  } | null;
  onEdit?: (id: string) => void;
}

const healthStatusColors = {
  healthy: "bg-green-100 text-green-800 border-green-200",
  attention: "bg-amber-100 text-amber-800 border-amber-200",
  sick: "bg-red-100 text-red-800 border-red-200"
};

const mockVaccinations = [
  { id: "V001", name: "Bovine Viral Diarrhea", date: "2023-10-15", status: "completed" },
  { id: "V002", name: "Infectious Bovine Rhinotracheitis", date: "2023-12-20", status: "completed" },
  { id: "V003", name: "Foot and Mouth Disease", date: "2024-02-15", status: "upcoming" },
];

const mockHealthRecords = [
  { id: "H001", date: "2023-09-10", issue: "General Checkup", treatment: "Normal vitals, no issues found", vet: "Dr. James Wilson" },
  { id: "H002", date: "2023-11-05", issue: "Mild Cough", treatment: "Prescribed antibiotics for 7 days", vet: "Dr. Sarah Johnson" },
];

const mockFeedingSchedule = [
  { id: "F001", feedType: "Grain Mix", quantity: "5 kg", frequency: "Daily", time: "Morning" },
  { id: "F002", feedType: "Hay", quantity: "10 kg", frequency: "Daily", time: "Evening" },
  { id: "F003", feedType: "Mineral Supplement", quantity: "100 g", frequency: "Weekly", time: "Afternoon" },
];

const LivestockDetailModal = ({ isOpen, onClose, livestock, onEdit }: LivestockDetailModalProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  if (!livestock) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl h-[85vh] flex flex-col overflow-hidden p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between mb-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute left-4 top-4"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <DialogTitle className="text-center flex-1">Livestock Details</DialogTitle>
            
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
              <Button size="sm" variant="outline">
                <FileDown className="mr-2 h-4 w-4" />
                Export PDF
              </Button>
              {onEdit && (
                <Button size="sm" onClick={() => onEdit(livestock.id)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 overflow-y-auto">
          <div className="md:col-span-1">
            <div className="rounded-lg overflow-hidden">
              <img 
                src={livestock.imageUrl || "https://images.unsplash.com/photo-1596733430284-f7437764b1a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                alt={livestock.name} 
                className="w-full h-64 object-cover object-center"
              />
            </div>
            
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{livestock.name}</h2>
                <Badge className={healthStatusColors[livestock.healthStatus]}>
                  {livestock.healthStatus === "healthy" ? "Healthy" : livestock.healthStatus === "attention" ? "Needs Attention" : "Sick"}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">ID</p>
                  <p className="font-medium">{livestock.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Breed</p>
                  <p className="font-medium">{livestock.breed}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Gender</p>
                  <p className="font-medium">{livestock.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Age</p>
                  <p className="font-medium">{livestock.age}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Weight</p>
                  <p className="font-medium">{livestock.weight}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Birth Date</p>
                  <p className="font-medium">{livestock.birthDate || "Not recorded"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Purchase Date</p>
                  <p className="font-medium">{livestock.purchaseDate || "Not recorded"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Purchase Price</p>
                  <p className="font-medium">{livestock.purchasePrice || "Not recorded"}</p>
                </div>
              </div>
              
              {livestock.notes && (
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">Notes</p>
                  <p className="text-sm mt-1">{livestock.notes}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="md:col-span-2">
            <Tabs defaultValue="health" className="w-full">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="health">Health Records</TabsTrigger>
                <TabsTrigger value="feeding">Feeding</TabsTrigger>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
              </TabsList>
              
              <TabsContent value="health" className="space-y-4 mt-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Vaccination History</h3>
                  <div className="relative overflow-x-auto rounded-md border">
                    <table className="w-full text-sm text-left text-gray-500">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3">Vaccine</th>
                          <th scope="col" className="px-6 py-3">Date</th>
                          <th scope="col" className="px-6 py-3">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockVaccinations.map((vaccine) => (
                          <tr key={vaccine.id} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900">{vaccine.name}</td>
                            <td className="px-6 py-4">{new Date(vaccine.date).toLocaleDateString()}</td>
                            <td className="px-6 py-4">
                              <Badge variant="outline" className={
                                vaccine.status === "completed" 
                                  ? "bg-green-100 text-green-800 border-green-200" 
                                  : "bg-blue-100 text-blue-800 border-blue-200"
                              }>
                                {vaccine.status === "completed" ? "Completed" : "Upcoming"}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Medical Records</h3>
                  <div className="relative overflow-x-auto rounded-md border">
                    <table className="w-full text-sm text-left text-gray-500">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3">Date</th>
                          <th scope="col" className="px-6 py-3">Issue</th>
                          <th scope="col" className="px-6 py-3">Treatment</th>
                          <th scope="col" className="px-6 py-3">Veterinarian</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockHealthRecords.map((record) => (
                          <tr key={record.id} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4">{new Date(record.date).toLocaleDateString()}</td>
                            <td className="px-6 py-4 font-medium text-gray-900">{record.issue}</td>
                            <td className="px-6 py-4">{record.treatment}</td>
                            <td className="px-6 py-4">{record.vet}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="feeding" className="space-y-4 mt-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Feeding Schedule</h3>
                  <div className="relative overflow-x-auto rounded-md border">
                    <table className="w-full text-sm text-left text-gray-500">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3">Feed Type</th>
                          <th scope="col" className="px-6 py-3">Quantity</th>
                          <th scope="col" className="px-6 py-3">Frequency</th>
                          <th scope="col" className="px-6 py-3">Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockFeedingSchedule.map((feed) => (
                          <tr key={feed.id} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900">{feed.feedType}</td>
                            <td className="px-6 py-4">{feed.quantity}</td>
                            <td className="px-6 py-4">{feed.frequency}</td>
                            <td className="px-6 py-4">{feed.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Nutrition Analysis</h3>
                  <div className="p-4 rounded-md border bg-gray-50 text-center">
                    <p className="text-muted-foreground">Nutrition analysis will be available in the next update.</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="calendar" className="mt-4">
                <div className="flex flex-col space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Event Calendar</h3>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal mb-4",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    
                    <div className="p-4 rounded-md border">
                      <div className="mb-4">
                        <h4 className="font-medium">Scheduled Events for {date ? format(date, "PPP") : "Today"}</h4>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="p-3 rounded-md border">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">Vaccination</p>
                              <p className="text-sm text-muted-foreground">Foot and Mouth Disease</p>
                            </div>
                            <Badge className="bg-blue-100 text-blue-800 border-blue-200">Upcoming</Badge>
                          </div>
                        </div>
                        
                        <div className="p-3 rounded-md border">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">Weight Check</p>
                              <p className="text-sm text-muted-foreground">Monthly weight recording</p>
                            </div>
                            <Badge className="bg-purple-100 text-purple-800 border-purple-200">Routine</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LivestockDetailModal;
