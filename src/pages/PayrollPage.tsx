import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DollarSign,
  CalendarCheck,
  FileText,
  TrendingUp,
} from "lucide-react";
import { api } from "@/lib/api";
import { Employee } from "@/types/employee";
import { toast } from "@/hooks/use-toast";

const PayrollPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const totalPayroll = employees.reduce((sum, e) => sum + e.salary, 0);
  const [animatedPayroll, setAnimatedPayroll] = useState(0);

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

  useEffect(() => {
    loadEmployees();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedPayroll(totalPayroll), 300);
    return () => clearTimeout(timer);
  }, [totalPayroll]);

  const nextPayDate = new Date();
  nextPayDate.setDate(nextPayDate.getDate() + 5);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Payroll & Compensation</h1>
          <p className="text-muted-foreground">Manage salaries and pay schedules in real time</p>
        </div>
        <Badge variant="outline">Next Pay Date: {nextPayDate.toLocaleDateString()}</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payroll</CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${animatedPayroll.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Monthly cost</p>
          </CardContent>
        </Card>
        <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <FileText className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-warning">Awaiting manager review</p>
          </CardContent>
        </Card>
        <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comp Changes</CardTitle>
            <TrendingUp className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+5%</div>
            <p className="text-xs text-muted-foreground">Since last quarter</p>
          </CardContent>
        </Card>
        <Card className="animate-fade-in" style={{ animationDelay: '300ms' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Pay Date</CardTitle>
            <CalendarCheck className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{nextPayDate.toLocaleDateString()}</div>
            <p className="text-xs text-muted-foreground">Scheduled</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Employee Salaries</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead className="text-right">Salary</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((emp, idx) => (
                <TableRow key={emp.id} className="animate-slide-in" style={{ animationDelay: `${idx * 50}ms` }}>
                  <TableCell className="font-medium">{emp.name}</TableCell>
                  <TableCell>{emp.department}</TableCell>
                  <TableCell className="text-right">${emp.salary.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayrollPage;
