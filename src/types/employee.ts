export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away' | 'busy';
  joinDate: string;
  salary: number;
  performance: number;
  leaves: {
    used: number;
    total: number;
  };
  skills: string[];
  phone?: string;
  location?: string;
  manager?: string;
  lastLogin?: string;
}

export interface Department {
  id: string;
  name: string;
  employeeCount: number;
  budget: number;
  head: string;
}

export interface PerformanceMetric {
  id: string;
  employeeId: string;
  quarter: string;
  goals: number;
  achievements: number;
  rating: number;
  feedback?: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'vacation' | 'sick' | 'personal' | 'maternity' | 'paternity';
  startDate: string;
  endDate: string;
  days: number;
  status: 'pending' | 'approved' | 'rejected';
  reason?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'warning' | 'success' | 'important';
  date: string;
  author: string;
  priority: 'low' | 'medium' | 'high';
}