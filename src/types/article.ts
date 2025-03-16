// Common interface for all article sources
export interface Article {
    id: string;
    title: string;
    description: string | null;
    content: string | null;
    author: string | null;
    publishedAt: string;
    url: string;
    urlToImage: string | null;
    source: {
        id: string | null;
        name: string;
    };
    category: string | null;
}


// Standard response structure for all APIs
export interface ArticleResponse {
    articles: Article[];
    totalResults: number;
}

// Parameters for fetching articles
export interface ArticleParams {
    q?: string;
    sources?: string[];
    categories?: string[];
    authors?: string[];
    from?: string;
    to?: string;
    page?: number;
    pageSize?: number;
    sortBy?: 'relevancy' | 'popularity' | 'publishedAt';
}

// User preferences for personalized feed
export interface UserPreferences {
    preferredSources: string[];
    preferredCategories: string[];
    preferredAuthors: string[];
    darkMode: boolean;
}

// Source definition
export interface Source {
    id: string;
    name: string;
    description?: string;
    url?: string;
    category?: string;
    language?: string;
    country?: string;
}

// Category definition
export interface Category {
    id: string;
    name: string;
}

// NewsAPI specific types
export interface NewsAPIResponse {
    status: string;
    totalResults: number;
    articles: NewsAPIArticle[];
}

export interface NewsAPIArticle {
    source: {
        id: string | null;
        name: string;
    };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

// Guardian API specific types
export interface GuardianAPIResponse {
    response: {
        status: string;
        userTier: string;
        total: number;
        startIndex: number;
        pageSize: number;
        currentPage: number;
        pages: number;
        results: GuardianAPIResult[];
    };
}

export interface GuardianAPIResult {
    id: string;
    type: string;
    sectionId: string;
    sectionName: string;
    webPublicationDate: string;
    webTitle: string;
    webUrl: string;
    apiUrl: string;
    fields?: {
        headline?: string;
        trailText?: string;
        byline?: string;
        thumbnail?: string;
        body?: string;
    };
}

// New York Times API specific types
export interface NYTimesAPIResponse {
    status: string;
    copyright: string;
    response: {
        docs: NYTimesAPIDoc[];
        meta: {
            hits: number;
            offset: number;
            time: number;
        };
    };
}

export interface NYTimesAPIDoc {
    _id: string;
    abstract: string;                // Add this
    web_url: string;                 // Add this
    lead_paragraph: string;          // Add this
    multimedia: NYTimesAPIMultimedia[];
    headline: {
        main: string;
        kicker: string | null;
        content_kicker: string | null;
        print_headline: string | null;
        name: string | null;
        seo: string | null;
        sub: string | null;
    };
    pub_date: string;
    document_type: string;
    byline: {
        original: string | null;
        person: NYTimesAPIPerson[];
        organization: string | null;
    };
    type_of_material: string;
    section_name: string;
    uri: string;
}

export interface NYTimesAPIMultimedia {
    rank: number;
    subtype: string;
    caption: string | null;
    credit: string | null;
    type: string;
    url: string;
    height: number;
    width: number;
}

export interface NYTimesAPIPerson {
    firstname: string;
    middlename: string | null;
    lastname: string;
    qualifier: string | null;
    title: string | null;
    role: string;
    organization: string;
    rank: number;
}

export interface NYTimesTopStoriesResponse {
    status: string;
    copyright: string;
    section: string;
    last_updated: string;
    num_results: number;
    results: NYTimesTopStoriesResult[];
}

export interface NYTimesTopStoriesResult {
    section: string;
    subsection: string;
    title: string;
    abstract: string;
    url: string;
    uri: string;
    byline: string;
    item_type: string;
    updated_date: string;
    created_date: string;
    published_date: string;
    material_type_facet: string;
    kicker: string;
    des_facet: string[];
    org_facet: string[];
    per_facet: string[];
    geo_facet: string[];
    multimedia: NYTimesTopStoriesMultimedia[];
    short_url: string;
}

export interface NYTimesTopStoriesMultimedia {
    url: string;
    format: string;
    height: number;
    width: number;
    type: string;
    subtype: string;
    caption: string;
    copyright: string;
}