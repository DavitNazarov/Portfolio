import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES as R } from "@/constants/routes";
import MainLayout from "@/layout/MainLayout";
import RouteFallback from "@/components/ui/RouteFallback";
import { useAuth } from "@/context/AuthContext";

/*
 * The portfolio itself stays in the entry chunk — it is what almost every
 * visitor came for. Login and the whole admin dashboard are split out; they
 * used to ship to every visitor inside the same 520 KB bundle.
 */
const LogIn = lazy(() => import("@/page/Auth/LogIn"));
const Dashboard = lazy(() => import("@/page/Dashboard/Dashboard"));
const DashboardProjects = lazy(() => import("@/page/Dashboard/DashboardProjects"));
const DashboardExperience = lazy(() => import("@/page/Dashboard/DashboardExperience"));
const DashboardEducation = lazy(() => import("@/page/Dashboard/DashboardEducation"));
const DashboardAwards = lazy(() => import("@/page/Dashboard/DashboardAwards"));

function AdminRoute({ children }) {
  const { loggedIn, isAdmin } = useAuth();
  if (!loggedIn) return <Navigate to={R.LOGIN} replace />;
  return isAdmin ? children : <Navigate to={R.HOME} replace />;
}

export function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
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
        <Route
          path={R.DASHBOARD_AWARDS}
          element={
            <AdminRoute>
              <DashboardAwards />
            </AdminRoute>
          }
        />
        <Route path="*" element={<Navigate to={R.HOME} replace />} />
      </Routes>
    </Suspense>
  );
}
