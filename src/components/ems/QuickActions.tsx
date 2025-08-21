import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AddEmployeeDialog } from "@/components/ems/AddEmployeeDialog";
import { 
  Plus, 
  Calendar, 
  FileText, 
  Users, 
  Bell, 
  Settings,
  UserPlus,
  ClipboardList
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  variant: 'default' | 'outline' | 'secondary';
  badge?: string;
  color?: string;
}

const quickActions: QuickAction[] = [
  {
    id: '1',
    title: 'Add Employee',
    description: 'Register new team member',
    icon: UserPlus,
    variant: 'default',
    color: 'bg-primary'
  },
  {
    id: '2',
    title: 'Schedule Meeting',
    description: 'Book team meeting',
    icon: Calendar,
    variant: 'outline',
    color: 'bg-info'
  },
  {
    id: '3',
    title: 'Review Leaves',
    description: 'Pending requests',
    icon: ClipboardList,
    variant: 'outline',
    badge: '3',
    color: 'bg-warning'
  },
  {
    id: '4',
    title: 'Generate Report',
    description: 'Monthly analytics',
    icon: FileText,
    variant: 'outline',
    color: 'bg-success'
  },
  {
    id: '5',
    title: 'Team Overview',
    description: 'Department insights',
    icon: Users,
    variant: 'secondary',
    color: 'bg-accent'
  },
  {
    id: '6',
    title: 'Settings',
    description: 'System configuration',
    icon: Settings,
    variant: 'outline',
    color: 'bg-muted'
  }
];

export const QuickActions = () => {
  const handleAction = (action: QuickAction) => {
    toast({
      title: `${action.title}`,
      description: `${action.description} feature will be available soon.`,
    });
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon;

            if (action.title === 'Add Employee') {
              return (
                <AddEmployeeDialog key={action.id}>
                  <Button
                    variant={action.variant}
                    className="h-auto p-4 flex flex-col items-start text-left relative group hover:shadow-md transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <Icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                      {action.badge && (
                        <Badge variant="destructive" className="animate-pulse-success text-xs px-1.5 py-0.5">
                          {action.badge}
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{action.title}</p>
                      <p className="text-xs text-muted-foreground">{action.description}</p>
                    </div>
                  </Button>
                </AddEmployeeDialog>
              );
            }

            return (
              <Button
                key={action.id}
                variant={action.variant}
                onClick={() => handleAction(action)}
                className="h-auto p-4 flex flex-col items-start text-left relative group hover:shadow-md transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <Icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                  {action.badge && (
                    <Badge variant="destructive" className="animate-pulse-success text-xs px-1.5 py-0.5">
                      {action.badge}
                    </Badge>
                  )}
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-sm">{action.title}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};