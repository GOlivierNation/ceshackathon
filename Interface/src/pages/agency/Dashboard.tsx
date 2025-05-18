
import { useAuth } from "../../context/AuthContext";
import { useComplaints } from "../../context/ComplaintsContext";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import ComplaintCard from "../../components/ComplaintCard";
import { Link } from "react-router-dom";
import { MessageSquare, Clock, CheckCircle, ArrowUpRight, AlertTriangle } from "lucide-react";
import StatsDashboard from "../../components/StatsDashboard";
import { formatDistanceToNow } from "date-fns";

const AgencyDashboard = () => {
  const { user } = useAuth();
  const { userComplaints } = useComplaints();

  // Urgent complaints (using assigned status as proxy for urgent in this demo)
  const urgentComplaints = userComplaints.filter(c => 
    c.status === "assigned" || c.status === "under_review"
  );

  // Most recent updated complaints
  const recentlyUpdated = [...userComplaints]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Agency Dashboard</h1>
        <p className="text-muted-foreground">Welcome, {user?.name}</p>
      </div>

      {/* Stats Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Complaint Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <StatsDashboard complaints={userComplaints} />
        </CardContent>
      </Card>

      {/* Urgent/New Complaints */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Complaints Requiring Action</h2>
          <Button variant="outline" asChild size="sm">
            <Link to="/complaints">
              View All
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {urgentComplaints.length > 0 ? (
            urgentComplaints.map((complaint) => (
              <ComplaintCard key={complaint.id} complaint={complaint} />
            ))
          ) : (
            <Card className="col-span-3 py-8">
              <CardContent className="text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">All caught up!</h3>
                <p className="text-muted-foreground">
                  There are no new complaints requiring your immediate attention.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Recent Updates */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recently Updated</h2>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {recentlyUpdated.map(complaint => (
                <div key={complaint.id} className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{complaint.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">{complaint.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Updated {formatDistanceToNow(new Date(complaint.updatedAt), { addSuffix: true })}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/complaints/${complaint.id}`}>View</Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgencyDashboard;
