
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { toast } from "../components/ui/use-toast";
import { Badge } from "../components/ui/badge";
import { agencyDisplayData } from "../data/mockData";

const Profile = () => {
  const { user } = useAuth();
  
  const [name, setName] = useState(user?.name || "");
  const [phoneNumber, setPhoneNumber] = useState(
    user?.role === "citizen" ? (user as any).phoneNumber || "" : ""
  );
  const [address, setAddress] = useState(
    user?.role === "citizen" ? (user as any).address || "" : ""
  );
  const [contactPerson, setContactPerson] = useState(
    user?.role === "agency" ? (user as any).contactPerson || "" : ""
  );
  const [contactNumber, setContactNumber] = useState(
    user?.role === "agency" ? (user as any).contactNumber || "" : ""
  );
  const [description, setDescription] = useState(
    user?.role === "agency" ? (user as any).description || "" : ""
  );
  
  const handleSave = () => {
    // In a real app, this would update the user info in the database
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your account information.
              </CardDescription>
            </div>
            {user.role === "agency" && (
              <Badge variant="outline" className={agencyDisplayData[(user as any).type].color}>
                {agencyDisplayData[(user as any).type].label}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={user.email} disabled />
              <p className="text-sm text-muted-foreground">
                Email cannot be changed.
              </p>
            </div>
          </div>
          
          {user.role === "citizen" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </>
          )}
          
          {user.role === "agency" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input
                    id="contactPerson"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactNumber">Contact Number</Label>
                  <Input
                    id="contactNumber"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Agency Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="justify-between">
          <Button variant="outline">Reset</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Profile;
