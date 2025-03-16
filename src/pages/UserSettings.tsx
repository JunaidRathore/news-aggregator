import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import UserPreferences from "@/components/user/UserPreferences";
import { Button } from "@/components/ui/button";

const UserSettings = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto py-8 max-w-4xl"
    >
      <div className="mb-6">
        <Link to="/">
          <Button variant="ghost" className="flex items-center space-x-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Button>
        </Link>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          User Settings
        </h1>
        <p className="text-muted-foreground">
          Personalize your news experience by selecting your preferences.
        </p>
      </div>

      <UserPreferences />
    </motion.div>
  );
};

export default UserSettings;
