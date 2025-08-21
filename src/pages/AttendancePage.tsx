import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Plus,
  Download,
  Filter,
  Users,
  TrendingUp
} from "lucide-react";
import { NewLeaveRequestDialog } from "@/components/ems/NewLeaveRequestDialog";
import { ExportAttendanceReportDialog } from "@/components/ems/ExportAttendanceReportDialog";
import { api } from "@/lib/api";
import { Employee, LeaveRequest } from "@/types/employee";
import { toast } from "@/hooks/use-toast";

const AttendancePage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);

  const loadEmployees = async () => {
    try {
      const data = await api<Employee[]>("/api/employees");
      setEmployees(data);
    } catch (err) {
      toast({
        title: "Failed to load employees",
        description: (err as Error).message,
        variant: "destructive",
      });
    }
  };

  const loadLeaveRequests = async () => {
    try {
      const data = await api<LeaveRequest[]>("/api/leaverequests");
      setLeaveRequests(data);
    } catch (err) {
      toast({
        title: "Failed to load leave requests",
        description: (err as Error).message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    loadEmployees();
    loadLeaveRequests();
  }, []);

  const attendanceStats = {
    totalEmployees: employees.length,
    present: employees.filter(emp => emp.status !== 'offline').length,
    absent: employees.filter(emp => emp.status === 'offline').length,
    onLeave: leaveRequests.length,
    avgWorkHours: 0,
  };

  const getLeaveStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-success border-success/20 bg-success/10';
      case 'pending': return 'text-warning border-warning/20 bg-warning/10';
      case 'rejected': return 'text-destructive border-destructive/20 bg-destructive/10';
      default: return 'text-muted-foreground';
    }
  };

  const getDays = (start: string, end: string) => {
    const ms = new Date(end).getTime() - new Date(start).getTime();
    return Math.ceil(ms / (1000 * 60 * 60 * 24)) + 1;
  };

  const leaveTypeCounts = leaveRequests.reduce((acc, req) => {
    const type = req.reason.split(':')[0];
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const leaveTypeData = Object.entries(leaveTypeCounts).map(([type, count]) => ({
    type,
    count,
    percentage: leaveRequests.length ? (count / leaveRequests.length) * 100 : 0,
  }));

  const avgLeaveDays = leaveRequests.length
    ? leaveRequests.reduce((sum, r) => sum + getDays(r.startDate, r.endDate), 0) / leaveRequests.length
    : 0;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Leave & Attendance</h1>
          <p className="text-muted-foreground">
            Track attendance, manage leave requests, and monitor work hours
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ExportAttendanceReportDialog>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </ExportAttendanceReportDialog>
          <NewLeaveRequestDialog>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Leave Request
            </Button>
          </NewLeaveRequestDialog>
        </div>
      </div>

      {/* Attendance Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceStats.totalEmployees}</div>
            <p className="text-xs text-muted-foreground">Active workforce</p>
          </CardContent>
        </Card>

        <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{attendanceStats.present}</div>
            <p className="text-xs text-success">
              {((attendanceStats.present / attendanceStats.totalEmployees) * 100).toFixed(1)}% attendance
            </p>
          </CardContent>
        </Card>

        <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absent</CardTitle>
            <XCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{attendanceStats.absent}</div>
            <p className="text-xs text-destructive">Unplanned absences</p>
          </CardContent>
        </Card>

        <Card className="animate-fade-in" style={{ animationDelay: '300ms' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Leave</CardTitle>
            <CalendarIcon className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{attendanceStats.onLeave}</div>
            <p className="text-xs text-warning">Approved leaves</p>
          </CardContent>
        </Card>

        <Card className="animate-fade-in" style={{ animationDelay: '400ms' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Work Hours</CardTitle>
            <Clock className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-info">{attendanceStats.avgWorkHours}</div>
            <p className="text-xs text-info">Per day this week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="attendance" className="space-y-6">
        <TabsList>
          <TabsTrigger value="attendance">Daily Attendance</TabsTrigger>
          <TabsTrigger value="leaves">Leave Requests</TabsTrigger>
          <TabsTrigger value="timesheets">Timesheets</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="attendance" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Today's Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employees.map((employee, index) => (
                    <div
                      key={employee.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg animate-slide-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          employee.status === 'online' ? 'bg-success' :
                          employee.status === 'busy' ? 'bg-warning' :
                          employee.status === 'away' ? 'bg-warning' : 'bg-destructive'
                        }`} />
                        <div>
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-sm text-muted-foreground">{employee.department}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {employee.status === 'offline' ? 'Absent' : 
                           employee.lastLogin ? new Date(employee.lastLogin).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 
                           'Present'}
                        </p>
                        <Badge variant="outline" className={
                          employee.status === 'offline' ? 'text-destructive border-destructive/20' : 'text-success border-success/20'
                        }>
                          {employee.status === 'offline' ? 'Absent' : 'Present'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border pointer-events-auto"
                />
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full bg-success" />
                    <span>Full Attendance</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full bg-warning" />
                    <span>Partial Attendance</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full bg-destructive" />
                    <span>Low Attendance</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="leaves" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Leave Requests</CardTitle>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaveRequests.map((request, index) => {
                    const employee = employees.find(e => e.id === request.employeeId);
                    return (
                      <div
                        key={request.id}
                        className="p-4 border border-border rounded-lg space-y-3 animate-fade-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{employee ? employee.name : `Employee ${request.employeeId}`}</p>
                            <p className="text-sm text-muted-foreground">{request.reason}</p>
                          </div>
                          <Badge variant="outline" className={getLeaveStatusColor(request.status.toLowerCase())}>
                            {request.status}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-muted-foreground">
                            {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                          </span>
                          <span className="font-medium">{getDays(request.startDate, request.endDate)} days</span>
                        </div>

                        {request.status.toLowerCase() === 'pending' && (
                          <div className="flex gap-2 pt-2">
                            <Button size="sm" variant="outline" className="text-success border-success/20 hover:bg-success/10">
                              Approve
                            </Button>
                            <Button size="sm" variant="outline" className="text-destructive border-destructive/20 hover:bg-destructive/10">
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Leave Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center p-4 bg-accent/20 rounded-lg">
                    <p className="text-2xl font-bold">{avgLeaveDays.toFixed(1)}</p>
                    <p className="text-sm text-muted-foreground">Average leave days used</p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Leave Types Distribution</h4>
                    {leaveTypeData.map((item, index) => (
                      <div key={item.type} className="space-y-2 animate-slide-in" style={{ animationDelay: `${index * 100}ms` }}>
                        <div className="flex justify-between text-sm">
                          <span>{item.type}</span>
                          <span>{item.count} requests</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full">
                          <div
                            className="h-full bg-primary rounded-full transition-all duration-1000"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timesheets" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Timesheets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {employees.slice(0, 6).map((employee, index) => (
                  <div
                    key={employee.id}
                    className="p-4 border border-border rounded-lg animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium">{employee.name}</p>
                        <p className="text-sm text-muted-foreground">{employee.department}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">40.5h</p>
                        <p className="text-sm text-muted-foreground">This week</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-7 gap-2 text-center text-sm">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, dayIndex) => (
                        <div key={day} className="space-y-1">
                          <p className="text-xs text-muted-foreground">{day}</p>
                          <div className={`p-2 rounded ${dayIndex < 5 ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>
                            {dayIndex < 5 ? '8h' : '0h'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-info" />
                  Attendance Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { month: 'January', attendance: 94, trend: '+2%' },
                    { month: 'December', attendance: 92, trend: '-1%' },
                    { month: 'November', attendance: 93, trend: '+3%' },
                    { month: 'October', attendance: 90, trend: '-2%' }
                  ].map((item, index) => (
                    <div key={item.month} className="flex items-center justify-between animate-slide-in" style={{ animationDelay: `${index * 100}ms` }}>
                      <div>
                        <p className="font-medium">{item.month}</p>
                        <p className="text-sm text-muted-foreground">{item.attendance}% average</p>
                      </div>
                      <Badge variant="outline" className={item.trend.startsWith('+') ? 'text-success border-success/20' : 'text-destructive border-destructive/20'}>
                        {item.trend}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Engineering', 'Design', 'Sales', 'Marketing'].map((dept, index) => {
                    const attendance = Math.floor(Math.random() * 15) + 85; // Random between 85-100
                    return (
                      <div key={dept} className="space-y-2 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{dept}</span>
                          <span>{attendance}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full">
                          <div 
                            className="h-full bg-gradient-to-r from-info to-success rounded-full transition-all duration-1000"
                            style={{ width: `${attendance}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AttendancePage;