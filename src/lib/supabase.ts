import { createClient } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import { v4 as uuidv4 } from 'uuid';

// Database tables
export const TABLES = {
  LIVESTOCK: 'livestock',
  HEALTH_RECORDS: 'health_records',
  VACCINATION_SCHEDULES: 'vaccination_schedules',
  FEEDING_SCHEDULES: 'feeding_schedules',
  FEED_INVENTORY: 'feed_inventory',
  TASKS: 'tasks',
  FINANCIAL_TRANSACTIONS: 'financial_transactions',
} as const;

// Helper functions for common database operations
export const fetchLivestock = async () => {
  const { data, error } = await supabase.from(TABLES.LIVESTOCK).select('*');
  if (error) {
    console.error('Error fetching livestock:', error);
    throw error;
  }
  return data;
};

export const fetchHealthRecords = async () => {
  const { data, error } = await supabase.from(TABLES.HEALTH_RECORDS).select('*');
  if (error) {
    console.error('Error fetching health records:', error);
    throw error;
  }
  return data;
};

export const fetchVaccinationSchedules = async () => {
  const { data, error } = await supabase.from(TABLES.VACCINATION_SCHEDULES).select('*');
  if (error) {
    console.error('Error fetching vaccination schedules:', error);
    throw error;
  }
  return data;
};

export const fetchFeedingSchedules = async () => {
  const { data, error } = await supabase.from(TABLES.FEEDING_SCHEDULES).select('*');
  if (error) {
    console.error('Error fetching feeding schedules:', error);
    throw error;
  }
  return data;
};

export const fetchFeedInventory = async () => {
  const { data, error } = await supabase.from(TABLES.FEED_INVENTORY).select('*');
  if (error) {
    console.error('Error fetching feed inventory:', error);
    throw error;
  }
  return data;
};

export const fetchTasks = async (dateFilter?: Date) => {
  let query = supabase.from(TABLES.TASKS).select('*');
  
  if (dateFilter) {
    const formattedDate = dateFilter.toISOString().split('T')[0];
    query = query.eq('due_date', formattedDate);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
  return data;
};

export const fetchFinancialTransactions = async () => {
  const { data, error } = await supabase.from(TABLES.FINANCIAL_TRANSACTIONS).select('*');
  if (error) {
    console.error('Error fetching financial transactions:', error);
    throw error;
  }
  return data;
};

// Functions for filtering financial transactions
export const fetchTransactionsByDate = async (startDate: string, endDate: string) => {
  const { data, error } = await supabase
    .from(TABLES.FINANCIAL_TRANSACTIONS)
    .select('*')
    .gte('date', startDate)
    .lte('date', endDate);
  
  if (error) {
    console.error('Error fetching transactions by date range:', error);
    throw error;
  }
  return data;
};

export const fetchTransactionsByCategory = async (category: string) => {
  const { data, error } = await supabase
    .from(TABLES.FINANCIAL_TRANSACTIONS)
    .select('*')
    .eq('category', category);
  
  if (error) {
    console.error('Error fetching transactions by category:', error);
    throw error;
  }
  return data;
};

// Functions for specific database operations
export const addLivestock = async (livestock: any) => {
  const { data, error } = await supabase.from(TABLES.LIVESTOCK).insert([livestock]).select();
  if (error) {
    console.error('Error adding livestock:', error);
    throw error;
  }
  return data[0];
};

export const updateLivestock = async (id: string, updates: any) => {
  const { data, error } = await supabase
    .from(TABLES.LIVESTOCK)
    .update(updates)
    .eq('id', id)
    .select();
  if (error) {
    console.error('Error updating livestock:', error);
    throw error;
  }
  return data[0];
};

export const deleteLivestock = async (id: string) => {
  const { error } = await supabase
    .from(TABLES.LIVESTOCK)
    .delete()
    .eq('id', id);
  if (error) {
    console.error('Error deleting livestock:', error);
    throw error;
  }
  return true;
};

// Task functions
export const toggleTaskCompletion = async (id: string, completed: boolean) => {
  const { data, error } = await supabase
    .from(TABLES.TASKS)
    .update({ completed })
    .eq('id', id)
    .select();
  
  if (error) {
    console.error('Error toggling task completion:', error);
    throw error;
  }
  return data[0];
};

export const addTask = async (task: Database['public']['Tables']['tasks']['Insert']) => {
  // Validate that required fields are provided
  if (!task.id || !task.title || !task.category || !task.priority || !task.due_date) {
    throw new Error('Missing required task fields');
  }
  
  const { data, error } = await supabase
    .from(TABLES.TASKS)
    .insert([task])
    .select();
  
  if (error) {
    console.error('Error adding task:', error);
    throw error;
  }
  return data[0];
};

export const updateTask = async (id: string, updates: Partial<Database['public']['Tables']['tasks']['Update']>) => {
  const { data, error } = await supabase
    .from(TABLES.TASKS)
    .update(updates)
    .eq('id', id)
    .select();
  
  if (error) {
    console.error('Error updating task:', error);
    throw error;
  }
  return data[0];
};

export const deleteTask = async (id: string) => {
  const { error } = await supabase
    .from(TABLES.TASKS)
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
  return true;
};

// Financial transactions functions
export const addFinancialTransaction = async (transaction: Database['public']['Tables']['financial_transactions']['Insert']) => {
  // Validate required fields
  if (!transaction.id || !transaction.description || !transaction.amount === undefined || !transaction.category || !transaction.date || !transaction.status) {
    throw new Error('Missing required transaction fields');
  }
  
  const { data, error } = await supabase
    .from(TABLES.FINANCIAL_TRANSACTIONS)
    .insert([transaction])
    .select();
    
  if (error) {
    console.error('Error adding financial transaction:', error);
    throw error;
  }
  return data[0];
};

export const updateFinancialTransaction = async (id: string, updates: Partial<Database['public']['Tables']['financial_transactions']['Update']>) => {
  const { data, error } = await supabase
    .from(TABLES.FINANCIAL_TRANSACTIONS)
    .update(updates)
    .eq('id', id)
    .select();
    
  if (error) {
    console.error('Error updating financial transaction:', error);
    throw error;
  }
  return data[0];
};

export const deleteFinancialTransaction = async (id: string) => {
  const { error } = await supabase
    .from(TABLES.FINANCIAL_TRANSACTIONS)
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error('Error deleting financial transaction:', error);
    throw error;
  }
  return true;
};

