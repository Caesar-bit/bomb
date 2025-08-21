import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarCheck, Mail, FileText } from "lucide-react";

const actions = [
  { id: 1, title: "Request Leave", icon: CalendarCheck },
  { id: 2, title: "Update Profile", icon: FileText },
  { id: 3, title: "Contact HR", icon: Mail },
];

const PortalPage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Self-Service Portal</h1>
          <p className="text-muted-foreground">Empower employees with easy access to tools</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {actions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.id}
                  variant="outline"
                  className="flex flex-col gap-2 py-6 animate-fade-in"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <Icon className="h-6 w-6" />
                  {action.title}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortalPage;
