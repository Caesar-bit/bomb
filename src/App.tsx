import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/ems/Layout";
import Index from "./pages/Index";
import EmployeesPage from "./pages/EmployeesPage";
import PerformancePage from "./pages/PerformancePage";
import AttendancePage from "./pages/AttendancePage";
import PayrollPage from "./pages/PayrollPage";
import RecruitmentPage from "./pages/RecruitmentPage";
import LearningPage from "./pages/LearningPage";
import EngagementPage from "./pages/EngagementPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SecurityPage from "./pages/SecurityPage";
import PortalPage from "./pages/PortalPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { AuthProvider } from "./lib/auth";
import RequireAuth from "./lib/RequireAuth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <Index />
                  </RequireAuth>
                }
              />
              <Route
                path="/employees"
                element={
                  <RequireAuth>
                    <EmployeesPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/performance"
                element={
                  <RequireAuth>
                    <PerformancePage />
                  </RequireAuth>
                }
              />
              <Route
                path="/attendance"
                element={
                  <RequireAuth>
                    <AttendancePage />
                  </RequireAuth>
                }
              />
              <Route
                path="/payroll"
                element={
                  <RequireAuth>
                    <PayrollPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/recruitment"
                element={
                  <RequireAuth>
                    <RecruitmentPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/learning"
                element={
                  <RequireAuth>
                    <LearningPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/engagement"
                element={
                  <RequireAuth>
                    <EngagementPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/analytics"
                element={
                  <RequireAuth>
                    <AnalyticsPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/security"
                element={
                  <RequireAuth>
                    <SecurityPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/portal"
                element={
                  <RequireAuth>
                    <PortalPage />
                  </RequireAuth>
                }
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
