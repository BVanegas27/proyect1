import React from "react";
import "../styles/Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [nombre, setNombre] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  localStorage.removeItem("Usuario")

  const handleSubmit = (e) => {

    e.preventDefault();

    if (nombre.trim() !== "" && contraseña.trim() !== "") {
      localStorage.setItem("Usuario", nombre);
      const Usuario = localStorage.getItem("Usuario");
      console.log("Usuario:", Usuario);
      navigate('/List');
    } else {
      setError(true);
    }
  };

  return (
    <div className="fondoLogin">
      <div className="contenedorLogin">
        <div className="login">
          <h1>Login</h1>
          <form className="forma" onSubmit={handleSubmit}>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <input
              type="password"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
            />
            <button type="submit">Ingresar</button>
          </form>
          {error && <p>Todos los campos son obligatorios</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
