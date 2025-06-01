import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Pulls from "./Pages/Pulls";
import { AnimatePresence, motion } from "framer-motion";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Home />
                </motion.div>
              </AnimatePresence>
            </>
          }
        />
        <Route path="/pulls" element={<Pulls />} />
      </Routes>
    </>
  );
}
