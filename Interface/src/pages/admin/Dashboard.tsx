
import { useAuth } from "../../context/AuthContext";
import { useComplaints } from "../../context/ComplaintsContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { ArrowUpRight, PlusCircle } from "lucide-react";
import StatsDashboard from "../../components/StatsDashboard";
import ComplaintAnalytics from "../../components/ComplaintAnalytics";
import { formatDistanceToNow } from "date-fns";

const AdminDashboard = () => {
  const { user } = useAuth();
  const { complaints } = useComplaints();

  // Get recent complaints (last 5)
  const recentComplaints = [...complaints]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  // Get urgent complaints (those that need assignment)
  const urgentComplaints = complaints.filter(c => !c.agencyId && c.status === "pending");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome, {user?.name}</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/admin/agencies">
              Manage Agencies
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/admin/citizens">
              Manage Citizens
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild>
            <Link to="/admin/complaints">
              Complaints
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>Key metrics for the citizen engagement system</CardDescription>
        </CardHeader>
        <CardContent>
          <StatsDashboard complaints={complaints} showUrgent={true} />
        </CardContent>
      </Card>

      {/* Analytics */}
      <ComplaintAnalytics complaints={complaints} />

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Unassigned Complaints */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl">Unassigned Complaints</CardTitle>
            <Button variant="outline" asChild size="sm">
              <Link to="/admin/complaints">
                View All
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {urgentComplaints.length > 0 ? (
              <div className="space-y-4">
                {urgentComplaints.slice(0, 3).map(complaint => (
                  <div key={complaint.id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">{complaint.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(complaint.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                    <Button size="sm" asChild>
                      <Link to={`/complaints/${complaint.id}`}>Assign</Link>
                    </Button>
                  </div>
                ))}
                {urgentComplaints.length > 3 && (
                  <p className="text-sm text-muted-foreground">
                    {urgentComplaints.length - 3} more complaints need assignment
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No complaints need assignment</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl">Recent Activity</CardTitle>
            <Button variant="outline" asChild size="sm">
              <Link to="/admin/complaints">
                View All
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentComplaints.map(complaint => (
                <div key={complaint.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">{complaint.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(complaint.createdAt), { addSuffix: true })}
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

export default AdminDashboard;
