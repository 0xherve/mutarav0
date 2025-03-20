
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, DollarSign, BarChart, PieChart, TrendingUp, Download } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import PageHeader from "../components/common/PageHeader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomCard from "../components/ui/CustomCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchFinancialTransactions } from "@/lib/supabase";
import AddTransactionModal from "@/components/finances/AddTransactionModal";
import type { Database } from '@/integrations/supabase/types';

// Define the transaction type from the database
type Transaction = Database['public']['Tables']['financial_transactions']['Row'];

const Finances = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("transactions");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { toast } = useToast();
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const handleAddTransaction = () => {
    setIsAddModalOpen(true);
  };
  
  const handleExportData = () => {
    toast({
      title: "Export Financial Data",
      description: "Exporting data to CSV/Excel.",
    });
    // For now just download the transactions as a JSON file
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(transactions, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "financial_transactions.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

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

  // Calculate financial summary from actual transactions
  const financialSummary = transactions.reduce((summary, transaction) => {
    const amount = transaction.amount;
    if (amount > 0) {
      summary.totalIncome += amount;
      if (transaction.status === 'pending') {
        summary.pendingIncome += amount;
      }
    } else {
      summary.totalExpenses += Math.abs(amount);
      if (transaction.status === 'pending') {
        summary.pendingExpenses += Math.abs(amount);
      }
    }
    summary.netProfit = summary.totalIncome - summary.totalExpenses;
    return summary;
  }, {
    totalIncome: 0,
    totalExpenses: 0,
    netProfit: 0,
    pendingIncome: 0,
    pendingExpenses: 0
  });

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

  const monthlyData = getMonthlyChartData();
  
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 flex flex-col ml-[70px] lg:ml-[240px]">
        <Navbar toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 p-6 bg-gray-50/30 min-h-[calc(100vh-4rem)] animate-fade-in">
          <PageHeader
            title="Financial Management"
            description="Track income, expenses, and financial performance"
            action={
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleExportData}>
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button size="sm" onClick={handleAddTransaction}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Transaction
                </Button>
              </div>
            }
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 mt-6">
            <CustomCard className="p-4">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Income</p>
                  <p className="text-2xl font-bold text-green-600">${financialSummary.totalIncome.toFixed(2)}</p>
                </div>
              </div>
            </CustomCard>
            
            <CustomCard className="p-4">
              <div className="flex items-center gap-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <TrendingUp className="h-5 w-5 text-red-600 transform rotate-180" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Expenses</p>
                  <p className="text-2xl font-bold text-red-600">${financialSummary.totalExpenses.toFixed(2)}</p>
                </div>
              </div>
            </CustomCard>
            
            <CustomCard className="p-4">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Net Profit</p>
                  <p className="text-2xl font-bold text-blue-600">${financialSummary.netProfit.toFixed(2)}</p>
                </div>
              </div>
            </CustomCard>
          </div>
          
          <Tabs defaultValue="transactions" className="mt-6" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="transactions">
                <DollarSign className="h-4 w-4 mr-2" />
                Transactions
              </TabsTrigger>
              <TabsTrigger value="reports">
                <BarChart className="h-4 w-4 mr-2" />
                Reports
              </TabsTrigger>
            </TabsList>
            
            {activeTab === "transactions" && (
              <div className="flex flex-col md:flex-row gap-4 mb-6 mt-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search transactions..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-3">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="feed">Feed</SelectItem>
                      <SelectItem value="medical">Medical</SelectItem>
                      <SelectItem value="equipment">Equipment</SelectItem>
                      <SelectItem value="labor">Labor</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                    <span className="sr-only">Filter</span>
                  </Button>
                </div>
              </div>
            )}
            
            <TabsContent value="transactions">
              <div className="rounded-md border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-3 px-4 text-left font-medium">Date</th>
                      <th className="py-3 px-4 text-left font-medium">Description</th>
                      <th className="py-3 px-4 text-left font-medium">Category</th>
                      <th className="py-3 px-4 text-left font-medium">Payment Method</th>
                      <th className="py-3 px-4 text-right font-medium">Amount</th>
                      <th className="py-3 px-4 text-left font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan={6} className="py-4 text-center">Loading transactions...</td>
                      </tr>
                    ) : transactions.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-4 text-center">No transactions found. Add your first transaction!</td>
                      </tr>
                    ) : (
                      transactions
                        .filter(transaction => {
                          if (!searchQuery) return true;
                          return (
                            transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            transaction.category.toLowerCase().includes(searchQuery.toLowerCase())
                          );
                        })
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .map((transaction) => (
                          <tr key={transaction.id} className="border-b hover:bg-muted/30">
                            <td className="py-3 px-4">{new Date(transaction.date).toLocaleDateString()}</td>
                            <td className="py-3 px-4">{transaction.description}</td>
                            <td className="py-3 px-4">{transaction.category}</td>
                            <td className="py-3 px-4">{transaction.payment_method || '-'}</td>
                            <td className={`py-3 px-4 text-right font-medium ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                              {transaction.amount < 0 ? '-' : ''}${Math.abs(transaction.amount).toFixed(2)}
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                transaction.status === "completed" 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-yellow-100 text-yellow-800"
                              }`}>
                                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                              </span>
                            </td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="reports">
              <div className="space-y-6 mt-4">
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
                    <div className="h-64 flex items-center justify-center">
                      <p className="text-muted-foreground">Category breakdown will be available soon.</p>
                    </div>
                  </CustomCard>
                  
                  <CustomCard className="p-6">
                    <h3 className="font-semibold mb-4">Expense by Category</h3>
                    <div className="h-64 flex items-center justify-center">
                      <p className="text-muted-foreground">Category breakdown will be available soon.</p>
                    </div>
                  </CustomCard>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
      
      <AddTransactionModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSuccess={loadTransactions}
      />
    </div>
  );
};

export default Finances;
