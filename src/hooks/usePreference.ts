import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserPreferences } from '@/types/article';

interface PreferencesState extends UserPreferences {
    setPreferredSources: (sources: string[]) => void;
    setPreferredCategories: (categories: string[]) => void;
    setPreferredAuthors: (authors: string[]) => void;
    toggleDarkMode: () => void;
    resetPreferences: () => void;
}

// Default preferences
const defaultPreferences: UserPreferences = {
    preferredSources: [],
    preferredCategories: [],
    preferredAuthors: [],
    darkMode: false,
};

// Create a store with Zustand for user preferences
export const usePreferences = create<PreferencesState>()(
    persist(
        (set) => ({
            ...defaultPreferences,

            setPreferredSources: (sources) => set({ preferredSources: sources }),

            setPreferredCategories: (categories) => set({ preferredCategories: categories }),

            setPreferredAuthors: (authors) => set({ preferredAuthors: authors }),

            toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

            resetPreferences: () => set(defaultPreferences),
        }),
        {
            name: 'news-aggregator-preferences',
        }
    )
);

// Custom hook to apply dark mode
export const useDarkMode = () => {
    const { darkMode, toggleDarkMode } = usePreferences();

    // Apply dark mode class to document
    if (typeof document !== 'undefined') {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }

    return { darkMode, toggleDarkMode };
};