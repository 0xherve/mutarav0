
import { useState, useEffect } from "react";
import { 
  BarChart3, 
  ClipboardList, 
  Heart, 
  Timer, 
  Wheat, 
  AlertCircle,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import MetricsCard from "./MetricsCard";
import RecentActivity from "./RecentActivity";
import PageHeader from "../common/PageHeader";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import CustomCard from "../ui/CustomCard";
import { fetchTasks, fetchRecentActivities } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const DashboardOverview = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Fetch tasks for the dashboard
  const { data: tasks = [], isLoading: isTasksLoading } = useQuery({
    queryKey: ['dashboardTasks'],
    queryFn: fetchTasks,
    onError: (error) => {
      console.error("Error fetching tasks:", error);
      toast({
        title: "Error",
        description: "Failed to load tasks. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  // Fetch recent activities
  const { data: recentActivities = [], isLoading: isActivitiesLoading } = useQuery({
    queryKey: ['recentActivities'],
    queryFn: () => fetchRecentActivities(5),
    onError: (error) => {
      console.error("Error fetching recent activities:", error);
      toast({
        title: "Error",
        description: "Failed to load recent activities. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  // Calculate task statistics
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.filter(task => !task.completed).length;
  
  // Prepare data for task status chart
  const tasksData = [
    { name: "Pending", value: pendingTasks, color: "#F59E0B" },
    { name: "Completed", value: completedTasks, color: "#10B981" },
  ];
  
  // Prepare data for breed chart (this is still mock data as we don't have real livestock stats yet)
  const breedData = [
    { name: "Angus", value: 35, color: "#3B82F6" },
    { name: "Hereford", value: 25, color: "#10B981" },
    { name: "Holstein", value: 20, color: "#6366F1" },
    { name: "Jersey", value: 15, color: "#F59E0B" },
    { name: "Other", value: 5, color: "#94A3B8" }
  ];
  
  // Navigate to add new livestock
  const handleAddLivestock = () => {
    navigate('/livestock');
  };
  
  // Calculate due today and overdue tasks
  const today = new Date().toISOString().split('T')[0];
  const dueTodayTasks = tasks.filter(t => t.due_date === today && !t.completed).length;
  const overdueTasks = tasks.filter(t => t.due_date < today && !t.completed).length;
  
  // Get next 3 upcoming tasks
  const upcomingTasks = tasks
    .filter(task => !task.completed)
    .sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime())
    .slice(0, 3);

  return (
    <div className="p-6 bg-gray-50/30 min-h-[calc(100vh-4rem)] animate-fade-in">
      <PageHeader
        title="Farm Dashboard"
        description="Monitor your farm's performance and activities"
        action={
          <Button size="sm" className="ml-auto" onClick={handleAddLivestock}>
            <Plus className="mr-2 h-4 w-4" />
            Add Livestock
          </Button>
        }
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <MetricsCard
          title="Total Livestock"
          value={248}
          change={{ value: 5, isPositive: true }}
          icon={ClipboardList}
          color="primary"
        />
        
        <MetricsCard
          title="Health Alerts"
          value={overdueTasks}
          change={{ value: overdueTasks > 0 ? overdueTasks : 0, isPositive: false }}
          icon={Heart}
          color="secondary"
        />
        
        <MetricsCard
          title="Breeding Cycles"
          value={14}
          change={{ value: 2, isPositive: true }}
          icon={Timer}
          color="accent"
        />
        
        <MetricsCard
          title="Feed Cost (Monthly)"
          value="$12,540"
          change={{ value: 3, isPositive: false }}
          icon={Wheat}
          color="muted"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomCard className="p-6">
            <h3 className="font-semibold mb-4">Livestock by Breed</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={breedData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {breedData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CustomCard>
          
          <CustomCard className="p-6">
            <h3 className="font-semibold mb-4">Tasks Status</h3>
            {isTasksLoading ? (
              <div className="h-64 flex items-center justify-center">
                <p className="text-muted-foreground">Loading tasks...</p>
              </div>
            ) : tasks.length === 0 ? (
              <div className="h-64 flex items-center justify-center">
                <p className="text-muted-foreground">No tasks found</p>
              </div>
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={tasksData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {tasksData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </CustomCard>
          
          <CustomCard className="md:col-span-2 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Upcoming Tasks</h3>
              <Button variant="outline" size="sm" onClick={() => navigate('/tasks')}>View All</Button>
            </div>
            
            {isTasksLoading ? (
              <div className="p-4 text-center">
                <p className="text-muted-foreground">Loading tasks...</p>
              </div>
            ) : upcomingTasks.length === 0 ? (
              <div className="p-4 text-center">
                <p className="text-muted-foreground">No upcoming tasks</p>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingTasks.map(task => {
                  // Determine icon and colors based on task category
                  let icon = <AlertCircle className="h-4 w-4 text-amber-600" />;
                  let bgColor = "bg-amber-100";
                  let textColor = "text-amber-600";
                  
                  if (task.category === "feeding") {
                    icon = <Wheat className="h-4 w-4 text-green-600" />;
                    bgColor = "bg-green-100";
                    textColor = "text-green-600";
                  } else if (task.category === "health") {
                    icon = <Heart className="h-4 w-4 text-blue-600" />;
                    bgColor = "bg-blue-100";
                    textColor = "text-blue-600";
                  }
                  
                  // Calculate due date display
                  const today = new Date().toISOString().split('T')[0];
                  let dueDisplay = "";
                  
                  if (task.due_date === today) {
                    dueDisplay = "Today";
                  } else if (task.due_date < today) {
                    dueDisplay = "Overdue";
                  } else {
                    // Calculate days difference
                    const dueDate = new Date(task.due_date);
                    const currentDate = new Date();
                    const diffTime = dueDate.getTime() - currentDate.getTime();
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    
                    if (diffDays === 1) {
                      dueDisplay = "Tomorrow";
                    } else {
                      dueDisplay = `In ${diffDays} days`;
                    }
                  }
                  
                  return (
                    <div key={task.id} className="flex items-start gap-4 p-3 rounded-lg border bg-muted/50">
                      <div className={`rounded-full p-2 ${bgColor}`}>
                        {icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{task.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{dueDisplay}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CustomCard>
        </div>
        
        <RecentActivity activities={recentActivities} className="h-full" isLoading={isActivitiesLoading} />
      </div>
    </div>
  );
};

export default DashboardOverview;