// Function to fetch the recent activities for the dashboard
export const fetchRecentActivities = async (limit = 5) => {
  try {
    // Get recent livestock additions
    const { data: livestockData, error: livestockError } = await supabase
      .from(TABLES.LIVESTOCK)
      .select('id, name, created_at')
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (livestockError) throw livestockError;

    // Get recent health records
    const { data: healthData, error: healthError } = await supabase
      .from(TABLES.HEALTH_RECORDS)
      .select('id, animal_name, type, date')
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (healthError) throw healthError;

    // Get recent tasks
    const { data: tasksData, error: tasksError } = await supabase
      .from(TABLES.TASKS)
      .select('id, title, due_date, priority')
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (tasksError) throw tasksError;
    
    // Get recent financial transactions
    const { data: financialData, error: financialError } = await supabase
      .from(TABLES.FINANCIAL_TRANSACTIONS)
      .select('id, description, amount, date')
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (financialError) throw financialError;
    
    // Format all activities into a single array
    const formattedActivities = [
      ...livestockData.map(item => ({
        id: `livestock-${item.id}`,
        title: `New Livestock Added`,
        description: `${item.name} was added to your livestock`,
        time: new Date(item.created_at).toLocaleString(),
        type: 'add' as const,
      })),
      ...healthData.map(item => ({
        id: `health-${item.id}`,
        title: `Health Record Added`,
        description: `${item.type} record for ${item.animal_name}`,
        time: new Date(item.date).toLocaleString(),
        type: 'info' as const,
      })),
      ...tasksData.map(item => ({
        id: `task-${item.id}`,
        title: `New Task Created`,
        description: `${item.title} (${item.priority} priority)`,
        time: new Date(item.due_date).toLocaleString(),
        type: item.priority === 'high' ? 'alert' as const : 'info' as const,
      })),
      ...financialData.map(item => ({
        id: `finance-${item.id}`,
        title: `Financial Transaction`,
        description: `${item.description}: $${item.amount}`,
        time: new Date(item.date).toLocaleString(),
        type: 'update' as const,
      })),
    ];
    
    // Sort by most recent first and limit to requested amount
    return formattedActivities
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      .slice(0, limit);
  } catch (error) {
    console.error('Error fetching recent activities:', error);
    throw error;
  }
};
