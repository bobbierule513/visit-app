import React, { useState } from "react";
import { recordVisit } from "../services/api";

// List of countries with their codes
const countries = [
  { code: "us", name: "United States" },
  { code: "ru", name: "Russia" },
  { code: "de", name: "Germany" },
  { code: "fr", name: "France" },
  { code: "gb", name: "United Kingdom" },
  { code: "cn", name: "China" },
  { code: "jp", name: "Japan" },
  { code: "in", name: "India" },
  { code: "br", name: "Brazil" },
  { code: "ca", name: "Canada" },
  // Add more countries as needed
];

const CountrySelector = ({ onVisitRecorded }) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCountry) {
      setError("Please select a country");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const result = await recordVisit(selectedCountry);

      // Call the callback to notify parent component
      if (onVisitRecorded) {
        onVisitRecorded(result);
      }

      // Reset the form
      setSelectedCountry("");
    } catch (err) {
      setError("Failed to record visit. Please try again.");
      console.error("Error submitting visit:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Record a Visit</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="country">Select Country:</label>
          <select
            id="country"
            value={selectedCountry}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="">-- Select a country --</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Recording..." : "Record Visit"}
        </button>
      </form>
    </div>
  );
};

export default CountrySelector;
