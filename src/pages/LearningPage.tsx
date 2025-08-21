import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, GraduationCap, Users } from "lucide-react";

const courses = [
  { id: 1, title: "React Basics", enrolled: 24, progress: 80 },
  { id: 2, title: "Advanced TypeScript", enrolled: 12, progress: 60 },
  { id: 3, title: "Project Management", enrolled: 15, progress: 90 },
];

const LearningPage = () => {
  const totalEnrollments = courses.reduce((s, c) => s + c.enrolled, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Learning & Development</h1>
          <p className="text-muted-foreground">Upskill your team with modern trainings</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses.length}</div>
          </CardContent>
        </Card>
        <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enrollments</CardTitle>
            <Users className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEnrollments}</div>
          </CardContent>
        </Card>
        <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certifications</CardTitle>
            <GraduationCap className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Course Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {courses.map((course, idx) => (
            <div key={course.id} className="space-y-2 animate-slide-in" style={{ animationDelay: `${idx * 100}ms` }}>
              <div className="flex justify-between text-sm">
                <span className="font-medium">{course.title}</span>
                <span>{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningPage;
