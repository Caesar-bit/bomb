import { DashboardStats } from "@/components/ems/DashboardStats";
import { EmployeeList } from "@/components/ems/EmployeeList";
import { RecentActivity } from "@/components/ems/RecentActivity";
import { PerformanceChart } from "@/components/ems/PerformanceChart";
import { QuickActions } from "@/components/ems/QuickActions";

const Index = () => {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center py-8">
        <h2 className="text-3xl font-bold text-foreground mb-2 animate-fade-in">
          Real-Time Employee Management
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
          Monitor your team's performance, manage leaves, and track activities in real-time
        </p>
      </div>

      {/* Dashboard Stats */}
      <DashboardStats />

      {/* Main Dashboard Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <EmployeeList />
          <PerformanceChart />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <QuickActions />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default Index;
