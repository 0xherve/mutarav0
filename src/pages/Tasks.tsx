
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Check, Clock, Plus, Tag, Trash } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import PageHeader from "../components/common/PageHeader";
import CustomCard from "../components/ui/CustomCard";

const taskCategories = {
  "feeding": { name: "Feeding", color: "bg-amber-100 text-amber-800 border-amber-200" },
  "health": { name: "Health", color: "bg-red-100 text-red-800 border-red-200" },
  "breeding": { name: "Breeding", color: "bg-purple-100 text-purple-800 border-purple-200" },
  "general": { name: "General", color: "bg-blue-100 text-blue-800 border-blue-200" }
};

const mockTasks = [
  {
    id: "T001",
    title: "Feed new calves",
    description: "Special nutrition mix for the new calves",
    category: "feeding",
    dueDate: "2023-11-15",
    completed: false,
    priority: "high"
  },
  {
    id: "T002",
    title: "Vaccination for herd",
    description: "Annual vaccination for the entire herd",
    category: "health",
    dueDate: "2023-11-20",
    completed: false,
    priority: "high"
  },
  {
    id: "T003",
    title: "Monitor heat cycles",
    description: "Check for signs of heat in breeding stock",
    category: "breeding",
    dueDate: "2023-11-10",
    completed: false,
    priority: "medium"
  },
  {
    id: "T004",
    title: "Repair north fence",
    description: "Fix the damaged section of the north pasture fence",
    category: "general",
    dueDate: "2023-11-25",
    completed: false,
    priority: "medium"
  },
  {
    id: "T005",
    title: "Schedule vet visit",
    description: "Routine checkup for pregnant cows",
    category: "health",
    dueDate: "2023-11-18",
    completed: true,
    priority: "high"
  }
];

const priorityColors = {
  high: "bg-red-50 text-red-700 border-red-100",
  medium: "bg-amber-50 text-amber-700 border-amber-100",
  low: "bg-green-50 text-green-700 border-green-100"
};

interface TaskCardProps {
  task: typeof mockTasks[0];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskCard = ({ task, onToggleComplete, onDelete }: TaskCardProps) => {
  const isPastDue = new Date(task.dueDate) < new Date() && !task.completed;
  const categoryInfo = taskCategories[task.category as keyof typeof taskCategories];
  
  return (
    <CustomCard 
      className={cn(
        "hover:border-farm-primary/30",
        task.completed && "opacity-70"
      )}
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <Button 
              variant="outline" 
              size="icon" 
              className={cn(
                "h-6 w-6 rounded-full",
                task.completed && "bg-green-100 border-green-200"
              )} 
              onClick={() => onToggleComplete(task.id)}
            >
              {task.completed && <Check className="h-3 w-3 text-green-600" />}
            </Button>
            
            <div>
              <h3 className={cn(
                "font-medium",
                task.completed && "line-through text-muted-foreground"
              )}>
                {task.title}
              </h3>
              
              <p className={cn(
                "text-sm text-muted-foreground mt-1",
                task.completed && "line-through"
              )}>
                {task.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-3">
                <span className={`text-xs px-2 py-1 rounded-full border ${categoryInfo.color}`}>
                  {categoryInfo.name}
                </span>
                
                <span className={`text-xs px-2 py-1 rounded-full border ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                </span>
                
                {isPastDue && (
                  <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-800 border border-red-200">
                    Past Due
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex">
            <Button variant="ghost" size="icon" onClick={() => onDelete(task.id)}>
              <Trash className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        </div>
        
        <div className="flex justify-end pt-3 mt-4 border-t">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </CustomCard>
  );
};

const Tasks = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [tasks, setTasks] = useState(mockTasks);
  const [date, setDate] = useState<Date>();
  const [filter, setFilter] = useState("all");
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const handleToggleComplete = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  
  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  
  const filteredTasks = tasks.filter(task => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });
  
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 flex flex-col ml-[70px] lg:ml-[240px]">
        <Navbar toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 p-6 bg-gray-50/30 min-h-[calc(100vh-4rem)] animate-fade-in">
          <PageHeader
            title="Task Management"
            description="Schedule and manage farm tasks"
            action={
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                New Task
              </Button>
            }
          />
          
          <div className="flex flex-col md:flex-row gap-6 mt-6">
            <div className="flex-1 order-2 md:order-1">
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                  <Button 
                    variant={filter === "all" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setFilter("all")}
                  >
                    All
                  </Button>
                  <Button 
                    variant={filter === "pending" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setFilter("pending")}
                  >
                    Pending
                  </Button>
                  <Button 
                    variant={filter === "completed" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setFilter("completed")}
                  >
                    Completed
                  </Button>
                </div>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        "justify-start text-left font-normal",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-4">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map(task => (
                    <TaskCard 
                      key={task.id} 
                      task={task} 
                      onToggleComplete={handleToggleComplete}
                      onDelete={handleDeleteTask}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No tasks found</p>
                    <Button size="sm" className="mt-4">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Task
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="w-full md:w-80 lg:w-96 order-1 md:order-2">
              <CustomCard className="p-6">
                <h3 className="font-semibold mb-4">Task Summary</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Tasks</span>
                    <span className="font-medium">{tasks.length}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Completed</span>
                    <span className="font-medium">{tasks.filter(t => t.completed).length}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Pending</span>
                    <span className="font-medium">{tasks.filter(t => !t.completed).length}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">High Priority</span>
                    <span className="font-medium">{tasks.filter(t => t.priority === "high").length}</span>
                  </div>
                </div>
                
                <div className="h-2 bg-gray-100 rounded-full mt-6 overflow-hidden">
                  <div 
                    className="h-full bg-farm-primary rounded-full"
                    style={{ 
                      width: `${(tasks.filter(t => t.completed).length / tasks.length) * 100}%` 
                    }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  {Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100)}% completed
                </p>
              </CustomCard>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Tasks;
