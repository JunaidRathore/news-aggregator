import { Link } from "react-router-dom";
import { ExternalLink, Clock, User, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Article } from "@/types/article";

interface ArticleCardProps {
  article: Article;
  index: number;
}

const ArticleCard = ({ article, index }: ArticleCardProps) => {
  const {
    id,
    title,
    description,
    author,
    publishedAt,
    url,
    urlToImage,
    source,
    category,
  } = article;

  // Format the published date
  const formattedDate = formatDistanceToNow(new Date(publishedAt), {
    addSuffix: true,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="h-full overflow-hidden hover:shadow-md transition-shadow duration-300">
        <Link to={`/article/${id}`} className="flex flex-col h-full">
          {urlToImage && (
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={urlToImage}
                alt={title}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                onError={(e) => {
                  // Replace with a placeholder image on error
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/800x400?text=No+Image+Available";
                }}
              />
              <div className="absolute top-2 right-2">
                <Badge variant="secondary">{source.name}</Badge>
              </div>
            </div>
          )}

          <CardHeader className="p-4 pb-2">
            <h3 className="text-lg font-semibold line-clamp-2 hover:text-primary transition-colors duration-200">
              {title}
            </h3>
          </CardHeader>

          <CardContent className="p-4 pt-0 flex-grow">
            {description && (
              <p className="text-muted-foreground text-sm line-clamp-3 mb-2">
                {description}
              </p>
            )}
          </CardContent>

          <CardFooter className="p-4 pt-0 text-xs text-muted-foreground flex flex-wrap items-center gap-3">
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>{formattedDate}</span>
            </div>

            {author && (
              <div className="flex items-center">
                <User className="h-3 w-3 mr-1" />
                <span className="truncate max-w-[150px]">{author}</span>
              </div>
            )}

            {category && (
              <div className="flex items-center">
                <Tag className="h-3 w-3 mr-1" />
                <span>{category}</span>
              </div>
            )}
          </CardFooter>
        </Link>

        <div className="px-4 pb-4">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button variant="outline" size="sm" className="w-full">
              <ExternalLink className="h-4 w-4 mr-1" />
              Read at source
            </Button>
          </a>
        </div>
      </Card>
    </motion.div>
  );
};

export default ArticleCard;
