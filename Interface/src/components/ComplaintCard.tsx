
import { Complaint } from "../types";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "./ui/card";
import StatusBadge from "./StatusBadge";
import CategoryBadge from "./CategoryBadge";
import { Calendar, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

interface ComplaintCardProps {
  complaint: Complaint;
  showActions?: boolean;
}

const ComplaintCard = ({ complaint, showActions = true }: ComplaintCardProps) => {
  const {
    id,
    title,
    category,
    status,
    location,
    createdAt,
    updatedAt,
    comments,
  } = complaint;
  
  // Format the dates using date-fns
  const createdTimeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  const updatedTimeAgo = formatDistanceToNow(new Date(updatedAt), { addSuffix: true });

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          <StatusBadge status={status} />
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CategoryBadge category={category} />
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{location}</span>
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <Calendar className="h-3 w-3 mr-1" />
          <span>Submitted {createdTimeAgo}</span>
        </div>
        {createdAt !== updatedAt && (
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            <Calendar className="h-3 w-3 mr-1" />
            <span>Updated {updatedTimeAgo}</span>
          </div>
        )}
      </CardContent>
      {showActions && (
        <CardFooter className="pt-2 flex justify-between">
          <div className="text-xs text-muted-foreground">
            {comments.length} {comments.length === 1 ? "comment" : "comments"}
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to={`/complaints/${id}`}>View Details</Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ComplaintCard;
