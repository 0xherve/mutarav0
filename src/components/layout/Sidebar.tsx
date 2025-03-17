
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { 
  ClipboardList, Home, PieChart, ChevronRight, Wheat, 
  Heart, Timer, CreditCard, Sun, Moon, Settings, Menu, X
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Framer motion variants
const sidebarVariants = {
  open: { width: 240, transition: { type: "spring", stiffness: 300, damping: 30 } },
  closed: { width: 70, transition: { type: "spring", stiffness: 300, damping: 30 } },
  mobile: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
  mobileClosed: { x: -320, transition: { type: "spring", stiffness: 300, damping: 30 } }
};

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isCollapsed: boolean;
}

const NavItem = ({ to, icon: Icon, label, isCollapsed }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        cn(
          "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 hover:bg-farm-primary/10 group",
          isActive 
            ? "bg-farm-primary/10 text-farm-primary font-medium" 
            : "text-muted-foreground hover:text-foreground"
        )
      }
    >
      <Icon 
        className={cn(
          "h-5 w-5 flex-shrink-0",
          isActive ? "text-farm-primary" : "text-muted-foreground group-hover:text-foreground" 
        )} 
      />
      
      {!isCollapsed && (
        <span className={cn(
          "transition-opacity duration-200",
          isCollapsed ? "opacity-0" : "opacity-100"
        )}>
          {label}
        </span>
      )}
      
      {isActive && (
        <motion.div 
          className="absolute left-0 w-1 h-5 bg-farm-primary rounded-full"
          layoutId="activeIndicator"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </NavLink>
  );
};

const Sidebar = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) => {
  const isMobile = useIsMobile();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isHovering, setIsHovering] = useState(false);
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // This would actually change the theme in a real implementation
    console.log("Theme changed to:", newTheme);
  };
  
  const navItems = [
    { to: "/", icon: Home, label: "Dashboard" },
    { to: "/livestock", icon: ClipboardList, label: "Livestock" },
    { to: "/health", icon: Heart, label: "Health" },
    { to: "/breeding", icon: Timer, label: "Breeding" },
    { to: "/feeding", icon: Wheat, label: "Feeding" },
    { to: "/finances", icon: CreditCard, label: "Finances" },
    { to: "/analytics", icon: PieChart, label: "Analytics" },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    
      <motion.aside
        className={cn(
          "flex flex-col h-screen fixed top-0 left-0 z-40",
          "bg-white dark:bg-gray-900 border-r shadow-sm",
          "transition-all duration-300 ease-in-out overflow-hidden",
          isMobile ? "w-[240px]" : isOpen ? "w-[240px]" : "w-[70px]"
        )}
        variants={sidebarVariants}
        animate={
          isMobile 
            ? isOpen ? "mobile" : "mobileClosed" 
            : isOpen ? "open" : "closed"
        }
        initial={isMobile ? "mobileClosed" : "open"}
        onMouseEnter={() => !isOpen && !isMobile && setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-farm-primary/20 flex items-center justify-center">
              <span className="text-farm-primary font-bold">M</span>
            </div>
            
            {(isOpen || isHovering) && (
              <motion.span 
                className="ml-3 font-display font-bold text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                Mutara
              </motion.span>
            )}
          </div>
          
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
          
          {!isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(!isOpen)}
              className="hidden lg:flex"
            >
              <ChevronRight className={cn(
                "h-5 w-5 transition-transform",
                isOpen ? "rotate-180" : "rotate-0"
              )} />
            </Button>
          )}
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.label}>
                <NavItem
                  to={item.to}
                  icon={item.icon}
                  label={item.label}
                  isCollapsed={!isOpen && !isHovering}
                />
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme === 'light' ? 
                <Moon className="h-5 w-5" /> : 
                <Sun className="h-5 w-5" />
              }
            </Button>
            
            {(isOpen || isHovering) && (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
              >
                <Settings className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
