import { guardianApiAxios } from './api';
import type { Article, ArticleParams, ArticleResponse, GuardianAPIResponse, GuardianAPIResult } from '@/types/article';

// Convert Guardian article to common Article format
const mapGuardianArticle = (article: GuardianAPIResult): Article => {
    return {
        id: article.id,
        title: article.webTitle,
        description: article.fields?.trailText || null,
        content: article.fields?.body || null,
        author: article.fields?.byline || null,
        publishedAt: article.webPublicationDate,
        url: article.webUrl,
        urlToImage: article.fields?.thumbnail || null,
        source: {
            id: 'the-guardian',
            name: 'The Guardian'
        },
        category: article.sectionName
    };
};

// Search for articles
export const searchArticles = async (params: ArticleParams): Promise<ArticleResponse> => {
    const { q, categories, from, to, page = 1, pageSize = 20 } = params;

    // Construct query parameters
    const queryParams: Record<string, string | number | undefined> = {
        page,
        'page-size': pageSize,
        'show-fields': 'headline,trailText,byline,thumbnail,body',
        'order-by': 'newest'
    };

    // Add optional parameters if provided
    if (q) queryParams.q = q;
    if (categories?.length && categories[0] !== 'all') {
        queryParams.section = categories.join('|');
    }
    if (from) queryParams.from = from;
    if (to) queryParams.to = to;

    const response = await guardianApiAxios.get<GuardianAPIResponse>('/search', { params: queryParams });

    // Map response to common format
    return {
        articles: response.data.response.results.map(mapGuardianArticle),
        totalResults: response.data.response.total
    };
};

// Get articles by section
export const getArticlesBySection = async (section: string, params: Partial<ArticleParams> = {}): Promise<ArticleResponse> => {
    const { page = 1, pageSize = 20 } = params;

    const queryParams: Record<string, string | number | undefined> = {
        page,
        'page-size': pageSize,
        'show-fields': 'headline,trailText,byline,thumbnail,body',
        'order-by': 'newest'
    };

    const response = await guardianApiAxios.get<GuardianAPIResponse>(`/search`, {
        params: {
            ...queryParams,
            section
        }
    });

    return {
        articles: response.data.response.results.map(mapGuardianArticle),
        totalResults: response.data.response.total
    };
};

// Get available sections
export const getSections = async () => {
    const response = await guardianApiAxios.get('/sections');
    return response.data.response.results;
};