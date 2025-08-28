import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 👇 This runs once when the app loads
  useEffect(() => {
    fetch("http://localhost:5000/api/movies")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched from local backend:", data);
        // If you want to set local backend movies:
        // setMovies(data);
      })
      .catch((err) => {
        console.error("Local fetch failed:", err);
      });
  }, []);

  const searchMovies = async () => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.tvmaze.com/search/shows?q=${query}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMovies(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>🎬 Movie Search App</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search movies or shows..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchMovies()}
        />
        <button onClick={searchMovies} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {movies.length === 0 && !loading && !error && (
        <p className="info">🔍 Try searching for a movie!</p>
      )}

      <div className="movies-container">
        {movies.map((movie) => (
          <div key={movie.show.id} className="movie-card">
            <img
              src={
                movie.show.image?.medium ||
                "https://via.placeholder.com/210x295?text=No+Image"
              }
              alt={movie.show.name}
            />
            <h3>{movie.show.name}</h3>
            <p className="premiere-date">
              {movie.show.premiered || "No Release Date"}
            </p>
            <p className="summary">
              {movie.show.summary
                ? movie.show.summary.replace(/<[^>]+>/g, "").slice(0, 120) +
                  "..."
                : "No Description"}
            </p>
            <a
              href={movie.show.url}
              target="_blank"
              rel="noopener noreferrer"
              className="details-link"
            >
              View Details →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
