# InstaCasa - Prefabricated Homes Website

## Overview

This is a static website for InstaCasa, a company specializing in prefabricated homes across European markets. The website has been converted from a full-stack application to a static HTML site for easy deployment and maintenance.

## User Preferences

Preferred communication style: Simple, everyday language.
Target Markets: Southern European coastal countries and Western EU
Office Location: Berlin, Germany
Email Contact: instacasaeu@gmail.com (no phone number)

## Recent Changes (January 2025)

- **Converted to Static Site**: Removed React/Express architecture, created single index.html file
- **Database Removed**: Eliminated PostgreSQL dependency, using email-based quote system
- **Email Integration**: Quote forms generate mailto: links to instacasaeu@gmail.com
- **Language Support**: Added infrastructure for 7 languages (EN, DE, ES, IT, FR, PT, EL)
- **Quote Form Updates**: Added home size field, removed home model selection field
- **GitHub Ready**: Prepared for easy GitHub Pages deployment

## Current Architecture

### Static Website
- **Technology**: Pure HTML, CSS, JavaScript
- **Styling**: Tailwind CSS via CDN
- **Email System**: mailto: links for quote submissions
- **Multi-language**: Infrastructure ready for 7 European languages
- **Deployment**: GitHub Pages compatible

### Key Features
- Mobile-responsive design
- Quote request forms (modal and contact section)
- Professional presentation for European markets
- SEO optimized with proper meta tags
- Contact information easily configurable

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