# Website Visit Tracker

A full-stack TypeScript application to track website visits by country, built with Node.js, Express, Redis, and React.

## Project Structure

This project consists of two main parts:

- **Backend**: A Node.js/TypeScript REST API with Redis storage
- **Frontend**: A React/TypeScript web application

## Features

- Record website visits by country
- Retrieve visit statistics in real-time
- Visualize visit data with interactive charts
- High-performance design (supports 1,000 requests per second)
- Scalable architecture
- Fully typed with TypeScript

## Prerequisites

- Node.js (v14 or higher)
- Redis server (v6 or higher)
- Docker and Docker Compose (for containerized deployment)

## Quick Start

### Option 1: Running with Docker Compose

The easiest way to run the entire stack is using Docker Compose:

```
docker-compose up -d
```

This will start the backend, frontend, and Redis services together. The application will be available at:

- Frontend: http://localhost
- Backend API: http://localhost:3000/api

### Option 2: Manual Setup

#### Backend Setup

1. Navigate to the backend directory:

   ```
   cd backend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file with the following variables:

   ```
   PORT=3000
   REDIS_URL=redis://localhost:6379
   NODE_ENV=development
   ```

4. Build the TypeScript code:

   ```
   npm run build
   ```

5. Start the backend server:

   ```
   npm start
   ```

   Or for development:

   ```
   npm run dev
   ```

#### Frontend Setup

1. Navigate to the frontend directory:

   ```
   cd frontend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file with the following variables (optional):

   ```
   REACT_APP_API_URL=http://localhost:3000/api
   ```

4. Start the frontend development server:

   ```
   npm start
   ```

## API Endpoints

### Record a Visit

```
GET /api/visits/:countryCode
```

Example:

```
GET /api/visits/us
```

### Get Visit Statistics

```
GET /api/stats
```

## Technology Stack

- **Backend**:

  - Node.js with Express
  - TypeScript for type safety
  - Redis for high-performance data storage
  - Jest for testing

- **Frontend**:
  - React with TypeScript
  - Chart.js for data visualization
  - Axios for API communication

## Performance Considerations

- Redis is used for high-performance data storage
- The API is designed to handle 1,000 requests per second
- The frontend uses efficient React patterns for rendering

## Deployment

### Docker Deployment

The project includes Docker configuration for easy deployment:

- Individual Dockerfiles for backend and frontend
- docker-compose.yml for orchestrating the entire stack
- Nginx configuration for serving the frontend and proxying API requests

### Other Deployment Options

Both the backend and frontend are designed to be easily deployed to any environment:

- Kubernetes clusters
- Cloud platforms (AWS, GCP, Azure)
- Traditional VPS hosting

## Testing

Run tests for the backend:

```
cd backend
npm test
```

## License

MIT
