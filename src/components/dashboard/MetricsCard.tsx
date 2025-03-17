
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import CustomCard from "../ui/CustomCard";

interface MetricsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
  };
  icon: LucideIcon;
  color: "primary" | "secondary" | "accent" | "muted";
  className?: string;
}

const colorVariants = {
  primary: {
    bg: "bg-farm-primary/10",
    text: "text-farm-primary",
    border: "border-farm-primary/20"
  },
  secondary: {
    bg: "bg-farm-secondary/10",
    text: "text-farm-secondary",
    border: "border-farm-secondary/20"
  },
  accent: {
    bg: "bg-farm-accent/10",
    text: "text-farm-accent",
    border: "border-farm-accent/20"
  },
  muted: {
    bg: "bg-muted",
    text: "text-muted-foreground",
    border: "border-border"
  }
};

const MetricsCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  color, 
  className 
}: MetricsCardProps) => {
  const colors = colorVariants[color];
  
  return (
    <CustomCard 
      className={cn("overflow-hidden", className)}
      hoverEffect
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              {title}
            </h3>
            <div className="mt-2 flex items-baseline">
              <motion.p 
                className="text-2xl font-semibold"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {value}
              </motion.p>
              
              {change && (
                <span 
                  className={cn(
                    "ml-2 text-sm font-medium",
                    change.isPositive ? "text-green-600" : "text-red-600"
                  )}
                >
                  {change.isPositive ? "+" : ""}{change.value}%
                </span>
              )}
            </div>
          </div>
          
          <div className={cn(
            "rounded-full p-3",
            colors.bg
          )}>
            <Icon className={cn("h-5 w-5", colors.text)} />
          </div>
        </div>
      </div>
      
      <div className={cn(
        "h-1.5",
        colors.bg
      )} />
    </CustomCard>
  );
};

export default MetricsCard;
