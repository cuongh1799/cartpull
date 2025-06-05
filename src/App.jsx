import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Pulls from "./Pages/Pulls";
import { AnimatePresence, motion } from "framer-motion";
import Gacha from "./Pages/Gacha";
import About from "./Pages/About";

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
        <Route path="/gacha" element={<Gacha />} />
        <Route path="/about" element={<About/>} />
      </Routes>
    </>
  );
}
