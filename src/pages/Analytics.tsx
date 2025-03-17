
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileDown, TrendingUp, BarChart3, PieChart, LineChart, Calendar } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import PageHeader from "../components/common/PageHeader";
import CustomCard from "../components/ui/CustomCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { LineChart as RechartsLineChart, Line, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

// Mock data for charts
const milkProductionData = [
  { month: 'Jan', production: 380 },
  { month: 'Feb', production: 400 },
  { month: 'Mar', production: 450 },
  { month: 'Apr', production: 470 },
  { month: 'May', production: 540 },
  { month: 'Jun', production: 580 },
  { month: 'Jul', production: 600 },
  { month: 'Aug', production: 650 },
  { month: 'Sep', production: 700 },
  { month: 'Oct', production: 720 },
  { month: 'Nov', production: 750 },
  { month: 'Dec', production: 800 },
];

const weightGainData = [
  { month: 'Jan', average: 25 },
  { month: 'Feb', average: 30 },
  { month: 'Mar', average: 40 },
  { month: 'Apr', average: 45 },
  { month: 'May', average: 60 },
  { month: 'Jun', average: 70 },
  { month: 'Jul', average: 90 },
  { month: 'Aug', average: 110 },
  { month: 'Sep', average: 125 },
  { month: 'Oct', average: 140 },
  { month: 'Nov', average: 155 },
  { month: 'Dec', average: 180 },
];

