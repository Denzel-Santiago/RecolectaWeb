// pages/Dashboard/Dashboard.jsx
import './Dashboard.css';

export default function Dashboard() {
  // Datos de ejemplo para las rutas
  const rutasActivas = [
    { id: 1, nombre: 'RUTA 01', estado: 'En progreso' },
    { id: 2, nombre: 'RUTA 02', estado: 'Pendiente' },
    { id: 3, nombre: 'RUTA 03', estado: 'Completada' },
  ];

  const alertas = [
    { id: 1, mensaje: 'RUTA 01 No ha completado su recolección', tipo: 'crítica' },
    { id: 2, mensaje: 'RUTA 02 No Completo un punto de ruta', tipo: 'advertencia' },
    { id: 3, mensaje: 'RUTA 03 se encuentra inactiva', tipo: 'informativa' },
  ];

  const acciones = [
    'Ver detalles de ruta',
    'Enviar notificación',
    'Ver reporte detallado',
    'Ver el mapa de rutas',
  ];

  const estadisticas = [
    { ruta: 'RUTA 01', incompletos: 2, completados: 10, pendientes: 10, demoras: 5 },
    { ruta: 'RUTA 02', incompletos: 3, completados: 12, pendientes: 8, demoras: 3 },
    { ruta: 'RUTA 03', incompletos: 4, completados: 15, pendientes: 5, demoras: 2 },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Panel de Control - Supervisor</h1>
        <div className="dashboard-time">Última actualización: Hoy 14:30</div>
      </div>

      <div className="dashboard-content">
        {/* Columna izquierda */}
        <div className="dashboard-left">
          {/* Sección: Rutas Activas */}
          <div className="dashboard-card">
            <h2 className="card-title">📋 Rutas Activas</h2>
            <div className="card-content">
              <ul className="ruta-list">
                {rutasActivas.map((ruta) => (
                  <li key={ruta.id} className="ruta-item">
                    <span className="ruta-nombre">{ruta.nombre}</span>
                    <span className={`ruta-estado ruta-estado-${ruta.estado.toLowerCase().replace(' ', '-')}`}>
                      {ruta.estado}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sección: Alertas */}
          <div className="dashboard-card">
            <h2 className="card-title">🔔 Alertas</h2>
            <div className="card-content">
              <div className="alertas-container">
                {alertas.map((alerta) => (
                  <div key={alerta.id} className={`alerta-item alerta-${alerta.tipo}`}>
                    <div className="alerta-icon">⚠️</div>
                    <div className="alerta-text">{alerta.mensaje}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Columna derecha */}
        <div className="dashboard-right">
          {/* Sección: Acciones Rápidas */}
          <div className="dashboard-card">
            <h2 className="card-title">⚡ Acciones</h2>
            <div className="card-content">
              <div className="acciones-container">
                {acciones.map((accion, index) => (
                  <button key={index} className="accion-btn">
                    <span className="accion-numero">{index + 1}.</span>
                    <span className="accion-texto">{accion}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sección: Estado General */}
          <div className="dashboard-card">
            <h2 className="card-title">📊 Estado</h2>
            <div className="card-content">
              {/* Tabla de puntos */}
              <div className="estado-section">
                <h3 className="estado-subtitle">Puntos por Ruta</h3>
                <table className="estado-table">
                  <thead>
                    <tr>
                      <th>Ruta</th>
                      <th>Incompletos</th>
                      <th>Completados</th>
                    </tr>
                  </thead>
                  <tbody>
                    {estadisticas.map((stat) => (
                      <tr key={stat.ruta}>
                        <td className="ruta-cell">{stat.ruta}</td>
                        <td className="incompletos-cell">{stat.incompletos}</td>
                        <td className="completados-cell">{stat.completados}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Detalles de RUTA 01 */}
              <div className="ruta-detalle">
                <div className="detalle-item">
                  <h4 className="detalle-title">Puntos Pendientes</h4>
                  <div className="detalle-contenido">
                    <span className="detalle-ruta">RUTA 01</span>
                    <span className="detalle-valor">10</span>
                  </div>
                </div>
                
                <div className="detalle-item">
                  <h4 className="detalle-title">Demoras RUTA 01</h4>
                  <div className="detalle-contenido">
                    <span className="detalle-ruta">Minutos promedio</span>
                    <span className="detalle-valor demora">5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer del dashboard */}
      <div className="dashboard-footer">
        <p>Sistema de Gestión de Recolección - Versión 1.0</p>
      </div>
    </div>
  );
}