// pages/ValidacionRecoleccion/ValidacionRecoleccion.tsx
import { useState } from 'react';
import './ValidacionRecoleccion.css';
import {
  FiCheckCircle,
  FiClock,
  FiAlertTriangle,
  FiPauseCircle,
  FiEye,
  FiCamera,
  FiFileText,
  FiFilter,
  FiSearch,
  FiCalendar,
  FiMapPin,
  FiUser,
  FiTruck,
  FiX,
  FiSend,
  FiAlertCircle
} from 'react-icons/fi';

export default function ValidacionRecoleccion() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEstado, setSelectedEstado] = useState('todos');

  const registros = [
    {
      id: 1,
      punto: 'P-001',
      nombre: 'Centro Comercial Plaza',
      direccion: 'Av. Central 123',
      fecha: '2026-01-05',
      hora: '08:30',
      valido: '—',
      estado: 'completado',
      conductor: 'Juan Pérez',
      vehiculo: 'Camión RE-01',
      kilos: 320,
      notas: 'Recolección normal, punto sin novedad',
      foto: 'imagen_001.jpg'
    },
    {
      id: 2,
      punto: 'P-002',
      nombre: 'Zona Residencial Norte',
      direccion: 'Calle Los Pinos 456',
      fecha: '2026-01-05',
      hora: '09:15',
      valido: '—',
      estado: 'en-proceso',
      conductor: 'Carlos Ruiz',
      vehiculo: 'Camión RE-02',
      kilos: 180,
      notas: 'Acceso parcialmente bloqueado',
      foto: 'imagen_002.jpg'
    },
    {
      id: 3,
      punto: 'P-003',
      nombre: 'Mercado Municipal',
      direccion: 'Av. del Mercado 789',
      fecha: '2026-01-05',
      hora: '09:45',
      valido: 'Pendiente',
      estado: 'retrasado',
      conductor: 'Ana Torres',
      vehiculo: 'Camión RE-03',
      kilos: 420,
      notas: 'Retraso por condiciones climáticas',
      foto: 'imagen_003.jpg'
    },
    {
      id: 4,
      punto: 'P-004',
      nombre: 'Parque Industrial',
      direccion: 'Carretera Norte KM 5',
      fecha: '2026-01-05',
      hora: '—',
      valido: '—',
      estado: 'pendiente',
      conductor: 'Luis Gómez',
      vehiculo: 'Camión RE-04',
      kilos: 0,
      notas: 'Pendiente de recolección',
      foto: ''
    },
    {
      id: 5,
      punto: 'P-005',
      nombre: 'Hospital Regional',
      direccion: 'Av. Salud 321',
      fecha: '2026-01-05',
      hora: '11:30',
      valido: 'Validado',
      estado: 'completado',
      conductor: 'María López',
      vehiculo: 'Camión RE-01',
      kilos: 290,
      notas: 'Recolección especial - residuos médicos',
      foto: 'imagen_005.jpg'
    },
    {
      id: 6,
      punto: 'P-006',
      nombre: 'Universidad Central',
      direccion: 'Campus Universitario',
      fecha: '2026-01-05',
      hora: '12:45',
      valido: 'Rechazado',
      estado: 'completado',
      conductor: 'Roberto Díaz',
      vehiculo: 'Camión RE-05',
      kilos: 150,
      notas: 'Falta evidencia fotográfica clara',
      foto: 'imagen_006.jpg'
    },
  ];

  const estadisticas = {
    total: registros.length,
    pendientesValidacion: registros.filter(r => r.valido === '—' || r.valido === 'Pendiente').length,
    validados: registros.filter(r => r.valido === 'Validado').length,
    rechazados: registros.filter(r => r.valido === 'Rechazado').length
  };

  const handleOpenModal = (item: any) => {
    setSelectedItem(item);
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

  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const registrosFiltrados = registros.filter(item => {
    if (selectedEstado !== 'todos' && item.estado !== selectedEstado) return false;
    if (searchTerm && !item.punto.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !item.nombre.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="validacion-container">
      {/* Header con estadísticas */}
      <header className="validacion-header">
        <div className="header-content">
          <div className="header-title">
            <h1>Validación de Recolección</h1>
            <p className="subtitle">Verificación y aprobación de puntos recolectados</p>
          </div>
          
          <div className="header-stats">
            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: 'rgba(15, 103, 108, 0.2)' }}>
                <FiFileText />
              </div>
              <div>
                <span className="stat-value">{estadisticas.total}</span>
                <span className="stat-label">Registros totales</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: 'rgba(241, 196, 15, 0.2)' }}>
                <FiClock />
              </div>
              <div>
                <span className="stat-value">{estadisticas.pendientesValidacion}</span>
                <span className="stat-label">Pendientes de validación</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: 'rgba(46, 204, 113, 0.2)' }}>
                <FiCheckCircle />
              </div>
              <div>
                <span className="stat-value">{estadisticas.validados}</span>
                <span className="stat-label">Validados</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: 'rgba(231, 76, 60, 0.2)' }}>
                <FiAlertCircle />
              </div>
              <div>
                <span className="stat-value">{estadisticas.rechazados}</span>
                <span className="stat-label">Rechazados</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Panel de controles */}
      <div className="controles-panel">
        <div className="controles-left">
          <div className="search-container">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar por punto o dirección..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="controles-right">
          <div className="filtros-rapidos">
            <button 
              className={`filtro-btn ${selectedEstado === 'todos' ? 'active' : ''}`}
              onClick={() => setSelectedEstado('todos')}
            >
              Todos
            </button>
            <button 
              className={`filtro-btn ${selectedEstado === 'completado' ? 'active' : ''}`}
              onClick={() => setSelectedEstado('completado')}
            >
              <FiCheckCircle />
              <span>Completados</span>
            </button>
            <button 
              className={`filtro-btn ${selectedEstado === 'pendiente' ? 'active' : ''}`}
              onClick={() => setSelectedEstado('pendiente')}
            >
              <FiClock />
              <span>Pendientes</span>
            </button>
            <button 
              className={`filtro-btn ${selectedEstado === 'retrasado' ? 'active' : ''}`}
              onClick={() => setSelectedEstado('retrasado')}
            >
              <FiAlertTriangle />
              <span>Retrasados</span>
            </button>
          </div>

          <button className="action-btn">
            <FiFilter />
            <span>Filtros avanzados</span>
          </button>
        </div>
      </div>

      {/* Tabla de registros */}
      <div className="table-container">
        <div className="table-header">
          <div className="table-summary">
            Mostrando {registrosFiltrados.length} de {registros.length} registros
          </div>
          <div className="table-actions">
            <FiCalendar />
            <span>Última actualización: Hoy 14:30</span>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="validacion-table">
            <thead>
              <tr>
                <th>Punto</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Validación</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {registrosFiltrados.map((item) => (
                <tr key={item.id} className="table-row">
                  <td className="punto-cell">
                    <div className="punto-info">
                      <div className="punto-codigo">{item.punto}</div>
                      <div className="punto-nombre">{item.nombre}</div>
                    </div>
                  </td>
                  <td className="fecha-cell">{formatFecha(item.fecha)}</td>
                  <td className="hora-cell">{item.hora}</td>
                  <td className="validacion-cell">
                    <div className={`validacion-badge validacion-${item.valido.toLowerCase()}`}>
                      {item.valido}
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
                    <button 
                      className="btn-detalles"
                      onClick={() => handleOpenModal(item)}
                    >
                      <FiEye />
                      <span>Ver detalles</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Modernizado */}
      <div className={`modal-overlay ${mostrarModal ? 'show' : ''}`}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2 className="modal-title">
              <FiFileText />
              <span>Validación de Recolección</span>
            </h2>
            <button 
              className="btn-cerrar-modal"
              onClick={() => setMostrarModal(false)}
            >
              <FiX />
            </button>
          </div>

          {selectedItem && (
            <>
              <div className="modal-info-grid">
                <div className="info-item">
                  <div className="info-label">
                    <FiMapPin />
                    <span>Punto:</span>
                  </div>
                  <div className="info-value">{selectedItem.punto} - {selectedItem.nombre}</div>
                </div>
                
                <div className="info-item">
                  <div className="info-label">
                    <FiCalendar />
                    <span>Fecha:</span>
                  </div>
                  <div className="info-value">{formatFecha(selectedItem.fecha)} {selectedItem.hora}</div>
                </div>
                
                <div className="info-item">
                  <div className="info-label">
                    <FiUser />
                    <span>Conductor:</span>
                  </div>
                  <div className="info-value">{selectedItem.conductor}</div>
                </div>
                
                <div className="info-item">
                  <div className="info-label">
                    <FiTruck />
                    <span>Vehículo:</span>
                  </div>
                  <div className="info-value">{selectedItem.vehiculo}</div>
                </div>
              </div>

              <div className="modal-section">
                <label className="section-label">
                  <FiCamera />
                  <span>Foto de evidencia</span>
                </label>
                <div className="foto-evidencia">
                  {selectedItem.foto ? (
                    <div className="foto-preview">
                      <div className="foto-placeholder">
                        <FiCamera />
                        <span>Ver imagen: {selectedItem.foto}</span>
                      </div>
                      <div className="foto-meta">
                        <span className="meta-item">Resolución: 1920x1080</span>
                        <span className="meta-item">Tamaño: 2.4 MB</span>
                      </div>
                    </div>
                  ) : (
                    <div className="foto-sin-evidencia">
                      <FiAlertCircle />
                      <span>Sin evidencia fotográfica</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="modal-section">
                <label className="section-label">
                  <FiFileText />
                  <span>Notas del conductor</span>
                </label>
                <div className="notas-contenido">
                  {selectedItem.notas}
                </div>
              </div>

              <div className="modal-section">
                <label className="section-label">Métricas</label>
                <div className="metricas-grid">
                  <div className="metrica-item">
                    <span className="metrica-label">Peso recolectado:</span>
                    <span className="metrica-value">{selectedItem.kilos} kg</span>
                  </div>
                  <div className="metrica-item">
                    <span className="metrica-label">Estado:</span>
                    <div className={`estado-badge estado-${selectedItem.estado}`}>
                      {getEstadoIcon(selectedItem.estado)}
                      <span>
                        {selectedItem.estado === 'completado' ? 'Completado' :
                         selectedItem.estado === 'en-proceso' ? 'En proceso' :
                         selectedItem.estado === 'retrasado' ? 'Retrasado' : 'Pendiente'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-section">
                <label className="section-label">Decisión de validación</label>
                <div className="decision-actions">
                  <button className="btn-validar">
                    <FiCheckCircle />
                    <span>Aprobar recolección</span>
                  </button>
                  <button className="btn-rechazar">
                    <FiAlertCircle />
                    <span>Rechazar</span>
                  </button>
                </div>
              </div>

              <div className="modal-section">
                <label className="section-label">Comentarios del supervisor</label>
                <textarea 
                  className="comentarios-input"
                  placeholder="Agregue observaciones o motivo del rechazo..."
                  rows={3}
                />
              </div>

              <div className="modal-footer">
                <button className="btn-secundario">
                  <FiSend />
                  <span>Enviar a revisión</span>
                </button>
                <button 
                  className="btn-principal"
                  onClick={() => setMostrarModal(false)}
                >
                  <FiCheckCircle />
                  <span>Guardar y cerrar</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}