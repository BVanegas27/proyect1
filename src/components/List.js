import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/List.css";

const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDFiODllZGYzMjkxM2MzYWE1ZGIxY2I4ZGZlMmQ5YyIsInN1YiI6IjY0YWEzZGIyNmEzNDQ4MDBhZDc1YzdkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VllPz5FVTQMfbY0txasTuW13OvHlgH74xa8Bebpy8uk";
const DISCOVER_API_URL = `https://api.themoviedb.org/3/discover/movie?language=es-MX`;
const SEARCH_API_URL = `https://api.themoviedb.org/3/search/movie?query=search&language=es-MX`;

function List() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      let url = DISCOVER_API_URL;
      if (searchQuery) {
        url = `${SEARCH_API_URL}&query=${encodeURIComponent(searchQuery)}`;
      }

      const response = await fetch(`${url}&page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });
      const responseData = await response.json();
      const movies = responseData.results;
      setData(movies);
      console.log(movies);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.log("Error al obtener los datos de la API:", error);
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setCurrentPage(1);
    fetchData();
  };

  const handleInputChange = (event) => {
    clearTimeout(typingTimeout);
    const input = event.target.value;
    setSearchQuery(input);

    setTypingTimeout(
      setTimeout(() => {
        fetchData();
      }, 300)
    );
  };

  return (
    <div>
       <Link to="/" className="logout-button">Cerrar sesión</Link>
      <h1 className="filter-title">DIARIO DE PELÍCULAS</h1>
  <form className="search-form" onSubmit={handleSearch}>
    <input
      type="text"
      placeholder="Buscar películas..."
      value={searchQuery}
      onChange={handleInputChange}
    />
    <button type="submit">Buscar</button>
  </form>
      <div className="list-container">
        {data.map((item) => (
          <div className="movie-card" key={item.id}>
            <h2 className="movie-title">{item.title}</h2>
            <Link to={`/detail/${item.id}`}>
              <img
                className="movie-image"
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title}
              />
            </Link>
          </div>
        ))}
      </div>
      <div className="button-container">
        <button onClick={handlePreviousPage}>Página anterior</button>
        <button onClick={handleNextPage}>Siguiente página</button>
      </div>
    </div>
  );
}

export default List;
