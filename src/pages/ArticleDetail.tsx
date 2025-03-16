import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { searchArticles as searchGuardianArticles } from "@/services/guardianApi";
import { searchArticles as searchNewsApiArticles } from "@/services/newsApi";
import { searchArticles as searchNYTimesArticles } from "@/services/nytimesApi";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookmarkPlus,
  Calendar,
  Clock,
  ExternalLink,
  Globe,
  Share2,
  User,
} from "lucide-react";
import { Button } from "react-day-picker";
import { Link, useParams } from "react-router-dom";

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();

  // Fetch articles from all sources
  const { data: newsApiArticles } = useQuery({
    queryKey: ["newsapi-articles"],
    queryFn: () => searchNewsApiArticles({ page: 1, pageSize: 100 }),
  });

  const { data: guardianArticles } = useQuery({
    queryKey: ["guardian-articles"],
    queryFn: () => searchGuardianArticles({ page: 1, pageSize: 100 }),
  });

  const { data: nyTimesArticles } = useQuery({
    queryKey: ["nytimes-articles"],
    queryFn: () => searchNYTimesArticles({ page: 1, pageSize: 100 }),
  });

  // Combine all articles
  const allArticles = [
    ...(newsApiArticles?.articles || []),
    ...(guardianArticles?.articles || []),
    ...(nyTimesArticles?.articles || []),
  ];

  // Find the current article
  const article = allArticles.find((article) => article.id === id);

  // Find related articles (same source or category)
  const relatedArticles = !article
    ? []
    : allArticles
        .filter(
          (a) =>
            a.id !== id &&
            (a.source.name === article.source.name ||
              a.category === article.category)
        )
        .slice(0, 3);

  if (!article) {
    return (
      <div className="container mx-auto py-8">
        <div className="mb-6">
          <Link to="/">
            <Button className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to all articles</span>
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto py-8"
    >
      <div className="mb-6">
        <Link to="/">
          <Button className="flex items-center space-x-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to all articles</span>
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-4">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              {article.source.name && (
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-1" />
                  <span>{article.source.name}</span>
                </div>
              )}

              {article.publishedAt && (
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{format(new Date(article.publishedAt), "PPP")}</span>
                </div>
              )}

              {article.author && (
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  <span>{article.author}</span>
                </div>
              )}

              {article.category && (
                <Badge variant="outline">{article.category}</Badge>
              )}
            </div>
          </div>

          {article.urlToImage && (
            <div className="relative h-96 w-full overflow-hidden rounded-lg mb-6">
              <img
                src={article.urlToImage}
                alt={article.title}
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/800x400?text=No+Image+Available";
                }}
              />
            </div>
          )}

          <div className="space-y-4 leading-relaxed">
            {article.description && (
              <p className="text-lg font-medium">{article.description}</p>
            )}

            {article.content ? (
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            ) : (
              <p className="text-muted-foreground italic">
                Full content is available on the original source. Click the
                "Read at source" button below to view the complete article.
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <Button className="flex items-center">
                <ExternalLink className="h-4 w-4 mr-2" />
                Read at source
              </Button>
            </a>

            <Button className="flex items-center">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>

            <Button className="flex items-center">
              <BookmarkPlus className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Related Articles</h3>

            {relatedArticles.length > 0 ? (
              <div className="space-y-4">
                {relatedArticles.map((relatedArticle) => (
                  <Link
                    to={`/article/${relatedArticle.id}`}
                    key={relatedArticle.id}
                  >
                    <Card className="p-4 hover:bg-muted/50 transition-colors">
                      <h4 className="font-medium mb-2 line-clamp-2">
                        {relatedArticle.title}
                      </h4>

                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>
                          {format(new Date(relatedArticle.publishedAt), "PP")}
                        </span>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">
                No related articles found.
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArticleDetail;
