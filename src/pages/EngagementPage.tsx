import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart, Users, PartyPopper } from "lucide-react";

const events = [
  { id: 1, title: "Yoga Session", attendees: 14, progress: 70 },
  { id: 2, title: "Team Lunch", attendees: 20, progress: 100 },
  { id: 3, title: "Hackathon", attendees: 18, progress: 40 },
];

const EngagementPage = () => {
  const engagementScore = 86;
  const totalEvents = events.length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Employee Engagement</h1>
          <p className="text-muted-foreground">Promote wellness and satisfaction across the company</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Score</CardTitle>
            <Heart className="h-4 w-4 text-pink-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{engagementScore}%</div>
          </CardContent>
        </Card>
        <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Events This Month</CardTitle>
            <PartyPopper className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEvents}</div>
          </CardContent>
        </Card>
        <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Participants</CardTitle>
            <Users className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{events.reduce((s, e) => s + e.attendees, 0)}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Wellness & Activities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {events.map((event, idx) => (
            <div key={event.id} className="space-y-2 animate-slide-in" style={{ animationDelay: `${idx * 100}ms` }}>
              <div className="flex justify-between text-sm">
                <span className="font-medium">{event.title}</span>
                <span>{event.attendees} joined</span>
              </div>
              <Progress value={event.progress} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default EngagementPage;
