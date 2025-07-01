import React, { useState, useEffect } from "react";
import CountrySelector from "./components/CountrySelector";
import StatsTable from "./components/StatsTable";
import StatsChart from "./components/StatsChart";
import { getVisitStats } from "./services/api";

function App() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Fetch stats on component mount and when refreshKey changes
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getVisitStats();
        setStats(data);
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError("Failed to load statistics. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [refreshKey]);

  // Handle refresh button click
  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  // Handle successful visit recording
  const handleVisitRecorded = () => {
    // Refresh stats after a short delay
    setTimeout(() => {
      setRefreshKey((prevKey) => prevKey + 1);
    }, 500);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Website Visit Tracker</h1>
        <button onClick={handleRefresh} disabled={loading}>
          {loading ? "Refreshing..." : "Refresh Stats"}
        </button>
      </div>

      <CountrySelector onVisitRecorded={handleVisitRecorded} />

      <StatsChart stats={stats} loading={loading} error={error} />

      <StatsTable stats={stats} loading={loading} error={error} />
    </div>
  );
}

export default App;
