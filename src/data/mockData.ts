import { Employee, Department, LeaveRequest, Announcement } from '../types/employee';

export const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@company.com',
    department: 'Engineering',
    position: 'Senior Developer',
    status: 'online',
    joinDate: '2022-03-15',
    salary: 95000,
    performance: 92,
    leaves: { used: 12, total: 25 },
    skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
    phone: '+1-555-0123',
    location: 'New York, NY',
    manager: 'Sarah Wilson',
    lastLogin: '2024-01-15T09:30:00Z'
  },
  {
    id: '2',
    name: 'Maria Garcia',
    email: 'maria.garcia@company.com',
    department: 'Design',
    position: 'UX Designer',
    status: 'busy',
    joinDate: '2021-08-22',
    salary: 78000,
    performance: 88,
    leaves: { used: 8, total: 25 },
    skills: ['Figma', 'UI/UX', 'Prototyping', 'User Research'],
    phone: '+1-555-0124',
    location: 'San Francisco, CA',
    manager: 'David Chen',
    lastLogin: '2024-01-15T08:45:00Z'
  },
  {
    id: '3',
    name: 'David Chen',
    email: 'david.chen@company.com',
    department: 'Design',
    position: 'Design Director',
    status: 'online',
    joinDate: '2020-01-10',
    salary: 110000,
    performance: 95,
    leaves: { used: 15, total: 30 },
    skills: ['Leadership', 'Design Strategy', 'Figma', 'Adobe CC'],
    phone: '+1-555-0125',
    location: 'San Francisco, CA',
    lastLogin: '2024-01-15T09:15:00Z'
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@company.com',
    department: 'Engineering',
    position: 'Engineering Manager',
    status: 'away',
    joinDate: '2019-05-20',
    salary: 125000,
    performance: 94,
    leaves: { used: 18, total: 30 },
    skills: ['Leadership', 'React', 'System Design', 'Team Management'],
    phone: '+1-555-0126',
    location: 'Austin, TX',
    lastLogin: '2024-01-15T07:30:00Z'
  },
  {
    id: '5',
    name: 'Michael Brown',
    email: 'michael.brown@company.com',
    department: 'Sales',
    position: 'Sales Representative',
    status: 'offline',
    joinDate: '2023-01-15',
    salary: 65000,
    performance: 85,
    leaves: { used: 5, total: 20 },
    skills: ['CRM', 'Cold Calling', 'Lead Generation', 'Salesforce'],
    phone: '+1-555-0127',
    location: 'Chicago, IL',
    manager: 'Lisa Thompson',
    lastLogin: '2024-01-14T17:00:00Z'
  },
  {
    id: '6',
    name: 'Lisa Thompson',
    email: 'lisa.thompson@company.com',
    department: 'Sales',
    position: 'Sales Manager',
    status: 'online',
    joinDate: '2021-09-08',
    salary: 98000,
    performance: 91,
    leaves: { used: 10, total: 25 },
    skills: ['Sales Management', 'CRM', 'Team Building', 'Analytics'],
    phone: '+1-555-0128',
    location: 'Chicago, IL',
    lastLogin: '2024-01-15T09:00:00Z'
  }
];

export const mockDepartments: Department[] = [
  {
    id: '1',
    name: 'Engineering',
    employeeCount: 24,
    budget: 2400000,
    head: 'Sarah Wilson'
  },
  {
    id: '2',
    name: 'Design',
    employeeCount: 8,
    budget: 720000,
    head: 'David Chen'
  },
  {
    id: '3',
    name: 'Sales',
    employeeCount: 12,
    budget: 960000,
    head: 'Lisa Thompson'
  },
  {
    id: '4',
    name: 'Marketing',
    employeeCount: 6,
    budget: 480000,
    head: 'Jennifer Lee'
  },
  {
    id: '5',
    name: 'HR',
    employeeCount: 4,
    budget: 320000,
    head: 'Robert Taylor'
  }
];

export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: '1',
    employeeId: '1',
    employeeName: 'Alex Johnson',
    type: 'vacation',
    startDate: '2024-02-15',
    endDate: '2024-02-20',
    days: 4,
    status: 'pending',
    reason: 'Family vacation'
  },
  {
    id: '2',
    employeeId: '2',
    employeeName: 'Maria Garcia',
    type: 'sick',
    startDate: '2024-01-20',
    endDate: '2024-01-22',
    days: 2,
    status: 'approved',
    reason: 'Medical appointment'
  },
  {
    id: '3',
    employeeId: '5',
    employeeName: 'Michael Brown',
    type: 'personal',
    startDate: '2024-02-01',
    endDate: '2024-02-01',
    days: 1,
    status: 'approved',
    reason: 'Personal matters'
  }
];

export const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Company All-Hands Meeting',
    content: 'Join us for our quarterly all-hands meeting this Friday at 2 PM in the main conference room.',
    type: 'info',
    date: '2024-01-15T10:00:00Z',
    author: 'HR Team',
    priority: 'high'
  },
  {
    id: '2',
    title: 'New Employee Benefits Package',
    content: 'We are excited to announce enhanced benefits including increased health coverage and flexible PTO.',
    type: 'success',
    date: '2024-01-14T14:30:00Z',
    author: 'Benefits Team',
    priority: 'medium'
  },
  {
    id: '3',
    title: 'Office Maintenance Schedule',
    content: 'Please note that the office will undergo maintenance this weekend. Remote work is encouraged.',
    type: 'warning',
    date: '2024-01-13T09:15:00Z',
    author: 'Facilities',
    priority: 'medium'
  }
];