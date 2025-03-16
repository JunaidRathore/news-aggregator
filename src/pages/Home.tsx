import { useState } from "react";
import { motion } from "framer-motion";
import { useSearch } from "@/hooks/useSearch";
import ArticleList from "@/components/articles/ArticleList";
import ArticleFilter from "@/components/articles/ArticleFilter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePreferences } from "@/hooks/usePreference";
import { Article } from "@/types/article";

const Home = () => {
  const { preferredSources, preferredCategories } = usePreferences();
  const [currentPage, setCurrentPage] = useState(1);

  // Use the search hook with user preferences
  const {
    searchParams,
    articles,
    totalResults,
    isLoading,
    setSearchQuery,
    setSourcesFilter,
    setCategoriesFilter,
    setDateRangeFilter,
    setSortOrder,
    resetFilters,
  } = useSearch({
    sources: preferredSources,
    categories: preferredCategories,
    page: currentPage,
    pageSize: 12,
  });

  // Calculate if there are more articles to load
  const hasMore = articles.length < totalResults;

  // Load more articles
  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center py-8"
      >
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Your Personalized News Hub
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Stay informed with the latest news from your favorite sources,
          tailored to your interests.
        </p>
      </motion.div>

      <ArticleFilter
        query={searchParams.q || ""}
        selectedSources={searchParams.sources || []}
        selectedCategories={searchParams.categories || []}
        dateFrom={searchParams.from}
        dateTo={searchParams.to}
        sortBy={searchParams.sortBy || "publishedAt"}
        onQueryChange={setSearchQuery}
        onSourcesChange={setSourcesFilter}
        onCategoriesChange={setCategoriesFilter}
        onDateChange={setDateRangeFilter}
        onSortChange={setSortOrder}
        onReset={resetFilters}
      />

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All News</TabsTrigger>
          <TabsTrigger value="top">Top Headlines</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <ArticleList
            articles={articles}
            isLoading={isLoading}
            hasMore={hasMore}
            onLoadMore={handleLoadMore}
          />
        </TabsContent>

        <TabsContent value="top" className="mt-6">
          <ArticleList
            articles={articles.filter(
              (article: Article) =>
                article.source.name === "The Guardian" ||
                article.source.name === "New York Times"
            )}
            isLoading={isLoading}
            hasMore={false}
            onLoadMore={() => {}}
          />
        </TabsContent>

        <TabsContent value="recommended" className="mt-6">
          <ArticleList
            articles={articles.filter((_: Article, i: number) => i % 2 === 0)} // For demo purposes, just show a subset
            isLoading={isLoading}
            hasMore={false}
            onLoadMore={() => {}}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Home;
