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
  const [searchTerm, setSearchTerm] = useState('');

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
    setSearchTerm('');
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
    
    // Filtro por búsqueda
    if (searchTerm && !item.punto.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !item.conductor.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !item.vehiculo.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    
    return true;
  });

  return (
    <div className="historial-container">
      <div className="historial">
        {/* Sección 1: Header con estadísticas */}
        <header className="historial-header">
          <div className="historial header-content">
            <div className="historial header-title">
              <h1>Historial de Recolecciones</h1>
              <p className="historial subtitle">Seguimiento y análisis de rutas completadas</p>
            </div>
            
            <div className="historial header-stats">
              <div className="historial stat-card">
                <div className="historial stat-icon">
                  <FiTruck />
                </div>
                <div>
                  <span className="historial stat-value">{historial.length}</span>
                  <span className="historial stat-label">Recolecciones totales</span>
                </div>
              </div>
              
              <div className="historial stat-card">
                <div className="historial stat-icon">
                  <FiCheckCircle />
                </div>
                <div>
                  <span className="historial stat-value">
                    {historial.filter(h => h.estado === 'completado').length}
                  </span>
                  <span className="historial stat-label">Completadas</span>
                </div>
              </div>
              
              <div className="historial stat-card">
                <div className="historial stat-icon">
                  <FiClock />
                </div>
                <div>
                  <span className="historial stat-value">
                    {historial.filter(h => h.estado === 'en-proceso').length}
                  </span>
                  <span className="historial stat-label">En proceso</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Sección 2: Todos los filtros en un solo cuadro */}
        <div className="historial filtros-container">
          <div className="historial filtros-header">
            <h3 className="historial filtros-title">Filtros de Recolección</h3>
            <button className="historial btn-limpiar" onClick={handleLimpiarFiltros}>
              <FiX />
              <span>Limpiar todos</span>
            </button>
          </div>

          <div className="historial filtros-grid">
            {/* Filtro por fecha */}
            <div className="historial filtro-group">
              <div className="historial filtro-label">
                <FiCalendar />
                <span>Fecha de recolección:</span>
              </div>
              <input 
                type="date" 
                className="historial filtro-fecha-input"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            {/* Filtro por ruta */}
            <div className="historial filtro-group">
              <div className="historial filtro-label">
                <FiTruck />
                <span>Ruta:</span>
              </div>
              <select 
                className="historial filtro-select"
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
            <div className="historial filtro-group">
              <div className="historial filtro-label">
                <FiUser />
                <span>Conductor:</span>
              </div>
              <select 
                className="historial filtro-select"
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
            <div className="historial filtro-group historial full-width">
              <div className="historial filtro-label">
                <span>Estado:</span>
              </div>
              <div className="historial filtros-rapidos">
                <button 
                  className={`historial quick-filter-btn ${activeFilter === 'todos' ? 'historial active' : ''}`}
                  onClick={() => handleFilterClick('todos')}
                >
                  Todos
                </button>
                <button 
                  className={`historial quick-filter-btn ${activeFilter === 'completado' ? 'historial active' : ''}`}
                  onClick={() => handleFilterClick('completado')}
                >
                  <FiCheckCircle />
                  Completados
                </button>
                <button 
                  className={`historial quick-filter-btn ${activeFilter === 'en-proceso' ? 'historial active' : ''}`}
                  onClick={() => handleFilterClick('en-proceso')}
                >
                  <FiClock />
                  En proceso
                </button>
                <button 
                  className={`historial quick-filter-btn ${activeFilter === 'pendiente' ? 'historial active' : ''}`}
                  onClick={() => handleFilterClick('pendiente')}
                >
                  <FiPauseCircle />
                  Pendientes
                </button>
                <button 
                  className={`historial quick-filter-btn ${activeFilter === 'retrasado' ? 'historial active' : ''}`}
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
        <div className="historial table-container">
          <div className="historial table-header">
            <div className="historial table-summary">
              Mostrando {historialFiltrado.length} de {historial.length} recolecciones
            </div>
            <div className="historial table-search">
              <FiSearch className="historial search-icon" />
              <input 
                type="text" 
                placeholder="Buscar por punto, conductor o vehículo..."
                className="historial search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="historial table-wrapper">
            <table className="historial historial-table">
              <thead>
                <tr>
                  <th>Punto de recolección</th>
                  <th>Fecha y hora</th>
                  <th>Conductor</th>
                  <th>Ruta / Vehículo</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {historialFiltrado.map((item) => (
                  <tr key={item.id} className="historial table-row">
                    <td className="historial punto-cell">
                      <div className="historial punto-info">
                        <div className="historial punto-nombre">{item.punto}</div>
                        <div className="historial punto-direccion">{item.direccion}</div>
                      </div>
                    </td>
                    <td className="historial fecha-cell">
                      <div className="historial fecha-info">
                        <div className="historial fecha">{formatFecha(item.fecha)}</div>
                        <div className="historial hora">{item.hora}</div>
                      </div>
                    </td>
                    <td className="historial conductor-cell">
                      <div className="historial conductor-info">
                        <div className="historial conductor-nombre">{item.conductor}</div>
                      </div>
                    </td>
                    <td className="historial ruta-cell">
                      <div className="historial ruta-info">
                        <div className="historial ruta-numero">{item.ruta}</div>
                        <div className="historial vehiculo">{item.vehiculo}</div>
                      </div>
                    </td>
                    <td className="historial estado-cell">
                      <div className={`historial estado-badge historial estado-${item.estado}`}>
                        {getEstadoIcon(item.estado)}
                        <span>
                          {item.estado === 'completado' ? 'Completado' :
                           item.estado === 'en-proceso' ? 'En proceso' :
                           item.estado === 'retrasado' ? 'Retrasado' : 'Pendiente'}
                        </span>
                      </div>
                    </td>
                    <td className="historial acciones-cell">
                      <button className="historial btn-detalles">
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
          <div className="historial pagination">
            <button className="historial pagination-btn" disabled>
              Anterior
            </button>
            <div className="historial pagination-pages">
              <button className="historial page-btn historial active">1</button>
              <button className="historial page-btn">2</button>
              <button className="historial page-btn">3</button>
              <span className="historial page-dots">...</span>
              <button className="historial page-btn">5</button>
            </div>
            <button className="historial pagination-btn">
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}