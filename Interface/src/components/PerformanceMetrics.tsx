
import { Complaint, Agency } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { differenceInDays } from "date-fns";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";

interface PerformanceMetricsProps {
  complaints: Complaint[];
  agencies: Agency[];
}

const PerformanceMetrics = ({ complaints, agencies }: PerformanceMetricsProps) => {
  // Calculate average resolution time per agency
  const agencyPerformance = agencies.map(agency => {
    const agencyComplaints = complaints.filter(c => c.agencyId === agency.id);
    const resolvedComplaints = agencyComplaints.filter(c => c.status === "resolved");
    
    let avgResolutionTime = 0;
    if (resolvedComplaints.length > 0) {
      avgResolutionTime = resolvedComplaints.reduce((sum, complaint) => {
        const created = new Date(complaint.createdAt);
        const updated = new Date(complaint.updatedAt);
        return sum + differenceInDays(updated, created);
      }, 0) / resolvedComplaints.length;
    }
    
    return {
      name: agency.name,
      avgResolutionTime,
      totalComplaints: agencyComplaints.length,
      resolvedComplaints: resolvedComplaints.length,
      resolutionRate: agencyComplaints.length > 0 
        ? (resolvedComplaints.length / agencyComplaints.length) * 100 
        : 0
    };
  });
  
  // Get complaints over time data
  const complaintsByMonth = complaints.reduce((acc, complaint) => {
    const date = new Date(complaint.createdAt);
    const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
    
    if (!acc[monthYear]) {
      acc[monthYear] = { month: monthYear, count: 0, resolved: 0 };
    }
    
    acc[monthYear].count += 1;
    
    if (complaint.status === "resolved") {
      acc[monthYear].resolved += 1;
    }
    
    return acc;
  }, {} as Record<string, { month: string; count: number; resolved: number }>);
  
  const complaintTrendData = Object.values(complaintsByMonth).sort((a, b) => {
    const [aMonth, aYear] = a.month.split('/').map(Number);
    const [bMonth, bYear] = b.month.split('/').map(Number);
    return aYear === bYear ? aMonth - bMonth : aYear - bYear;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Complaint Trends Over Time</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={complaintTrendData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#8884d8" name="Total Complaints" />
              <Line type="monotone" dataKey="resolved" stroke="#82ca9d" name="Resolved" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Agency Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={agencyPerformance}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="avgResolutionTime" name="Avg. Resolution Time (days)" fill="#8884d8" />
              <Bar yAxisId="right" dataKey="resolutionRate" name="Resolution Rate (%)" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceMetrics;
