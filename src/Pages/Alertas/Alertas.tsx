// pages/Alertas/Alertas.tsx
import { useState } from 'react';
import './Alertas.css';
import { 
  FiAlertTriangle, 
  FiCheckCircle, 
  FiClock, 
  FiTruck,
  FiAlertCircle,
  FiUserX,
  FiCloud,
  FiTool,
  FiFilter,
  FiSearch,
} from 'react-icons/fi';

export default function Alertas() {
  const [alertas] = useState([
    {
      id: 1,
      cantidad: 3,
      ruta: 'Ruta 01',
      vehiculo: 'Camión RE-01',
      conductor: 'Juan Pérez',
      motivo: 'Falla mecánica del vehículo',
      tipo: 'mecanica',
      estado: 'pendiente',
      fecha: '2026-01-05 08:30',
      puntos: ['Centro Comercial Plaza', 'Zona Residencial Norte', 'Parque Central']
    },
    {
      id: 2,
      cantidad: 2,
      ruta: 'Ruta 02',
      vehiculo: 'Camión RE-02',
      conductor: 'Carlos Ruiz',
      motivo: 'Acceso bloqueado al punto',
      tipo: 'acceso',
      estado: 'pendiente',
      fecha: '2026-01-05 09:15',
      puntos: ['Mercado Municipal', 'Hospital Regional']
    },
    {
      id: 3,
      cantidad: 5,
      ruta: 'Ruta 03',
      vehiculo: 'Camión RE-03',
      conductor: 'Ana Torres',
      motivo: 'Retraso por condiciones climáticas',
      tipo: 'clima',
      estado: 'pendiente',
      fecha: '2026-01-05 10:45',
      puntos: ['Zona Industrial', 'Universidad', 'Centro Deportivo', 'Plaza Principal', 'Colegio Nacional']
    },
    {
      id: 4,
      cantidad: 1,
      ruta: 'Ruta 04',
      vehiculo: 'Camión RE-04',
      conductor: 'Luis Gómez',
      motivo: 'Ausencia del conductor',
      tipo: 'personal',
      estado: 'pendiente',
      fecha: '2026-01-05 11:20',
      puntos: ['Aeropuerto']
    },
    {
      id: 5,
      cantidad: 4,
      ruta: 'Ruta 05',
      vehiculo: 'Camión RE-05',
      conductor: 'María López',
      motivo: 'Exceso de capacidad en vehículo',
      tipo: 'capacidad',
      estado: 'pendiente',
      fecha: '2026-01-04 14:30',
      puntos: ['Centro Comercial Sur', 'Zona Residencial Este', 'Parque Industrial', 'Terminal de Buses']
    },
    {
      id: 6,
      cantidad: 2,
      ruta: 'Ruta 01',
      vehiculo: 'Camión RE-01',
      conductor: 'Roberto Díaz',
      motivo: 'Problemas de tráfico',
      tipo: 'trafico',
      estado: 'pendiente',
      fecha: '2026-01-04 16:45',
      puntos: ['Centro Histórico', 'Estación de Tren']
    },
  ]);

  const [activeFilter, setActiveFilter] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');

  const getTipoIcon = (tipo: string) => {
    switch(tipo) {
      case 'mecanica': return <FiTool />;
      case 'acceso': return <FiAlertCircle />;
      case 'clima': return <FiCloud />;
      case 'personal': return <FiUserX />;
      case 'capacidad': return <FiAlertTriangle />;
      case 'trafico': return <FiClock />;
      default: return <FiAlertTriangle />;
    }
  };

  const getTipoColor = (tipo: string) => {
    switch(tipo) {
      case 'mecanica': return '#e74c3c';
      case 'acceso': return '#f39c12';
      case 'clima': return '#3498db';
      case 'personal': return '#9b59b6';
      case 'capacidad': return '#e67e22';
      case 'trafico': return '#34495e';
      default: return '#95a5a6';
    }
  };


  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const alertasFiltradas = alertas.filter(alerta => {
    if (activeFilter !== 'todos' && alerta.estado !== 'pendiente') return false;
    if (searchTerm && !alerta.ruta.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !alerta.motivo.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const alertasPendientes = alertas.filter(a => a.estado === 'pendiente').length;
  const puntosPendientes = alertas.reduce((total, alerta) => total + alerta.cantidad, 0);

  return (
    <div className="alertas alertas-container">
      {/* Sección 1: Header con estadísticas */}
      <header className="alertas-header">
        <div className="alertas header-content">
          <div className="alertas header-title">
            <h1>Alertas del Sistema</h1>
            <p className="alertas subtitle">Puntos de recolección no completados que requieren atención</p>
          </div>
          
          <div className="alertas header-stats">
            <div className="alertas stat-card">
              <div className="alertas stat-icon" style={{ backgroundColor: 'rgba(231, 76, 60, 0.2)', color: '#e74c3c' }}>
                <FiAlertTriangle />
              </div>
              <div>
                <span className="alertas stat-value">{alertasPendientes}</span>
                <span className="alertas stat-label">Alertas activas</span>
              </div>
            </div>
            
            <div className="alertas stat-card">
              <div className="alertas stat-icon" style={{ backgroundColor: 'rgba(52, 152, 219, 0.2)', color: '#3498db' }}>
                <FiTruck />
              </div>
              <div>
                <span className="alertas stat-value">
                  {[...new Set(alertas.filter(a => a.estado === 'pendiente').map(a => a.ruta))].length}
                </span>
                <span className="alertas stat-label">Rutas afectadas</span>
              </div>
            </div>
            
            <div className="alertas stat-card">
              <div className="alertas stat-icon" style={{ backgroundColor: 'rgba(46, 204, 113, 0.2)', color: '#2ecc71' }}>
                <FiCheckCircle />
              </div>
              <div>
                <span className="alertas stat-value">{puntosPendientes}</span>
                <span className="alertas stat-label">Puntos pendientes</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sección 2: Filtros y búsqueda */}
      <div className="alertas filtros-container">
        <div className="alertas filtros-header">
          <h3 className="alertas filtros-title">Filtros de Alertas</h3>
          <div className="alertas table-search">
            <FiSearch className="alertas search-icon" />
            <input 
              type="text" 
              placeholder="Buscar por ruta o motivo..."
              className="alertas search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="alertas filtros-rapidos">
          <button 
            className={`alertas quick-filter-btn ${activeFilter === 'todos' ? 'alertas active' : ''}`}
            onClick={() => handleFilterClick('todos')}
          >
            Todas las alertas
          </button>
          <button 
            className={`alertas quick-filter-btn ${activeFilter === 'pendiente' ? 'alertas active' : ''}`}
            onClick={() => handleFilterClick('pendiente')}
          >
            Solo pendientes
          </button>
        </div>

        <div className="alertas tipos-alerta">
          <div className="alertas tipo-item" style={{ borderLeftColor: '#e74c3c' }}>
            <FiTool />
            <span>Fallas mecánicas</span>
          </div>
          <div className="alertas tipo-item" style={{ borderLeftColor: '#f39c12' }}>
            <FiAlertCircle />
            <span>Acceso bloqueado</span>
          </div>
          <div className="alertas tipo-item" style={{ borderLeftColor: '#3498db' }}>
            <FiCloud />
            <span>Condiciones climáticas</span>
          </div>
          <div className="alertas tipo-item" style={{ borderLeftColor: '#9b59b6' }}>
            <FiUserX />
            <span>Problemas de personal</span>
          </div>
        </div>
      </div>

      {/* Sección 3: Tabla de alertas */}
      <div className="alertas table-container">
        <div className="alertas table-header">
          <div className="alertas table-summary">
            Mostrando {alertasFiltradas.length} de {alertas.length} alertas
          </div>
          <button className="alertas btn-exportar">
            <FiFilter />
            <span>Ordenar por prioridad</span>
          </button>
        </div>

        <div className="alertas table-wrapper">
          <table className="alertas alertas-table">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Detalles</th>
                <th>Puntos afectados</th>
                <th>Ruta y Vehículo</th>
                <th>Estado</th>
                
              </tr>
            </thead>
            <tbody>
              {alertasFiltradas.map((alerta) => (
                <tr key={alerta.id} className={`alertas table-row alerta-${alerta.estado}`}>
                  <td className="alertas tipo-cell">
                    <div className="alertas tipo-indicator" style={{ backgroundColor: getTipoColor(alerta.tipo) }}>
                      {getTipoIcon(alerta.tipo)}
                    </div>
                  </td>
                  <td className="alertas detalles-cell">
                    <div className="alertas detalles-info">
                      <div className="alertas motivo">{alerta.motivo}</div>
                      <div className="alertas fecha">{alerta.fecha}</div>
                      <div className="alertas conductor">
                        <FiUserX />
                        <span>{alerta.conductor}</span>
                      </div>
                    </div>
                  </td>
                  <td className="alertas puntos-cell">
                    <div className="alertas puntos-info">
                      <div className="alertas cantidad-badge">
                        <span className="alertas numero">{alerta.cantidad}</span>
                        <span className="alertas texto">puntos</span>
                      </div>
                      <div className="alertas puntos-lista">
                        {alerta.puntos.slice(0, 2).map((punto, idx) => (
                          <div key={idx} className="alertas punto-item">{punto}</div>
                        ))}
                        {alerta.puntos.length > 2 && (
                          <div className="alertas punto-mas">+{alerta.puntos.length - 2} más</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="alertas ruta-cell">
                    <div className="alertas ruta-info">
                      <div className="alertas ruta-nombre">{alerta.ruta}</div>
                      <div className="alertas vehiculo-info">
                        <FiTruck />
                        <span>{alerta.vehiculo}</span>
                      </div>
                    </div>
                  </td>
                  <td className="alertas estado-cell">
                    <div className={`alertas estado-badge alertas estado-${alerta.estado}`}>
                      {alerta.estado === 'pendiente' ? <FiAlertTriangle /> : <FiCheckCircle />}
                      <span>{alerta.estado === 'pendiente' ? 'Pendiente' : 'Resuelto'}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sección de resumen */}
        <div className="alertas resumen-container">
          <div className="alertas resumen-item">
            <h4>Resumen de alertas</h4>
            <div className="alertas resumen-stats">
              <div className="alertas resumen-stat">
                <span className="alertas stat-num">{alertasPendientes}</span>
                <span className="alertas stat-label">Pendientes</span>
              </div>
              <div className="alertas resumen-stat">
                <span className="alertas stat-num">{alertas.length - alertasPendientes}</span>
                <span className="alertas stat-label">Resueltas</span>
              </div>
              <div className="alertas resumen-stat">
                <span className="alertas stat-num">{puntosPendientes}</span>
                <span className="alertas stat-label">Puntos afectados</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}