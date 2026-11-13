import { useState } from "react";

function BeautyDiscovery({ onLocationSelect }) {
  const [city, setCity] = useState("Columbus");
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function searchLocations() {
    if (city.trim().length < 2) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");
    setLocations([]);

    const endpoint = "https://geocoding-api.open-meteo.com/v1/search";

    const params = new URLSearchParams({
      name: city.trim(),
      count: "5",
      countryCode: "US",
    });

    try {
      const response = await fetch(`${endpoint}?${params}`, {
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      setLocations(data.results || []);
    } catch (err) {
      console.error("Location API error:", err);
      setError(
        err.name === "TimeoutError"
          ? "The location search timed out. Please retry."
          : "Unable to search locations.",
      );
    } finally {
      setLoading(false);
    }
  }

  
return (
  <section
  className="location-search-section"
  id="location-search"
>
    <div className="location-search-header">
      <p className="eyebrow">FIND YOUR NEXT WORKSPACE</p>
      <h2>Where would you like to work?</h2>
      <p>
        Search your city to discover flexible beauty
        workspaces near you.
      </p>
    </div>

    <form
      className="location-search-form"
      onSubmit={(e) => {
        e.preventDefault();
        searchLocations();
      }}
    >
      <input
        type="text"
        placeholder="Enter a city, e.g. Columbus or Atlanta"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Searching..." : "Select Your Location"}
      </button>
    </form>

    {error && <p className="error">{error}</p>}

    {locations.length > 0 && (
      <div className="location-results">
        <p className="location-results-label">
          Select your location:
        </p>

        <div className="location-options">
          {locations.map((location) => (
            <button
              type="button"
              className="location-option"
              key={location.id}
              onClick={() => {
                onLocationSelect(location);
                setLocations([]);
              }}
            >
              <span>
                {location.name}, {location.admin1}
              </span>
              <span>→</span>
            </button>
          ))}
        </div>
      </div>
    )}
  </section>
);
}

export default BeautyDiscovery;
