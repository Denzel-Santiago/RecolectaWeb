// pages/Dashboard/Dashboard.jsx
import { useState, useEffect, type JSX } from 'react';
import './Dashboard.css';
import {
  FiTruck, FiAlertTriangle, FiCheckCircle, FiClock, FiMap,
  FiBarChart2, FiBell, FiEye, FiFileText, FiSend,
  FiUsers, FiRefreshCw,
  FiActivity, FiShield
} from 'react-icons/fi';

export default function Dashboard() {
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setLastUpdate(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const rutasActivas = [
    { id: 1, nombre: 'Ruta 01', conductor: 'Juan Pérez', estado: 'en-progreso', progreso: 65 },
    { id: 2, nombre: 'Ruta 02', conductor: 'Carlos Ruiz', estado: 'pendiente', progreso: 0 },
    { id: 3, nombre: 'Ruta 03', conductor: 'Ana Torres', estado: 'completada', progreso: 100 },
  ];

  const alertas = [
    { id: 1, mensaje: 'Ruta 01 - Falla mecánica', tipo: 'critica', tiempo: '15 min' },
    { id: 2, mensaje: 'Ruta 02 - Punto bloqueado', tipo: 'advertencia', tiempo: '30 min' },
  ];

  const acciones = [
    { id: 1, nombre: 'Ver detalles', icon: FiEye },
    { id: 2, nombre: 'Enviar notificación', icon: FiSend },
    { id: 3, nombre: 'Ver reporte', icon: FiFileText },
    { id: 4, nombre: 'Ver mapa', icon: FiMap },
  ];

  const estadisticas = [
    { ruta: 'Ruta 01', completados: 10, pendientes: 2, eficiencia: 83 },
    { ruta: 'Ruta 02', completados: 12, pendientes: 3, eficiencia: 80 },
    { ruta: 'Ruta 03', completados: 15, pendientes: 4, eficiencia: 79 },
  ];

  const metricas = {
    totalRutas: rutasActivas.length,
    puntosCompletados: estadisticas.reduce((a, b) => a + b.completados, 0),
    alertasActivas: alertas.length,
    eficiencia: Math.round(estadisticas.reduce((a, b) => a + b.eficiencia, 0) / estadisticas.length),
  };

  const getEstadoIcon = (estado: string) => {
    const icons: Record<string, JSX.Element> = {
      'en-progreso': <FiActivity />,
      'pendiente': <FiClock />,
      'completada': <FiCheckCircle />
    };
    return icons[estado] || <FiTruck />;
  };

  return (
    <div className="dashboard">
      {/* Header Compacto */}
      <header className="dashboard-header">
        <div className="header-top">
          <div>
            <h1>Panel de Control</h1>
            <p className="subtitle">Sistema de Recolección</p>
          </div>
          <div className="header-time">
            <FiClock /> {lastUpdate.toLocaleTimeString('es-ES', {hour: '2-digit', minute:'2-digit'})}
            <button onClick={() => setLastUpdate(new Date())} className="btn-refresh">
              <FiRefreshCw />
            </button>
          </div>
        </div>

        {/* Métricas Compactas */}
        <div className="metrics-compact">
          <div className="metric-item">
            <div className="metric-icon primary"><FiTruck /></div>
            <span className="metric-value">{metricas.totalRutas}</span>
            <span className="metric-label">Rutas</span>
          </div>
          <div className="metric-item">
            <div className="metric-icon success"><FiCheckCircle /></div>
            <span className="metric-value">{metricas.puntosCompletados}</span>
            <span className="metric-label">Completados</span>
          </div>
          <div className="metric-item">
            <div className="metric-icon warning"><FiAlertTriangle /></div>
            <span className="metric-value">{metricas.alertasActivas}</span>
            <span className="metric-label">Alertas</span>
          </div>
          <div className="metric-item">
            <div className="metric-icon info"><FiUsers /></div>
            <span className="metric-value">{metricas.eficiencia}%</span>
            <span className="metric-label">Eficiencia</span>
          </div>
        </div>
      </header>

      {/* Contenido Principal Compacto */}
      <div className="dashboard-grid">
        
        {/* Tarjeta 1: Rutas Activas (Compacta) */}
        <div className="card compact">
          <div className="card-header">
            <FiTruck /> <span>Rutas Activas</span>
            <span className="badge">{rutasActivas.length}</span>
          </div>
          <div className="card-body">
            {rutasActivas.map(ruta => (
              <div key={ruta.id} className="list-item">
                <div className="item-main">
                  <span className="item-title">{ruta.nombre}</span>
                  <span className="item-sub">{ruta.conductor}</span>
                </div>
                <div className="item-right">
                  <span className={`status status-${ruta.estado}`}>
                    {getEstadoIcon(ruta.estado)}
                    {ruta.estado === 'en-progreso' ? 'En curso' : 
                     ruta.estado === 'pendiente' ? 'Pendiente' : 'Completada'}
                  </span>
                  <div className="progress-small">
                    <div className="progress-bar" style={{width: `${ruta.progreso}%`}}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tarjeta 2: Alertas (Compacta) */}
        <div className="card compact">
          <div className="card-header">
            <FiBell /> <span>Alertas</span>
            <span className="badge alert">{alertas.length}</span>
          </div>
          <div className="card-body">
            {alertas.map(alerta => (
              <div key={alerta.id} className={`alert-item alert-${alerta.tipo}`}>
                <div className="alert-icon">
                  <FiAlertTriangle />
                </div>
                <div className="alert-content">
                  <p>{alerta.mensaje}</p>
                  <small>{alerta.tiempo}</small>
                </div>
                <button className="btn-icon"><FiEye /></button>
              </div>
            ))}
          </div>
        </div>

        {/* Tarjeta 3: Acciones Rápidas (Compacta) */}
        <div className="card compact">
          <div className="card-header">
            <FiMap /> <span>Acciones</span>
          </div>
          <div className="card-body grid-actions">
            {acciones.map(accion => {
              const Icon = accion.icon;
              return (
                <button key={accion.id} className="action-btn">
                  <Icon />
                  <span>{accion.nombre}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tarjeta 4: Estadísticas (Compacta) */}
        <div className="card compact">
          <div className="card-header">
            <FiBarChart2 /> <span>Estadísticas</span>
          </div>
          <div className="card-body">
            <div className="stats-summary">
              <div className="stat-circle">
                <div className="circle" style={{
                  background: `conic-gradient(#0F676C ${metricas.eficiencia * 3.6}deg, #eee 0deg)`
                }}>
                  <span>{metricas.eficiencia}%</span>
                </div>
                <p>Eficiencia General</p>
              </div>
            </div>
            
            <div className="stats-table">
              <table>
                <thead>
                  <tr>
                    <th>Ruta</th>
                    <th>✓</th>
                    <th>✗</th>
                    <th>%</th>
                  </tr>
                </thead>
                <tbody>
                  {estadisticas.map(stat => (
                    <tr key={stat.ruta}>
                      <td><strong>{stat.ruta}</strong></td>
                      <td className="success">{stat.completados}</td>
                      <td className="warning">{stat.pendientes}</td>
                      <td>
                        <div className="efficiency-bar">
                          <div style={{width: `${stat.eficiencia}%`}}></div>
                          <span>{stat.eficiencia}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

      {/* Footer Minimalista */}
      <footer className="dashboard-footer">
        <div className="footer-content">
          <FiShield />
          <span>Sistema de Recolección v2.0 • Última actualización: {
            lastUpdate.toLocaleTimeString('es-ES', {hour: '2-digit', minute:'2-digit'})
          }</span>
        </div>
      </footer>
    </div>
  );
}