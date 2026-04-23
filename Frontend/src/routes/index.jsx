import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES as R } from "@/constants/routes";
import MainLayout from "@/layout/MainLayout";
import LogIn from "@/page/Auth/LogIn";
import Dashboard from "@/page/Dashboard/Dashboard";
import DashboardProjects from "@/page/Dashboard/DashboardProjects";
import DashboardExperience from "@/page/Dashboard/DashboardExperience";
import DashboardEducation from "@/page/Dashboard/DashboardEducation";
import { useAuth } from "@/context/AuthContext";

function AdminRoute({ children }) {
  const { loggedIn, isAdmin } = useAuth();
  if (!loggedIn) return <Navigate to={R.LOGIN} replace />;
  return isAdmin ? children : <Navigate to={R.HOME} replace />;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path={R.HOME} element={<MainLayout />} />
      <Route path={R.LOGIN} element={<LogIn />} />
      <Route
        path={R.DASHBOARD}
        element={
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        }
      />
      <Route
        path={R.DASHBOARD_PROJECTS}
        element={
          <AdminRoute>
            <DashboardProjects />
          </AdminRoute>
        }
      />
      <Route
        path={R.DASHBOARD_EXPERIENCE}
        element={
          <AdminRoute>
            <DashboardExperience />
          </AdminRoute>
        }
      />
      <Route
        path={R.DASHBOARD_EDUCATION}
        element={
          <AdminRoute>
            <DashboardEducation />
          </AdminRoute>
        }
      />
      <Route path="*" element={<Navigate to={R.HOME} replace />} />
    </Routes>
  );
}
