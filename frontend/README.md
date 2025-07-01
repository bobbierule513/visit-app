# Website Visit Tracker Frontend

A React-based web application to track website visits by country and visualize statistics.

## Features

- Record website visits by country
- View visit statistics in a table format
- Visualize visit data with interactive charts
- Real-time updates when new visits are recorded

## Prerequisites

- Node.js (v14 or higher)
- Backend API running (see backend README)

## Installation

1. Install dependencies:

   ```
   npm install
   ```

2. Create a `.env` file in the root directory with the following variables (optional):
   ```
   REACT_APP_API_URL=http://localhost:3000/api
   ```

## Running the Application

### Development Mode

```
npm start
```

This will start the development server on [http://localhost:3000](http://localhost:3000).

### Production Build

```
npm run build
```

This will create a production-ready build in the `build` folder.

## Usage

1. Select a country from the dropdown menu
2. Click "Record Visit" to register a visit from that country
3. View the updated statistics in the table and chart
4. Use the "Refresh Stats" button to manually update the statistics

## Technologies Used

- React
- Chart.js for data visualization
- Axios for API communication

## Deployment

The frontend can be deployed to various hosting platforms:

- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service
