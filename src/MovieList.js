import React, { useState, useEffect } from "react";

const MovieList = ({ contract }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (contract) {
      fetchMovies();
    }
  }, [contract]);

  const fetchMovies = async () => {
    try {
      const totalMovies = await contract.getTotalMovies();
      const moviesData = [];

      for (let i = 1; i <= totalMovies; i++) {
        const movie = await contract.movies(i);
        moviesData.push({
          id: movie.id.toNumber(),
          title: movie.title,
          goodVotes: movie.goodVotes.toNumber(),
          badVotes: movie.badVotes.toNumber(),
          isVotingOpen: movie.isVotingOpen,
        });
      }

      setMovies(moviesData);
    } catch (error) {
      console.error("Failed to fetch movies", error);
    }
  };

  const castVote = async (movieId, isGoodVote) => {
    await contract.castVote(movieId, isGoodVote);
    // fetchMovies();
  };

  return (
    <div>
      <h2>Movies:</h2>
      {console.log(movies)}
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <span>Title: {movie.title}</span>
            <span>Good Votes: {movie.goodVotes}</span>
            <span>Bad Votes: {movie.badVotes}</span>
            {movie.isVotingOpen && (
              <div>
                <button onClick={() => castVote(movie.id, true)}>
                  Good Vote
                </button>
                <button onClick={() => castVote(movie.id, false)}>
                  Bad Vote
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
