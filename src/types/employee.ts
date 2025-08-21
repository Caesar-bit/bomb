export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  status: 'online' | 'offline' | 'away' | 'busy';
  joinDate: string;
  salary: number;
  performance: number;
  location?: string;
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
  id: number;
  employeeId: number;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
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