import React from 'react';
import './MovieCard.css';

function MovieCard({ movie }) {
  return (
    <div className="movie">
      <div>
        <p>{movie.premiered || 'Year Unknown'}</p>
      </div>
      <div>
        <img
          src={
            movie.image?.medium
              ? movie.image.medium
              : 'https://via.placeholder.com/200x300?text=No+Image'
          }
          alt={movie.name}
        />
      </div>
      <div>
        <h3>{movie.name}</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: movie.summary
              ? movie.summary.slice(0, 100) + '...'
              : 'No description available',
          }}
        />
      </div>
    </div>
  );
}


import React from "react";
import "./MovieCard.css";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img
        src={movie.show.image?.medium || "https://via.placeholder.com/210x295?text=No+Image"}
        alt={movie.show.name}
      />
      <h3>{movie.show.name}</h3>
      <p>{movie.show.premiered || "No Date"}</p>
      <p dangerouslySetInnerHTML={{ __html: movie.show.summary?.slice(0, 100) + "..." }}></p>
      <a href={movie.show.url} target="_blank" rel="noopener noreferrer">
        View Details
      </a>
    </div>
  );
};

export default MovieCard;


export default MovieCard;
