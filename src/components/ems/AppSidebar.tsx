import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Building2,
  LayoutDashboard,
  Users,
  Target,
  Calendar,
  DollarSign,
  UserPlus,
  GraduationCap,
  Heart,
  BarChart3,
  Shield,
  User
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
    description: "Main overview and stats"
  },
  {
    title: "Employee Database",
    url: "/employees",
    icon: Users,
    description: "Manage employee profiles"
  },
  {
    title: "Performance",
    url: "/performance",
    icon: Target,
    description: "Reviews and goal tracking"
  },
  {
    title: "Leave & Attendance",
    url: "/attendance",
    icon: Calendar,
    description: "Time tracking and leave requests"
  },
  {
    title: "Payroll",
    url: "/payroll",
    icon: DollarSign,
    description: "Compensation management"
  },
  {
    title: "Recruitment",
    url: "/recruitment",
    icon: UserPlus,
    description: "Hiring and onboarding"
  },
  {
    title: "Learning & Development",
    url: "/learning",
    icon: GraduationCap,
    description: "Training and skill development"
  },
  {
    title: "Employee Engagement",
    url: "/engagement",
    icon: Heart,
    description: "Satisfaction and wellness"
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
    description: "Reports and insights"
  },
  {
    title: "Security & Privacy",
    url: "/security",
    icon: Shield,
    description: "Access control and compliance"
  },
  {
    title: "Self-Service Portal",
    url: "/portal",
    icon: User,
    description: "Employee self-service"
  }
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  const getNavCls = (path: string) => {
    const active = isActive(path);
    return active 
      ? "bg-primary text-primary-foreground font-medium" 
      : "hover:bg-accent hover:text-accent-foreground";
  };

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"}>
      <SidebarContent>
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-sidebar-primary" />
            {!collapsed && (
              <div>
                <h1 className="text-lg font-bold text-sidebar-foreground">EMS</h1>
                <p className="text-xs text-sidebar-foreground/60">Employee Management</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"}
                      className={`${getNavCls(item.url)} transition-colors duration-200`}
                      title={collapsed ? item.title : undefined}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && (
                        <div className="flex-1 min-w-0">
                          <span className="block truncate">{item.title}</span>
                          <span className="text-xs opacity-60 block truncate">
                            {item.description}
                          </span>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Status */}
        {!collapsed && (
          <div className="mt-auto p-4 border-t border-sidebar-border">
            <div className="space-y-2 text-xs text-sidebar-foreground/60">
              <div className="flex justify-between">
                <span>Active Users</span>
                <span className="text-success font-medium">198</span>
              </div>
              <div className="flex justify-between">
                <span>System Status</span>
                <span className="text-success font-medium">Online</span>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}