import { useState } from "react";
import { motion } from "framer-motion";
import MainLayout from "@/layout/MainLayout";
import Loader from "@/components/ui/Loader";

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Loader onFinish={() => setLoaded(true)} />}
      {loaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <MainLayout />
        </motion.div>
      )}
    </>
  );
}

export default App;
