import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipLoader } from "react-spinners";

const Loader = ({ onFinish }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onFinish?.();
    }, 2500); // duration of the loader
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background text-foreground"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeOut" } }}
        >
          {/* Spinner */}
          <ClipLoader color="#facc15" size={70} speedMultiplier={1.2} />

          {/* Optional loading text */}
          <motion.p
            className="mt-8 text-lg tracking-wider font-semibold font-mono opacity-80"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Welcome to my portfolio!
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
