
import { ComplaintStatus } from "../types";
import { statusDisplayData } from "../data/mockData";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { Clock, Search, UserCheck, Loader, CheckCircle, Archive, XCircle } from "lucide-react";

interface StatusBadgeProps {
  status: ComplaintStatus;
  showIcon?: boolean;
}

const StatusBadge = ({ status, showIcon = true }: StatusBadgeProps) => {
  const { label } = statusDisplayData[status];
  
  const getStatusIcon = () => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 mr-1" />;
      case "under_review":
        return <Search className="h-4 w-4 mr-1" />;
      case "assigned":
        return <UserCheck className="h-4 w-4 mr-1" />;
      case "in_progress":
        return <Loader className="h-4 w-4 mr-1" />;
      case "resolved":
        return <CheckCircle className="h-4 w-4 mr-1" />;
      case "closed":
        return <Archive className="h-4 w-4 mr-1" />;
      case "rejected":
        return <XCircle className="h-4 w-4 mr-1" />;
    }
  };
  
  // AdminLTE-style color classes
  const getColorClass = (status: ComplaintStatus) => {
    switch (status) {
      case "pending":
        return "bg-[#ffc107] text-[#212529]"; // warning/yellow
      case "under_review":
        return "bg-[#17a2b8] text-white"; // info/cyan
      case "assigned":
        return "bg-[#6c757d] text-white"; // secondary/gray
      case "in_progress":
        return "bg-[#007bff] text-white"; // primary/blue
      case "resolved":
        return "bg-[#28a745] text-white"; // success/green
      case "closed":
        return "bg-[#6c757d] text-white"; // secondary/gray
      case "rejected":
        return "bg-[#dc3545] text-white"; // danger/red
      default:
        return "bg-[#6c757d] text-white"; // secondary/gray
    }
  };

  return (
    <Badge className={cn("font-semibold text-xs px-2 py-1 rounded", getColorClass(status))}>
      {showIcon && getStatusIcon()}
      {label}
    </Badge>
  );
};

export default StatusBadge;
