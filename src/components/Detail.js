import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/Detail.css";

const API_KEY = "ed1b89edf32913c3aa5db1cb8dfe2d9c";
const API_URL = `https://api.themoviedb.org/3/movie`;

function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    fetchData();
    fetchTrailer();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/${id}?api_key=${API_KEY}&language=es-MX`);
      const responseData = await response.json();
      setMovie(responseData);
    } catch (error) {
      console.log("Error al obtener los datos de la API:", error);
    }
  };

  const fetchTrailer = async () => {
    try {
      const response = await fetch(`${API_URL}/${id}/videos?api_key=${API_KEY}`);
      const responseData = await response.json();
      // Verificar si hay trailers disponibles
      if (responseData.results.length > 0) {
        const trailerKey = responseData.results[0].key; // Obtener la clave del primer trailer
        setTrailerKey(trailerKey);
      } else {
        setTrailerKey(null);
      }
    } catch (error) {
      console.log("Error al obtener los trailers:", error);
    }
  };

  if (!movie) {
    return <p>Loading...</p>;
  }

  const popularity = movie.popularity.toFixed(2);
  const voteAverage = movie.vote_average.toFixed(2);

  return (
    <div className="detail-container">
    <div className="image-container">
      <img className="poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
    </div>
    <div className="content">
      <h1 className="title">{movie.title}</h1>
      <div className="info">
        <p className="info-item">Resumen: {movie.overview}</p>
        <p className="info-item">Fecha de publicación: {movie.release_date}</p>
        <p className="info-item">Popularidad: {popularity}</p>
        <p className="info-item">Media de votos: {voteAverage}</p>
      </div>
      {trailerKey && (
        <iframe
          className="trailer" 
          src={`https://www.youtube.com/embed/${trailerKey}`}
          title="Trailer"
          allowFullScreen
        > </iframe>
      )}
      <Link to="/list" className="go-back-link">Go Back</Link>
    </div>
  </div>
  
  );
}


export default Detail;
