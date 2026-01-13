// Login.jsx o Login.tsx
import { useState } from 'react';
import './Login.css'; 
import Logo from '../../Assets/Logo.png';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [nombre, setNombre] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Login attempt:', { nombre, contrasena });
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      {/* Sección izquierda: Login */}
      <div className="login-left">
        <div className="login-box">
          <h1 className="login-title">BIENVENIDO</h1>
          
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ingresa tu nombre"
                required
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="contrasena">Contraseña</label>
              <input
                type="password"
                id="contrasena"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>


            <button type="submit" className="login-button">
              ACEPTAR
            </button>
          </form>

          
        </div>
      </div>

      {/* Sección derecha: Logo e información */}
      <div className="login-right">
        <div className="logo-container">
          {/* Aquí puedes poner tu imagen */}
          <div className="logo-placeholder">
            <img src={Logo} alt="Logo" />
          </div>
          <h2 className="app-title">RECOLECTA</h2>
        </div>
        
        <div className="terminos-info">
          <p>
            Sistema de Gestión de Recolección de Residuos Sólidos.
            <br />
            Para acceder al sistema, debes aceptar los términos de uso.
          </p>
        </div>
      </div>
    </div>
  );
}


