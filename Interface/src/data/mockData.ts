
import { 
  Citizen, 
  Agency, 
  Admin, 
  Complaint, 
  Comment, 
  ComplaintStatus,
  ComplaintCategory, 
  AgencyType
} from '../types';

// Mock Citizens
export const citizens: Citizen[] = [
  {
    id: "c1",
    name: "John Smith",
    email: "john@example.com",
    role: "citizen",
    phoneNumber: "555-1234",
    address: "123 Main St",
    createdAt: "2023-01-15T08:30:00Z",
    complaints: []
  },
  {
    id: "c2",
    name: "Sara Johnson",
    email: "sara@example.com",
    role: "citizen",
    phoneNumber: "555-5678",
    address: "456 Oak Ave",
    createdAt: "2023-02-20T14:45:00Z",
    complaints: []
  },
  {
    id: "c3",
    name: "Miguel Rodriguez",
    email: "miguel@example.com",
    role: "citizen",
    phoneNumber: "555-9012",
    address: "789 Pine St",
    createdAt: "2023-03-10T11:15:00Z",
    complaints: []
  }
];

// Mock Agencies
export const agencies: Agency[] = [
  {
    id: "a1",
    name: "City Roads Department",
    email: "roads@cityagency.gov",
    role: "agency",
    type: "roads_department",
    description: "Responsible for road maintenance and infrastructure",
    contactPerson: "Robert Chen",
    contactNumber: "555-3000",
    createdAt: "2022-12-01T09:00:00Z",
    assignedComplaints: []
  },
  {
    id: "a2",
    name: "Water Utility Services",
    email: "water@cityagency.gov",
    role: "agency",
    type: "water_utility",
    description: "Manages water supply and sewage systems",
    contactPerson: "Lisa Wong",
    contactNumber: "555-4000",
    createdAt: "2022-11-15T10:30:00Z",
    assignedComplaints: []
  },
  {
    id: "a3",
    name: "Public Safety Department",
    email: "safety@cityagency.gov",
    role: "agency",
    type: "police_department",
    description: "Manages public safety and security concerns",
    contactPerson: "James Wilson",
    contactNumber: "555-5000",
    createdAt: "2023-01-05T08:15:00Z",
    assignedComplaints: []
  }
];

// Mock Admins
export const admins: Admin[] = [
  {
    id: "adm1",
    name: "Admin User",
    email: "admin@cityagency.gov",
    role: "admin",
    department: "System Administration",
    accessLevel: 10,
    createdAt: "2022-10-01T08:00:00Z"
  }
];

// Mock Comments
export const comments: Comment[] = [
  {
    id: "com1",
    complaintId: "cp1",
    userId: "c1",
    userRole: "citizen",
    text: "It's been a week and the pothole is still there. Can you provide an update?",
    createdAt: "2023-05-10T14:25:00Z"
  },
  {
    id: "com2",
    complaintId: "cp1",
    userId: "a1",
    userRole: "agency",
    text: "Our team has been notified and will address this within the next 48 hours. Thank you for your patience.",
    createdAt: "2023-05-11T09:15:00Z"
  },
  {
    id: "com3",
    complaintId: "cp2",
    userId: "a2",
    userRole: "agency",
    text: "A water utility team has been dispatched to investigate the leak. Please expect a resolution within 24 hours.",
    createdAt: "2023-05-12T10:30:00Z"
  }
];

