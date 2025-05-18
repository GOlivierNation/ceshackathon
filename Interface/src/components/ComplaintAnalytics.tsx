
import { Complaint, ComplaintCategory, ComplaintStatus } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { categoryDisplayData } from "../data/mockData";

interface ComplaintAnalyticsProps {
  complaints: Complaint[];
}

const ComplaintAnalytics = ({ complaints }: ComplaintAnalyticsProps) => {
  // Calculate category distribution
  const categoryData = Object.entries(
    complaints.reduce((acc, complaint) => {
      acc[complaint.category] = (acc[complaint.category] || 0) + 1;
      return acc;
    }, {} as Record<ComplaintCategory, number>)
  ).map(([category, count]) => ({
    name: categoryDisplayData[category as ComplaintCategory].label,
    value: count,
    color: getCategoryColor(category as ComplaintCategory),
  }));

  // Calculate status distribution
  const statusData = Object.entries(
    complaints.reduce((acc, complaint) => {
      acc[complaint.status] = (acc[complaint.status] || 0) + 1;
      return acc;
    }, {} as Record<ComplaintStatus, number>)
  ).map(([status, count]) => ({
    name: status.replace("_", " ").toUpperCase(),
    value: count,
  }));

  // Calculate average resolution time (in days)
  const resolvedComplaints = complaints.filter((c) => c.status === "resolved");
  const avgResolutionTime = resolvedComplaints.length
    ? resolvedComplaints.reduce((acc, c) => {
        const created = new Date(c.createdAt);
        const updated = new Date(c.updatedAt);
        return acc + (updated.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
      }, 0) / resolvedComplaints.length
    : 0;

  // Colors for pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

  function getCategoryColor(category: ComplaintCategory): string {
    switch (category) {
      case "roads":
        return "#ffc107";
      case "water":
        return "#17a2b8";
      case "electricity":
        return "#dc3545";
      case "sanitation":
        return "#28a745";
      case "public_safety":
        return "#007bff";
      default:
        return "#6c757d";
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Complaints by Category</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Complaints by Status</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={statusData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" name="Count" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Key Metrics</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-md">
            <h3 className="font-semibold text-lg text-blue-700">Average Resolution Time</h3>
            <p className="text-3xl font-bold">{avgResolutionTime.toFixed(1)} days</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-md">
            <h3 className="font-semibold text-lg text-green-700">Resolution Rate</h3>
            <p className="text-3xl font-bold">
              {complaints.length ? ((resolvedComplaints.length / complaints.length) * 100).toFixed(1) : 0}%
            </p>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-md">
            <h3 className="font-semibold text-lg text-amber-700">Pending Issues</h3>
            <p className="text-3xl font-bold">
              {complaints.filter(c => ["pending", "assigned", "under_review", "in_progress"].includes(c.status)).length}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplaintAnalytics;
