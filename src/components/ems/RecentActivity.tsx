import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface Activity {
  id: string;
  type: 'login' | 'leave_request' | 'performance_update' | 'new_employee';
  user: string;
  description: string;
  timestamp: Date;
  status?: 'success' | 'pending' | 'warning';
}

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'login':
      return CheckCircle;
    case 'leave_request':
      return Clock;
    case 'performance_update':
      return AlertCircle;
    case 'new_employee':
      return CheckCircle;
    default:
      return Clock;
  }
};

const getActivityColor = (type: Activity['type']) => {
  switch (type) {
    case 'login':
      return 'text-success';
    case 'leave_request':
      return 'text-warning';
    case 'performance_update':
      return 'text-info';
    case 'new_employee':
      return 'text-success';
    default:
      return 'text-muted-foreground';
  }
};

export const RecentActivity = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // Simulate real-time activity updates
    const initialActivities: Activity[] = [
      {
        id: '1',
        type: 'login',
        user: 'Alex Johnson',
        description: 'logged in to the system',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        status: 'success'
      },
      {
        id: '2',
        type: 'leave_request',
        user: 'Maria Garcia',
        description: 'submitted a leave request for Feb 15-20',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        status: 'pending'
      },
      {
        id: '3',
        type: 'performance_update',
        user: 'David Chen',
        description: 'completed Q1 performance review',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        status: 'success'
      },
      {
        id: '4',
        type: 'new_employee',
        user: 'Sarah Wilson',
        description: 'added new employee to Engineering team',
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        status: 'success'
      }
    ];

    setActivities(initialActivities);

    // Simulate new activities coming in
    const interval = setInterval(() => {
      const randomActivity: Activity = {
        id: Math.random().toString(),
        type: ['login', 'leave_request', 'performance_update'][Math.floor(Math.random() * 3)] as Activity['type'],
        user: ['Alex Johnson', 'Maria Garcia', 'David Chen', 'Sarah Wilson'][Math.floor(Math.random() * 4)],
        description: 'performed a system action',
        timestamp: new Date(),
        status: ['success', 'pending'][Math.floor(Math.random() * 2)] as 'success' | 'pending'
      };

      setActivities(prev => [randomActivity, ...prev.slice(0, 9)]);
    }, 30000); // New activity every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {activities.map((activity, index) => {
            const Icon = getActivityIcon(activity.type);
            return (
              <div
                key={activity.id}
                className="flex items-start space-x-3 animate-slide-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`p-2 rounded-full ${getActivityColor(activity.type)} bg-current/10`}>
                  <Icon className={`h-3 w-3 ${getActivityColor(activity.type)}`} />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>
                      <span className="text-muted-foreground"> {activity.description}</span>
                    </p>
                    {activity.status && (
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          activity.status === 'success' ? 'text-success border-success/20' :
                          activity.status === 'pending' ? 'text-warning border-warning/20' :
                          'text-info border-info/20'
                        }`}
                      >
                        {activity.status}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {formatTime(activity.timestamp)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};