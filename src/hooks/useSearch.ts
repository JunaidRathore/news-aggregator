import { useState, useCallback, useEffect } from 'react';
import { useArticles } from './useArticles';
import type { ArticleParams } from '@/types/article';
import { usePreferences } from './usePreference';

export const useSearch = (initialParams: Partial<ArticleParams> = {}) => {
    // Get user preferences
    const { preferredSources, preferredCategories } = usePreferences();

    // State for search parameters
    const [searchParams, setSearchParams] = useState<ArticleParams>({
        q: '',
        sources: initialParams.sources || preferredSources,
        categories: initialParams.categories || preferredCategories,
        page: 1,
        pageSize: 20,
        sortBy: 'publishedAt',
        ...initialParams
    });

    // Update search parameters when preferences change
    useEffect(() => {
        if (!initialParams.sources && preferredSources.length > 0) {
            setSearchParams(prev => ({ ...prev, sources: preferredSources }));
        }

        if (!initialParams.categories && preferredCategories.length > 0) {
            setSearchParams(prev => ({ ...prev, categories: preferredCategories }));
        }
    }, [preferredSources, preferredCategories, initialParams.sources, initialParams.categories]);

    // Fetch articles using the search parameters
    const { data, isLoading, isError, error, refetch } = useArticles(searchParams);

    // Function to update search query
    const setSearchQuery = useCallback((query: string) => {
        setSearchParams(prev => ({ ...prev, q: query, page: 1 }));
    }, []);

    // Function to update sources filter
    const setSourcesFilter = useCallback((sources: string[]) => {
        setSearchParams(prev => ({ ...prev, sources, page: 1 }));
    }, []);

    // Function to update categories filter
    const setCategoriesFilter = useCallback((categories: string[]) => {
        setSearchParams(prev => ({ ...prev, categories, page: 1 }));
    }, []);

    // Function to update date range filter
    const setDateRangeFilter = useCallback((from?: string, to?: string) => {
        setSearchParams(prev => ({ ...prev, from, to, page: 1 }));
    }, []);

    // Function to update sort order
    const setSortOrder = useCallback((sortBy: 'relevancy' | 'popularity' | 'publishedAt') => {
        setSearchParams(prev => ({ ...prev, sortBy }));
    }, []);

    // Function to go to a specific page
    const goToPage = useCallback((page: number) => {
        setSearchParams(prev => ({ ...prev, page }));
    }, []);

    // Function to reset all filters
    const resetFilters = useCallback(() => {
        setSearchParams({
            q: searchParams.q,
            page: 1,
            pageSize: 20,
            sortBy: 'publishedAt'
        });
    }, [searchParams.q]);

    return {
        searchParams,
        articles: data?.articles || [],
        totalResults: data?.totalResults || 0,
        isLoading,
        isError,
        error,
        refetch,
        setSearchQuery,
        setSourcesFilter,
        setCategoriesFilter,
        setDateRangeFilter,
        setSortOrder,
        goToPage,
        resetFilters
    };
};