import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const API_KEY = "dcb4c92a";
const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchIconClicked, setSearchIconClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const SearchMovie = async (title) => {
    try {
      const response = await fetch(
        `http://www.omdbapi.com?apikey=${API_KEY}&s=${title}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (!data.Search || data.Search.length === 0) {
        setMovies([]);
        setErrorMessage("Gak ada movienya");
      } else {
        setMovies(data.Search);
        setErrorMessage(null);
      }
    } catch (error) {
      setMovies([]);
      setErrorMessage(error.message);
    }
  };

  const handleSearchIconClick = () => {
    setSearchIconClicked(true);
    SearchMovie(searchTerm);
  };
  useEffect(() => {
    if (searchTerm.trim() !== "" && searchIconClicked) {
      SearchMovie(searchTerm);
    } else {
      // If the search term is empty or search icon not clicked, clear the movies
      setMovies([]);
    }
  }, [searchTerm, searchIconClicked]);
  return (
    <div className="app">
      <h1>Cilok Goreng</h1>
      <div className="search">
        <input
          placeholder="Search the movie"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <img src={SearchIcon} alt="search" onClick={handleSearchIconClick} />
      </div>

      {searchIconClicked && movies.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          {errorMessage ? <h2>{errorMessage}</h2> : <h2>Gak nemu movienya</h2>}
        </div>
      )}
    </div>
  );
};

export default App;
