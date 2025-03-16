import { useDarkMode } from "../../hooks/usePreference";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Search, Settings, Sun, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../search/SearchBar";
import { Button } from "../ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <div className="mr-4 flex">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              N
            </motion.div>
            <span className="hidden font-bold sm:inline-block">NewsHub</span>
          </Link>
        </div>

        <div className="flex-1 flex justify-end md:justify-center">
          <div className="hidden md:flex">
            <SearchBar compact={true} onSearch={(q) => console.log(q)} />
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle search"
            className="md:hidden"
            onClick={toggleSearch}
          >
            <Search className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={toggleDarkMode}
          >
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <Link to="/settings">
            <Button variant="ghost" size="icon" aria-label="Settings">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle menu"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className="md:hidden py-2 px-4 border-b"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <SearchBar
              onSearch={(q) => {
                console.log(q);
                toggleSearch();
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            className="md:hidden fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md bg-background"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
          >
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-lg font-medium py-2 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/settings"
                className="text-lg font-medium py-2 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Preferences
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
