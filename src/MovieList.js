import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useState, useEffect } from "react";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import axios from "axios";

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
        const movieData = {
          id: movie.id.toNumber(),
          title: movie.title,
          goodVotes: movie.goodVotes.toNumber(),
          badVotes: movie.badVotes.toNumber(),
          isVotingOpen: movie.isVotingOpen,
          imageUrl: "",
        };

        const response = await axios.get(`http://www.omdbapi.com/?t=${encodeURIComponent(movie.title)}&apikey=1de49c7a`);
        if (response.data && response.data.Poster) {
          movieData.imageUrl = response.data.Poster;
        }

        moviesData.push(movieData);
      }

      setMovies(moviesData);
    } catch (error) {
      console.error("Failed to fetch movies", error);
    }
  };

  const castVote = async (movieId, isGoodVote) => {
    try {
      await contract.castVote(movieId, isGoodVote);
    } catch {
      alert("You've already voted once for this movie!");
    }
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
              image={movie.imageUrl}
              title={movie.title}
            />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" align='center'>
            {movie.title}
          </Typography>
          
          <Typography variant="body2" color="text.secondary">
            <div style={{ width: '100%', height: '20px', backgroundColor: '#ddd', borderRadius: '10px', position: 'relative' }}>
              <div style={{ width: `${(movie.goodVotes / (movie.goodVotes + movie.badVotes)) * 100}%`, height: '100%', backgroundColor: '#804fe3', borderRadius: '10px' }}>
              </div>
            </div>  

          </Typography>
        </CardContent>
        
        <CardActions style={{ justifyContent: 'center' }}>
        {/* <ThumbUpAltIcon/> */}
          <Button size="small" onClick={() => castVote(movie.id, true)} style = {{color:'#9f7aea'}}>Like</Button>
          {/* <ThumbDownAltIcon/> */}
          <Button size="small" onClick={() => castVote(movie.id, false)} style = {{color:'#9f7aea'}}>Dislike</Button>
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
