import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES as R } from "@/constants/routes";
import MainLayout from "@/layout/MainLayout";
import LogIn from "@/page/Auth/LogIn";
import Dashboard from "@/page/Dashboard/Dashboard";
import DashboardProjects from "@/page/Dashboard/DashboardProjects";
import DashboardExperience from "@/page/Dashboard/DashboardExperience";
import { useAuth } from "@/context/AuthContext";

function PrivateRoute({ children }) {
  const { loggedIn } = useAuth();
  return loggedIn ? children : <Navigate to={R.LOGIN} replace />;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path={R.HOME} element={<MainLayout />} />
      <Route path={R.LOGIN} element={<LogIn />} />
      <Route
        path={R.DASHBOARD}
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path={R.DASHBOARD_PROJECTS}
        element={
          <PrivateRoute>
            <DashboardProjects />
          </PrivateRoute>
        }
      />
      <Route
        path={R.DASHBOARD_EXPERIENCE}
        element={
          <PrivateRoute>
            <DashboardExperience />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to={R.HOME} replace />} />
    </Routes>
  );
}
