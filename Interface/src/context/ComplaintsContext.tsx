
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { complaints as mockComplaints, citizens, agencies } from '../data/mockData';
import { Complaint, ComplaintCategory, ComplaintStatus, Comment } from '../types';
import { useAuth } from './AuthContext';
import { toast } from '../components/ui/use-toast';

interface ComplaintsContextType {
  complaints: Complaint[];
  userComplaints: Complaint[];
  addComplaint: (complaint: Omit<Complaint, 'id' | 'citizenId' | 'createdAt' | 'updatedAt' | 'comments'>) => void;
  updateComplaintStatus: (complaintId: string, newStatus: ComplaintStatus, notes?: string) => void;
  assignComplaintToAgency: (complaintId: string, agencyId: string) => void;
  addCommentToComplaint: (complaintId: string, text: string) => void;
  getComplaintById: (id: string) => Complaint | undefined;
  getCitizenComplaints: (citizenId: string) => Complaint[];
  getAgencyComplaints: (agencyId: string) => Complaint[];
}

const ComplaintsContext = createContext<ComplaintsContextType>({
  complaints: [],
  userComplaints: [],
  addComplaint: () => {},
  updateComplaintStatus: () => {},
  assignComplaintToAgency: () => {},
  addCommentToComplaint: () => {},
  getComplaintById: () => undefined,
  getCitizenComplaints: () => [],
  getAgencyComplaints: () => [],
});

export const ComplaintsProvider = ({ children }: { children: ReactNode }) => {
  const [complaints, setComplaints] = useState<Complaint[]>(mockComplaints);
  const { user } = useAuth();
  const [userComplaints, setUserComplaints] = useState<Complaint[]>([]);
  
  // Update userComplaints whenever user or complaints change
  useEffect(() => {
    if (!user) {
      setUserComplaints([]);
      return;
    }
    
    if (user.role === 'citizen') {
      setUserComplaints(complaints.filter(c => c.citizenId === user.id));
    } else if (user.role === 'agency') {
      setUserComplaints(complaints.filter(c => c.agencyId === user.id));
    } else if (user.role === 'admin') {
      setUserComplaints(complaints);
    }
  }, [user, complaints]);
  
  const generateId = () => {
    return `cp${complaints.length + 1}`;
  };
  
  const generateCommentId = () => {
    return `com${Math.floor(Math.random() * 10000)}`;
  };
  
  const addComplaint = (complaint: Omit<Complaint, 'id' | 'citizenId' | 'createdAt' | 'updatedAt' | 'comments'>) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to submit a complaint",
        variant: "destructive",
      });
      return;
    }
    
    const now = new Date().toISOString();
    const newComplaint: Complaint = {
      id: generateId(),
      ...complaint,
      citizenId: user.id,
      createdAt: now,
      updatedAt: now,
      comments: [],
    };
    
    setComplaints([...complaints, newComplaint]);
    
    // Also update the citizen's complaints array
    const updatedCitizens = citizens.map(c => {
      if (c.id === user.id) {
        return {
          ...c,
          complaints: [...c.complaints, newComplaint]
        };
      }
      return c;
    });
    
    toast({
      title: "Complaint submitted",
      description: "Your complaint has been successfully submitted.",
    });
  };
  
  const updateComplaintStatus = (complaintId: string, newStatus: ComplaintStatus, notes?: string) => {
    if (!user) return;
    
    const updatedComplaints = complaints.map(c => {
      if (c.id === complaintId) {
        const now = new Date().toISOString();
        
        // Create a status update comment
        const statusComment: Comment = {
          id: generateCommentId(),
          complaintId: complaintId,
          userId: user.id,
          userRole: user.role,
          text: notes || `Status updated to ${newStatus}`,
          createdAt: now,
        };
        
        return {
          ...c,
          status: newStatus,
          updatedAt: now,
          comments: [...c.comments, statusComment],
        };
      }
      return c;
    });
    
    setComplaints(updatedComplaints);
    
    toast({
      title: "Status updated",
      description: `Complaint status updated to ${newStatus}.`,
    });
  };
  
  const assignComplaintToAgency = (complaintId: string, agencyId: string) => {
    if (!user) return;
    
    const updatedComplaints = complaints.map(c => {
      if (c.id === complaintId) {
        const now = new Date().toISOString();
        
        // Find agency name
        const agency = agencies.find(a => a.id === agencyId);
        
        // Create an assignment comment
        const assignmentComment: Comment = {
          id: generateCommentId(),
          complaintId: complaintId,
          userId: user.id,
          userRole: user.role,
          text: `Complaint assigned to ${agency?.name || 'the agency'}`,
          createdAt: now,
        };
        
        return {
          ...c,
          agencyId: agencyId,
          status: c.status === 'pending' ? 'assigned' : c.status,
          updatedAt: now,
          comments: [...c.comments, assignmentComment],
        };
      }
      return c;
    });
    
    setComplaints(updatedComplaints);
    
    toast({
      title: "Agency assigned",
      description: `Complaint has been assigned to the agency.`,
    });
  };
  
  const addCommentToComplaint = (complaintId: string, text: string) => {
    if (!user || !text.trim()) return;
    
    const newComment: Comment = {
      id: generateCommentId(),
      complaintId: complaintId,
      userId: user.id,
      userRole: user.role,
      text: text,
      createdAt: new Date().toISOString(),
    };
    
    const updatedComplaints = complaints.map(c => {
      if (c.id === complaintId) {
        return {
          ...c,
          comments: [...c.comments, newComment],
          updatedAt: new Date().toISOString(),
        };
      }
      return c;
    });
    
    setComplaints(updatedComplaints);
    
    toast({
      title: "Comment added",
      description: "Your comment has been added to the complaint.",
    });
  };
  
  const getComplaintById = (id: string) => {
    return complaints.find(c => c.id === id);
  };
  
  const getCitizenComplaints = (citizenId: string) => {
    return complaints.filter(c => c.citizenId === citizenId);
  };
  
  const getAgencyComplaints = (agencyId: string) => {
    return complaints.filter(c => c.agencyId === agencyId);
  };
  
  return (
    <ComplaintsContext.Provider
      value={{
        complaints,
        userComplaints,
        addComplaint,
        updateComplaintStatus,
        assignComplaintToAgency,
        addCommentToComplaint,
        getComplaintById,
        getCitizenComplaints,
        getAgencyComplaints,
      }}
    >
      {children}
    </ComplaintsContext.Provider>
  );
};

export const useComplaints = () => useContext(ComplaintsContext);
