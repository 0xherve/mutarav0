
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CustomCardProps {
  children: React.ReactNode;
  className?: string;
  elevation?: "none" | "sm" | "md" | "lg";
  hoverEffect?: boolean;
  onClick?: () => void;
}

const elevationClasses = {
  none: "",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg"
};

const CustomCard = ({ 
  children, 
  className, 
  elevation = "sm",
  hoverEffect = false,
  onClick
}: CustomCardProps) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={cn(
        "rounded-xl bg-card text-card-foreground border",
        "transition-all duration-200",
        elevationClasses[elevation],
        hoverEffect && "hover:shadow-md",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default CustomCard;
