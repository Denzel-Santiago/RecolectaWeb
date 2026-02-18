import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navbar.css'; 
import Logo from '../../Assets/Logo.png';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
    { id: 'mapa', label: 'Mapa', path: '/mapa' },
    { id: 'historial', label: 'Historial', path: '/historial' },
    { id: 'alertas', label: 'Alertas', path: '/alertas' },
    { id: 'anomalias', label: 'Anomalias', path: '/anomalias' },
    { id: 'Puntos_de_ruta', label: 'Puntos de Ruta', path: '/estado-ruta' },
    { id: 'Recoleccion', label: 'Recolección', path: '/validacion-recoleccion' },
    { id: 'Administracion', label: 'Administración', path: '/administracion' },
  ];

  return (
    // Agregar el contenedor principal con el prefijo
    <div className="anomalias-nav-container">
      <nav className={`anomalias-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="anomalias-navbar-inner">
          
          {/* Logo - Más grande */}
          <div className="anomalias-navbar-left">
            <img src={Logo} alt="Logo Recolecta" className="anomalias-navbar-logo" />
          </div>

          {/* Navegación - Sin tooltips */}
          <div className="anomalias-navbar-center">
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  `anomalias-nav-link ${isActive ? 'active' : ''}`
                }
                // Removido title={item.label} para eliminar tooltips
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Usuario - Simple, sin notificaciones */}
          <div className="anomalias-navbar-right">
            <div className="anomalias-nav-user-icon">👤</div>
          </div>

        </div>
        {/* No hay barra de progreso */}
      </nav>
    </div>
  );
}