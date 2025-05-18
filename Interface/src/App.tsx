
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ComplaintsProvider } from "./context/ComplaintsContext";
import Layout from "./components/Layout";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Citizen Pages
import CitizenDashboard from "./pages/citizen/Dashboard";
import NewComplaint from "./pages/citizen/NewComplaint";
import MyComplaints from "./pages/citizen/MyComplaints";
import Profile from "./pages/Profile";
import ComplaintDetail from "./pages/ComplaintDetail";

// Agency Pages
import AgencyDashboard from "./pages/agency/Dashboard";
import AgencyComplaints from "./pages/agency/Complaints";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import CitizensManagement from "./pages/admin/CitizensManagement";
import AgenciesManagement from "./pages/admin/AgenciesManagement";
import ComplaintsManagement from "./pages/admin/ComplaintsManagement";
import Settings from "./pages/admin/Settings";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ 
  element, 
  allowedRoles = ["citizen", "agency", "admin"], 
  redirectTo = "/login" 
}) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }
  
  if (user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return element;
};

// Main app component
const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ComplaintsProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Layout>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                
                {/* Citizen & Agency routes */}
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute 
                      element={
                        <DashboardRouter />
                      }
                    />
                  } 
                />
                <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
                <Route path="/complaints/:id" element={<ProtectedRoute element={<ComplaintDetail />} />} />
                
                {/* Citizen-specific routes */}
                <Route 
                  path="/new-complaint" 
                  element={
                    <ProtectedRoute 
                      element={<NewComplaint />}
                      allowedRoles={["citizen"]}
                    />
                  } 
                />
                <Route 
                  path="/my-complaints" 
                  element={
                    <ProtectedRoute 
                      element={<MyComplaints />}
                      allowedRoles={["citizen"]}
                    />
                  } 
                />
                
                {/* Agency-specific routes */}
                <Route 
                  path="/complaints" 
                  element={
                    <ProtectedRoute 
                      element={<AgencyComplaints />}
                      allowedRoles={["agency"]}
                    />
                  } 
                />
                
                {/* Admin routes */}
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute 
                      element={<AdminDashboard />}
                      allowedRoles={["admin"]}
                    />
                  } 
                />
                <Route 
                  path="/admin/citizens" 
                  element={
                    <ProtectedRoute 
                      element={<CitizensManagement />}
                      allowedRoles={["admin"]}
                    />
                  } 
                />
                <Route 
                  path="/admin/agencies" 
                  element={
                    <ProtectedRoute 
                      element={<AgenciesManagement />}
                      allowedRoles={["admin"]}
                    />
                  } 
                />
                <Route 
                  path="/admin/complaints" 
                  element={
                    <ProtectedRoute 
                      element={<ComplaintsManagement />}
                      allowedRoles={["admin"]}
                    />
                  } 
                />
                <Route 
                  path="/admin/settings" 
                  element={
                    <ProtectedRoute 
                      element={<Settings />}
                      allowedRoles={["admin"]}
                    />
                  } 
                />
                
                {/* 404 route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </TooltipProvider>
      </ComplaintsProvider>
    </AuthProvider>
  </QueryClientProvider>
);

// Component to route to the appropriate dashboard based on user role
const DashboardRouter = () => {
  const { user } = useAuth();
  
  if (user?.role === "admin") {
    return <Navigate to="/admin" replace />;
  } else if (user?.role === "agency") {
    return <AgencyDashboard />;
  } else {
    return <CitizenDashboard />;
  }
};

export default App;
