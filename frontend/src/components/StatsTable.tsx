import React from "react";

// Define types
interface StatsTableProps {
  stats: Record<string, number>;
  loading: boolean;
  error: string | null;
}

interface StatItem {
  code: string;
  name: string;
  count: number;
}

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

const StatsTable: React.FC<StatsTableProps> = ({ stats, loading, error }) => {
  // If no stats or empty object, show message
  const hasStats = stats && Object.keys(stats).length > 0;

  // Convert stats object to array for sorting
  const statsArray: StatItem[] = hasStats
    ? Object.entries(stats).map(([code, count]) => ({
        code,
        name: countryNames[code] || code.toUpperCase(),
        count,
      }))
    : [];

  // Sort by count (descending)
  statsArray.sort((a, b) => b.count - a.count);

  return (
    <div className="card">
      <h2>Visit Statistics</h2>

      {loading && <p>Loading statistics...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <>
          {!hasStats ? (
            <p>No visits recorded yet.</p>
          ) : (
            <table className="stats-table">
              <thead>
                <tr>
                  <th>Country</th>
                  <th>Visits</th>
                </tr>
              </thead>
              <tbody>
                {statsArray.map((item) => (
                  <tr key={item.code}>
                    <td>{item.name}</td>
                    <td>{item.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default StatsTable;
