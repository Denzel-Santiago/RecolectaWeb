// pages/EstadoRuta/EstadoRuta.tsx
import { useState } from 'react';
import './EstadoRuta.css';
import {
  FiMapPin,
  FiCheckCircle,
  FiClock,
  FiAlertTriangle,
  FiPauseCircle,
  FiEye,
  FiFilter,
  FiSearch,
  FiDownload,
  FiNavigation,
  FiCalendar,
  FiTruck,
  FiBarChart2
} from 'react-icons/fi';

export default function EstadoRuta() {
  const [selectedRuta, setSelectedRuta] = useState('Ruta 01');
  const [searchTerm, setSearchTerm] = useState('');

  const rutasDisponibles = ['Ruta 01', 'Ruta 02', 'Ruta 03', 'Ruta 04', 'Ruta 05'];

  const puntos = [
    {
      id: 1,
      codigo: 'P-001',
      nombre: 'Centro Comercial Plaza',
      direccion: 'Av. Central 123, Zona 1',
      barrio: 'Centro',
      estado: 'completado',
      hora: '08:30',
      conductor: 'Juan Pérez',
      vehiculo: 'Camión RE-01',
      kilos: 320,
      tiempo: '25 min'
    },
    {
      id: 2,
      codigo: 'P-002',
      nombre: 'Zona Residencial Norte',
      direccion: 'Calle Los Pinos 456',
      barrio: 'Residencial Norte',
      estado: 'en-proceso',
      hora: '09:15',
      conductor: 'Carlos Ruiz',
      vehiculo: 'Camión RE-02',
      kilos: 180,
      tiempo: '15 min'
    },
    {
      id: 3,
      codigo: 'P-003',
      nombre: 'Mercado Municipal',
      direccion: 'Av. del Mercado 789',
      barrio: 'Centro Histórico',
      estado: 'retrasado',
      hora: '09:45',
      conductor: 'Ana Torres',
      vehiculo: 'Camión RE-03',
      kilos: 420,
      tiempo: '35 min'
    },
    {
      id: 4,
      codigo: 'P-004',
      nombre: 'Parque Industrial',
      direccion: 'Carretera Norte KM 5',
      barrio: 'Industrial',
      estado: 'pendiente',
      hora: '10:30',
      conductor: 'Luis Gómez',
      vehiculo: 'Camión RE-04',
      kilos: 0,
      tiempo: '--'
    },
    {
      id: 5,
      codigo: 'P-005',
      nombre: 'Hospital Regional',
      direccion: 'Av. Salud 321',
      barrio: 'Zona Médica',
      estado: 'completado',
      hora: '11:15',
      conductor: 'María López',
      vehiculo: 'Camión RE-01',
      kilos: 290,
      tiempo: '20 min'
    },
    {
      id: 6,
      codigo: 'P-006',
      nombre: 'Universidad Central',
      direccion: 'Campus Universitario',
      barrio: 'Ciudad Universitaria',
      estado: 'en-proceso',
      hora: '12:00',
      conductor: 'Roberto Díaz',
      vehiculo: 'Camión RE-05',
      kilos: 150,
      tiempo: '12 min'
    },
    {
      id: 7,
      codigo: 'P-007',
      nombre: 'Terminal de Buses',
      direccion: 'Terminal Norte',
      barrio: 'Terminal',
      estado: 'pendiente',
      hora: '13:20',
      conductor: 'Laura Martínez',
      vehiculo: 'Camión RE-02',
      kilos: 0,
      tiempo: '--'
    },
    {
      id: 8,
      codigo: 'P-008',
      nombre: 'Centro Deportivo',
      direccion: 'Av. Deportiva 555',
      barrio: 'Deportivo',
      estado: 'completado',
      hora: '14:10',
      conductor: 'David Ramírez',
      vehiculo: 'Camión RE-03',
      kilos: 210,
      tiempo: '18 min'
    },
  ];

  const estadisticas = {
    total: puntos.length,
    completados: puntos.filter(p => p.estado === 'completado').length,
    enProceso: puntos.filter(p => p.estado === 'en-proceso').length,
    pendientes: puntos.filter(p => p.estado === 'pendiente').length,
    kilosTotal: puntos.reduce((total, p) => total + p.kilos, 0)
  };

  const getEstadoIcon = (estado: string) => {
    switch(estado) {
      case 'completado': return <FiCheckCircle />;
      case 'en-proceso': return <FiClock />;
      case 'retrasado': return <FiAlertTriangle />;
      case 'pendiente': return <FiPauseCircle />;
      default: return null;
    }
  };

  const puntosFiltrados = puntos.filter(punto => 
    !searchTerm || 
    punto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    punto.direccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    punto.codigo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="estado-ruta-container">
      {/* Header con estadísticas */}
      <header className="estado-ruta-header">
        <div className="header-content">
          <div className="header-title">
            <h1>Estado por Ruta</h1>
            <p className="subtitle">Seguimiento en tiempo real de puntos de recolección</p>
          </div>
          
          <div className="header-stats">
            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: 'rgba(15, 103, 108, 0.2)' }}>
                <FiMapPin />
              </div>
              <div>
                <span className="stat-value">{estadisticas.total}</span>
                <span className="stat-label">Puntos totales</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: 'rgba(46, 204, 113, 0.2)' }}>
                <FiCheckCircle />
              </div>
              <div>
                <span className="stat-value">{estadisticas.completados}</span>
                <span className="stat-label">Completados</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: 'rgba(241, 196, 15, 0.2)' }}>
                <FiClock />
              </div>
              <div>
                <span className="stat-value">{estadisticas.enProceso}</span>
                <span className="stat-label">En proceso</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: 'rgba(52, 152, 219, 0.2)' }}>
                <FiBarChart2 />
              </div>
              <div>
                <span className="stat-value">{estadisticas.kilosTotal}</span>
                <span className="stat-label">Kg recolectados</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Panel de controles */}
      <div className="controles-panel">
        <div className="controles-left">
          <div className="ruta-selector">
            <label className="selector-label">
              <FiTruck />
              <span>Seleccionar ruta:</span>
            </label>
            <select 
              className="selector-input"
              value={selectedRuta}
              onChange={(e) => setSelectedRuta(e.target.value)}
            >
              {rutasDisponibles.map(ruta => (
                <option key={ruta} value={ruta}>{ruta}</option>
              ))}
            </select>
          </div>

          <div className="filtros-rapidos">
            <button className="filtro-btn active">
              <span>Todos los puntos</span>
            </button>
            <button className="filtro-btn">
              <FiCheckCircle />
              <span>Solo completados</span>
            </button>
            <button className="filtro-btn">
              <FiClock />
              <span>En proceso</span>
            </button>
            <button className="filtro-btn">
              <FiAlertTriangle />
              <span>Solo retrasados</span>
            </button>
          </div>
        </div>

        <div className="controles-right">
          <div className="search-container">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar punto, dirección o barrio..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button className="action-btn">
            <FiDownload />
            <span>Exportar</span>
          </button>
        </div>
      </div>

      {/* Tabla de puntos */}
      <div className="table-container">
        <div className="table-header">
          <div className="table-summary">
            Mostrando {puntosFiltrados.length} puntos de {selectedRuta}
          </div>
          <div className="table-actions">
            <FiCalendar className="action-icon" />
            <span>Actualizado: Hoy 14:30</span>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="estado-ruta-table">
            <thead>
              <tr>
                <th>Punto</th>
                <th>Ubicación</th>
                <th>Estado</th>
                <th>Hora</th>
                <th>Conductor/Vehiculo</th>
                <th>Métricas</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {puntosFiltrados.map((punto) => (
                <tr key={punto.id} className="table-row">
                  <td className="punto-cell">
                    <div className="punto-info">
                      <div className="punto-codigo">{punto.codigo}</div>
                      <div className="punto-nombre">{punto.nombre}</div>
                    </div>
                  </td>
                  <td className="ubicacion-cell">
                    <div className="ubicacion-info">
                      <div className="direccion">
                        <FiMapPin />
                        <span>{punto.direccion}</span>
                      </div>
                      <div className="barrio">{punto.barrio}</div>
                    </div>
                  </td>
                  <td className="estado-cell">
                    <div className={`estado-badge estado-${punto.estado}`}>
                      {getEstadoIcon(punto.estado)}
                      <span>
                        {punto.estado === 'completado' ? 'Completado' :
                         punto.estado === 'en-proceso' ? 'En proceso' :
                         punto.estado === 'retrasado' ? 'Retrasado' : 'Pendiente'}
                      </span>
                    </div>
                  </td>
                  <td className="hora-cell">
                    <div className="hora-info">
                      <div className="hora">{punto.hora}</div>
                      {punto.tiempo !== '--' && (
                        <div className="tiempo">{punto.tiempo}</div>
                      )}
                    </div>
                  </td>
                  <td className="conductor-cell">
                    <div className="conductor-info">
                      <div className="conductor">{punto.conductor}</div>
                      <div className="vehiculo">
                        <FiTruck />
                        <span>{punto.vehiculo}</span>
                      </div>
                    </div>
                  </td>
                  <td className="metricas-cell">
                    <div className="metricas">
                      <div className="metrica">
                        <span className="metrica-label">Peso:</span>
                        <span className="metrica-value">{punto.kilos} kg</span>
                      </div>
                      {punto.tiempo !== '--' && (
                        <div className="metrica">
                          <span className="metrica-label">Duración:</span>
                          <span className="metrica-value">{punto.tiempo}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="acciones-cell">
                    <button className="btn-detalles">
                      <FiEye />
                      <span>Detalles</span>
                    </button>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Resumen de ruta */}
        <div className="ruta-resumen">
          <div className="resumen-item">
            <h4>Resumen de {selectedRuta}</h4>
            <div className="resumen-stats">
              <div className="resumen-stat">
                <span className="stat-num">{estadisticas.completados}</span>
                <span className="stat-label">Completados</span>
              </div>
              <div className="resumen-stat">
                <span className="stat-num">{estadisticas.pendientes}</span>
                <span className="stat-label">Pendientes</span>
              </div>
              <div className="resumen-stat">
                <span className="stat-num">{estadisticas.kilosTotal} kg</span>
                <span className="stat-label">Recolectado</span>
              </div>
              <div className="resumen-stat">
                <span className="stat-num">
                  {Math.round((estadisticas.completados / estadisticas.total) * 100)}%
                </span>
                <span className="stat-label">Progreso</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}