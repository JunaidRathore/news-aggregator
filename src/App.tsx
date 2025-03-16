import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useDarkMode } from "./hooks/usePreference";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import ArticleDetail from "./pages/ArticleDetail";
import UserSettings from "./pages/UserSettings";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Toaster } from "./components/ui/toaster";

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Create router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/article/:id",
        element: <ArticleDetail />,
      },
      {
        path: "/settings",
        element: <UserSettings />,
      },
    ],
  },
]);

const App = () => {
  const { darkMode } = useDarkMode();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme={darkMode ? "dark" : "light"}>
        <RouterProvider router={router} />
        <Toaster />
        {process.env.NODE_ENV === "development" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
