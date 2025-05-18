
import { Complaint, ComplaintCategory, ComplaintStatus } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MessageSquare, CheckCircle, Clock, AlertTriangle } from "lucide-react";

interface StatItemProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
}

const StatItem = ({ title, value, icon, color }: StatItemProps) => (
  <div className={`${color} text-white px-4 py-3 rounded-md flex items-center flex-1 min-w-[180px]`}>
    <div className="mr-3 bg-white/20 p-2 rounded-full">
      {icon}
    </div>
    <div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm opacity-80">{title}</div>
    </div>
  </div>
);

interface StatsDashboardProps {
  complaints: Complaint[];
  showUrgent?: boolean;
}

const StatsDashboard = ({ complaints, showUrgent = false }: StatsDashboardProps) => {
  const totalComplaints = complaints.length;
  
  const pendingComplaints = complaints.filter(
    (c) => ["pending", "assigned", "under_review", "in_progress"].includes(c.status)
  ).length;
  
  const resolvedComplaints = complaints.filter(
    (c) => ["resolved", "closed"].includes(c.status)
  ).length;
  
  const urgentComplaints = complaints.filter(
    (c) => c.status === "assigned" || c.status === "under_review"
  ).length;

  const categoryCounts = complaints.reduce((acc, complaint) => {
    acc[complaint.category] = (acc[complaint.category] || 0) + 1;
    return acc;
  }, {} as Record<ComplaintCategory, number>);

  const mostCommonCategory = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || 'other';

  return (
    <div className="flex flex-wrap gap-4 mt-4">
      <StatItem 
        title="Total Complaints" 
        value={totalComplaints} 
        icon={<MessageSquare className="h-6 w-6" />} 
        color="bg-[#17a2b8]" 
      />
      
      <StatItem 
        title="Resolved" 
        value={resolvedComplaints} 
        icon={<CheckCircle className="h-6 w-6" />} 
        color="bg-[#28a745]" 
      />
      
      <StatItem 
        title="Pending" 
        value={pendingComplaints} 
        icon={<Clock className="h-6 w-6" />} 
        color="bg-[#ffc107]" 
      />

      {showUrgent && (
        <StatItem 
          title="Urgent" 
          value={urgentComplaints} 
          icon={<AlertTriangle className="h-6 w-6" />} 
          color="bg-[#dc3545]" 
        />
      )}
    </div>
  );
};

export default StatsDashboard;