// Mock Complaints
export const complaints: Complaint[] = [
  {
    id: "cp1",
    title: "Large pothole on Main Street",
    description: "There's a dangerous pothole near the intersection of Main and Oak that's causing traffic issues and could damage vehicles.",
    category: "roads",
    status: "in_progress",
    location: "Main St & Oak Ave intersection",
    citizenId: "c1",
    agencyId: "a1",
    createdAt: "2023-05-05T10:30:00Z",
    updatedAt: "2023-05-11T09:15:00Z",
    attachments: ["pothole_image_1.jpg"],
    comments: [
      {
        id: "com1",
        complaintId: "cp1",
        userId: "c1",
        userRole: "citizen",
        text: "It's been a week and the pothole is still there. Can you provide an update?",
        createdAt: "2023-05-10T14:25:00Z"
      },
      {
        id: "com2",
        complaintId: "cp1",
        userId: "a1",
        userRole: "agency",
        text: "Our team has been notified and will address this within the next 48 hours. Thank you for your patience.",
        createdAt: "2023-05-11T09:15:00Z"
      }
    ]
  },
  {
    id: "cp2",
    title: "Water leak on Pine Street",
    description: "There's water leaking from a pipe on the corner of Pine and Elm streets. It's been ongoing for 2 days.",
    category: "water",
    status: "assigned",
    location: "Pine St & Elm St corner",
    citizenId: "c2",
    agencyId: "a2",
    createdAt: "2023-05-08T15:20:00Z",
    updatedAt: "2023-05-12T10:30:00Z",
    attachments: ["water_leak_1.jpg", "water_leak_2.jpg"],
    comments: [
      {
        id: "com3",
        complaintId: "cp2",
        userId: "a2",
        userRole: "agency",
        text: "A water utility team has been dispatched to investigate the leak. Please expect a resolution within 24 hours.",
        createdAt: "2023-05-12T10:30:00Z"
      }
    ]
  },
  {
    id: "cp3",
    title: "Streetlight outage",
    description: "The streetlights on Cedar Road have been out for several days, creating a safety hazard at night.",
    category: "electricity",
    status: "pending",
    location: "Cedar Rd between 5th and 6th Ave",
    citizenId: "c3",
    createdAt: "2023-05-11T18:45:00Z",
    updatedAt: "2023-05-11T18:45:00Z",
    comments: []
  },
  {
    id: "cp4",
    title: "Garbage not collected",
    description: "Garbage hasn't been collected on Maple Street for two weeks now. The situation is becoming unsanitary.",
    category: "sanitation",
    status: "pending",
    location: "Maple St, 300-400 block",
    citizenId: "c1",
    createdAt: "2023-05-12T09:10:00Z",
    updatedAt: "2023-05-12T09:10:00Z",
    comments: []
  },
  {
    id: "cp5",
    title: "Dangerous intersection",
    description: "The intersection at Washington and Lincoln needs a traffic light. There have been multiple near-accidents.",
    category: "public_safety",
    status: "under_review",
    location: "Washington Ave & Lincoln Blvd intersection",
    citizenId: "c2",
    createdAt: "2023-05-09T11:30:00Z",
    updatedAt: "2023-05-10T14:00:00Z",
    comments: []
  }
];

// Update citizen complaints references
citizens[0].complaints = [complaints[0], complaints[3]];
citizens[1].complaints = [complaints[1], complaints[4]];
citizens[2].complaints = [complaints[2]];

// Update agency assigned complaints
agencies[0].assignedComplaints = [complaints[0]];
agencies[1].assignedComplaints = [complaints[1]];

// Function to get all users (for auth simulation)
export const getAllUsers = () => {
  return [
    ...citizens.map(c => ({ id: c.id, email: c.email, name: c.name, role: c.role, password: 'citizen123' })),
    ...agencies.map(a => ({ id: a.id, email: a.email, name: a.name, role: a.role, password: 'agency123' })),
    ...admins.map(a => ({ id: a.id, email: a.email, name: a.name, role: a.role, password: 'admin123' }))
  ];
};

// Category to agency mapping
export const categoryToAgencyMapping: Record<ComplaintCategory, AgencyType> = {
  roads: 'roads_department',
  water: 'water_utility',
  electricity: 'electric_company',
  sanitation: 'waste_management',
  public_safety: 'police_department',
  transportation: 'transit_authority',
  education: 'education_department',
  healthcare: 'health_department',
  environment: 'environmental_agency',
  other: 'general_services'
};

// Status display data
export interface StatusDisplayData {
  label: string;
  color: string;
  icon: string; // We'll use the name of the icon from lucide-react
}

