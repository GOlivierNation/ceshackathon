
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Switch } from "../../components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { toast } from "../../components/ui/use-toast";

const Settings = () => {
  const handleSaveGeneral = () => {
    toast({
      title: "Settings saved",
      description: "General system settings have been saved successfully.",
    });
  };
  
  const handleSaveNotifications = () => {
    toast({
      title: "Notification settings saved",
      description: "Email notification settings have been updated.",
    });
  };
  
  const handleSaveCategories = () => {
    toast({
      title: "Category settings saved",
      description: "Complaint categories have been updated.",
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">System Settings</h1>
      
      <Tabs defaultValue="general" className="max-w-3xl">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4 py-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure basic system settings and appearance.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="system-name">System Name</Label>
                <Input id="system-name" defaultValue="Citizen Engagement System" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="admin-email">Admin Email</Label>
                <Input id="admin-email" defaultValue="admin@cityagency.gov" />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="maintenance-mode" />
                <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="public-registration" defaultChecked />
                <Label htmlFor="public-registration">Allow Public Registration</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveGeneral}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4 py-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure email notifications for users and admins.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="notify-new-complaint" defaultChecked />
                <Label htmlFor="notify-new-complaint">
                  Notify admins about new complaints
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="notify-status-change" defaultChecked />
                <Label htmlFor="notify-status-change">
                  Notify citizens when complaint status changes
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="notify-assignment" defaultChecked />
                <Label htmlFor="notify-assignment">
                  Notify agencies when assigned a complaint
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="notify-comment" defaultChecked />
                <Label htmlFor="notify-comment">
                  Notify users when there's a new comment on their complaint
                </Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveNotifications}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="categories" className="space-y-4 py-4">
          <Card>
            <CardHeader>
              <CardTitle>Complaint Categories</CardTitle>
              <CardDescription>
                Manage complaint categories and their assigned agencies.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Available Categories</Label>
                  <div className="border rounded-md p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Roads</div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Water</div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Electricity</div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Sanitation</div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Public Safety</div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                    <Button variant="outline" className="w-full mt-2">+ Add Category</Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveCategories}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
