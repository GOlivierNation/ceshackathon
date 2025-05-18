
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useComplaints } from "../../context/ComplaintsContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { ComplaintCategory } from "../../types";
import { categoryDisplayData } from "../../data/mockData";
import { toast } from "../../components/ui/use-toast";
import { AlertCircle } from "lucide-react";

const categoryOptions = Object.entries(categoryDisplayData).map(([key, data]) => ({
  value: key,
  label: data.label,
}));

const NewComplaint = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState<ComplaintCategory | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { addComplaint } = useComplaints();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !location || !category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      addComplaint({
        title,
        description,
        category: category as ComplaintCategory,
        status: "pending",
        location,
        attachments: [],
      });
      
      navigate("/my-complaints");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Submit a New Complaint</h1>
        <p className="text-muted-foreground">
          Fill out the form below to submit your complaint or feedback.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Complaint Details</CardTitle>
          <CardDescription>
            Please provide as much detail as possible to help us address your concern efficiently.
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Brief title of your complaint"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                value={category} 
                onValueChange={(value) => setCategory(value as ComplaintCategory)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
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
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Address or description of the location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Detailed description of your complaint or feedback"
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            
            {/* File upload could be added here */}
            <div className="bg-blue-50 p-4 rounded-md flex">
              <AlertCircle className="text-blue-500 mr-2 h-5 w-5 flex-shrink-0" />
              <div className="text-sm text-blue-700">
                <p className="font-medium">Note</p>
                <p>
                  Your complaint will be reviewed and routed to the appropriate department. 
                  You'll receive updates as your complaint progresses.
                </p>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate(-1)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Complaint"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default NewComplaint;
