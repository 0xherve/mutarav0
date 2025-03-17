
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomCard from "../ui/CustomCard";

// Mock data for breed distribution
const breedData = [
  { name: "Angus", value: 35, color: "#3B82F6" },
  { name: "Hereford", value: 25, color: "#10B981" },
  { name: "Holstein", value: 20, color: "#6366F1" },
  { name: "Jersey", value: 15, color: "#F59E0B" },
  { name: "Other", value: 5, color: "#94A3B8" }
];

// Mock data for weight distribution
const weightData = [
  { name: "200-400kg", count: 12 },
  { name: "401-600kg", count: 18 },
  { name: "601-800kg", count: 8 },
  { name: "801-1000kg", count: 4 },
  { name: "1000kg+", count: 2 }
];

// Mock data for age distribution
const ageData = [
  { name: "<1 year", count: 10 },
  { name: "1-2 years", count: 15 },
  { name: "3-4 years", count: 13 },
  { name: "5-6 years", count: 7 },
  { name: "7+ years", count: 3 }
];

// Mock data for health status
const healthData = [
  { name: "Healthy", value: 85, color: "#10B981" },
  { name: "Needs Attention", value: 10, color: "#F59E0B" },
  { name: "Sick", value: 5, color: "#EF4444" }
];

const LivestockStats = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Livestock Analytics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CustomCard className="p-6">
          <Tabs defaultValue="breed">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Livestock Distribution</h3>
              <TabsList>
                <TabsTrigger value="breed">Breed</TabsTrigger>
                <TabsTrigger value="health">Health</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="breed" className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={breedData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {breedData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                </PieChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="health" className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={healthData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {healthData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                </PieChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CustomCard>
        
        <CustomCard className="p-6">
          <Tabs defaultValue="weight">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Livestock Metrics</h3>
              <TabsList>
                <TabsTrigger value="weight">Weight</TabsTrigger>
                <TabsTrigger value="age">Age</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="weight" className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weightData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3B82F6" name="Count" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="age" className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#10B981" name="Count" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CustomCard>
      </div>
    </div>
  );
};

export default LivestockStats;
