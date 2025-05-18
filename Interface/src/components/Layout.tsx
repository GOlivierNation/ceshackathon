
import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, AlertCircle, MessageSquare, User, Users, Settings, Clock, LogOut } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

const AppSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  
  const getCitizenNavLinks = () => [
    { to: "/dashboard", label: "Dashboard", icon: <Home className="h-5 w-5" /> },
    { to: "/new-complaint", label: "Submit Complaint", icon: <AlertCircle className="h-5 w-5" /> },
    { to: "/my-complaints", label: "My Complaints", icon: <MessageSquare className="h-5 w-5" /> },
    { to: "/profile", label: "My Profile", icon: <User className="h-5 w-5" /> },
  ];
  
  const getAgencyNavLinks = () => [
    { to: "/dashboard", label: "Dashboard", icon: <Home className="h-5 w-5" /> },
    { to: "/complaints", label: "Complaints", icon: <MessageSquare className="h-5 w-5" /> },
    { to: "/profile", label: "Agency Profile", icon: <User className="h-5 w-5" /> },
  ];
  
  const getAdminNavLinks = () => [
    { to: "/admin", label: "Dashboard", icon: <Home className="h-5 w-5" /> },
    { to: "/admin/citizens", label: "Citizens", icon: <User className="h-5 w-5" /> },
    { to: "/admin/agencies", label: "Agencies", icon: <Users className="h-5 w-5" /> },
    { to: "/admin/complaints", label: "Complaints", icon: <MessageSquare className="h-5 w-5" /> },
    { to: "/admin/settings", label: "Settings", icon: <Settings className="h-5 w-5" /> },
  ];
  
  let navLinks: { to: string; label: string; icon: JSX.Element; }[] = [];
  
  if (user?.role === "citizen") {
    navLinks = getCitizenNavLinks();
  } else if (user?.role === "agency") {
    navLinks = getAgencyNavLinks();
  } else if (user?.role === "admin") {
    navLinks = getAdminNavLinks();
  }
  
  return (
    <Sidebar className={cn(collapsed ? "w-16" : "w-64", "transition-all duration-200 bg-sidebar text-sidebar-foreground")}>
      <div className="flex h-16 items-center justify-center border-b border-sidebar-border px-4">
        {!collapsed ? (
          <h2 className="text-lg font-semibold text-sidebar-foreground">Citizen Engage</h2>
        ) : (
          <div className="w-8 h-8 rounded-full bg-sidebar-foreground flex items-center justify-center text-sidebar-background font-bold">
            CE
          </div>
        )}
        <SidebarTrigger className="ml-auto text-sidebar-foreground hover:text-gray-300" />
      </div>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : "text-sidebar-foreground/70 uppercase text-xs font-bold px-4 mt-4"}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navLinks.map((link) => (
                <SidebarMenuItem key={link.to}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 transition-colors",
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        )
                      }
                    >
                      {link.icon}
                      {!collapsed && <span>{link.label}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              
              {/* Logout button */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start px-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    {!collapsed && <span>Logout</span>}
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

const Layout = ({ children }: LayoutProps) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <>{children}</>;
  }
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 bg-[#f4f6f9] overflow-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
