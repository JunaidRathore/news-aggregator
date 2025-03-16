import axios from 'axios';

export const newsApiAxios = axios.create({
    baseURL: 'https://newsapi.org/v2',
    headers: {
        'X-Api-Key': import.meta.env.VITE_NEWS_API_KEY || '0d2b077dee6f417496a4ce989db4b788',
    },
});

export const guardianApiAxios = axios.create({
    baseURL: 'https://content.guardianapis.com',
    params: {
        'api-key': import.meta.env.VITE_GUARDIAN_API_KEY || 'f46bbf3b-1894-4b26-aa0d-8f852dae8af9',
    },
});

export const nyTimesApiAxios = axios.create({
    baseURL: 'https://api.nytimes.com/svc',
    params: {
        'api-key': import.meta.env.VITE_NY_TIMES_API_KEY || 'TAdYKFxE1HnX7ne3uiFB91qVx4VrlkFM',
    },
});

// Global axios error handler
const setupAxiosInterceptors = () => {
    const errorHandler = (error: { response?: { status: number } }) => {
        const statusCode = error.response?.status;

        // Log to console for debugging
        if (import.meta.env.DEV) {
            console.error('API Error:', error);
        }

        // Handle rate limiting
        if (statusCode === 429) {
            console.error('Rate limit exceeded for API');
        }

        // Handle auth errors
        if (statusCode === 401 || statusCode === 403) {
            console.error('Authentication error with API');
        }

        return Promise.reject(error);
    };

    // Apply interceptor to all axios instances
    newsApiAxios.interceptors.response.use(
        (response) => response,
        errorHandler
    );

    guardianApiAxios.interceptors.response.use(
        (response) => response,
        errorHandler
    );

    nyTimesApiAxios.interceptors.response.use(
        (response) => response,
        errorHandler
    );
};

// Call the setup function
setupAxiosInterceptors();