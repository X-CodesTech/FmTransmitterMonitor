# FM Transmitter Control System

## Overview

This is a full-stack web application for monitoring and controlling an FM radio transmitter. The system provides real-time data visualization through gauges and meters, mimicking a professional broadcast transmitter interface. It uses a modern React frontend with a Node.js/Express backend, featuring real-time updates via WebSockets.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom radio-themed color variables
- **State Management**: TanStack Query for server state, React hooks for local state
- **Routing**: Wouter for lightweight client-side routing
- **Real-time Communication**: WebSocket client for live data updates

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API with real-time WebSocket layer
- **Database**: PostgreSQL with Drizzle ORM (configured but using in-memory storage for development)
- **Development Server**: Vite integration for hot module replacement

### Build System
- **Frontend Build**: Vite with React plugin
- **Backend Build**: esbuild for production bundling
- **Development**: tsx for TypeScript execution
- **CSS Processing**: PostCSS with Tailwind CSS and Autoprefixer

## Key Components

### Data Models
- **TransmitterData**: Core model tracking forward power, reflected power, frequency, RF efficiency, target power, on-air status, and timestamps
- **User**: Basic user model for future authentication features

### UI Components
- **CircularGauge**: SVG-based analog meter with needle animation
- **LinearGauge**: Horizontal bar gauge with scale markers
- **StatusButton**: Radio-style buttons with color variants (green, yellow, orange, gray)
- **Custom Styling**: Professional radio equipment aesthetic with dark panels and bright status indicators

### API Endpoints
- `GET /api/transmitter/data` - Fetch latest transmitter readings
- `POST /api/transmitter/settings` - Update transmitter configuration
- WebSocket connection for real-time data streaming

## Data Flow

1. **Initialization**: Client fetches initial transmitter data via REST API
2. **Real-time Updates**: WebSocket connection established for live data streaming
3. **User Interactions**: Settings changes sent via POST requests to update transmitter configuration
4. **State Synchronization**: Server broadcasts updates to all connected clients via WebSocket

## External Dependencies

### Core Framework Dependencies
- React ecosystem (React, React DOM, React Query)
- Express.js server framework
- Drizzle ORM for database operations
- Neon Database serverless driver

### UI and Styling
- Radix UI primitives for accessible components
- Tailwind CSS for utility-first styling
- Lucide React for icons
- shadcn/ui component library

### Development Tools
- Vite for frontend build and development
- TypeScript for type safety
- ESBuild for backend bundling
- Replit-specific plugins for development environment

## Deployment Strategy

### Development
- Concurrent frontend (Vite) and backend (tsx) development servers
- Hot module replacement for rapid iteration
- In-memory storage for simplified local development
- WebSocket server integrated with HTTP server

### Production
- Frontend built as static assets served by Express
- Backend bundled as single Node.js module
- PostgreSQL database connection via environment variables
- Single process serving both static assets and API endpoints

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- July 02, 2025. Initial setup