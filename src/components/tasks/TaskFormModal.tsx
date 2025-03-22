
import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Check, X, User, Users } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import type { Database } from "@/integrations/supabase/types";
import { addTask, updateTask, fetchLivestock } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";

type Task = Database['public']['Tables']['tasks']['Row'];
type Livestock = Database['public']['Tables']['livestock']['Row'];

const taskFormSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  description: z.string().optional(),
  category: z.enum(["feeding", "health", "breeding", "general"], {
    message: "Please select a valid category.",
  }),
  due_date: z.date({
    required_error: "A due date is required.",
  }),
  priority: z.enum(["low", "medium", "high"], {
    message: "Please select a priority.",
  }),
  assignee: z.string().optional(),
  animal_id: z.string().optional(),
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  defaultValues?: Partial<Task>;
  isEditing?: boolean;
}

export function TaskFormModal({
  isOpen,
  onClose,
  onSuccess,
  defaultValues,
  isEditing = false,
}: TaskFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [livestock, setLivestock] = useState<Livestock[]>([]);
  const [farmWorkers, setFarmWorkers] = useState<string[]>([
    "John Doe", 
    "Jane Smith", 
    "Robert Johnson", 
    "Maria Garcia", 
    "Ahmed Hassan"
  ]);
  const { toast } = useToast();
  
  // Format the due_date from string to Date if it exists and cast category/priority to allowed types
  const formattedDefaultValues = defaultValues ? {
    ...defaultValues,
    due_date: defaultValues.due_date ? new Date(defaultValues.due_date) : undefined,
    category: defaultValues.category as "feeding" | "health" | "breeding" | "general",
    priority: defaultValues.priority as "low" | "medium" | "high",
  } : undefined;

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: formattedDefaultValues || {
      title: "",
      description: "",
      category: "general",
      priority: "medium",
      assignee: "",
      animal_id: "",
    },
  });

  // Fetch livestock data for task assignment
  useEffect(() => {
    const loadLivestock = async () => {
      try {
        const data = await fetchLivestock();
        setLivestock(data);
      } catch (error) {
        console.error("Error fetching livestock:", error);
        toast({
          title: "Error",
          description: "Failed to load livestock data",
          variant: "destructive"
        });
      }
    };
    
    if (isOpen) {
      loadLivestock();
    }
  }, [isOpen, toast]);

  const onSubmit = async (data: TaskFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Format the date to ISO string (date part only)
      const formattedDate = data.due_date.toISOString().split('T')[0];
      
      if (isEditing && defaultValues?.id) {
        await updateTask(defaultValues.id, {
          ...data,
          due_date: formattedDate,
        });
      } else {
        // Generate a new ID for the task if it's a new task
        // Ensure all required fields have values
        await addTask({
          id: uuidv4(),
          title: data.title,
          description: data.description || "",
          category: data.category,
          priority: data.priority,
          due_date: formattedDate,
          completed: false,
          assignee: data.assignee || null,
          animal_id: data.animal_id || null,
        });
      }
      
      form.reset();
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to save task:", error);
      toast({
        title: "Error",
        description: "Failed to save task. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Task" : "Create New Task"}</DialogTitle>
          <DialogDescription>
            {isEditing 
              ? "Update the details of this task."
              : "Fill out the form below to create a new task."}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter task title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter task description (optional)" 
                      {...field} 
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select 
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="feeding">Feeding</SelectItem>
                        <SelectItem value="health">Health</SelectItem>
                        <SelectItem value="breeding">Breeding</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select 
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="due_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Due Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="assignee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Assignee
                    </FormLabel>
                    <Select 
                      onValueChange={field.onChange}
                      defaultValue={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select person" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="">None</SelectItem>
                        {farmWorkers.map(worker => (
                          <SelectItem key={worker} value={worker}>{worker}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Person responsible for this task
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Conditional field for animal selection, shown only for certain task categories */}
            {(form.watch("category") === "health" || form.watch("category") === "breeding") && (
              <FormField
                control={form.control}
                name="animal_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      Related Animal
                    </FormLabel>
                    <Select 
                      onValueChange={field.onChange}
                      defaultValue={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select animal" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-[200px]">
                        <SelectItem value="">None</SelectItem>
                        {livestock.map(animal => (
                          <SelectItem key={animal.id} value={animal.id}>
                            {animal.name} ({animal.breed})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Animal related to this task (for health or breeding tasks)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                disabled={isSubmitting}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={isSubmitting}
              >
                <Check className="mr-2 h-4 w-4" />
                {isEditing ? "Update" : "Create"} Task
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default TaskFormModal;
