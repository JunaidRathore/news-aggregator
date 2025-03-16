import { searchArticles as searchGuardianArticles } from '@/services/guardianApi';
import { searchArticles as searchNewsApiArticles } from '@/services/newsApi';
import { searchArticles as searchNYTimesArticles } from '@/services/nytimesApi';
import type { ArticleParams, ArticleResponse } from '@/types/article';
import { useQuery } from '@tanstack/react-query';

// Function to fetch articles from all sources
const fetchArticlesFromAllSources = async (params: ArticleParams): Promise<ArticleResponse> => {
    try {
        // Fetch articles from all sources in parallel
        const [newsApiResponse, guardianResponse, nyTimesResponse] = await Promise.all([
            searchNewsApiArticles(params).catch(() => ({ articles: [], totalResults: 0 })),
            searchGuardianArticles(params).catch(() => ({ articles: [], totalResults: 0 })),
            searchNYTimesArticles(params).catch(() => ({ articles: [], totalResults: 0 }))
        ]);

        // Combine articles from all sources
        const combinedArticles = [
            ...newsApiResponse.articles,
            ...guardianResponse.articles,
            ...nyTimesResponse.articles
        ];

        // Sort combined articles by publishedAt (newest first)
        const sortedArticles = combinedArticles.sort((a, b) => {
            return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        });

        // Apply pagination if needed
        const startIndex = (params.page && params.pageSize)
            ? (params.page - 1) * params.pageSize
            : 0;

        const pageSize = params.pageSize || 20;

        const paginatedArticles = sortedArticles.slice(startIndex, startIndex + pageSize);

        return {
            articles: paginatedArticles,
            totalResults: newsApiResponse.totalResults + guardianResponse.totalResults + nyTimesResponse.totalResults
        };
    } catch (error) {
        console.error('Error fetching articles from all sources:', error);
        throw error;
    }
};

// Custom hook to fetch articles
export const useArticles = (params: ArticleParams) => {
    return useQuery<ArticleResponse, Error>(
        { queryKey: ['articles', params], queryFn: () => fetchArticlesFromAllSources(params) },

    );
};

// Custom hook to fetch top headlines
export const useTopHeadlines = (params: Partial<ArticleParams> = {}) => {
    const queryParams: ArticleParams = {
        ...params,
        sortBy: 'publishedAt'
    };

    return useQuery<ArticleResponse, Error>(
        { queryKey: ['topHeadlines', queryParams], queryFn: () => fetchArticlesFromAllSources(queryParams) },
    );
};

// Custom hook to fetch articles by category
export const useArticlesByCategory = (category: string, params: Partial<ArticleParams> = {}) => {
    const queryParams: ArticleParams = {
        ...params,
        categories: [category],
        sortBy: 'publishedAt'
    };

    return useQuery<ArticleResponse, Error>(
        { queryKey: ['articlesByCategory', category, params], queryFn: () => fetchArticlesFromAllSources(queryParams) },
    );
};