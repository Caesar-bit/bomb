import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, ClipboardCheck, UserPlus } from "lucide-react";

const openPositions = [
  { id: 1, title: "Frontend Developer", dept: "Engineering", candidates: 12 },
  { id: 2, title: "UX Designer", dept: "Design", candidates: 5 },
  { id: 3, title: "Sales Manager", dept: "Sales", candidates: 8 },
];

const RecruitmentPage = () => {
  const totalCandidates = openPositions.reduce((s, p) => s + p.candidates, 0);
  const [hiresThisMonth] = useState(3);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Recruitment & Onboarding</h1>
          <p className="text-muted-foreground">Track applicants and manage hiring process</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Positions</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openPositions.length}</div>
          </CardContent>
        </Card>
        <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Candidates</CardTitle>
            <Users className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCandidates}</div>
          </CardContent>
        </Card>
        <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Hires</CardTitle>
            <UserPlus className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hiresThisMonth}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Open Roles</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Department</TableHead>
                <TableHead className="text-right">Candidates</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {openPositions.map((role, idx) => (
                <TableRow key={role.id} className="animate-slide-in" style={{ animationDelay: `${idx * 50}ms` }}>
                  <TableCell className="font-medium">{role.title}</TableCell>
                  <TableCell>{role.dept}</TableCell>
                  <TableCell className="text-right">{role.candidates}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecruitmentPage;
