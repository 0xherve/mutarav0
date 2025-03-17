
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

const PageHeader = ({ 
  title, 
  description, 
  action,
  className 
}: PageHeaderProps) => {
  return (
    <div className={cn(
      "flex flex-col sm:flex-row sm:items-center sm:justify-between py-6",
      className
    )}>
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="text-muted-foreground max-w-2xl">
            {description}
          </p>
        )}
      </div>
      
      {action && (
        <div className="mt-4 sm:mt-0">
          {action}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
