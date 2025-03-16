import { useState } from "react";
import { motion } from "framer-motion";
import { Filter, X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { CalendarWrapper } from "../CalendarWrapper";

interface SearchFiltersProps {
  sources: { id: string; name: string }[];
  categories: { id: string; name: string }[];
  selectedSources: string[];
  selectedCategories: string[];
  dateFrom?: string;
  dateTo?: string;
  sortBy: "relevancy" | "popularity" | "publishedAt";
  onSourcesChange: (sources: string[]) => void;
  onCategoriesChange: (categories: string[]) => void;
  onDateChange: (from?: string, to?: string) => void;
  onSortChange: (sort: "relevancy" | "popularity" | "publishedAt") => void;
  onReset: () => void;
}

const SearchFilters = ({
  sources,
  categories,
  selectedSources,
  selectedCategories,
  dateFrom,
  dateTo,
  sortBy,
  onSourcesChange,
  onCategoriesChange,
  onDateChange,
  onSortChange,
  onReset,
}: SearchFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const totalActiveFilters =
    (selectedSources.length > 0 ? 1 : 0) +
    (selectedCategories.length > 0 ? 1 : 0) +
    (dateFrom || dateTo ? 1 : 0);

  const handleSourceToggle = (sourceId: string) => {
    if (selectedSources.includes(sourceId)) {
      onSourcesChange(selectedSources.filter((id) => id !== sourceId));
    } else {
      onSourcesChange([...selectedSources, sourceId]);
    }
  };

  const handleCategoryToggle = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      onCategoriesChange(selectedCategories.filter((id) => id !== categoryId));
    } else {
      onCategoriesChange([...selectedCategories, categoryId]);
    }
  };

  const handleDateFromChange = (date?: Date) => {
    onDateChange(date ? format(date, "yyyy-MM-dd") : undefined, dateTo);
  };

  const handleDateToChange = (date?: Date) => {
    onDateChange(dateFrom, date ? format(date, "yyyy-MM-dd") : undefined);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-1">
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-1"
              >
                <Filter className="h-4 w-4 mr-1" />
                <span>Filters</span>
                {totalActiveFilters > 0 && (
                  <Badge className="ml-1" variant="secondary">
                    {totalActiveFilters}
                  </Badge>
                )}
                {isOpen ? (
                  <ChevronUp className="h-4 w-4 ml-1" />
                ) : (
                  <ChevronDown className="h-4 w-4 ml-1" />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <Tabs defaultValue="sources" className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="sources">Sources</TabsTrigger>
                  <TabsTrigger value="categories">Categories</TabsTrigger>
                  <TabsTrigger value="date">Date</TabsTrigger>
                </TabsList>

                <TabsContent value="sources" className="space-y-4">
                  <div className="max-h-64 overflow-y-auto space-y-2">
                    {sources.map((source) => (
                      <div
                        key={source.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`source-${source.id}`}
                          checked={selectedSources.includes(source.id)}
                          onCheckedChange={() => handleSourceToggle(source.id)}
                        />
                        <Label
                          htmlFor={`source-${source.id}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {source.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="categories" className="space-y-4">
                  <div className="max-h-64 overflow-y-auto space-y-2">
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`category-${category.id}`}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() =>
                            handleCategoryToggle(category.id)
                          }
                        />
                        <Label
                          htmlFor={`category-${category.id}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {category.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="date" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date-from">From</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="date-from"
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                            size="sm"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dateFrom ? (
                              format(new Date(dateFrom), "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarWrapper
                            selected={dateFrom ? new Date(dateFrom) : undefined}
                            onSelect={handleDateFromChange}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date-to">To</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="date-to"
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                            size="sm"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dateTo ? (
                              format(new Date(dateTo), "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarWrapper
                            selected={dateTo ? new Date(dateTo) : undefined}
                            onSelect={handleDateToChange}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-between mt-4 pt-4 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    onReset();
                    setIsOpen(false);
                  }}
                >
                  Reset
                </Button>
                <Button size="sm" onClick={() => setIsOpen(false)}>
                  Apply Filters
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Select
            value={sortBy}
            onValueChange={(
              value: "relevancy" | "popularity" | "publishedAt"
            ) => onSortChange(value)}
          >
            <SelectTrigger className="w-[180px] h-9">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="publishedAt">Newest First</SelectItem>
              <SelectItem value="relevancy">Relevance</SelectItem>
              <SelectItem value="popularity">Popularity</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {totalActiveFilters > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground"
              onClick={onReset}
            >
              <X className="h-4 w-4 mr-1" />
              Clear filters
            </Button>
          </motion.div>
        )}
      </div>

      {/* Active filters display */}
      <div className="flex flex-wrap gap-2 mb-4">
        {selectedSources.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <Badge variant="secondary" className="flex items-center space-x-1">
              <span>Sources: {selectedSources.length}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => onSourcesChange([])}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove</span>
              </Button>
            </Badge>
          </motion.div>
        )}

        {selectedCategories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <Badge variant="secondary" className="flex items-center space-x-1">
              <span>Categories: {selectedCategories.length}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => onCategoriesChange([])}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove</span>
              </Button>
            </Badge>
          </motion.div>
        )}

        {(dateFrom || dateTo) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <Badge variant="secondary" className="flex items-center space-x-1">
              <span>
                Date:{" "}
                {dateFrom ? format(new Date(dateFrom), "MMM d, yyyy") : "Any"}
                {" - "}
                {dateTo ? format(new Date(dateTo), "MMM d, yyyy") : "Now"}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => onDateChange(undefined, undefined)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove</span>
              </Button>
            </Badge>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SearchFilters;
