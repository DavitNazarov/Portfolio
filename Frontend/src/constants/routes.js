// App routes (frontend paths)
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  DASHBOARD_PROJECTS: "/dashboard/projects",
  DASHBOARD_EXPERIENCE: "/dashboard/experience",
};

// API routes (backend endpoints)
export const API_ROUTES = {
  AUTH: {
    LOGIN: "/api/auth/login",
  },
  PROJECTS: {
    BASE: "/api/projects",
    PUBLIC: "/api/projects/public",
    CREATE: "/api/projects/create-project",
    ALL: "/api/projects/get-all-projects",
    UPDATE: (id) => `/api/projects/update-project/${id}`,
    DELETE: (id) => `/api/projects/delete-project/${id}`,
  },
  EXPERIENCE: {
    BASE: "/api/experience",
    PUBLIC: "/api/experience/public",
    CREATE: "/api/experience/create-experience",
    ALL: "/api/experience/get-all-experience",
    UPDATE: (id) => `/api/experience/update-experience/${id}`,
    DELETE: (id) => `/api/experience/delete-experience/${id}`,
  },
};
