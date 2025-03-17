
import { createClient } from '@supabase/supabase-js';

// These values should be replaced with your actual Supabase project details
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database tables
export const TABLES = {
  LIVESTOCK: 'livestock',
  HEALTH_RECORDS: 'health_records',
  VACCINATION_SCHEDULES: 'vaccination_schedules',
  FEEDING_SCHEDULES: 'feeding_schedules',
  FEED_INVENTORY: 'feed_inventory',
  TASKS: 'tasks',
  FINANCIAL_TRANSACTIONS: 'financial_transactions',
};

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

export const fetchTasks = async () => {
  const { data, error } = await supabase.from(TABLES.TASKS).select('*');
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

// Add similar functions for other tables as needed
