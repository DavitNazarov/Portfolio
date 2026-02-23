import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn, clearToken, setToken } from "@/lib/api";
import { ROUTES } from "@/constants/routes";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  const navigate = useNavigate();

  const login = useCallback(
    (token) => {
      setToken(token);
      setLoggedIn(true);
      navigate(ROUTES.DASHBOARD);
    },
    [navigate]
  );

  const logout = useCallback(
    () => {
      clearToken();
      setLoggedIn(false);
      navigate(ROUTES.HOME);
    },
    [navigate]
  );

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
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
