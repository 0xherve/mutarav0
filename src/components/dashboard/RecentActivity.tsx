
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import CustomCard from "../ui/CustomCard";
import { fetchRecentActivities } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface Activity {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "add" | "update" | "alert" | "info";
}

interface RecentActivityProps {
  className?: string;
  limit?: number;
}

const typeColors = {
  add: "text-green-500",
  update: "text-blue-500",
  alert: "text-red-500",
  info: "text-orange-500"
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};

const RecentActivity = ({ className, limit = 5 }: RecentActivityProps) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadActivities = async () => {
      try {
        setIsLoading(true);
        const data = await fetchRecentActivities(limit);
        setActivities(data);
      } catch (error) {
        console.error("Failed to load recent activities:", error);
        toast({
          title: "Error",
          description: "Failed to load recent activities.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadActivities();
  }, [limit, toast]);

  return (
    <CustomCard className={cn("overflow-hidden", className)}>
      <div className="px-6 py-5 border-b">
        <h3 className="font-semibold">Recent Activity</h3>
      </div>
      
      <div className="p-0">
        {isLoading ? (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">Loading recent activities...</p>
          </div>
        ) : activities.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">No recent activities found</p>
          </div>
        ) : (
          <motion.ul 
            className="divide-y"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {activities.map((activity) => (
              <motion.li 
                key={activity.id}
                className="px-6 py-4 flex items-start gap-4"
                variants={item}
              >
                <div className="flex-shrink-0 mt-1">
                  <Circle 
                    className={cn(
                      "h-2 w-4 fill-current", 
                      typeColors[activity.type]
                    )} 
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">
                      {activity.title}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {activity.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>
    </CustomCard>
  );
};

export default RecentActivity;
