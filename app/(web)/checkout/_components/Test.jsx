"use client";
import React, { useState, useEffect } from "react";

export default function LocationIQAutocomplete() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const API_KEY = "pk.338efe26c8f6d7a39300d440d5568d60";

  useEffect(() => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(
          `https://us1.locationiq.com/v1/autocomplete.php?key=${API_KEY}&q=${encodeURIComponent(
            query
          )}&format=json`
        );
        const data = await res.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    fetchSuggestions();
  }, [query]);

  const handleSelect = (place) => {
    setSelectedLocation({
      display_name: place.display_name,
      lat: place.lat,
      lon: place.lon,
    });
    setQuery(place.display_name);
    setSuggestions([]);
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h3>LocationIQ Autocomplete Example</h3>

      <input
        type="text"
        placeholder="Type address..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "100%", padding: 8, fontSize: 16 }}
      />

      {suggestions.length > 0 && (
        <ul
          style={{
            listStyleType: "none",
            padding: 0,
            margin: "5px 0",
            border: "1px solid #ccc",
            maxHeight: 150,
            overflowY: "auto",
          }}
        >
          {suggestions.map((place) => (
            <li
              key={place.place_id}
              style={{
                padding: 8,
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
              onClick={() => handleSelect(place)}
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}

      {selectedLocation && (
        <div style={{ marginTop: 20 }}>
          <strong>Selected Location:</strong>
          <p>{selectedLocation.display_name}</p>
          <p>
            Latitude: {selectedLocation.lat} | Longitude: {selectedLocation.lon}
          </p>
        </div>
      )}
    </div>
  );
}
