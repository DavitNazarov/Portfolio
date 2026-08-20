import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";
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
    // reducedMotion="user" makes every Framer transform animation collapse to an
    // opacity change when the OS asks for reduced motion.
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <AuthProvider>
          <CustomCursor />
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </MotionConfig>
  );
}

export default App;
