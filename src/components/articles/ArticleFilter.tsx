import SearchBar from "@/components/search/SearchBar";
import SearchFilters from "@/components/search/SearchFilters";
import { getSections as getGuardianSections } from "@/services/guardianApi";
import { getSources as getNewsApiSources } from "@/services/newsApi";
import { getSections as getNYTimesSections } from "@/services/nytimesApi";
import { Category } from "@/types/article";
import { useQuery } from "@tanstack/react-query";

interface ArticleFilterProps {
  query: string;
  selectedSources: string[];
  selectedCategories: string[];
  dateFrom?: string;
  dateTo?: string;
  sortBy: "relevancy" | "popularity" | "publishedAt";
  onQueryChange: (query: string) => void;
  onSourcesChange: (sources: string[]) => void;
  onCategoriesChange: (categories: string[]) => void;
  onDateChange: (from?: string, to?: string) => void;
  onSortChange: (sort: "relevancy" | "popularity" | "publishedAt") => void;
  onReset: () => void;
}

const ArticleFilter = ({
  query,
  selectedSources,
  selectedCategories,
  dateFrom,
  dateTo,
  sortBy,
  onQueryChange,
  onSourcesChange,
  onCategoriesChange,
  onDateChange,
  onSortChange,
  onReset,
}: ArticleFilterProps) => {
  // Fetch sources from NewsAPI
  const { data: newsSources = [] } = useQuery({
    queryKey: ["news-sources"],
    queryFn: () => getNewsApiSources(),
  });

  // Fetch sections from The Guardian
  const { data: guardianSections = [] } = useQuery({
    queryKey: ["guardian-sections"],
    queryFn: () => getGuardianSections(),
  });

  // Fetch sections from NY Times
  const { data: nytimesSections = [] } = useQuery({
    queryKey: ["nytimes-sections"],
    queryFn: () => getNYTimesSections(),
  });

  // Combine sources and categories from all APIs
  const sources = newsSources.concat([
    { id: "the-guardian", name: "The Guardian" },
    { id: "new-york-times", name: "New York Times" },
  ]);

  // Create a unique list of categories
  const uniqueCategories = new Map();

  // Add NY Times sections
  nytimesSections.forEach((section) => {
    uniqueCategories.set(section.id, section);
  });

  // Add Guardian sections
  guardianSections.forEach((section: Category) => {
    uniqueCategories.set(section.id, section);
  });

  // Convert Map to array
  const categories = Array.from(uniqueCategories.values());

  return (
    <div className="space-y-4">
      <SearchBar initialQuery={query} onSearch={onQueryChange} />

      <SearchFilters
        sources={sources}
        categories={categories}
        selectedSources={selectedSources}
        selectedCategories={selectedCategories}
        dateFrom={dateFrom}
        dateTo={dateTo}
        sortBy={sortBy}
        onSourcesChange={onSourcesChange}
        onCategoriesChange={onCategoriesChange}
        onDateChange={onDateChange}
        onSortChange={onSortChange}
        onReset={onReset}
      />
    </div>
  );
};

export default ArticleFilter;
