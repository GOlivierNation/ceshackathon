
import { useState } from "react";
import { useComplaints } from "../../context/ComplaintsContext";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import ComplaintCard from "../../components/ComplaintCard";
import { ComplaintStatus, ComplaintCategory } from "../../types";
import { categoryDisplayData, statusDisplayData } from "../../data/mockData";
import { Card, CardContent } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { CheckCircle } from "lucide-react";

const AgencyComplaints = () => {
  const { userComplaints } = useComplaints();
  
  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ComplaintStatus | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<ComplaintCategory | "all">("all");
  
  // Create options for select fields
  const statusOptions = [
    { value: "all", label: "All Statuses" },
    ...Object.entries(statusDisplayData).map(([key, data]) => ({
      value: key,
      label: data.label,
    })),
  ];
  
  const categoryOptions = [
    { value: "all", label: "All Categories" },
    ...Object.entries(categoryDisplayData).map(([key, data]) => ({
      value: key,
      label: data.label,
    })),
  ];
  
  // Filter complaints
  const filteredComplaints = userComplaints.filter((complaint) => {
    // Search query filter
    const matchesSearch =
      searchQuery === "" ||
      complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === "all" || complaint.status === statusFilter;
    
    // Category filter
    const matchesCategory = categoryFilter === "all" || complaint.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });
  
  // Sort by status priority (assigned first, then in_progress, etc.)
  const sortedComplaints = [...filteredComplaints].sort((a, b) => {
    const statusPriority: Record<ComplaintStatus, number> = {
      assigned: 0,
      under_review: 1,
      pending: 2,
      in_progress: 3,
      resolved: 4,
      closed: 5,
      rejected: 6,
    };
    
    // Sort by priority first, then by updated date
    if (statusPriority[a.status] !== statusPriority[b.status]) {
      return statusPriority[a.status] - statusPriority[b.status];
    } else {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Complaints</h1>
      
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            placeholder="Search by title, description, or location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="status-filter">Filter by Status</Label>
          <Select 
            value={statusFilter} 
            onValueChange={(value) => setStatusFilter(value as ComplaintStatus | "all")}
          >
            <SelectTrigger id="status-filter" className="mt-1">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="category-filter">Filter by Category</Label>
          <Select 
            value={categoryFilter} 
            onValueChange={(value) => setCategoryFilter(value as ComplaintCategory | "all")}
          >
            <SelectTrigger id="category-filter" className="mt-1">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Results */}
      {sortedComplaints.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedComplaints.map((complaint) => (
            <ComplaintCard key={complaint.id} complaint={complaint} />
          ))}
        </div>
      ) : (
        <Card className="py-8">
          <CardContent className="text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">No complaints found</h3>
            <p className="text-muted-foreground">
              {userComplaints.length === 0
                ? "There are no complaints assigned to your agency yet."
                : "No complaints match your current filters."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AgencyComplaints;
