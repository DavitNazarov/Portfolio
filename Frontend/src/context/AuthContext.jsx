import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn, clearToken, setToken, getRole } from "@/lib/api";
import { ROUTES } from "@/constants/routes";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  const [role, setRole] = useState(getRole);
  const navigate = useNavigate();

  const login = useCallback(
    (token, nextRole) => {
      setToken(token, nextRole);
      setLoggedIn(true);
      const resolvedRole = getRole();
      setRole(resolvedRole);
      navigate(resolvedRole === "admin" ? ROUTES.DASHBOARD : ROUTES.HOME);
    },
    [navigate]
  );

  const logout = useCallback(
    () => {
      clearToken();
      setLoggedIn(false);
      setRole(null);
      navigate(ROUTES.HOME);
    },
    [navigate]
  );

  useEffect(() => {
    setLoggedIn(isLoggedIn());
    setRole(getRole());
  }, []);

  useEffect(() => {
    const handleUnauthorized = () => {
      clearToken();
      setLoggedIn(false);
      setRole(null);
      navigate(ROUTES.LOGIN, { replace: true });
    };
    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () => window.removeEventListener("auth:unauthorized", handleUnauthorized);
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ loggedIn, role, isAdmin: role === "admin", login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
