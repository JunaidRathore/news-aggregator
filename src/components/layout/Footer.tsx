import { Link } from "react-router-dom";
import { GithubIcon, TwitterIcon, LinkedinIcon } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                N
              </motion.div>
              <span className="font-bold">NewsHub</span>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Your personalized news aggregator, providing the latest updates
              from various sources in one place.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-4">Navigation</h3>
            <div className="flex flex-col space-y-2">
              <Link to="/" className="text-sm hover:text-primary">
                Home
              </Link>
              <Link to="/settings" className="text-sm hover:text-primary">
                Preferences
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Sources</h3>
            <div className="flex flex-col space-y-2">
              <a
                href="https://newsapi.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-primary"
              >
                NewsAPI
              </a>
              <a
                href="https://open-platform.theguardian.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-primary"
              >
                The Guardian
              </a>
              <a
                href="https://developer.nytimes.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-primary"
              >
                New York Times
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} NewsHub. All rights reserved.
          </p>

          <div className="flex space-x-4 mt-4 md:mt-0">
            <motion.a
              href="#"
              className="text-muted-foreground hover:text-primary"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <GithubIcon className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </motion.a>
            <motion.a
              href="#"
              className="text-muted-foreground hover:text-primary"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <TwitterIcon className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </motion.a>
            <motion.a
              href="#"
              className="text-muted-foreground hover:text-primary"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <LinkedinIcon className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
