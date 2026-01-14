// pages/Anomalias/Anomalias.tsx
import { useState } from 'react';
import './Anomalias.css';

export default function Anomalias() {
  const [mostrarModal, setMostrarModal] = useState(false);

  const anomalias = [
    {
      id: 1,
      punto: 'P-12',
      descripcion: 'Contenedor roto',
      fecha: '2025-02-19',
      estado: 'Completado',
      prioridad: 'Crítica',
    },
    {
      id: 2,
      punto: 'P-08',
      descripcion: 'Derrame de residuos',
      fecha: '2025-02-20',
      estado: 'En proceso',
      prioridad: 'Media',
    },
    {
      id: 3,
      punto: 'P-21',
      descripcion: 'Acceso bloqueado',
      fecha: '2025-02-21',
      estado: 'Retrasado',
      prioridad: 'Baja',
    },
    {
      id: 4,
      punto: 'P-05',
      descripcion: 'Contenedor lleno',
      fecha: '2025-02-22',
      estado: 'Pendiente',
      prioridad: 'Media',
    },
  ];

  return (
    <div className="anomalias-container">
      {/* PANEL IZQUIERDO */}
      <div className="anomalias-panel">
        <h1 className="anomalias-title">Gestión de anomalías</h1>

        {/* FILTROS */}
        <div className="anomalias-filtros">
          <select><option>Estado</option></select>
          <select><option>Tipo</option></select>
          <select><option>Fecha</option></select>
          <input type="text" placeholder="Buscar punto" />
        </div>

        {/* TABLA */}
        <div className="anomalias-tabla">
          <table>
            <thead>
              <tr>
                <th>Punto</th>
                <th>Descripción</th>
                <th>Fecha reporte</th>
                <th>Estado</th>
                <th>Prioridad</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {anomalias.map((item) => (
                <tr key={item.id}>
                  <td>{item.punto}</td>
                  <td>{item.descripcion}</td>
                  <td>{item.fecha}</td>
                  <td>
                    <span className={`estado estado-${item.estado.toLowerCase().replace(' ', '-')}`}>
                      {item.estado}
                    </span>
                  </td>
                  <td>
                    <span className={`prioridad prioridad-${item.prioridad.toLowerCase()}`}>
                      {item.prioridad}
                    </span>
                  </td>
                  <td>
                    <button className="btn-ver" onClick={() => setMostrarModal(true)}>
                      🔍 Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
<div className={`modal-overlay ${mostrarModal ? 'show' : ''}`}>
  <div className="modal">
    <h2 className="modal-title">P-12</h2>
    <p className="modal-subtitle">Contenedor roto</p>

    <div className="modal-info">
      <p><strong>Reportado:</strong> 2025-02-19</p>
      <p><strong>Estado actual:</strong></p>
      <select>
        <option>Abierta</option>
      </select>

      <p><strong>Responsable:</strong></p>
      <select>
        <option>Buscar</option>
      </select>
    </div>

    <div className="modal-historial">
      <h4>Historial de acciones</h4>
      <p>2025-02-03 - reporte creado</p>
      <p>2025-03-05 - reporte asignado</p>
    </div>

    <div className="modal-actions">
      <button className="btn-registrar">Registrar acción</button>
      <button
        className="btn-cerrar"
        onClick={() => setMostrarModal(false)}
      >
        Cerrar anomalía
      </button>
    </div>
  </div>
</div>
    </div>
  );
}
