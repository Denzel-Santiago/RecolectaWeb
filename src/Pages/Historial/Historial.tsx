// pages/Historial/Historial.tsx
import { useState } from 'react';
import './Historial.css';
import { 
  FiSearch, 
  FiX, 
  FiEye, 
  FiCalendar,
  FiTruck,
  FiUser,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiPauseCircle
} from 'react-icons/fi';

export default function Historial() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedRuta, setSelectedRuta] = useState('');
  const [selectedConductor, setSelectedConductor] = useState('');
  const [activeFilter, setActiveFilter] = useState('todos');

  const historial = [
    {
      id: 1,
      punto: 'Centro Comercial Plaza',
      direccion: 'Av. Principal #123',
      fecha: '2026-01-05',
      hora: '08:30',
      conductor: 'Juan Pérez',
      vehiculo: 'Camión RE-01',
      ruta: 'Ruta 01',
      estado: 'completado',
      kilos: 450,
      tiempo: '45 min'
    },
    {
      id: 2,
      punto: 'Zona Residencial Norte',
      direccion: 'Calle Los Pinos #456',
      fecha: '2026-01-05',
      hora: '09:10',
      conductor: 'Carlos Ruiz',
      vehiculo: 'Camión RE-02',
      ruta: 'Ruta 02',
      estado: 'en-proceso',
      kilos: 320,
      tiempo: '30 min'
    },
    {
      id: 3,
      punto: 'Mercado Municipal',
      direccion: 'Av. Central #789',
      fecha: '2026-01-05',
      hora: '09:45',
      conductor: 'Ana Torres',
      vehiculo: 'Camión RE-03',
      ruta: 'Ruta 03',
      estado: 'retrasado',
      kilos: 680,
      tiempo: '60 min'
    },
    {
      id: 4,
      punto: 'Parque Industrial',
      direccion: 'Carretera Norte KM 5',
      fecha: '2026-01-05',
      hora: '10:20',
      conductor: 'Luis Gómez',
      vehiculo: 'Camión RE-04',
      ruta: 'Ruta 04',
      estado: 'pendiente',
      kilos: 0,
      tiempo: '--'
    },
    {
      id: 5,
      punto: 'Hospital Regional',
      direccion: 'Av. Salud #321',
      fecha: '2026-01-04',
      hora: '14:15',
      conductor: 'María López',
      vehiculo: 'Camión RE-05',
      ruta: 'Ruta 05',
      estado: 'completado',
      kilos: 290,
      tiempo: '35 min'
    },
    {
      id: 6,
      punto: 'Universidad',
      direccion: 'Campus Central',
      fecha: '2026-01-04',
      hora: '16:30',
      conductor: 'Roberto Díaz',
      vehiculo: 'Camión RE-01',
      ruta: 'Ruta 01',
      estado: 'completado',
      kilos: 410,
      tiempo: '50 min'
    },
  ];

  // Datos únicos para los filtros
  const rutasUnicas = [...new Set(historial.map(item => item.ruta))];
  const conductoresUnicos = [...new Set(historial.map(item => item.conductor))];

  const getEstadoIcon = (estado: string) => {
    switch(estado) {
      case 'completado': return <FiCheckCircle />;
      case 'en-proceso': return <FiClock />;
      case 'retrasado': return <FiAlertCircle />;
      case 'pendiente': return <FiPauseCircle />;
      default: return null;
    }
  };

  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleLimpiarFiltros = () => {
    setSelectedDate('');
    setSelectedRuta('');
    setSelectedConductor('');
    setActiveFilter('todos');
  };

  // Filtrar el historial
  const historialFiltrado = historial.filter(item => {
    // Filtro por estado (filtros rápidos)
    if (activeFilter !== 'todos' && item.estado !== activeFilter) return false;
    
    // Filtro por fecha
    if (selectedDate && item.fecha !== selectedDate) return false;
    
    // Filtro por ruta
    if (selectedRuta && item.ruta !== selectedRuta) return false;
    
    // Filtro por conductor
    if (selectedConductor && item.conductor !== selectedConductor) return false;
    
    return true;
  });

  return (
    <div className="historial-container">
      {/* Sección 1: Header con estadísticas */}
      <header className="historial-header">
        <div className="header-content">
          <div className="header-title">
            <h1>Historial de Recolecciones</h1>
            <p className="subtitle">Seguimiento y análisis de rutas completadas</p>
          </div>
          
          <div className="header-stats">
            <div className="stat-card">
              <div className="stat-icon">
                <FiTruck />
              </div>
              <div>
                <span className="stat-value">{historial.length}</span>
                <span className="stat-label">Recolecciones totales</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <FiCheckCircle />
              </div>
              <div>
                <span className="stat-value">
                  {historial.filter(h => h.estado === 'completado').length}
                </span>
                <span className="stat-label">Completadas</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <FiClock />
              </div>
              <div>
                <span className="stat-value">
                  {historial.filter(h => h.estado === 'en-proceso').length}
                </span>
                <span className="stat-label">En proceso</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sección 2: Todos los filtros en un solo cuadro */}
      <div className="filtros-container">
        <div className="filtros-header">
          <h3 className="filtros-title">Filtros de Recolección</h3>
          <button className="btn-limpiar" onClick={handleLimpiarFiltros}>
            <FiX />
            <span>Limpiar todos</span>
          </button>
        </div>

        <div className="filtros-grid">
          {/* Filtro por fecha */}
          <div className="filtro-group">
            <div className="filtro-label">
              <FiCalendar />
              <span>Fecha de recolección:</span>
            </div>
            <input 
              type="date" 
              className="filtro-fecha-input"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          {/* Filtro por ruta */}
          <div className="filtro-group">
            <div className="filtro-label">
              <FiTruck />
              <span>Ruta:</span>
            </div>
            <select 
              className="filtro-select"
              value={selectedRuta}
              onChange={(e) => setSelectedRuta(e.target.value)}
            >
              <option value="">Todas las rutas</option>
              {rutasUnicas.map(ruta => (
                <option key={ruta} value={ruta}>{ruta}</option>
              ))}
            </select>
          </div>

          {/* Filtro por conductor */}
          <div className="filtro-group">
            <div className="filtro-label">
              <FiUser />
              <span>Conductor:</span>
            </div>
            <select 
              className="filtro-select"
              value={selectedConductor}
              onChange={(e) => setSelectedConductor(e.target.value)}
            >
              <option value="">Todos los conductores</option>
              {conductoresUnicos.map(conductor => (
                <option key={conductor} value={conductor}>{conductor}</option>
              ))}
            </select>
          </div>

          {/* Filtros rápidos por estado */}
          <div className="filtro-group full-width">
            <div className="filtro-label">
              <span>Estado:</span>
            </div>
            <div className="filtros-rapidos">
              <button 
                className={`quick-filter-btn ${activeFilter === 'todos' ? 'active' : ''}`}
                onClick={() => handleFilterClick('todos')}
              >
                Todos
              </button>
              <button 
                className={`quick-filter-btn ${activeFilter === 'completado' ? 'active' : ''}`}
                onClick={() => handleFilterClick('completado')}
              >
                <FiCheckCircle />
                Completados
              </button>
              <button 
                className={`quick-filter-btn ${activeFilter === 'en-proceso' ? 'active' : ''}`}
                onClick={() => handleFilterClick('en-proceso')}
              >
                <FiClock />
                En proceso
              </button>
              <button 
                className={`quick-filter-btn ${activeFilter === 'pendiente' ? 'active' : ''}`}
                onClick={() => handleFilterClick('pendiente')}
              >
                <FiPauseCircle />
                Pendientes
              </button>
              <button 
                className={`quick-filter-btn ${activeFilter === 'retrasado' ? 'active' : ''}`}
                onClick={() => handleFilterClick('retrasado')}
              >
                <FiAlertCircle />
                Retrasados
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sección 3: Tabla de datos */}
      <div className="table-container">
        <div className="table-header">
          <div className="table-summary">
            Mostrando {historialFiltrado.length} de {historial.length} recolecciones
          </div>
          <div className="table-search">
            <FiSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Buscar por punto, conductor o vehículo..."
              className="search-input"
            />
          </div>
        </div>

        <div className="table-wrapper">
          <table className="historial-table">
            <thead>
              <tr>
                <th>Punto de recolección</th>
                <th>Fecha y hora</th>
                <th>Conductor</th>
                <th>Ruta / Vehículo</th>
                <th>Métricas</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {historialFiltrado.map((item) => (
                <tr key={item.id} className="table-row">
                  <td className="punto-cell">
                    <div className="punto-info">
                      <div className="punto-nombre">{item.punto}</div>
                      <div className="punto-direccion">{item.direccion}</div>
                    </div>
                  </td>
                  <td className="fecha-cell">
                    <div className="fecha-info">
                      <div className="fecha">{formatFecha(item.fecha)}</div>
                      <div className="hora">{item.hora}</div>
                    </div>
                  </td>
                  <td className="conductor-cell">
                    <div className="conductor-info">
                      <div className="conductor-nombre">{item.conductor}</div>
                    </div>
                  </td>
                  <td className="ruta-cell">
                    <div className="ruta-info">
                      <div className="ruta-numero">{item.ruta}</div>
                      <div className="vehiculo">{item.vehiculo}</div>
                    </div>
                  </td>
                  <td className="metricas-cell">
                    <div className="metricas">
                      <div className="metrica">
                        <span className="metrica-label">Peso:</span>
                        <span className="metrica-value">{item.kilos} kg</span>
                      </div>
                      <div className="metrica">
                        <span className="metrica-label">Duración:</span>
                        <span className="metrica-value">{item.tiempo}</span>
                      </div>
                    </div>
                  </td>
                  <td className="estado-cell">
                    <div className={`estado-badge estado-${item.estado}`}>
                      {getEstadoIcon(item.estado)}
                      <span>
                        {item.estado === 'completado' ? 'Completado' :
                         item.estado === 'en-proceso' ? 'En proceso' :
                         item.estado === 'retrasado' ? 'Retrasado' : 'Pendiente'}
                      </span>
                    </div>
                  </td>
                  <td className="acciones-cell">
                    <button className="btn-detalles">
                      <FiEye />
                      <span>Ver</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="pagination">
          <button className="pagination-btn" disabled>
            Anterior
          </button>
          <div className="pagination-pages">
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <span className="page-dots">...</span>
            <button className="page-btn">5</button>
          </div>
          <button className="pagination-btn">
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}