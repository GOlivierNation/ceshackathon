
import { useAuth } from "../../context/AuthContext";
import { useComplaints } from "../../context/ComplaintsContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import ComplaintCard from "../../components/ComplaintCard";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { MessageSquare, PlusCircle, Clock, CheckCircle, ArrowUpRight } from "lucide-react";

const CitizenDashboard = () => {
  const { user } = useAuth();
  const { userComplaints } = useComplaints();

  // Calculate stats
  const totalComplaints = userComplaints.length;
  const pendingComplaints = userComplaints.filter(
    (c) => ["pending", "assigned", "under_review", "in_progress"].includes(c.status)
  ).length;
  const resolvedComplaints = userComplaints.filter(
    (c) => ["resolved", "closed"].includes(c.status)
  ).length;

  // Get recent complaints (last 3)
  const recentComplaints = [...userComplaints]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
        <Button asChild>
          <Link to="/new-complaint">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Complaint
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-gov-blue" />
              Total Complaints
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalComplaints}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Clock className="mr-2 h-5 w-5 text-amber-500" />
              Pending Complaints
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pendingComplaints}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
              Resolved Complaints
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{resolvedComplaints}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Complaints */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Complaints</h2>
          <Button variant="outline" asChild size="sm">
            <Link to="/my-complaints">
              View All
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentComplaints.length > 0 ? (
            recentComplaints.map((complaint) => (
              <ComplaintCard key={complaint.id} complaint={complaint} />
            ))
          ) : (
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>No Complaints</CardTitle>
                <CardDescription>
                  You haven't submitted any complaints yet.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link to="/new-complaint">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Submit a Complaint
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CitizenDashboard;
