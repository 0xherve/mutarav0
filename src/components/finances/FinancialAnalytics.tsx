
import { useState, useEffect } from "react";
import { fetchFinancialTransactions } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import {
  BarChart as RechartsBarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import CustomCard from "../ui/CustomCard";
import type { Database } from '@/integrations/supabase/types';

// Define the transaction type from the database
type Transaction = Database['public']['Tables']['financial_transactions']['Row'];

const FinancialAnalytics = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const loadTransactions = async () => {
    setIsLoading(true);
    try {
      const data = await fetchFinancialTransactions();
      setTransactions(data);
    } catch (error) {
      console.error("Error loading transactions:", error);
      toast({
        title: "Error",
        description: "Failed to load financial transactions.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  // Process transactions for monthly chart data
  const getMonthlyChartData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyData = months.map(month => ({ name: month, income: 0, expenses: 0 }));
    
    transactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const month = date.getMonth(); // 0-11
      
      if (transaction.amount > 0) {
        monthlyData[month].income += transaction.amount;
      } else {
        monthlyData[month].expenses += Math.abs(transaction.amount);
      }
    });
    
    return monthlyData;
  };

  // Process transactions for category pie charts
  const getCategoryChartData = (type: 'income' | 'expense') => {
    const categoryTotals: Record<string, number> = {};
    
    transactions.forEach(transaction => {
      const isIncome = transaction.amount > 0;
      if ((type === 'income' && isIncome) || (type === 'expense' && !isIncome)) {
        const category = transaction.category;
        const amount = Math.abs(transaction.amount);
        
        if (categoryTotals[category]) {
          categoryTotals[category] += amount;
        } else {
          categoryTotals[category] = amount;
        }
      }
    });
    
    // Convert to array format for charts
    return Object.entries(categoryTotals).map(([name, value]) => ({ 
      name, 
      value,
      color: getColorForCategory(name, type)
    }));
  };

  // Helper to get colors for categories
  const getColorForCategory = (category: string, type: 'income' | 'expense') => {
    const incomeColors: Record<string, string> = {
      'Sales': '#10B981',
      'Income': '#059669',
      'default': '#0EA5E9'
    };
    
    const expenseColors: Record<string, string> = {
      'Feed': '#F97316',
      'Medical': '#EF4444',
      'Labor': '#8B5CF6',
      'Equipment': '#6366F1',
      'Insurance': '#EC4899',
      'Utilities': '#F59E0B',
      'Other': '#94A3B8',
      'default': '#F43F5E'
    };
    
    const colorMap = type === 'income' ? incomeColors : expenseColors;
    return colorMap[category] || colorMap.default;
  };

  const monthlyData = getMonthlyChartData();
  const incomeByCategory = getCategoryChartData('income');
  const expensesByCategory = getCategoryChartData('expense');

  if (isLoading) {
    return <div className="h-full flex items-center justify-center p-6">Loading financial data...</div>;
  }

  return (
    <div className="space-y-6">
      <CustomCard className="p-6">
        <h3 className="font-semibold mb-4">Monthly Income vs Expenses</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart
              data={monthlyData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#10b981" name="Income" />
              <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </CustomCard>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CustomCard className="p-6">
          <h3 className="font-semibold mb-4">Income by Category</h3>
          <div className="h-64">
            {incomeByCategory.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={incomeByCategory}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {incomeByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-muted-foreground">No income transactions recorded yet.</p>
              </div>
            )}
          </div>
        </CustomCard>
        
        <CustomCard className="p-6">
          <h3 className="font-semibold mb-4">Expense by Category</h3>
          <div className="h-64">
            {expensesByCategory.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expensesByCategory}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {expensesByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-muted-foreground">No expense transactions recorded yet.</p>
              </div>
            )}
          </div>
        </CustomCard>
      </div>
    </div>
  );
};

export default FinancialAnalytics;
