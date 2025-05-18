
import { ComplaintCategory } from "../types";
import { categoryDisplayData } from "../data/mockData";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  category: ComplaintCategory;
}

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  const { label } = categoryDisplayData[category];
  
  // AdminLTE-style color classes
  const getColorClass = (category: ComplaintCategory) => {
    switch (category) {
      case "roads":
        return "bg-[#ffc107] text-[#212529]"; // yellow
      case "water":
        return "bg-[#17a2b8] text-white"; // info/cyan
      case "electricity":
        return "bg-[#dc3545] text-white"; // danger/red
      case "sanitation":
        return "bg-[#28a745] text-white"; // success/green
      case "transportation":
        return "bg-[#6c757d] text-white"; // secondary/gray
      case "public_safety":
        return "bg-[#007bff] text-white"; // primary/blue
      case "education":
        return "bg-[#6c757d] text-white"; // secondary/gray
      case "healthcare":
        return "bg-[#6c757d] text-white"; // secondary/gray
      case "environment":
        return "bg-[#6c757d] text-white"; // secondary/gray
      case "other":
        return "bg-[#6c757d] text-white"; // secondary/gray
      default:
        return "bg-[#6c757d] text-white"; // secondary/gray
    }
  };

  return (
    <Badge className={cn("font-semibold text-xs px-2 py-1 rounded", getColorClass(category))}>
      {label}
    </Badge>
  );
};

export default CategoryBadge;
