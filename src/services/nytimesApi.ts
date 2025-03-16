import { nyTimesApiAxios } from './api';
import type {
    Article,
    ArticleParams,
    ArticleResponse,
    NYTimesAPIResponse,
    NYTimesAPIDoc,
    NYTimesTopStoriesResponse,
    NYTimesTopStoriesResult
} from '@/types/article';

// Convert NY Times article to common Article format
const mapNYTimesArticle = (article: NYTimesAPIDoc): Article => {
    // Find the main image URL if available
    const mainImage = article.multimedia?.find(
        (media) => media.type === 'image' && media.subtype === 'xlarge'
    );

    // Format author information
    let author = null;
    if (article.byline?.original) {
        author = article.byline.original.replace('By ', '');
    }

    return {
        id: article.uri.split('/').pop() || article._id,
        title: article.headline.main,
        description: article.abstract,
        content: article.lead_paragraph,
        author,
        publishedAt: article.pub_date,
        url: article.web_url,
        urlToImage: mainImage ? `https://www.nytimes.com/${mainImage.url}` : null,
        source: {
            id: 'new-york-times',
            name: 'The New York Times'
        },
        category: article.section_name
    };
};

// Search for articles
export const searchArticles = async (params: ArticleParams): Promise<ArticleResponse> => {
    const { q, categories, from, to, page = 1, } = params;

    // NY Times uses 'begin_date' and 'end_date' in YYYYMMDD format
    const formatDate = (dateString?: string) => {
        if (!dateString) return undefined;
        const date = new Date(dateString);
        return `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
    };

    // Construct query parameters
    const queryParams: Record<string, string | number | undefined> = {
        'page': page,
        'sort': 'newest',
        'fl': 'headline,abstract,web_url,pub_date,byline,multimedia,lead_paragraph,section_name,_id,uri'
    };

    // Add optional parameters if provided
    if (q) queryParams.q = q;
    if (categories?.length && categories[0] !== 'all') {
        queryParams.fq = `section_name:(${categories.map(c => `"${c}"`).join(' OR ')})`;
    }
    if (from) queryParams.begin_date = formatDate(from);
    if (to) queryParams.end_date = formatDate(to);

    const response = await nyTimesApiAxios.get<NYTimesAPIResponse>('/search/v2/articlesearch.json', { params: queryParams });

    // Map response to common format
    return {
        articles: response.data.response.docs.map(mapNYTimesArticle),
        totalResults: response.data.response.meta.hits
    };
};

// Get articles by section
export const getArticlesBySection = async (section: string): Promise<ArticleResponse> => {
    const response = await nyTimesApiAxios.get<NYTimesTopStoriesResponse>(`/topstories/v2/${section}.json`);

    // Map the response to our common format
    const articles = response.data.results.map((article: NYTimesTopStoriesResult) => {
        return {
            id: article.uri.split('/').pop() || `nyt-${article.title.replace(/\s+/g, '-').toLowerCase()}`,
            title: article.title,
            description: article.abstract,
            content: article.abstract,
            author: article.byline?.replace('By ', '') || null,
            publishedAt: article.published_date,
            url: article.url,
            urlToImage: article.multimedia?.[0]?.url || null,
            source: {
                id: 'new-york-times',
                name: 'The New York Times'
            },
            category: article.section
        };
    });

    return {
        articles,
        totalResults: articles.length
    };
};

// Get available sections
export const getSections = async () => {
    // NY Times doesn't have an API endpoint for sections, so we'll return a predefined list
    return [
        { id: 'arts', name: 'Arts' },
        { id: 'automobiles', name: 'Automobiles' },
        { id: 'books', name: 'Books' },
        { id: 'business', name: 'Business' },
        { id: 'fashion', name: 'Fashion' },
        { id: 'food', name: 'Food' },
        { id: 'health', name: 'Health' },
        { id: 'home', name: 'Home' },
        { id: 'insider', name: 'Insider' },
        { id: 'magazine', name: 'Magazine' },
        { id: 'movies', name: 'Movies' },
        { id: 'politics', name: 'Politics' },
        { id: 'science', name: 'Science' },
        { id: 'sports', name: 'Sports' },
        { id: 'technology', name: 'Technology' },
        { id: 'theater', name: 'Theater' },
        { id: 'travel', name: 'Travel' },
        { id: 'upshot', name: 'Upshot' },
        { id: 'us', name: 'U.S.' },
        { id: 'world', name: 'World' }
    ];
};