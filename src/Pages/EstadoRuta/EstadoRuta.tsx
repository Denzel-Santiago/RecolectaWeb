// pages/EstadoRuta/EstadoRuta.tsx
import { useState } from 'react';
import './EstadoRuta.css';
import {
  FiMapPin,
  FiCheckCircle,
  FiClock,
  FiPauseCircle,
  FiEye,
  FiSearch,
  FiDownload,
  FiCalendar,
  FiTruck,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiSave,
  FiX,
  FiList,
  FiNavigation
} from 'react-icons/fi';

// Definimos el tipo de punto
type Punto = {
  id: number;
  latitud: number;
  longitud: number;
  direccion: string;
  estado: 'activo' | 'inactivo' | 'pendiente';
  puntoRecoleccionId: string;
  puntoRecoleccionNombre: string;
};

type PuntoRecoleccion = {
  id: string;
  nombre: string;
  direccion: string;
};

export default function EstadoRuta() {
  const [selectedRuta, setSelectedRuta] = useState('Ruta 01');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'ver' | 'crear'>('ver');
  
  // Estados para el formulario de creación/edición
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Punto>>({
    latitud: 0,
    longitud: 0,
    direccion: '',
    estado: 'pendiente',
    puntoRecoleccionId: '',
    puntoRecoleccionNombre: ''
  });

  // Lista de puntos de recolección disponibles
  const puntosRecoleccion: PuntoRecoleccion[] = [
    { id: 'PR-001', nombre: 'Centro de Acopio Norte', direccion: 'Av. Norte 123, Zona 1' },
    { id: 'PR-002', nombre: 'Estación Central', direccion: 'Calle Principal 456, Centro' },
    { id: 'PR-003', nombre: 'Planta de Procesamiento Sur', direccion: 'Av. Industrial 789, Zona Sur' },
    { id: 'PR-004', nombre: 'Depósito Este', direccion: 'Calle Este 101, Zona Este' },
    { id: 'PR-005', nombre: 'Almacén Oeste', direccion: 'Av. Oeste 202, Zona Oeste' }
  ];

  const rutasDisponibles = ['Ruta 01', 'Ruta 02', 'Ruta 03', 'Ruta 04', 'Ruta 05'];

  // Estado inicial de puntos (simulando datos)
  const [puntos, setPuntos] = useState<Punto[]>([
    {
      id: 1,
      latitud: 19.432608,
      longitud: -99.133209,
      direccion: 'Av. Central 123, Zona 1',
      estado: 'activo',
      puntoRecoleccionId: 'PR-001',
      puntoRecoleccionNombre: 'Centro de Acopio Norte'
    },
    {
      id: 2,
      latitud: 19.435000,
      longitud: -99.130000,
      direccion: 'Calle Los Pinos 456',
      estado: 'pendiente',
      puntoRecoleccionId: 'PR-002',
      puntoRecoleccionNombre: 'Estación Central'
    },
    {
      id: 3,
      latitud: 19.438000,
      longitud: -99.135000,
      direccion: 'Av. Reforma 789',
      estado: 'inactivo',
      puntoRecoleccionId: 'PR-003',
      puntoRecoleccionNombre: 'Planta de Procesamiento Sur'
    }
  ]);

  const estadisticas = {
    total: puntos.length,
    activos: puntos.filter(p => p.estado === 'activo').length,
    inactivos: puntos.filter(p => p.estado === 'inactivo').length,
    pendientes: puntos.filter(p => p.estado === 'pendiente').length
  };

  const getEstadoIcon = (estado: string) => {
    switch(estado) {
      case 'activo': return <FiCheckCircle />;
      case 'pendiente': return <FiClock />;
      case 'inactivo': return <FiPauseCircle />;
      default: return null;
    }
  };

  // Filtrado de puntos
  const puntosFiltrados = puntos.filter(punto => 
    !searchTerm || 
    punto.direccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    punto.puntoRecoleccionNombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Funciones CRUD
  const handleCreatePunto = () => {
    if (!formData.latitud || !formData.longitud || !formData.direccion || !formData.puntoRecoleccionId) {
      alert('Por favor complete los campos requeridos (Latitud, Longitud, Dirección y Punto de Recolección)');
      return;
    }

    const puntoRecoleccionSeleccionado = puntosRecoleccion.find(p => p.id === formData.puntoRecoleccionId);

    const newPunto: Punto = {
      id: puntos.length > 0 ? Math.max(...puntos.map(p => p.id)) + 1 : 1,
      latitud: formData.latitud || 0,
      longitud: formData.longitud || 0,
      direccion: formData.direccion || '',
      estado: formData.estado || 'pendiente',
      puntoRecoleccionId: formData.puntoRecoleccionId || '',
      puntoRecoleccionNombre: puntoRecoleccionSeleccionado?.nombre || ''
    };

    setPuntos([...puntos, newPunto]);
    handleResetForm();
    setActiveTab('ver');
  };

  const handleUpdatePunto = () => {
    if (!editingId || !formData.latitud || !formData.longitud || !formData.direccion || !formData.puntoRecoleccionId) {
      alert('Por favor complete los campos requeridos');
      return;
    }

    const puntoRecoleccionSeleccionado = puntosRecoleccion.find(p => p.id === formData.puntoRecoleccionId);

    setPuntos(puntos.map(punto => 
      punto.id === editingId 
        ? { 
            ...punto, 
            ...formData as Punto,
            puntoRecoleccionNombre: puntoRecoleccionSeleccionado?.nombre || ''
          }
        : punto
    ));

    setIsEditing(false);
    setEditingId(null);
    handleResetForm();
    setActiveTab('ver');
  };

  const handleDeletePunto = (id: number) => {
    if (window.confirm('¿Está seguro de eliminar este punto?')) {
      setPuntos(puntos.filter(punto => punto.id !== id));
    }
  };

  const handleEditPunto = (punto: Punto) => {
    setActiveTab('crear');
    setIsEditing(true);
    setEditingId(punto.id);
    setFormData({ ...punto });
  };

  const handleResetForm = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      latitud: 0,
      longitud: 0,
      direccion: '',
      estado: 'pendiente',
      puntoRecoleccionId: '',
      puntoRecoleccionNombre: ''
    });
  };

  const handlePuntoRecoleccionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const puntoRecoleccionId = e.target.value;
    const puntoRecoleccionSeleccionado = puntosRecoleccion.find(p => p.id === puntoRecoleccionId);
    
    setFormData({
      ...formData,
      puntoRecoleccionId,
      puntoRecoleccionNombre: puntoRecoleccionSeleccionado?.nombre || ''
    });
  };

  return (
    <div className="estado-ruta-container">
      <div className="estado-ruta">
        {/* Header con estadísticas */}
        <header className="estado-ruta-header">
          <div className="estado-ruta header-content">
            <div className="estado-ruta header-title">
              <h1>Puntos de Ruta</h1>
              <p className="estado-ruta subtitle">Administración y seguimiento de puntos de ruta</p>
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
                  <span className="estado-ruta stat-value">{estadisticas.activos}</span>
                  <span className="estado-ruta stat-label">Activos</span>
                </div>
              </div>
              
              <div className="estado-ruta stat-card">
                <div className="estado-ruta stat-icon" style={{ backgroundColor: 'rgba(192, 241, 15, 0.9)' }}>
                  <FiClock />
                </div>
                <div>
                  <span className="estado-ruta stat-value">{estadisticas.pendientes}</span>
                  <span className="estado-ruta stat-label">Pendientes</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Tabs de navegación - MEJOR POSICIONADOS */}
        <div className="estado-ruta tabs-navigation">
          <div className="estado-ruta tabs-container">
            <button 
              className={`estado-ruta tab-btn ${activeTab === 'ver' ? 'active' : ''}`}
              onClick={() => setActiveTab('ver')}
            >
              <FiList />
              <span>Ver Puntos</span>
            </button>
            <button 
              className={`estado-ruta tab-btn ${activeTab === 'crear' ? 'active' : ''}`}
              onClick={() => setActiveTab('crear')}
            >
              <FiPlus />
              <span>{isEditing ? 'Editar Punto' : 'Crear Punto'}</span>
            </button>
          </div>
        </div>

        {/* Panel de Ver Puntos */}
        {activeTab === 'ver' && (
          <>
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
                    <span>Activos</span>
                  </button>
                  <button className="estado-ruta filtro-btn">
                    <FiPauseCircle />
                    <span>Inactivos</span>
                  </button>
                  <button className="estado-ruta filtro-btn">
                    <FiClock />
                    <span>Pendientes</span>
                  </button>
                </div>
              </div>

              <div className="estado-ruta controles-right">
                <div className="estado-ruta search-container">
                  <FiSearch className="estado-ruta search-icon" />
                  <input
                    type="text"
                    placeholder="Buscar dirección o punto de recolección..."
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
                      <th>Coordenadas</th>
                      <th>Dirección</th>
                      <th>Punto de Recolección</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {puntosFiltrados.map((punto) => (
                      <tr key={punto.id} className="estado-ruta table-row">
                        <td className="estado-ruta coordenadas-cell">
                          <div className="estado-ruta coordenadas-info">
                            <div className="estado-ruta coordenadas">
                              <FiNavigation />
                              <span>Lat: {punto.latitud.toFixed(6)}</span>
                            </div>
                            <div className="estado-ruta coordenadas">
                              <FiNavigation />
                              <span>Lon: {punto.longitud.toFixed(6)}</span>
                            </div>
                          </div>
                        </td>
                        <td className="estado-ruta direccion-cell">
                          <div className="estado-ruta direccion-info">
                            <FiMapPin />
                            <span>{punto.direccion}</span>
                          </div>
                        </td>
                        <td className="estado-ruta punto-recoleccion-cell">
                          <div className="estado-ruta punto-recoleccion-info">
                            <div className="estado-ruta punto-recoleccion-codigo">{punto.puntoRecoleccionId}</div>
                            <div className="estado-ruta punto-recoleccion-nombre">{punto.puntoRecoleccionNombre}</div>
                          </div>
                        </td>
                        <td className="estado-ruta estado-cell">
                          <div className={`estado-ruta estado-badge estado-${punto.estado}`}>
                            {getEstadoIcon(punto.estado)}
                            <span>
                              {punto.estado === 'activo' ? 'Activo' :
                               punto.estado === 'inactivo' ? 'Inactivo' : 'Pendiente'}
                            </span>
                          </div>
                        </td>
                        <td className="estado-ruta acciones-cell">
                          <button className="estado-ruta btn-detalles">
                            <FiEye />
                            <span>Detalles</span>
                          </button>
                          <button 
                            className="estado-ruta btn-editar"
                            onClick={() => handleEditPunto(punto)}
                          >
                            <FiEdit2 />
                            <span>Editar</span>
                          </button>
                          <button 
                            className="estado-ruta btn-eliminar"
                            onClick={() => handleDeletePunto(punto.id)}
                          >
                            <FiTrash2 />
                            <span>Eliminar</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Panel de Crear/Editar Punto */}
        {activeTab === 'crear' && (
          <div className="estado-ruta crear-punto-container">
            <div className="estado-ruta crear-punto-form">
              <h2 className="estado-ruta form-title">
                {isEditing ? 'Editar Punto de Ruta' : 'Crear Nuevo Punto de Ruta'}
              </h2>
              
              <div className="estado-ruta form-grid">
                <div className="estado-ruta form-group">
                  <label className="estado-ruta form-label">
                    Latitud *
                  </label>
                  <input
                    type="number"
                    step="0.000001"
                    className="estado-ruta form-input"
                    value={formData.latitud}
                    onChange={(e) => setFormData({...formData, latitud: parseFloat(e.target.value)})}
                    placeholder="Ej: 19.432608"
                  />
                  <small className="estado-ruta form-hint">Ej: 19.432608 (6 decimales)</small>
                </div>

                <div className="estado-ruta form-group">
                  <label className="estado-ruta form-label">
                    Longitud *
                  </label>
                  <input
                    type="number"
                    step="0.000001"
                    className="estado-ruta form-input"
                    value={formData.longitud}
                    onChange={(e) => setFormData({...formData, longitud: parseFloat(e.target.value)})}
                    placeholder="Ej: -99.133209"
                  />
                  <small className="estado-ruta form-hint">Ej: -99.133209 (6 decimales)</small>
                </div>

                <div className="estado-ruta form-group full-width">
                  <label className="estado-ruta form-label">
                    Dirección *
                  </label>
                  <input
                    type="text"
                    className="estado-ruta form-input"
                    value={formData.direccion}
                    onChange={(e) => setFormData({...formData, direccion: e.target.value})}
                    placeholder="Ej: Av. Central 123, Zona 1"
                  />
                </div>

                <div className="estado-ruta form-group full-width">
                  <label className="estado-ruta form-label">
                    Punto de Recolección *
                  </label>
                  <select
                    className="estado-ruta form-select"
                    value={formData.puntoRecoleccionId}
                    onChange={handlePuntoRecoleccionChange}
                  >
                    <option value="">Seleccione un punto de recolección</option>
                    {puntosRecoleccion.map(punto => (
                      <option key={punto.id} value={punto.id}>
                        {punto.id} - {punto.nombre} ({punto.direccion})
                      </option>
                    ))}
                  </select>
                  {formData.puntoRecoleccionId && (
                    <small className="estado-ruta form-hint">
                      Seleccionado: {formData.puntoRecoleccionNombre}
                    </small>
                  )}
                </div>

                <div className="estado-ruta form-group">
                  <label className="estado-ruta form-label">
                    Estado
                  </label>
                  <select
                    className="estado-ruta form-select"
                    value={formData.estado}
                    onChange={(e) => setFormData({...formData, estado: e.target.value as Punto['estado']})}
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                  </select>
                </div>
              </div>

              <div className="estado-ruta form-actions">
                <button 
                  className="estado-ruta btn-cancelar"
                  onClick={() => {
                    handleResetForm();
                    setActiveTab('ver');
                  }}
                >
                  <FiX />
                  <span>Cancelar</span>
                </button>
                
                <button 
                  className="estado-ruta btn-guardar"
                  onClick={isEditing ? handleUpdatePunto : handleCreatePunto}
                >
                  <FiSave />
                  <span>{isEditing ? 'Actualizar Punto' : 'Crear Punto'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}