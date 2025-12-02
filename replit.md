# PAFDA Website - Punjab Agriculture, Food & Drug Authority

## Overview

This is a web application for the Punjab Agriculture, Food & Drug Authority (PAFDA), a government organization providing testing, training, and research services for food safety, agriculture inputs, and pharmaceuticals. The application showcases PAFDA's three main laboratory divisions (Agriculture, Food, and Drug), provides news updates, contact forms, and interactive calculators for quality testing assessments.

The application serves as an informational portal and public-facing website for PAFDA, designed to present a professional, credible institutional presence while providing practical tools for stakeholders in Punjab's agriculture, food, and pharmaceutical sectors.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript running on Vite for development and production builds.

**Routing**: Wouter library for lightweight client-side routing, supporting pages for Home, About, Services (Agriculture/Food/Drug labs), News, Contact, and Useful Tools.

**UI Component System**: Shadcn UI with Radix UI primitives, following the "new-york" style variant. Components are built with full accessibility support (ARIA compliance) and include forms, navigation menus, dialogs, cards, and interactive elements.

**Design System**: Material Design-inspired institutional design with:
- Typography using Inter/Roboto font families
- Tailwind CSS for styling with custom color scheme based on HSL values
- Responsive grid layouts (mobile-first approach)
- Consistent spacing primitives and container strategies
- Custom CSS variables for theming support (light/dark modes)

**State Management**: TanStack React Query (v5) for server state management, data fetching, and caching. No global client state management library is used - component state is managed locally with React hooks.

**Form Handling**: React Hook Form with Zod for validation, particularly for contact forms and calculator inputs.

### Backend Architecture

**Server Framework**: Express.js running on Node.js with TypeScript.

**API Structure**: RESTful API with the following endpoints:
- `GET /api/news` - Fetch all news articles
- `GET /api/news/:slug` - Fetch single news article by slug
- `POST /api/contact` - Submit contact form
- `POST /api/calculator-results` - Store calculator results (for analytics)

**Request/Response Flow**: JSON-based API with middleware for body parsing, logging, and error handling. Custom middleware logs request duration and response data for API endpoints.

**Development Setup**: Vite middleware integration for HMR (Hot Module Replacement) in development, with separate production build process using esbuild for server bundling.

### Data Storage Solutions

**ORM**: Drizzle ORM for type-safe database interactions with PostgreSQL.

**Database Schema**:
- `news_articles` - Stores news/updates with title, slug, excerpt, images, and gallery
- `contact_submissions` - Stores contact form submissions with name, email, subject, message
- `calculator_results` - Stores test calculator results for analytics (category, test type, inputs, results, quality rating)

**In-Memory Fallback**: MemStorage class provides in-memory storage implementation for development/testing, using Maps to store data with sample news articles pre-populated.

**Database Configuration**: Drizzle Kit configured with migrations directory and PostgreSQL dialect, expecting `DATABASE_URL` environment variable for connection string.

**Data Models**: Zod schemas derived from Drizzle tables for runtime validation of API inputs, ensuring type safety across frontend and backend.

### External Dependencies

**Database**: PostgreSQL via Neon Database serverless driver (`@neondatabase/serverless`), supporting serverless edge deployments.

**Session Management**: `connect-pg-simple` for PostgreSQL-backed session storage (prepared for future authentication features).

**UI Libraries**:
- Radix UI primitives for accessible component foundations (20+ component packages)
- Embla Carousel for image galleries
- Lucide React for iconography
- Class Variance Authority and clsx/tailwind-merge for conditional styling

**Build Tools**:
- Vite for frontend bundling and development server
- esbuild for backend production builds
- TypeScript for type checking across entire codebase
- PostCSS with Tailwind CSS and Autoprefixer

**Development Tools** (Replit-specific):
- `@replit/vite-plugin-runtime-error-modal` for error overlays
- `@replit/vite-plugin-cartographer` for code navigation
- `@replit/vite-plugin-dev-banner` for development indicators

**Utilities**:
- date-fns for date formatting and manipulation
- nanoid for unique ID generation
- zod for runtime type validation and schema generation

### Authentication & Authorization

Currently not implemented. The application is a public-facing informational website with no user authentication required. Contact form submissions and calculator results are stored without user accounts. Future implementation may use session-based authentication via `connect-pg-simple`.

### API Integration Pattern

The frontend uses a centralized API client (`apiRequest` function) that:
- Handles JSON serialization/deserialization
- Includes credentials for future session support
- Provides consistent error handling with HTTP status validation
- Integrates with React Query for caching and background refetching

React Query is configured with:
- Infinite stale time (no automatic refetching)
- No refetch on window focus
- Custom query function that handles 401 responses flexibly