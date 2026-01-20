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
  FiSearch,
  FiDownload,
  FiCalendar,
  FiTruck,
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
      <div className="estado-ruta">
        {/* Header con estadísticas */}
        <header className="estado-ruta-header">
          <div className="estado-ruta header-content">
            <div className="estado-ruta header-title">
              <h1>Estado por Ruta</h1>
              <p className="estado-ruta subtitle">Seguimiento en tiempo real de puntos de recolección</p>
            </div>
            
            <div className="estado-ruta header-stats">
              <div className="estado-ruta stat-card">
                <div className="estado-ruta stat-icon" style={{ backgroundColor: 'rgba(238, 244, 245, 0.85)' }}>
                  <FiMapPin />
                </div>
                <div>
                  <span className="estado-ruta stat-value">{estadisticas.total}</span>
                  <span className="estado-ruta stat-label">Puntos totales</span>
                </div>
              </div>
              
              <div className="estado-ruta stat-card">
                <div className="estado-ruta stat-icon" style={{ backgroundColor: 'rgba(15, 236, 107, 0.94)' }}>
                  <FiCheckCircle />
                </div>
                <div>
                  <span className="estado-ruta stat-value">{estadisticas.completados}</span>
                  <span className="estado-ruta stat-label">Completados</span>
                </div>
              </div>
              
              <div className="estado-ruta stat-card">
                <div className="estado-ruta stat-icon" style={{ backgroundColor: 'rgba(192, 241, 15, 0.9)' }}>
                  <FiClock />
                </div>
                <div>
                  <span className="estado-ruta stat-value">{estadisticas.enProceso}</span>
                  <span className="estado-ruta stat-label">En proceso</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Panel de controles */}
        <div className="estado-ruta controles-panel">
          <div className="estado-ruta controles-left">
            <div className="estado-ruta ruta-selector">
              <label className="estado-ruta selector-label">
                <FiTruck />
                <span>Seleccionar ruta:</span>
              </label>
              <select 
                className="estado-ruta selector-input"
                value={selectedRuta}
                onChange={(e) => setSelectedRuta(e.target.value)}
              >
                {rutasDisponibles.map(ruta => (
                  <option key={ruta} value={ruta}>{ruta}</option>
                ))}
              </select>
            </div>

            <div className="estado-ruta filtros-rapidos">
              <button className="estado-ruta filtro-btn estado-ruta active">
                <span>Todos los puntos</span>
              </button>
              <button className="estado-ruta filtro-btn">
                <FiCheckCircle />
                <span>Solo completados</span>
              </button>
              <button className="estado-ruta filtro-btn">
                <FiClock />
                <span>En proceso</span>
              </button>
              <button className="estado-ruta filtro-btn">
                <FiAlertTriangle />
                <span>Solo retrasados</span>
              </button>
            </div>
          </div>

          <div className="estado-ruta controles-right">
            <div className="estado-ruta search-container">
              <FiSearch className="estado-ruta search-icon" />
              <input
                type="text"
                placeholder="Buscar punto, dirección o barrio..."
                className="estado-ruta search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button className="estado-ruta action-btn">
              <FiDownload />
              <span>Exportar</span>
            </button>
          </div>
        </div>

        {/* Tabla de puntos */}
        <div className="estado-ruta table-container">
          <div className="estado-ruta table-header">
            <div className="estado-ruta table-summary">
              Mostrando {puntosFiltrados.length} puntos de {selectedRuta}
            </div>
            <div className="estado-ruta table-actions">
              <FiCalendar className="estado-ruta action-icon" />
              <span>Actualizado: Hoy 14:30</span>
            </div>
          </div>

          <div className="estado-ruta table-wrapper">
            <table className="estado-ruta estado-ruta-table">
              <thead>
                <tr>
                  <th>Punto</th>
                  <th>Ubicación</th>
                  <th>Estado</th>
                  <th>Hora</th>
                  <th>Conductor/Vehiculo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {puntosFiltrados.map((punto) => (
                  <tr key={punto.id} className="estado-ruta table-row">
                    <td className="estado-ruta punto-cell">
                      <div className="estado-ruta punto-info">
                        <div className="estado-ruta punto-codigo">{punto.codigo}</div>
                        <div className="estado-ruta punto-nombre">{punto.nombre}</div>
                      </div>
                    </td>
                    <td className="estado-ruta ubicacion-cell">
                      <div className="estado-ruta ubicacion-info">
                        <div className="estado-ruta direccion">
                          <FiMapPin />
                          <span>{punto.direccion}</span>
                        </div>
                        <div className="estado-ruta barrio">{punto.barrio}</div>
                      </div>
                    </td>
                    <td className="estado-ruta estado-cell">
                      <div className={`estado-ruta estado-badge estado-ruta estado-${punto.estado}`}>
                        {getEstadoIcon(punto.estado)}
                        <span>
                          {punto.estado === 'completado' ? 'Completado' :
                           punto.estado === 'en-proceso' ? 'En proceso' :
                           punto.estado === 'retrasado' ? 'Retrasado' : 'Pendiente'}
                        </span>
                      </div>
                    </td>
                    <td className="estado-ruta hora-cell">
                      <div className="estado-ruta hora-info">
                        <div className="estado-ruta hora">{punto.hora}</div>
                        {punto.tiempo !== '--' && (
                          <div className="estado-ruta tiempo">{punto.tiempo}</div>
                        )}
                      </div>
                    </td>
                    <td className="estado-ruta conductor-cell">
                      <div className="estado-ruta conductor-info">
                        <div className="estado-ruta conductor">{punto.conductor}</div>
                        <div className="estado-ruta vehiculo">
                          <FiTruck />
                          <span>{punto.vehiculo}</span>
                        </div>
                      </div>
                    </td>
                    <td className="estado-ruta acciones-cell">
                      <button className="estado-ruta btn-detalles">
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
          <div className="estado-ruta ruta-resumen">
            <div className="estado-ruta resumen-item">
              <h4>Resumen de {selectedRuta}</h4>
              <div className="estado-ruta resumen-stats">
                <div className="estado-ruta resumen-stat">
                  <span className="estado-ruta stat-num">{estadisticas.completados}</span>
                  <span className="estado-ruta stat-label">Completados</span>
                </div>
                <div className="estado-ruta resumen-stat">
                  <span className="estado-ruta stat-num">{estadisticas.pendientes}</span>
                  <span className="estado-ruta stat-label">Pendientes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}