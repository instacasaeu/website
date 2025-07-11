# InstaCasa - Prefabricated Homes Website

## Overview

This is a full-stack web application for InstaCasa, a company specializing in prefabricated homes. The application is built with a React frontend and Express.js backend, designed to showcase home models, handle quote requests, and manage customer inquiries.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state
- **Form Handling**: React Hook Form with Zod validation
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Schema Validation**: Zod for runtime type validation
- **Development**: In-memory storage fallback for development

### Build & Deployment Strategy
- **Development**: Vite dev server with Express API proxy
- **Production**: Static frontend build served by Express
- **Bundling**: esbuild for server-side code bundling
- **Database Migrations**: Drizzle Kit for schema management

## Key Components

### Database Schema (PostgreSQL)
Located in `shared/schema.ts`:

1. **Home Models Table**
   - Product catalog with specifications (area, bedrooms, bathrooms)
   - Image URLs and feature arrays
   - Category-based organization (single-story, luxury, eco, etc.)

2. **Quote Requests Table**
   - Customer contact information
   - Home model preferences and location details
   - Status tracking (pending, contacted, quoted)

3. **Contact Messages Table**
   - General inquiries and support messages
   - Status management (new, read, responded)

### Frontend Components

1. **Landing Page Sections**
   - Hero section with call-to-action
   - Features showcase (fast construction, eco-friendly, energy efficient)
   - Home models gallery with filtering
   - About company information
   - Construction process explanation
   - Customer testimonials
   - Contact form

2. **Interactive Elements**
   - Quote request modal with form validation
   - Mobile-responsive navigation with hamburger menu
   - Image galleries and carousels
   - Form submissions with loading states

### Backend API Endpoints

1. **Home Models API**
   - `GET /api/home-models` - Fetch all home models
   - `GET /api/home-models/:id` - Fetch specific model details

2. **Quote Requests API**
   - `POST /api/quote-requests` - Submit quote request
   - Input validation with Zod schemas

3. **Contact Messages API**
   - `POST /api/contact-messages` - Submit contact form
   - Status management for follow-up

## Data Flow

1. **Client Request Flow**
   - React components trigger API calls via TanStack Query
   - Form submissions validated client-side with React Hook Form + Zod
   - Server-side validation ensures data integrity

2. **Server Processing**
   - Express middleware handles JSON parsing and logging
   - Route handlers validate input and interact with storage layer
   - Storage abstraction allows switching between memory and database

3. **Database Operations**
   - Drizzle ORM provides type-safe database queries
   - PostgreSQL handles data persistence and relationships
   - Migration system manages schema changes

## External Dependencies

### Frontend Libraries
- **UI Components**: Extensive Radix UI component library
- **Styling**: Tailwind CSS with custom configuration
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for date manipulation
- **Animations**: CSS-based animations with Tailwind

### Backend Libraries
- **Database**: Drizzle ORM with PostgreSQL dialect
- **Validation**: Zod for schema validation and type inference
- **Session Management**: Connect-pg-simple for PostgreSQL session store
- **Development Tools**: tsx for TypeScript execution

### Development Tools
- **Replit Integration**: Custom plugins for Replit development environment
- **Error Handling**: Runtime error overlay for development
- **Code Generation**: Cartographer plugin for code analysis

## Deployment Strategy

### Development Environment
- Vite dev server on frontend with HMR
- Express server with TypeScript compilation
- In-memory storage for rapid prototyping
- Environment variable configuration

### Production Build Process
1. Frontend: Vite builds optimized static assets
2. Backend: esbuild creates single executable file
3. Database: Drizzle migrations ensure schema consistency
4. Static serving: Express serves frontend from dist directory

### Environment Configuration
- Database URL configuration via environment variables
- Separate build commands for development and production
- Type checking and validation in CI/CD pipeline

### Scaling Considerations
- Stateless Express server design for horizontal scaling
- PostgreSQL connection pooling via Neon serverless
- CDN-ready static asset organization
- API rate limiting and error handling for production use