import { newsApiAxios } from './api';
import type { Article, ArticleParams, ArticleResponse, NewsAPIArticle, NewsAPIResponse } from '@/types/article';

// Convert NewsAPI article to common Article format
const mapNewsApiArticle = (article: NewsAPIArticle): Article => {
    return {
        id: `newsapi-${article.url.split('/').pop() || Math.random().toString(36).substring(2, 15)}`,
        title: article.title,
        description: article.description,
        content: article.content,
        author: article.author,
        publishedAt: article.publishedAt,
        url: article.url,
        urlToImage: article.urlToImage,
        source: {
            id: article.source.id,
            name: article.source.name,
        },
        category: null // NewsAPI doesn't provide category in the article response
    };
};

// Get top headlines
export const getTopHeadlines = async (params: ArticleParams): Promise<ArticleResponse> => {
    const { sources, categories, q, page = 1, pageSize = 20, sortBy = 'publishedAt' } = params;

    // Construct query parameters
    const queryParams: Record<string, string | number> = {
        page,
        pageSize,
        sortBy
    };

    // Add optional parameters if provided
    if (q) queryParams.q = q;
    if (sources?.length) queryParams.sources = sources.join(',');
    if (categories?.length && categories[0] !== 'all') queryParams.category = categories[0]; // NewsAPI only supports one category at a time

    const response = await newsApiAxios.get<NewsAPIResponse>('/top-headlines', { params: queryParams });

    // Map response to common format
    return {
        articles: response.data.articles.map(mapNewsApiArticle),
        totalResults: response.data.totalResults
    };
};

// Search for articles
export const searchArticles = async (params: ArticleParams): Promise<ArticleResponse> => {
    const { q, sources, from, to, page = 1, pageSize = 20, sortBy = 'publishedAt' } = params;

    // Construct query parameters
    const queryParams: Record<string, string | number> = {
        page,
        pageSize,
        sortBy
    };

    // Add optional parameters if provided
    if (q) queryParams.q = q;
    if (sources?.length) queryParams.sources = sources.join(',');
    if (from) queryParams.from = from;
    if (to) queryParams.to = to;

    const response = await newsApiAxios.get<NewsAPIResponse>('/everything', { params: queryParams });

    // Map response to common format
    return {
        articles: response.data.articles.map(mapNewsApiArticle),
        totalResults: response.data.totalResults
    };
};

// Get available sources
export const getSources = async (category?: string, language?: string, country?: string) => {
    const params: Record<string, string> = {};

    if (category) params.category = category;
    if (language) params.language = language;
    if (country) params.country = country;

    const response = await newsApiAxios.get('/sources', { params });
    return response.data.sources;
};