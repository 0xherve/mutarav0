
import { Button } from "@/components/ui/button";
import CustomCard from "../ui/CustomCard";
import { 
  ArrowUpRight, 
  Plus, 
  AlertCircle, 
  Info, 
  ArrowRight,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "add" | "update" | "alert" | "info";
}

interface RecentActivityProps {
  activities: ActivityItem[];
  className?: string;
  isLoading?: boolean;
}

const RecentActivity = ({ activities, className, isLoading = false }: RecentActivityProps) => {
  // Helper function to get the right icon based on activity type
  const getActivityIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "add":
        return <Plus className="h-3 w-3" />;
      case "alert":
        return <AlertCircle className="h-3 w-3" />;
      case "info":
        return <Info className="h-3 w-3" />;
      case "update":
        return <ArrowUpRight className="h-3 w-3" />;
    }
  };
  
  // Helper function to get the background color based on activity type
  const getActivityBg = (type: ActivityItem["type"]) => {
    switch (type) {
      case "add":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "alert":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      case "info":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "update":
        return "bg-amber-500/10 text-amber-600 border-amber-500/20";
    }
  };

  return (
    <CustomCard className={cn("p-6", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Recent Activity</h3>
        <Button variant="ghost" size="sm" className="gap-1">
          View All
          <ArrowRight className="h-3 w-3" />
        </Button>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : activities.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No recent activities</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="relative">
              <div className="flex items-start gap-4">
                <div className={cn("rounded-full p-1.5 border", getActivityBg(activity.type))}>
                  {getActivityIcon(activity.type)}
                </div>
                
                <div>
                  <h4 className="text-sm font-medium">{activity.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{activity.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </CustomCard>
  );
};

export default RecentActivity;