const livestockDistributionData = [
  { name: 'Angus', value: 35 },
  { name: 'Hereford', value: 25 },
  { name: 'Holstein', value: 20 },
  { name: 'Jersey', value: 15 },
  { name: 'Other', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Analytics = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { toast } = useToast();
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const handleExportReport = () => {
    toast({
      title: "Export Analytics Report",
      description: "Exporting analytics as PDF.",
    });
  };
  
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 flex flex-col ml-[70px] lg:ml-[240px]">
        <Navbar toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 p-6 bg-gray-50/30 min-h-[calc(100vh-4rem)] animate-fade-in">
          <PageHeader
            title="Farm Analytics"
            description="Comprehensive analytics and performance metrics"
            action={
              <Button size="sm" onClick={handleExportReport}>
                <FileDown className="mr-2 h-4 w-4" />
                Export Report
              </Button>
            }
          />
          
          <Tabs defaultValue="production" className="mt-6">
            <TabsList>
              <TabsTrigger value="production">
                <TrendingUp className="h-4 w-4 mr-2" />
                Production
              </TabsTrigger>
              <TabsTrigger value="livestock">
                <BarChart3 className="h-4 w-4 mr-2" />
                Livestock
              </TabsTrigger>
              <TabsTrigger value="health">
                <LineChart className="h-4 w-4 mr-2" />
                Health
              </TabsTrigger>
              <TabsTrigger value="seasonal">
                <Calendar className="h-4 w-4 mr-2" />
                Seasonal
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="production" className="space-y-6 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <CustomCard className="p-4">
                  <div className="flex flex-col">
                    <p className="text-sm text-muted-foreground">Average Daily Milk</p>
                    <p className="text-2xl font-bold">26.4 Liters</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" /> +5.2% from last month
                    </p>
                  </div>
                </CustomCard>
                
                <CustomCard className="p-4">
                  <div className="flex flex-col">
                    <p className="text-sm text-muted-foreground">Average Weight Gain</p>
                    <p className="text-2xl font-bold">1.2 kg/day</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" /> +3.8% from last month
                    </p>
                  </div>
                </CustomCard>
                
                <CustomCard className="p-4">
                  <div className="flex flex-col">
                    <p className="text-sm text-muted-foreground">Feed Efficiency Ratio</p>
                    <p className="text-2xl font-bold">1:1.8</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" /> +2.1% from last month
                    </p>
                  </div>
                </CustomCard>
              </div>
              
              <CustomCard className="p-6">
                <h3 className="font-semibold mb-4">Milk Production Trend</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart
                      data={milkProductionData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="production" stroke="#8884d8" activeDot={{ r: 8 }} name="Liters" />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </CustomCard>
              
              <CustomCard className="p-6">
                <h3 className="font-semibold mb-4">Average Weight Gain</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={weightGainData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="average" fill="#82ca9d" name="kg" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CustomCard>
            </TabsContent>
            
            <TabsContent value="livestock" className="space-y-6 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <CustomCard className="p-4">
                  <div className="flex flex-col">
                    <p className="text-sm text-muted-foreground">Total Livestock</p>
                    <p className="text-2xl font-bold">126 Animals</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" /> +8 from last month
                    </p>
                  </div>
                </CustomCard>
                
                <CustomCard className="p-4">
                  <div className="flex flex-col">
                    <p className="text-sm text-muted-foreground">Calving Rate</p>
                    <p className="text-2xl font-bold">86%</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" /> +2% from last year
                    </p>
                  </div>
                </CustomCard>
                
                <CustomCard className="p-4">
                  <div className="flex flex-col">
                    <p className="text-sm text-muted-foreground">Mortality Rate</p>
                    <p className="text-2xl font-bold">1.2%</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" transform="rotate(180)" /> -0.3% from last year
                    </p>
                  </div>
                </CustomCard>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CustomCard className="p-6">
                  <h3 className="font-semibold mb-4">Breed Distribution</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={livestockDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {livestockDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CustomCard>
                
                <CustomCard className="p-6">
                  <h3 className="font-semibold mb-4">Age Distribution</h3>
                  <div className="h-80 flex items-center justify-center">
                    <p className="text-muted-foreground">Age distribution chart will be available soon.</p>
                  </div>
                </CustomCard>
              </div>
            </TabsContent>
            
            <TabsContent value="health" className="space-y-6 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <CustomCard className="p-4">
                  <div className="flex flex-col">
                    <p className="text-sm text-muted-foreground">Health Status</p>
                    <p className="text-2xl font-bold">92% Healthy</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" /> +3% from last month
                    </p>
                  </div>
                </CustomCard>
                
                <CustomCard className="p-4">
                  <div className="flex flex-col">
                    <p className="text-sm text-muted-foreground">Vaccination Rate</p>
                    <p className="text-2xl font-bold">98%</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" /> +1% from last quarter
                    </p>
                  </div>
                </CustomCard>
                
                <CustomCard className="p-4">
                  <div className="flex flex-col">
                    <p className="text-sm text-muted-foreground">Treatment Success</p>
                    <p className="text-2xl font-bold">95%</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" /> +2% from last quarter
                    </p>
                  </div>
                </CustomCard>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CustomCard className="p-6">
                  <h3 className="font-semibold mb-4">Disease Incidence</h3>
                  <div className="h-80 flex items-center justify-center">
                    <p className="text-muted-foreground">Disease incidence chart will be available soon.</p>
                  </div>
                </CustomCard>
                
                <CustomCard className="p-6">
                  <h3 className="font-semibold mb-4">Healthcare Costs</h3>
                  <div className="h-80 flex items-center justify-center">
                    <p className="text-muted-foreground">Healthcare costs chart will be available soon.</p>
                  </div>
                </CustomCard>
              </div>
            </TabsContent>
            
            <TabsContent value="seasonal" className="space-y-6 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CustomCard className="p-6">
                  <h3 className="font-semibold mb-4">Seasonal Production Variations</h3>
                  <div className="h-80 flex items-center justify-center">
                    <p className="text-muted-foreground">Seasonal variations chart will be available soon.</p>
                  </div>
                </CustomCard>
                
                <CustomCard className="p-6">
                  <h3 className="font-semibold mb-4">Weather Impact Analysis</h3>
                  <div className="h-80 flex items-center justify-center">
                    <p className="text-muted-foreground">Weather impact analysis will be available soon.</p>
                  </div>
                </CustomCard>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
