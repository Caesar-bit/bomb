import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Target, 
  TrendingUp, 
  TrendingDown, 
  Award, 
  Calendar,
  Plus,
  FileText,
  Star,
  Users,
  BarChart3
} from "lucide-react";
import { api } from "@/lib/api";
import { Employee } from "@/types/employee";
import { NewReviewDialog } from "@/components/ems/NewReviewDialog";
import { GenerateReportDialog } from "@/components/ems/GenerateReportDialog";

const PerformancePage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Q1 2024");
  const [employees, setEmployees] = useState<Employee[]>([]);

  const loadEmployees = async () => {
    const data = await api<Employee[]>("/api/employees");
    setEmployees(data);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const topPerformers = [...employees]
    .sort((a, b) => b.performance - a.performance)
    .slice(0, 5);

  const performanceGoals = [
    {
      id: '1',
      title: 'Complete React Training',
      employee: 'Alex Johnson',
      progress: 85,
      deadline: '2024-02-28',
      status: 'on-track'
    },
    {
      id: '2',
      title: 'Lead Team Project',
      employee: 'Sarah Wilson',
      progress: 100,
      deadline: '2024-01-31',
      status: 'completed'
    },
    {
      id: '3',
      title: 'UI/UX Certification',
      employee: 'Maria Garcia',
      progress: 60,
      deadline: '2024-03-15',
      status: 'at-risk'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-success border-success/20 bg-success/10';
      case 'on-track': return 'text-info border-info/20 bg-info/10';
      case 'at-risk': return 'text-warning border-warning/20 bg-warning/10';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Performance Tracking</h1>
          <p className="text-muted-foreground">
            Automated performance reviews and goal tracking system
          </p>
        </div>
        <div className="flex items-center gap-3">
          <GenerateReportDialog>
            <Button variant="outline" className="gap-2">
              <FileText className="h-4 w-4" />
              Generate Report
            </Button>
          </GenerateReportDialog>
          <NewReviewDialog>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Review
            </Button>
          </NewReviewDialog>
        </div>
      </div>

      {/* Performance Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89.2%</div>
            <p className="text-xs text-success">+5.2% from last quarter</p>
          </CardContent>
        </Card>

        <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goals Completed</CardTitle>
            <Target className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-info">+12 this month</p>
          </CardContent>
        </Card>

        <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reviews Pending</CardTitle>
            <Calendar className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-warning">Due this week</p>
          </CardContent>
        </Card>

        <Card className="animate-fade-in" style={{ animationDelay: '300ms' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performers</CardTitle>
            <Award className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-success">Excellent rating</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="goals">Goals & KPIs</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Top Performers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-warning" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformers.map((employee, index) => (
                    <div key={employee.id} className="flex items-center gap-4 animate-slide-in" style={{ animationDelay: `${index * 100}ms` }}>
                      <div className="flex items-center gap-3 flex-1">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10 text-primary font-medium">
                            {employee.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-sm text-muted-foreground">{employee.position}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-success">{employee.performance}%</p>
                        <Badge variant="outline" className="text-xs">
                          {employee.department}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-info" />
                  Performance Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Engineering', 'Design', 'Sales', 'Marketing'].map((dept, index) => {
                    const deptEmployees = employees.filter(emp => emp.department === dept);
                    const avgPerformance = deptEmployees.length
                      ? deptEmployees.reduce((acc, emp) => acc + emp.performance, 0) / deptEmployees.length
                      : 0;

                    return (
                      <div key={dept} className="space-y-2 animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{dept}</span>
                          <span>{avgPerformance.toFixed(1)}%</span>
                        </div>
                        <Progress value={avgPerformance} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-info" />
                  Active Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceGoals.map((goal, index) => (
                    <div key={goal.id} className="space-y-3 p-4 border border-border rounded-lg animate-slide-in" style={{ animationDelay: `${index * 100}ms` }}>
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{goal.title}</h4>
                        <Badge variant="outline" className={getStatusColor(goal.status)}>
                          {goal.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Assigned to: {goal.employee}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Deadline: {new Date(goal.deadline).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Goal Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: 'Skill Development', count: 45, percentage: 68 },
                    { category: 'Project Delivery', count: 32, percentage: 85 },
                    { category: 'Team Leadership', count: 18, percentage: 92 },
                    { category: 'Process Improvement', count: 24, percentage: 75 }
                  ].map((item, index) => (
                    <div key={item.category} className="space-y-2 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{item.category}</span>
                        <span className="text-sm text-muted-foreground">{item.count} goals</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={item.percentage} className="flex-1 h-2" />
                        <span className="text-sm font-medium">{item.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { employee: 'Alex Johnson', type: 'Quarterly Review', date: '2024-02-15', status: 'scheduled' },
                    { employee: 'Maria Garcia', type: 'Annual Review', date: '2024-02-20', status: 'pending' },
                    { employee: 'David Chen', type: 'Mid-year Review', date: '2024-02-25', status: 'in-progress' }
                  ].map((review, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg animate-slide-in" style={{ animationDelay: `${index * 100}ms` }}>
                      <div className="space-y-1">
                        <p className="font-medium">{review.employee}</p>
                        <p className="text-sm text-muted-foreground">{review.type}</p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="text-sm">{new Date(review.date).toLocaleDateString()}</p>
                        <Badge variant="outline" className={getStatusColor(review.status)}>
                          {review.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { from: 'Sarah Wilson', to: 'Alex Johnson', type: 'Peer Review', rating: 4.5, date: '2024-01-10' },
                    { from: 'David Chen', to: 'Maria Garcia', type: 'Manager Review', rating: 4.8, date: '2024-01-08' },
                    { from: 'Alex Johnson', to: 'Self', type: 'Self Assessment', rating: 4.2, date: '2024-01-05' }
                  ].map((feedback, index) => (
                    <div key={index} className="p-4 border border-border rounded-lg space-y-2 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{feedback.type}</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-warning fill-current" />
                          <span className="text-sm font-medium">{feedback.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        From: {feedback.from} → To: {feedback.to}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(feedback.date).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feedback Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-6 bg-accent/20 rounded-lg">
                    <p className="text-3xl font-bold text-success">4.6</p>
                    <p className="text-sm text-muted-foreground">Average Rating</p>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { type: 'Manager Reviews', count: 24, avgRating: 4.7 },
                      { type: 'Peer Reviews', count: 156, avgRating: 4.5 },
                      { type: 'Self Assessments', count: 89, avgRating: 4.3 }
                    ].map((item, index) => (
                      <div key={item.type} className="flex items-center justify-between animate-slide-in" style={{ animationDelay: `${index * 100}ms` }}>
                        <div>
                          <p className="font-medium">{item.type}</p>
                          <p className="text-sm text-muted-foreground">{item.count} reviews</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-warning fill-current" />
                          <span className="font-medium">{item.avgRating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformancePage;