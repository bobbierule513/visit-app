# Website Visits Tracking API

A high-performance REST API designed to track website visits by country, built with Node.js and Redis.

## Features

- Record website visits by country code
- Retrieve collected statistics for all countries
- Built for high load (1,000 requests per second)
- Redis-based storage for optimal performance

## Prerequisites

- Node.js (v14 or higher)
- Redis server

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   REDIS_URL=redis://localhost:6379
   NODE_ENV=development
   ```

## Running the Application

### Development Mode

```
npm run dev
```

### Production Mode

```
npm start
```

### Running Tests

```
npm test
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

Response:

```json
{
  "success": true,
  "countryCode": "us",
  "count": 42
}
```

### Get Visit Statistics

```
GET /api/stats
```

Response:

```json
{
  "us": 42,
  "ru": 17,
  "de": 23
}
```

## Performance Considerations

- Uses Redis hash for efficient storage and retrieval
- Optimized for high throughput (1,000 requests per second)
- Minimal middleware for reduced latency

## Error Handling

The API includes comprehensive error handling with appropriate HTTP status codes and error messages.

## Deployment

The application can be easily deployed to any environment with Node.js and Redis support, including:

- Docker containers
- Kubernetes clusters
- Cloud platforms (AWS, GCP, Azure)
- Traditional VPS hosting