export const statusDisplayData: Record<ComplaintStatus, StatusDisplayData> = {
  pending: {
    label: 'Pending',
    color: 'bg-yellow-100 text-yellow-800',
    icon: 'clock'
  },
  under_review: {
    label: 'Under Review',
    color: 'bg-blue-100 text-blue-800',
    icon: 'search'
  },
  assigned: {
    label: 'Assigned',
    color: 'bg-purple-100 text-purple-800',
    icon: 'user-check'
  },
  in_progress: {
    label: 'In Progress',
    color: 'bg-orange-100 text-orange-800',
    icon: 'loader'
  },
  resolved: {
    label: 'Resolved',
    color: 'bg-green-100 text-green-800',
    icon: 'check-circle'
  },
  closed: {
    label: 'Closed',
    color: 'bg-gray-100 text-gray-800',
    icon: 'archive'
  },
  rejected: {
    label: 'Rejected',
    color: 'bg-red-100 text-red-800',
    icon: 'x-circle'
  }
};

// Category display data
export interface CategoryDisplayData {
  label: string;
  color: string;
  icon: string;
}

export const categoryDisplayData: Record<ComplaintCategory, CategoryDisplayData> = {
  roads: {
    label: 'Roads',
    color: 'bg-slate-100 text-slate-800',
    icon: 'road'
  },
  water: {
    label: 'Water',
    color: 'bg-blue-100 text-blue-800',
    icon: 'droplet'
  },
  electricity: {
    label: 'Electricity',
    color: 'bg-yellow-100 text-yellow-800',
    icon: 'zap'
  },
  sanitation: {
    label: 'Sanitation',
    color: 'bg-green-100 text-green-800',
    icon: 'trash'
  },
  public_safety: {
    label: 'Public Safety',
    color: 'bg-red-100 text-red-800',
    icon: 'shield'
  },
  transportation: {
    label: 'Transportation',
    color: 'bg-indigo-100 text-indigo-800',
    icon: 'bus'
  },
  education: {
    label: 'Education',
    color: 'bg-purple-100 text-purple-800',
    icon: 'book'
  },
  healthcare: {
    label: 'Healthcare',
    color: 'bg-pink-100 text-pink-800',
    icon: 'activity'
  },
  environment: {
    label: 'Environment',
    color: 'bg-emerald-100 text-emerald-800',
    icon: 'tree'
  },
  other: {
    label: 'Other',
    color: 'bg-gray-100 text-gray-800',
    icon: 'more-horizontal'
  }
};

// Agency display data
export interface AgencyDisplayData {
  label: string;
  color: string;
  icon: string;
}

export const agencyDisplayData: Record<AgencyType, AgencyDisplayData> = {
  roads_department: {
    label: 'Roads Department',
    color: 'bg-slate-100 text-slate-800',
    icon: 'road'
  },
  water_utility: {
    label: 'Water Utility',
    color: 'bg-blue-100 text-blue-800',
    icon: 'droplet'
  },
  electric_company: {
    label: 'Electric Company',
    color: 'bg-yellow-100 text-yellow-800',
    icon: 'zap'
  },
  waste_management: {
    label: 'Waste Management',
    color: 'bg-green-100 text-green-800',
    icon: 'trash'
  },
  police_department: {
    label: 'Police Department',
    color: 'bg-red-100 text-red-800',
    icon: 'shield'
  },
  transit_authority: {
    label: 'Transit Authority',
    color: 'bg-indigo-100 text-indigo-800',
    icon: 'bus'
  },
  education_department: {
    label: 'Education Department',
    color: 'bg-purple-100 text-purple-800',
    icon: 'book'
  },
  health_department: {
    label: 'Health Department',
    color: 'bg-pink-100 text-pink-800',
    icon: 'activity'
  },
  environmental_agency: {
    label: 'Environmental Agency',
    color: 'bg-emerald-100 text-emerald-800',
    icon: 'tree'
  },
  general_services: {
    label: 'General Services',
    color: 'bg-gray-100 text-gray-800',
    icon: 'grid'
  }
};
