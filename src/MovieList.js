import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useState, useEffect } from "react";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

import "./MovieList.css";

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
      
      <div className='cardList'>
        {movies.map((movie) => (
          <div className='card'>
          <Card sx={{ maxWidth: 345 }} key={movie.id}>
            <CardMedia
              sx={{ height: 140 }}
              image=""
              title='image'
            />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            {movie.title}
          </Typography>
          
          <Typography variant="body2" color="text.secondary">
            <div style={{ width: '100%', height: '20px', backgroundColor: '#ddd', borderRadius: '10px', position: 'relative' }}>
              <div style={{ width: `${(movie.goodVotes / (movie.goodVotes + movie.badVotes)) * 100}%`, height: '100%', backgroundColor: 'green  ', borderRadius: '10px' }}>
              </div>
            </div>

          </Typography>
        </CardContent>
        
        <CardActions style={{ justifyContent: 'center' }}>
          <Button size="small" onClick={() => castVote(movie.id, true)}><ThumbUpAltIcon/></Button>

          <Button size="small" onClick={() => castVote(movie.id, false)}><ThumbDownAltIcon/></Button>
        </CardActions>
        
        
      </Card>
      </div>
      ))
      }
      </div>
    </div>
  );
};

export default MovieList;
