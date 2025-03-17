
import { useState } from "react";
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

// Mock data
const recentActivities = [
  {
    id: "1",
    title: "New cattle added",
    description: "Added 5 new Angus heifers to the herd",
    time: "2h ago",
    type: "add" as const
  },
  {
    id: "2",
    title: "Vaccination scheduled",
    description: "10 cattle due for vaccination next week",
    time: "3h ago",
    type: "info" as const
  },
  {
    id: "3",
    title: "Health alert",
    description: "Cow #1042 showing signs of illness",
    time: "5h ago",
    type: "alert" as const
  },
  {
    id: "4",
    title: "Breeding record updated",
    description: "AI performed on 3 cows",
    time: "1d ago",
    type: "update" as const
  }
];

const breedData = [
  { name: "Angus", value: 35, color: "#3B82F6" },
  { name: "Hereford", value: 25, color: "#10B981" },
  { name: "Holstein", value: 20, color: "#6366F1" },
  { name: "Jersey", value: 15, color: "#F59E0B" },
  { name: "Other", value: 5, color: "#94A3B8" }
];

const tasksData = [
  { name: "Pending", value: 12, color: "#F59E0B" },
  { name: "Completed", value: 18, color: "#10B981" },
];

const DashboardOverview = () => {
  return (
    <div className="p-6 bg-gray-50/30 min-h-[calc(100vh-4rem)] animate-fade-in">
      <PageHeader
        title="Farm Dashboard"
        description="Monitor your farm's performance and activities"
        action={
          <Button size="sm" className="ml-auto">
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
          value={3}
          change={{ value: 1, isPositive: false }}
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
          </CustomCard>
          
          <CustomCard className="md:col-span-2 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Upcoming Tasks</h3>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-3 rounded-lg border bg-muted/50">
                <div className="rounded-full p-2 bg-amber-100">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Vaccination Due</h4>
                  <p className="text-sm text-muted-foreground mt-1">10 cattle due for vaccination</p>
                  <p className="text-xs text-muted-foreground mt-1">Due in 3 days</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-3 rounded-lg border bg-muted/50">
                <div className="rounded-full p-2 bg-blue-100">
                  <Heart className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Health Check</h4>
                  <p className="text-sm text-muted-foreground mt-1">Routine health check for breeding stock</p>
                  <p className="text-xs text-muted-foreground mt-1">Tomorrow</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-3 rounded-lg border bg-muted/50">
                <div className="rounded-full p-2 bg-green-100">
                  <Wheat className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Feed Delivery</h4>
                  <p className="text-sm text-muted-foreground mt-1">Scheduled feed delivery</p>
                  <p className="text-xs text-muted-foreground mt-1">Today</p>
                </div>
              </div>
            </div>
          </CustomCard>
        </div>
        
        <RecentActivity activities={recentActivities} className="h-full" />
      </div>
    </div>
  );
};

export default DashboardOverview;
