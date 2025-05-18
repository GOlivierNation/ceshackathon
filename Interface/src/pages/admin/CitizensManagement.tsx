
import { useState } from "react";
import { citizens } from "../../data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { format } from "date-fns";
import { Search, UserPlus, Edit, MessageSquare, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "../../components/ui/use-toast";
import { Citizen } from "../../types";

const CitizensManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCitizen, setSelectedCitizen] = useState<Citizen | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: ""
  });
  
  const filteredCitizens = citizens.filter((citizen) =>
    citizen.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    citizen.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    citizen.phoneNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    citizen.address?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleOpenDialog = (citizen?: Citizen) => {
    if (citizen) {
      setSelectedCitizen(citizen);
      setFormData({
        name: citizen.name,
        email: citizen.email,
        phoneNumber: citizen.phoneNumber || "",
        address: citizen.address || ""
      });
    } else {
      setSelectedCitizen(null);
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        address: ""
      });
    }
    setIsDialogOpen(true);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here we would normally send this to a backend
    // For this demo, we'll just show a toast
    toast({
      title: selectedCitizen ? "Citizen Updated" : "Citizen Created",
      description: `${formData.name} has been ${selectedCitizen ? 'updated' : 'added'} successfully.`,
    });
    
    setIsDialogOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Manage Citizens</h1>
          <p className="text-muted-foreground">View and manage citizen accounts</p>
        </div>
        
        <Button onClick={() => handleOpenDialog()}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Citizen
        </Button>
      </div>
      
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search citizens..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      {/* Citizens List */}
      <Card>
        <CardHeader>
          <CardTitle>Citizens</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Name</th>
                  <th className="text-left py-3 px-4 font-medium">Contact</th>
                  <th className="text-left py-3 px-4 font-medium">Address</th>
                  <th className="text-left py-3 px-4 font-medium">Complaints</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCitizens.map((citizen) => (
                  <tr key={citizen.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium">{citizen.name}</div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{format(new Date(citizen.createdAt), "MMM dd, yyyy")}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="text-sm">{citizen.email}</div>
                        {citizen.phoneNumber && (
                          <div className="text-sm text-muted-foreground">
                            {citizen.phoneNumber}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {citizen.address || "N/A"}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1 text-blue-500" />
                        <span>
                          {citizen.complaints.length}{" "}
                          <Link
                            to={`/admin/complaints?citizenId=${citizen.id}`}
                            className="text-blue-500 hover:underline ml-1"
                          >
                            View
                          </Link>
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="outline" size="sm" onClick={() => handleOpenDialog(citizen)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
                
                {filteredCitizens.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-muted-foreground">
                      No citizens found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* Add/Edit Citizen Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{selectedCitizen ? "Edit Citizen" : "Add New Citizen"}</DialogTitle>
            <DialogDescription>
              {selectedCitizen
                ? "Update the citizen details below."
                : "Fill in the details to add a new citizen account."}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {selectedCitizen ? "Update Citizen" : "Add Citizen"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CitizensManagement;
