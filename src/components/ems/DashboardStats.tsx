import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, Clock, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

interface StatCardProps {
  title: string;
  value: number;
  change: number;
  icon: React.ElementType;
  gradient?: string;
}

const StatCard = ({ title, value, change, icon: Icon, gradient }: StatCardProps) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value);
    }, 300);
    return () => clearTimeout(timer);
  }, [value]);

  const isPositive = change >= 0;

  return (
    <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
      <div className={`absolute inset-0 opacity-5 ${gradient || 'bg-primary'}`} />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold animate-count-up">
          {animatedValue.toLocaleString()}
        </div>
        <div className="flex items-center text-xs mt-1">
          <TrendingUp className={`h-3 w-3 mr-1 ${isPositive ? 'text-success' : 'text-destructive'}`} />
          <span className={isPositive ? 'text-success' : 'text-destructive'}>
            {isPositive ? '+' : ''}{change}%
          </span>
          <span className="text-muted-foreground ml-1">from last month</span>
        </div>
      </CardContent>
    </Card>
  );
};

export const DashboardStats = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Employees"
        value={234}
        change={12}
        icon={Users}
        gradient="bg-gradient-to-br from-blue-500 to-blue-600"
      />
      <StatCard
        title="Active Today"
        value={198}
        change={8}
        icon={UserCheck}
        gradient="bg-gradient-to-br from-green-500 to-green-600"
      />
      <StatCard
        title="Pending Leaves"
        value={7}
        change={-15}
        icon={Clock}
        gradient="bg-gradient-to-br from-orange-500 to-orange-600"
      />
      <StatCard
        title="Performance Avg"
        value={87}
        change={5}
        icon={TrendingUp}
        gradient="bg-gradient-to-br from-purple-500 to-purple-600"
      />
    </div>
  );
};