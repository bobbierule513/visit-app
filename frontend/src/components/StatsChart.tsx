import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Define types
interface StatsChartProps {
  stats: Record<string, number>;
  loading: boolean;
  error: string | null;
}

interface StatItem {
  code: string;
  name: string;
  count: number;
}

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Country name mapping
const countryNames: Record<string, string> = {
  us: "United States",
  ru: "Russia",
  de: "Germany",
  fr: "France",
  gb: "United Kingdom",
  cn: "China",
  jp: "Japan",
  in: "India",
  br: "Brazil",
  ca: "Canada",
  // Add more as needed
};

const StatsChart: React.FC<StatsChartProps> = ({ stats, loading, error }) => {
  // If no stats or empty object, return null
  if (loading || error || !stats || Object.keys(stats).length === 0) {
    return null;
  }

  // Convert stats object to array for sorting
  const statsArray: StatItem[] = Object.entries(stats)
    .map(([code, count]) => ({
      code,
      name: countryNames[code] || code.toUpperCase(),
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10); // Show only top 10 countries

  // Chart data
  const chartData = {
    labels: statsArray.map((item) => item.name),
    datasets: [
      {
        label: "Number of Visits",
        data: statsArray.map((item) => item.count),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Top Countries by Visits",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0, // Only show whole numbers
        },
      },
    },
  };

  return (
    <div className="card">
      <h2>Visit Statistics Chart</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default StatsChart;
