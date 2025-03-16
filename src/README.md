# NewsHub - News Aggregator

NewsHub is a modern, responsive news aggregator web application built with React, TypeScript, and Tailwind CSS. It pulls articles from multiple sources including NewsAPI, The Guardian, and New York Times, allowing users to search, filter, and personalize their news feed.

![NewsHub Screenshot](screenshot.png)

## Features

- **Article Search and Filtering**: Search for articles by keyword and filter results by date, category, and source
- **Personalized News Feed**: Customize your news feed by selecting preferred sources, categories, and authors
- **Mobile-Responsive Design**: Optimized for viewing on all device sizes
- **Modern UI with Animations**: Sleek, intuitive interface with smooth animations powered by Framer Motion
- **Dark Mode Support**: Toggle between light and dark themes
- **Infinite Scrolling**: Load more articles as you scroll
- **Related Articles**: View related articles based on source and category
- **Docker Integration**: Containerized application for easy deployment

## Tech Stack

- **Frontend**: React.js with TypeScript
- **UI Components**: shadcn/ui with Tailwind CSS
- **State Management**: React Query for server state, Zustand for client state
- **HTTP Client**: Axios
- **Routing**: React Router
- **Animations**: Framer Motion
- **Containerization**: Docker

## Data Sources

The application fetches articles from three major news providers:

1. **NewsAPI**: A comprehensive source with articles from more than 70,000 news sources
2. **The Guardian**: One of the most respected news sources in the world
3. **New York Times**: Another highly respected news source with various categories

## Project Structure

The project follows a well-organized structure:

```
news-aggregator/
├── src/
│   ├── components/     # UI components
│   │   ├── ui/         # shadcn UI components
│   │   ├── layout/     # Layout components
│   │   ├── articles/   # Article-related components
│   │   ├── search/     # Search-related components
│   │   └── user/       # User preference components
│   ├── hooks/          # Custom React hooks
│   ├── services/       # API services
│   ├── types/          # TypeScript types and interfaces
│   ├── utils/          # Utility functions
│   ├── contexts/       # React contexts
│   ├── pages/          # Page components
│   └── styles/         # Global styles
├── public/             # Static assets
├── .dockerignore       # Docker ignore file
├── Dockerfile          # Docker configuration
├── docker-compose.yml  # Docker Compose configuration
├── nginx.conf          # Nginx configuration for Docker
└── README.md           # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Docker (optional, for containerized deployment)

### API Keys

You need to obtain API keys for the news sources:

1. **NewsAPI**: Get your API key from [https://newsapi.org/register](https://newsapi.org/register)
2. **The Guardian**: Get your API key from [https://open-platform.theguardian.com/access/](https://open-platform.theguardian.com/access/)
3. **New York Times**: Get your API key from [https://developer.nytimes.com/get-started](https://developer.nytimes.com/get-started)

### Environment Setup

Create a `.env` file in the root of the project with the following content:

```
VITE_NEWS_API_KEY=your_news_api_key
VITE_GUARDIAN_API_KEY=your_guardian_api_key
VITE_NY_TIMES_API_KEY=your_nytimes_api_key
```

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/news-aggregator.git
cd news-aggregator
```

2. Install dependencies:

```bash
npm install
# or with yarn
yarn install
```

3. Start the development server:

```bash
npm run dev
# or with yarn
yarn dev
```

The app will be available at `http://localhost:5173`.

## Building for Production

### Using npm/yarn

```bash
npm run build
# or with yarn
yarn build
```

The build artifacts will be stored in the `dist/` directory.

### Using Docker

1. Build the Docker image:

```bash
docker build -t news-aggregator .
```

2. Run the container:

```bash
docker run -p 8080:80 news-aggregator
```

The app will be available at `http://localhost:8080`.

### Using Docker Compose

```bash
docker-compose up -d
```

The app will be available at `http://localhost:8080`.

## Best Practices Implemented

This project follows several best practices in software development:

### DRY (Don't Repeat Yourself)

- Common functionality is extracted into reusable hooks and components
- API service layers abstract away the details of data fetching

### KISS (Keep It Simple, Stupid)

- Clear, straightforward component structure
- Intuitive user interface without unnecessary complexity

### SOLID Principles

- **Single Responsibility**: Each component and function has a focused purpose
- **Open/Closed**: Components are designed to be extended without modifying existing code
- **Liskov Substitution**: Components with similar functionality maintain consistent interfaces
- **Interface Segregation**: Components only depend on interfaces they use
- **Dependency Inversion**: High-level modules depend on abstractions, not details

## License

This project is licensed under the MIT License - see the LICENSE file for details.
