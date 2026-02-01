import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { isLoggedIn, clearToken, setToken as saveToken } from "@/lib/api";
import { ROUTES } from "@/constants/routes";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  const navigate = useNavigate();

  const login = useCallback((token) => {
    saveToken(token);
    setLoggedIn(true);
    navigate(ROUTES.DASHBOARD);
  }, [navigate]);

  const logout = useCallback(() => {
    clearToken();
    setLoggedIn(false);
    navigate(ROUTES.HOME);
  }, [navigate]);

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  useEffect(() => {
    const handleUnauthorized = () => {
      clearToken();
      setLoggedIn(false);
      navigate(ROUTES.LOGIN, { replace: true });
    };
    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () => window.removeEventListener("auth:unauthorized", handleUnauthorized);
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
