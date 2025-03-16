import { Outlet } from "react-router-dom";

import { motion } from "framer-motion";
import Header from "./Header";
import { Footer } from "react-day-picker";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <motion.main
        className="flex-1 container mx-auto px-4 py-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  );
};

export default Layout;
