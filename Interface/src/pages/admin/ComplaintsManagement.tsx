
import { useState } from "react";
import { useComplaints } from "../../context/ComplaintsContext";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { ComplaintStatus, ComplaintCategory, Complaint, Agency, AgencyType } from "../../types";
import { categoryDisplayData, statusDisplayData, agencies, complaints, agencyDisplayData } from "../../data/mockData";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import StatusBadge from "../../components/StatusBadge";
import CategoryBadge from "../../components/CategoryBadge";
import { MapPin, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const ComplaintsManagement = () => {
  const { complaints, assignComplaintToAgency } = useComplaints();
  
  // Filters and pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ComplaintStatus | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<ComplaintCategory | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const complaintsPerPage = 10;
  
  // Assignment dialog
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [selectedAgencyId, setSelectedAgencyId] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
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
  const filteredComplaints = complaints.filter((complaint) => {
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
  
  // Sort by most recent
  const sortedComplaints = [...filteredComplaints].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
  
  // Pagination
  const indexOfLastComplaint = currentPage * complaintsPerPage;
  const indexOfFirstComplaint = indexOfLastComplaint - complaintsPerPage;
  const currentComplaints = sortedComplaints.slice(
    indexOfFirstComplaint,
    indexOfLastComplaint
  );
  
  const totalPages = Math.ceil(sortedComplaints.length / complaintsPerPage);
  
  // Get agencies by type (for the assignment dialog)
  const getAgenciesByType = (type: AgencyType): Agency[] => {
    return agencies.filter(agency => agency.type === type);
  };
  
  // Get matching agencies for a complaint
  const getMatchingAgencies = (complaint: Complaint): Agency[] => {
    // In a real app, this would be more sophisticated
    // Here we'll just match by complaint category
    const agencyType = complaint.category === "roads" ? "roads_department" : 
                    complaint.category === "water" ? "water_utility" : 
                    complaint.category === "electricity" ? "electric_company" : 
                    complaint.category === "sanitation" ? "waste_management" : 
                    complaint.category === "public_safety" ? "police_department" : 
                    "general_services";
    
    return getAgenciesByType(agencyType as AgencyType);
  };
  
  // Handle complaint assignment
  const handleAssignComplaint = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setSelectedAgencyId(""); // Reset selection
    setIsDialogOpen(true);
  };
  
  // Submit assignment
  const submitAssignment = () => {
    if (selectedComplaint && selectedAgencyId) {
      assignComplaintToAgency(selectedComplaint.id, selectedAgencyId);
      setIsDialogOpen(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Complaints Management</h1>
      
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
      
      {/* Results Table */}
      <Card>
        <CardHeader>
          <CardTitle>Complaints ({sortedComplaints.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2">ID</th>
                  <th className="text-left py-2 px-2">Title</th>
                  <th className="text-left py-2 px-2">Category</th>
                  <th className="text-left py-2 px-2">Status</th>
                  <th className="text-left py-2 px-2">Location</th>
                  <th className="text-right py-2 px-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentComplaints.map((complaint) => (
                  <tr key={complaint.id} className="border-b hover:bg-muted/50">
                    <td className="py-2 px-2">{complaint.id}</td>
                    <td className="py-2 px-2">{complaint.title}</td>
                    <td className="py-2 px-2">
                      <CategoryBadge category={complaint.category} />
                    </td>
                    <td className="py-2 px-2">
                      <StatusBadge status={complaint.status} />
                    </td>
                    <td className="py-2 px-2 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{complaint.location.substring(0, 20)}...</span>
                      </div>
                    </td>
                    <td className="py-2 px-2 text-right">
                      <div className="flex justify-end gap-2">
                        {!complaint.agencyId && (
                          <Button size="sm" onClick={() => handleAssignComplaint(complaint)}>
                            Assign
                          </Button>
                        )}
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/complaints/${complaint.id}`}>
                            <ArrowUpRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <CardFooter className="justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {indexOfFirstComplaint + 1}-
              {Math.min(indexOfLastComplaint, sortedComplaints.length)} of{" "}
              {sortedComplaints.length} results
            </div>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>
      
      {/* Assignment Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Complaint to Agency</DialogTitle>
            <DialogDescription>
              Select an appropriate agency to handle this complaint.
            </DialogDescription>
          </DialogHeader>
          
          {selectedComplaint && (
            <div className="py-4">
              <h3 className="font-medium">{selectedComplaint.title}</h3>
              <div className="flex gap-2 my-2">
                <CategoryBadge category={selectedComplaint.category} />
                <StatusBadge status={selectedComplaint.status} />
              </div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {selectedComplaint.description}
              </p>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="agency">Select Agency</Label>
                  <Select 
                    value={selectedAgencyId} 
                    onValueChange={setSelectedAgencyId}
                  >
                    <SelectTrigger id="agency" className="mt-1">
                      <SelectValue placeholder="Select an agency" />
                    </SelectTrigger>
                    <SelectContent>
                      {getMatchingAgencies(selectedComplaint).map((agency) => (
                        <SelectItem key={agency.id} value={agency.id}>
                          {agency.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={submitAssignment} disabled={!selectedAgencyId}>
              Assign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ComplaintsManagement;
