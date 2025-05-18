
import { useState } from "react";
import { useComplaints } from "../../context/ComplaintsContext";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import ComplaintCard from "../../components/ComplaintCard";
import { ComplaintStatus, ComplaintCategory } from "../../types";
import { categoryDisplayData, statusDisplayData } from "../../data/mockData";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Search, Filter, MessageSquare, CheckCircle, Clock } from "lucide-react";

const MyComplaints = () => {
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
  
  // Sort by most recent first
  const sortedComplaints = [...filteredComplaints].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <div className="animate-fade-in">
      {/* Header with statistics */}
      <div className="bg-white p-6 mb-6 shadow-sm rounded-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Complaints</h1>
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="bg-[#17a2b8] text-white px-4 py-3 rounded-md flex items-center flex-1 min-w-[180px]">
            <div className="mr-3 bg-white/20 p-2 rounded-full">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-bold">{userComplaints.length}</div>
              <div className="text-sm opacity-80">Total Complaints</div>
            </div>
          </div>
          
          <div className="bg-[#28a745] text-white px-4 py-3 rounded-md flex items-center flex-1 min-w-[180px]">
            <div className="mr-3 bg-white/20 p-2 rounded-full">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-bold">
                {userComplaints.filter(c => c.status === "resolved").length}
              </div>
              <div className="text-sm opacity-80">Resolved</div>
            </div>
          </div>
          
          <div className="bg-[#ffc107] text-[#212529] px-4 py-3 rounded-md flex items-center flex-1 min-w-[180px]">
            <div className="mr-3 bg-[#212529]/20 p-2 rounded-full">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-bold">
                {userComplaints.filter(c => c.status === "pending" || c.status === "under_review").length}
              </div>
              <div className="text-sm opacity-80">Pending</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="search" className="mb-2 text-gray-700">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  id="search"
                  placeholder="Search by title, description, or location"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="status-filter" className="mb-2 text-gray-700">Filter by Status</Label>
              <Select 
                value={statusFilter} 
                onValueChange={(value) => setStatusFilter(value as ComplaintStatus | "all")}
              >
                <SelectTrigger id="status-filter">
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
              <Label htmlFor="category-filter" className="mb-2 text-gray-700">Filter by Category</Label>
              <Select 
                value={categoryFilter} 
                onValueChange={(value) => setCategoryFilter(value as ComplaintCategory | "all")}
              >
                <SelectTrigger id="category-filter">
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
        </CardContent>
      </Card>
      
      {/* Results */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" /> 
            Complaints ({sortedComplaints.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {sortedComplaints.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedComplaints.map((complaint) => (
                <ComplaintCard key={complaint.id} complaint={complaint} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-700 mb-2">No complaints found</h3>
              <p className="text-muted-foreground">
                {userComplaints.length === 0
                  ? "You haven't submitted any complaints yet."
                  : "No complaints match your current filters."}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MyComplaints;
