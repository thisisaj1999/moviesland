import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css';
import MovieCard from './components/MovieCard';
import Loading from './components/Loading';
import searchIcon from './assets/search.svg';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('Spiderman');

  const searchMovies = async (title) => {
    const res = await axios.get(`${process.env.REACT_APP_API}&s=${title}`);

    const data = await res.data;
    setMovies(data.Search);
  };

  const fetchMovie = (searchData) => {
    setStatus('pending');
    searchMovies(searchData);
    setTimeout(function () {
      setStatus('resolved');
    }, 100);
  };

  useEffect(() => {
    fetchMovie(searchTerm);
  }, []);

  const handleSearchBar = (e) => {
    e.preventDefault();
    fetchMovie(searchTerm);
  };

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <form onSubmit={handleSearchBar} className="search">
        <input
          type="text"
          name="searchBar"
          value={searchTerm}
          placeholder="Search for movies"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button type="submit">
          <img src={searchIcon} alt="search" />
        </button>
      </form>

      {status === 'pending' ? (
        <Loading />
      ) : movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
