// pages/Anomalias/Anomalias.tsx
import { useState } from 'react';
import './Anomalias.css';
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiClock,
  FiPauseCircle,
  FiEye,
  FiFilter,
  FiSearch,
  FiCalendar,
  FiMapPin,
  FiUser,
  FiFileText,
  FiMessageSquare,
  FiX,
  FiSend,
  FiAlertCircle,
  FiTrendingUp,
  FiTrendingDown,
  FiUsers,
  FiArchive
} from 'react-icons/fi';

export default function Anomalias() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [selectedAnomalia, setSelectedAnomalia] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEstado, setSelectedEstado] = useState('todos');
  const [selectedPrioridad, setSelectedPrioridad] = useState('todos');

  const anomalias = [
    {
      id: 1,
      punto: 'P-012',
      nombre: 'Centro Comercial Plaza',
      direccion: 'Av. Central 123',
      descripcion: 'Contenedor roto - Daño en estructura metálica',
      tipo: 'infraestructura',
      fecha: '2026-02-19',
      hora: '08:30',
      estado: 'completado',
      prioridad: 'critica',
      reportadoPor: 'Juan Pérez',
      asignadoA: 'Equipo Mantenimiento',
      kilosAfetados: 120,
      tiempoResolucion: '48h'
    },
    {
      id: 2,
      punto: 'P-008',
      nombre: 'Zona Residencial Norte',
      direccion: 'Calle Los Pinos 456',
      descripcion: 'Derrame de residuos líquidos - Área contaminada',
      tipo: 'contaminacion',
      fecha: '2026-02-20',
      hora: '09:15',
      estado: 'en-proceso',
      prioridad: 'media',
      reportadoPor: 'Carlos Ruiz',
      asignadoA: 'Equipo Limpieza',
      kilosAfetados: 85,
      tiempoResolucion: '24h'
    },
    {
      id: 3,
      punto: 'P-021',
      nombre: 'Mercado Municipal',
      direccion: 'Av. del Mercado 789',
      descripcion: 'Acceso bloqueado por vehículos particulares',
      tipo: 'acceso',
      fecha: '2026-02-21',
      hora: '10:45',
      estado: 'retrasado',
      prioridad: 'baja',
      reportadoPor: 'Ana Torres',
      asignadoA: 'Equipo Logística',
      kilosAfetados: 0,
      tiempoResolucion: '72h'
    },
    {
      id: 4,
      punto: 'P-005',
      nombre: 'Parque Industrial',
      direccion: 'Carretera Norte KM 5',
      descripcion: 'Contenedor lleno - Capacidad excedida por 3 días',
      tipo: 'capacidad',
      fecha: '2026-02-22',
      hora: '11:30',
      estado: 'pendiente',
      prioridad: 'media',
      reportadoPor: 'Luis Gómez',
      asignadoA: 'Pendiente',
      kilosAfetados: 350,
      tiempoResolucion: '--'
    },
    {
      id: 5,
      punto: 'P-017',
      nombre: 'Hospital Regional',
      direccion: 'Av. Salud 321',
      descripcion: 'Mal olor - Residuos orgánicos en descomposición',
      tipo: 'sanitario',
      fecha: '2026-02-18',
      hora: '14:20',
      estado: 'completado',
      prioridad: 'critica',
      reportadoPor: 'María López',
      asignadoA: 'Equipo Sanitario',
      kilosAfetados: 90,
      tiempoResolucion: '12h'
    },
    {
      id: 6,
      punto: 'P-029',
      nombre: 'Universidad Central',
      direccion: 'Campus Universitario',
      descripcion: 'Vandalismo - Grafitis en contenedor',
      tipo: 'vandalismo',
      fecha: '2026-02-23',
      hora: '13:15',
      estado: 'en-proceso',
      prioridad: 'baja',
      reportadoPor: 'Roberto Díaz',
      asignadoA: 'Equipo Mantenimiento',
      kilosAfetados: 0,
      tiempoResolucion: '36h'
    },
    {
      id: 7,
      punto: 'P-033',
      nombre: 'Terminal de Buses',
      direccion: 'Terminal Norte',
      descripcion: 'Falta de contenedores - Punto desabastecido',
      tipo: 'abastecimiento',
      fecha: '2026-02-24',
      hora: '16:45',
      estado: 'pendiente',
      prioridad: 'media',
      reportadoPor: 'Laura Martínez',
      asignadoA: 'Pendiente',
      kilosAfetados: 0,
      tiempoResolucion: '--'
    },
    {
      id: 8,
      punto: 'P-041',
      nombre: 'Centro Deportivo',
      direccion: 'Av. Deportiva 555',
      descripcion: 'Fuga en contenedor de líquidos - Pérdida de residuos',
      tipo: 'fuga',
      fecha: '2026-02-25',
      hora: '08:10',
      estado: 'en-proceso',
      prioridad: 'critica',
      reportadoPor: 'David Ramírez',
      asignadoA: 'Equipo Urgencias',
      kilosAfetados: 65,
      tiempoResolucion: '6h'
    },
  ];

  const estadisticas = {
    total: anomalias.length,
    criticas: anomalias.filter(a => a.prioridad === 'critica').length,
    enProceso: anomalias.filter(a => a.estado === 'en-proceso').length,
    pendientes: anomalias.filter(a => a.estado === 'pendiente').length,
    resueltas: anomalias.filter(a => a.estado === 'completado').length
  };

  const tiposAnomalias = [
    { tipo: 'infraestructura', color: '#e74c3c', icon: FiAlertTriangle },
    { tipo: 'contaminacion', color: '#f39c12', icon: FiAlertCircle },
    { tipo: 'acceso', color: '#3498db', icon: FiAlertCircle },
    { tipo: 'capacidad', color: '#9b59b6', icon: FiTrendingUp },
    { tipo: 'sanitario', color: '#1abc9c', icon: FiAlertCircle },
    { tipo: 'vandalismo', color: '#34495e', icon: FiAlertCircle },
    { tipo: 'abastecimiento', color: '#e67e22', icon: FiTrendingDown },
    { tipo: 'fuga', color: '#c0392b', icon: FiAlertTriangle },
  ];

  const handleOpenModal = (anomalia: any) => {
    setSelectedAnomalia(anomalia);
    setMostrarModal(true);
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

  const getPrioridadColor = (prioridad: string) => {
    switch(prioridad) {
      case 'critica': return '#e74c3c';
      case 'media': return '#f39c12';
      case 'baja': return '#27ae60';
      default: return '#95a5a6';
    }
  };

  const getTipoIcon = (tipo: string) => {
    const tipoObj = tiposAnomalias.find(t => t.tipo === tipo);
    if (tipoObj) {
      const Icon = tipoObj.icon;
      return <Icon style={{ color: tipoObj.color }} />;
    }
    return <FiAlertTriangle />;
  };

  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const anomaliasFiltradas = anomalias.filter(item => {
    if (selectedEstado !== 'todos' && item.estado !== selectedEstado) return false;
    if (selectedPrioridad !== 'todos' && item.prioridad !== selectedPrioridad) return false;
    if (searchTerm && !item.punto.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !item.descripcion.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="anomalias-page">
      <div className="anomalias">
        {/* Header con estadísticas */}
        <header className="anomalias-header">
          <div className="anomalias header-content">
            <div className="anomalias header-title">
              <h1>Gestión de Anomalías</h1>
              <p className="anomalias subtitle">Reportes y seguimiento de incidentes en puntos de recolección</p>
            </div>
            
            <div className="anomalias stats-container">
              <div className="anomalias stat-card">
                <div className="anomalias stat-icon-1">
                  <FiAlertTriangle />
                </div>
                <div>
                  <span className="anomalias stat-value">{estadisticas.total}</span>
                  <span className="anomalias stat-label">Anomalías totales</span>
                </div>
              </div>
              
              <div className="anomalias stat-card">
                <div className="anomalias stat-icon-2">
                  <FiAlertCircle />
                </div>
                <div>
                  <span className="anomalias stat-value">{estadisticas.criticas}</span>
                  <span className="anomalias stat-label">Críticas activas</span>
                </div>
              </div>
              
              <div className="anomalias stat-card">
                <div className="anomalias stat-icon-3">
                  <FiClock />
                </div>
                <div>
                  <span className="anomalias stat-value">{estadisticas.enProceso}</span>
                  <span className="anomalias stat-label">En proceso</span>
                </div>
              </div>
              
              <div className="anomalias stat-card">
                <div className="anomalias stat-icon-4">
                  <FiCheckCircle />
                </div>
                <div>
                  <span className="anomalias stat-value">{estadisticas.resueltas}</span>
                  <span className="anomalias stat-label">Resueltas</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Panel de controles */}
        <div className="anomalias controls-container">
          <div className="anomalias search-container">
            <FiSearch className="anomalias search-icon" />
            <input
              type="text"
              placeholder="Buscar por punto, descripción o dirección..."
              className="anomalias search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="anomalias filters-row">
            <div className="anomalias filter-group">
              <label className="anomalias filter-label">
                <FiFilter />
                <span>Estado:</span>
              </label>
              <select 
                className="anomalias filter-select"
                value={selectedEstado}
                onChange={(e) => setSelectedEstado(e.target.value)}
              >
                <option value="todos">Todos los estados</option>
                <option value="completado">Completado</option>
                <option value="en-proceso">En proceso</option>
                <option value="retrasado">Retrasado</option>
                <option value="pendiente">Pendiente</option>
              </select>
            </div>

            <div className="anomalias filter-group">
              <label className="anomalias filter-label">
                <FiAlertTriangle />
                <span>Prioridad:</span>
              </label>
              <select 
                className="anomalias filter-select"
                value={selectedPrioridad}
                onChange={(e) => setSelectedPrioridad(e.target.value)}
              >
                <option value="todos">Todas las prioridades</option>
                <option value="critica">Crítica</option>
                <option value="media">Media</option>
                <option value="baja">Baja</option>
              </select>
            </div>

            <button className="anomalias action-btn">
              <FiArchive />
              <span>Exportar reporte</span>
            </button>
          </div>
        </div>

        {/* Tabla de anomalías */}
        <div className="anomalias table-container">
          <div className="anomalias table-header">
            <div className="anomalias table-summary">
              Mostrando {anomaliasFiltradas.length} de {anomalias.length} anomalías
            </div>
            <div className="anomalias table-actions">
              <FiCalendar />
              <span>Última actualización: Hoy 15:45</span>
            </div>
          </div>

          <div className="anomalias table-wrapper">
            <table className="anomalias anomalias-table">
              <thead>
                <tr>
                  <th>Punto</th>
                  <th>Descripción</th>
                  <th>Fecha reporte</th>
                  <th>Estado</th>
                  <th>Prioridad</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {anomaliasFiltradas.map((item) => (
                  <tr key={item.id} className="anomalias table-row">
                    <td>
                      <div className="anomalias punto-info">
                        <div className="anomalias punto-codigo">{item.punto}</div>
                        <div className="anomalias punto-nombre">{item.nombre}</div>
                      </div>
                    </td>
                    <td>
                      <div className="anomalias descripcion">
                        {item.descripcion}
                        <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '4px' }}>
                          <FiUser style={{ marginRight: '4px' }} />
                          {item.reportadoPor}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div>{formatFecha(item.fecha)}</div>
                        <div style={{ fontSize: '12px', opacity: 0.7 }}>{item.hora}</div>
                      </div>
                    </td>
                    <td>
                      <div className={`anomalias estado-badge anomalias estado-${item.estado}`}>
                        {getEstadoIcon(item.estado)}
                        <span>
                          {item.estado === 'completado' ? 'Completado' :
                           item.estado === 'en-proceso' ? 'En proceso' :
                           item.estado === 'retrasado' ? 'Retrasado' : 'Pendiente'}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className={`anomalias prioridad-badge anomalias prioridad-${item.prioridad}`}>
                        <div style={{ 
                          width: '8px', 
                          height: '8px', 
                          borderRadius: '50%',
                          backgroundColor: getPrioridadColor(item.prioridad)
                        }}></div>
                        <span>
                          {item.prioridad === 'critica' ? 'Crítica' :
                           item.prioridad === 'media' ? 'Media' : 'Baja'}
                        </span>
                      </div>
                    </td>
                    <td>
                      <button 
                        className="anomalias btn-detalles"
                        onClick={() => handleOpenModal(item)}
                      >
                        <FiEye />
                        <span>Ver</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Resumen de anomalías */}
          <div className="anomalias resumen-container">
            <h4>Resumen por prioridad</h4>
            <div className="anomalias resumen-stats">
              <div className="anomalias resumen-stat">
                <span className="anomalias resumen-num" style={{ color: '#e74c3c' }}>{estadisticas.criticas}</span>
                <span className="anomalias resumen-label">Críticas</span>
              </div>
              <div className="anomalias resumen-stat">
                <span className="anomalias resumen-num" style={{ color: '#f39c12' }}>
                  {anomalias.filter(a => a.prioridad === 'media').length}
                </span>
                <span className="anomalias resumen-label">Media</span>
              </div>
              <div className="anomalias resumen-stat">
                <span className="anomalias resumen-num" style={{ color: '#27ae60' }}>
                  {anomalias.filter(a => a.prioridad === 'baja').length}
                </span>
                <span className="anomalias resumen-label">Baja</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        <div className={`anomalias modal-overlay ${mostrarModal ? 'show' : ''}`}>
          <div className="anomalias modal" onClick={(e) => e.stopPropagation()}>
            <div className="anomalias modal-header">
              <h2 className="anomalias modal-title">
                {getTipoIcon(selectedAnomalia?.tipo || 'infraestructura')}
                <span>Detalles de Anomalía</span>
              </h2>
              <button 
                className="anomalias modal-close"
                onClick={() => setMostrarModal(false)}
              >
                <FiX />
              </button>
            </div>

            {selectedAnomalia && (
              <>
                <div className="anomalias modal-info">
                  <div>
                    <div className="anomalias modal-label">
                      <FiMapPin />
                      <span>Punto:</span>
                    </div>
                    <div>{selectedAnomalia.punto} - {selectedAnomalia.nombre}</div>
                  </div>
                  
                  <div>
                    <div className="anomalias modal-label">
                      <FiCalendar />
                      <span>Fecha reporte:</span>
                    </div>
                    <div>{formatFecha(selectedAnomalia.fecha)} {selectedAnomalia.hora}</div>
                  </div>
                  
                  <div>
                    <div className="anomalias modal-label">
                      <FiUser />
                      <span>Reportado por:</span>
                    </div>
                    <div>{selectedAnomalia.reportadoPor}</div>
                  </div>
                  
                  <div>
                    <div className="anomalias modal-label">
                      <FiUsers />
                      <span>Asignado a:</span>
                    </div>
                    <div>{selectedAnomalia.asignadoA}</div>
                  </div>
                </div>

                <div className="anomalias modal-section">
                  <label className="anomalias modal-label">
                    <FiFileText />
                    <span>Descripción detallada</span>
                  </label>
                  <div className="anomalias modal-textarea" style={{ minHeight: '80px' }}>
                    {selectedAnomalia.descripcion}
                  </div>
                </div>

                <div className="anomalias modal-section">
                  <label className="anomalias modal-label">Estado y métricas</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <div style={{ fontSize: '13px', opacity: 0.7 }}>Estado actual:</div>
                      <div className={`anomalias estado-badge anomalias estado-${selectedAnomalia.estado}`}>
                        {getEstadoIcon(selectedAnomalia.estado)}
                        <span>
                          {selectedAnomalia.estado === 'completado' ? 'Completado' :
                           selectedAnomalia.estado === 'en-proceso' ? 'En proceso' :
                           selectedAnomalia.estado === 'retrasado' ? 'Retrasado' : 'Pendiente'}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <div style={{ fontSize: '13px', opacity: 0.7 }}>Prioridad:</div>
                      <div className={`anomalias prioridad-badge anomalias prioridad-${selectedAnomalia.prioridad}`}>
                        <div style={{ 
                          width: '8px', 
                          height: '8px', 
                          borderRadius: '50%',
                          backgroundColor: getPrioridadColor(selectedAnomalia.prioridad)
                        }}></div>
                        <span>
                          {selectedAnomalia.prioridad === 'critica' ? 'Crítica' :
                           selectedAnomalia.prioridad === 'media' ? 'Media' : 'Baja'}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <div style={{ fontSize: '13px', opacity: 0.7 }}>Kg afectados:</div>
                      <div style={{ fontSize: '16px', fontWeight: '600' }}>{selectedAnomalia.kilosAfetados} kg</div>
                    </div>
                    
                    <div>
                      <div style={{ fontSize: '13px', opacity: 0.7 }}>Tiempo resolución:</div>
                      <div style={{ fontSize: '16px', fontWeight: '600' }}>{selectedAnomalia.tiempoResolucion}</div>
                    </div>
                  </div>
                </div>

                <div className="anomalias modal-section">
                  <label className="anomalias modal-label">
                    <FiMessageSquare />
                    <span>Actualizar estado</span>
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <select className="anomalias modal-select">
                      <option value="pendiente">Pendiente</option>
                      <option value="en-proceso">En proceso</option>
                      <option value="completado">Completado</option>
                      <option value="retrasado">Retrasado</option>
                    </select>
                    
                    <select className="anomalias modal-select">
                      <option value="">Asignar a equipo...</option>
                      <option value="mantenimiento">Equipo Mantenimiento</option>
                      <option value="limpieza">Equipo Limpieza</option>
                      <option value="logistica">Equipo Logística</option>
                      <option value="sanitario">Equipo Sanitario</option>
                      <option value="urgencias">Equipo Urgencias</option>
                    </select>
                  </div>
                </div>

                <div className="anomalias modal-section">
                  <label className="anomalias modal-label">
                    <FiMessageSquare />
                    <span>Historial de acciones</span>
                  </label>
                  <div className="anomalias modal-historial">
                    <div className="anomalias historial-item">
                      <div className="anomalias historial-fecha">2026-02-19 08:30</div>
                      <div className="anomalias historial-desc">Reporte creado por {selectedAnomalia.reportadoPor}</div>
                    </div>
                    <div className="anomalias historial-item">
                      <div className="anomalias historial-fecha">2026-02-19 10:15</div>
                      <div className="anomalias historial-desc">Asignado a {selectedAnomalia.asignadoA}</div>
                    </div>
                    <div className="anomalias historial-item">
                      <div className="anomalias historial-fecha">2026-02-20 14:30</div>
                      <div className="anomalias historial-desc">Estado cambiado a "En proceso"</div>
                    </div>
                  </div>
                </div>

                <div className="anomalias modal-section">
                  <label className="anomalias modal-label">Comentarios adicionales</label>
                  <textarea 
                    className="anomalias modal-textarea"
                    placeholder="Agregue observaciones o próximos pasos..."
                    rows={3}
                  />
                </div>

                <div className="anomalias modal-footer">
                  <button className="anomalias modal-btn anomalias modal-btn-secondary">
                    <FiMessageSquare />
                    <span>Comentar</span>
                  </button>
                  <button className="anomalias modal-btn anomalias modal-btn-primary">
                    <FiSend />
                    <span>Guardar</span>
                  </button>
                  <button 
                    className="anomalias modal-btn anomalias modal-btn-success"
                    onClick={() => setMostrarModal(false)}
                  >
                    <FiCheckCircle />
                    <span>Cerrar</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}