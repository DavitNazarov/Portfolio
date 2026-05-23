import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { AppRoutes } from "@/routes";
import CustomCursor from "@/components/ui/CustomCursor";
import { trackVisit } from "@/lib/notify";
import { useSmoothScroll } from "@/app/hooks/useSmoothScroll";

function App() {
  useSmoothScroll();

  useEffect(() => {
    trackVisit();
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <CustomCursor />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
