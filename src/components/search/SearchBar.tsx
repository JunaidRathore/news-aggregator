import { useState, useEffect, FormEvent } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface SearchBarProps {
  initialQuery?: string;
  onSearch: (query: string) => void;
  compact?: boolean;
}

const SearchBar = ({
  initialQuery = "",
  onSearch,
  compact = false,
}: SearchBarProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const clearSearch = () => {
    setQuery("");
    if (initialQuery) {
      onSearch("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div
        className={`relative flex items-center ${
          compact ? "w-[300px]" : "w-full"
        }`}
      >
        <motion.div
          className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: isFocused ? 1 : 0.6 }}
        >
          <Search className="h-4 w-4" />
        </motion.div>

        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search articles..."
          className={`pl-10 pr-10 ${isFocused ? "border-primary" : ""}`}
        />

        <AnimatePresence>
          {query && (
            <motion.div
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
            >
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={clearSearch}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
};

export default SearchBar;
