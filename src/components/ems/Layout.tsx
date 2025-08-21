import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Search } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/lib/auth";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date());
  const { logout } = useAuth();

  // Update time every minute
  useState(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  });

  const isAuthPage = ["/login", "/signup"].includes(location.pathname);

  if (isAuthPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-md">{children}</div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="hover:bg-accent" />
                <div className="hidden md:block">
                  <h2 className="text-lg font-semibold">Employee Management System</h2>
                  <p className="text-xs text-muted-foreground">
                    Real-time workforce management platform
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="hidden lg:flex flex-col items-end">
                  <p className="text-sm font-medium">Welcome back, Admin</p>
                  <p className="text-xs text-muted-foreground">
                    {currentTime.toLocaleDateString()} - {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <Button size="sm" variant="outline" className="gap-2 relative">
                  <Bell className="h-4 w-4" />
                  <Badge variant="destructive" className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs">
                    5
                  </Badge>
                </Button>
                <Button size="sm" className="gap-2">
                  <Search className="h-4 w-4" />
                  <span className="hidden md:inline">Search</span>
                </Button>
                <Button size="sm" variant="destructive" onClick={logout}>
                  Log Out
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="container mx-auto px-4 py-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};