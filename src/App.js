import React, { useState } from 'react'; 
import axios from 'axios';
import './App.css';
import Navbar from "./Navbar"; // Added this line 
import './navbar.css';
import AboutUs from "./AboutUs"; // Added this line

function App() {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [sortByKey, setSortByKey] = useState('Title'); // Default sorting key
    const [rating, setRating] = useState('imdbRating'); // Added this line
    const searchMovies = async () => {
        try {
            const apiKey = 'dd59c05d';
            const url = `http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;

            const response = await axios.get(url);
            const data = response.data;

            if (data.Search) {
                setMovies(data.Search);
            } else {
                setMovies([]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const sortBy = (key) => {
        if(key === 'rating') {
            setMovies((prev) =>
                [...prev].sort((a, b) => (parseFloat(b.imdbRating) - parseFloat(a.imdbRating)))
            );
        }
        setMovies((prev) =>
            [...prev].sort((a, b) => (a[key] > b[key] ? 1 : -1))
        );
        setSortByKey(key); // Update the currently selected sorting key
    };

    const handleSort = (e) => {
        const selectedKey = e.target.value;
        sortBy(selectedKey);
    };

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        searchMovies();
    };
    const handleRating = (e) => {
        setRating(e.target.value);
    }
    const handleSubmitRating = (e) => {
        e.preventDefault();
        searchMovies();
    }
    const handleReset = (e) => {
        e.preventDefault();
        setMovies([]);
    }
    return (
        <div className="App">
            <Navbar/>
            <h1>Movie Search App</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Enter movie title"
                />
                <button type="submit">Search</button>
                <button type="reset" onClick={handleReset}>Clear Search</button>
            </form>
            <div className="SortBy">
                <h2>Sort By</h2>
                <select onChange={handleSort} value={sortByKey}>
                    <option value="Title">Title</option>
                    <option value="Year">Year</option>
                    <option value="rating">Rating</option>
                </select>
            </div>
            <div className="movies">
                {movies.map((movie) => (
                    <div className="movie" key={movie.imdbID}>
                        <h2>{movie.Title}</h2>
                        <p>Release Year: {movie.Year}</p>
                        <p>Rating: {movie.imdbRating ? movie.imdbRating : 'N/A'}</p>

                        <img src={movie.Poster} alt={movie.Title} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
