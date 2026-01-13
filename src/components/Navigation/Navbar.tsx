import { NavLink } from 'react-router-dom';
import './Navbar.css';
import Logo from '../../Assets/Logo.png';

export default function Navbar() {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
    { id: 'mapa', label: 'Mapa', path: '/mapa' },
    { id: 'historial', label: 'Historial', path: '/historial' },
    { id: 'alertas', label: 'Alertas', path: '/alertas' },
    { id: 'anomalias', label: 'Anomalias', path: '/anomalias' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        
        {/* Logo */}
        <div className="navbar-left">
          <img src={Logo} alt="Logo" className="navbar-logo" />
        </div>

        {/* Navegación */}
        <div className="navbar-center">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Usuario */}
        <div className="navbar-right">
          <div className="nav-user-icon">👤</div>
        </div>

      </div>
    </nav>
  );
}
