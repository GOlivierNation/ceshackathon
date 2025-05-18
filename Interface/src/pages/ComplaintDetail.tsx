
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useComplaints } from "../context/ComplaintsContext";
import { useAuth } from "../context/AuthContext";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import StatusBadge from "../components/StatusBadge";
import CategoryBadge from "../components/CategoryBadge";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { ComplaintStatus } from "../types";
import { statusDisplayData } from "../data/mockData";
import { formatDistanceToNow, format } from "date-fns";
import { Calendar, MapPin, User, MessageCircle } from "lucide-react";

const ComplaintDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getComplaintById, updateComplaintStatus, addCommentToComplaint } = useComplaints();
  const { user } = useAuth();
  
  const complaint = getComplaintById(id || "");
  
  const [newComment, setNewComment] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<ComplaintStatus | "">("");
  const [statusNote, setStatusNote] = useState("");
  
  if (!complaint) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Complaint Not Found</h2>
        <p className="mb-4">The complaint you're looking for doesn't exist or you don't have access to it.</p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }
  
  // Format the dates
  const createdAt = format(new Date(complaint.createdAt), "PPP 'at' p");
  const updatedAt = formatDistanceToNow(new Date(complaint.updatedAt), { addSuffix: true });
  
  // Check if user can update the status
  const canUpdateStatus = user?.role === "agency" || user?.role === "admin";
  
  // Status options for dropdown
  const statusOptions = Object.entries(statusDisplayData).map(([key, data]) => ({
    value: key,
    label: data.label,
  }));
  
  // Handle comment submission
  const handleAddComment = () => {
    if (newComment.trim()) {
      addCommentToComplaint(complaint.id, newComment.trim());
      setNewComment("");
    }
  };
  
  // Handle status update
  const handleStatusUpdate = () => {
    if (selectedStatus && canUpdateStatus) {
      updateComplaintStatus(complaint.id, selectedStatus, statusNote);
      setSelectedStatus("");
      setStatusNote("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
          Back
        </Button>
        <h1 className="text-3xl font-bold">{complaint.title}</h1>
        <div className="flex gap-2 mt-2">
          <StatusBadge status={complaint.status} />
          <CategoryBadge category={complaint.category} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Complaint Details */}
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line">{complaint.description}</p>
              
              <div className="mt-4 flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{complaint.location}</span>
              </div>
            </CardContent>
          </Card>
          
          {/* Comments */}
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Comments & Updates
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {complaint.comments.length === 0 ? (
                <p className="text-muted-foreground">No comments yet.</p>
              ) : (
                <div className="space-y-4">
                  {complaint.comments.map((comment) => (
                    <div key={comment.id} className="pb-4 border-b last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="font-medium capitalize">{comment.userRole}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                      <p>{comment.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col">
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="mb-2"
              />
              <Button 
                onClick={handleAddComment} 
                disabled={!newComment.trim()}
                className="ml-auto"
              >
                Add Comment
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status & Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="block text-sm font-medium mb-1">Current Status</span>
                <StatusBadge status={complaint.status} />
              </div>
              
              <div>
                <span className="block text-sm font-medium mb-1">Submitted</span>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{createdAt}</span>
                </div>
              </div>
              
              <div>
                <span className="block text-sm font-medium mb-1">Last Updated</span>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{updatedAt}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Update Status (for agency or admin) */}
          {canUpdateStatus && (
            <Card>
              <CardHeader>
                <CardTitle>Update Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">New Status</label>
                  <Select 
                    value={selectedStatus} 
                    onValueChange={(value) => setSelectedStatus(value as ComplaintStatus)}
                  >
                    <SelectTrigger>
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
                  <label className="text-sm font-medium mb-1 block">Status Note (optional)</label>
                  <Textarea
                    placeholder="Add a note about this status change..."
                    value={statusNote}
                    onChange={(e) => setStatusNote(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleStatusUpdate} 
                  disabled={!selectedStatus}
                  className="w-full"
                >
                  Update Status
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetail;
