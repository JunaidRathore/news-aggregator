import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import ArticleCard from "./ArticleCard";
import type { Article } from "@/types/article";

interface ArticleListProps {
  articles: Article[];
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

const ArticleList = ({
  articles,
  isLoading,
  hasMore,
  onLoadMore,
}: ArticleListProps) => {
  // Setup intersection observer for infinite scrolling
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Trigger load more when the bottom element is in view
  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      onLoadMore();
    }
  }, [inView, hasMore, isLoading, onLoadMore]);

  // Display a loading state when no articles are available
  if (isLoading && articles.length === 0) {
    return (
      <div className="w-full h-96 flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading articles...</p>
      </div>
    );
  }

  // Display a message when no articles are found
  if (!isLoading && articles.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full py-16 text-center"
      >
        <h3 className="text-xl font-semibold mb-2">No articles found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search criteria or filters.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <ArticleCard key={article.id} article={article} index={index} />
        ))}
      </div>

      {/* Load more trigger element */}
      {hasMore && (
        <div ref={ref} className="w-full py-8 flex items-center justify-center">
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <span className="text-sm text-muted-foreground">
                Loading more articles...
              </span>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Scroll to load more</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ArticleList;
