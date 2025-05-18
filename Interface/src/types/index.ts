
export type UserRole = 'citizen' | 'agency' | 'admin';

export type ComplaintStatus = 
  | 'pending' 
  | 'under_review' 
  | 'assigned' 
  | 'in_progress'
  | 'resolved'
  | 'closed'
  | 'rejected';

export type ComplaintCategory = 
  | 'roads'
  | 'water'
  | 'electricity'
  | 'sanitation'
  | 'public_safety'
  | 'transportation'
  | 'education'
  | 'healthcare'
  | 'environment'
  | 'other';

export type AgencyType = 
  | 'roads_department'
  | 'water_utility'
  | 'electric_company'
  | 'waste_management'
  | 'police_department'
  | 'transit_authority'
  | 'education_department'
  | 'health_department'
  | 'environmental_agency'
  | 'general_services';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface Citizen extends User {
  role: 'citizen';
  phoneNumber?: string;
  address?: string;
  complaints: Complaint[];
}

export interface Agency extends User {
  role: 'agency';
  type: AgencyType;
  description: string;
  contactPerson: string;
  contactNumber: string;
  assignedComplaints: Complaint[];
}

export interface Admin extends User {
  role: 'admin';
  department: string;
  accessLevel: number;
}

export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: ComplaintCategory;
  status: ComplaintStatus;
  location: string;
  citizenId: string;
  agencyId?: string;
  createdAt: string;
  updatedAt: string;
  attachments?: string[];
  comments: Comment[];
}

export interface Comment {
  id: string;
  complaintId: string;
  userId: string;
  userRole: UserRole;
  text: string;
  createdAt: string;
}

export interface StatusUpdate {
  id: string;
  complaintId: string;
  previousStatus: ComplaintStatus;
  newStatus: ComplaintStatus;
  updatedBy: string;
  updatedByRole: UserRole;
  createdAt: string;
  notes?: string;
}

export interface Dashboard {
  totalComplaints: number;
  resolvedComplaints: number;
  pendingComplaints: number;
  averageResolutionTime: number;
  complaintsByCategory: Record<ComplaintCategory, number>;
  recentComplaints: Complaint[];
}
