// src/Pages/Administracion/Camiones/components/CamionesTable.tsx
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import type { CamionMock } from "../CamionesPage";

interface Props {
  camiones: CamionMock[];
  onEditar: (camion: CamionMock) => void;
  onEliminar: (camion_id: number) => void;
}

export default function CamionesTable({ camiones, onEditar, onEliminar }: Props) {
  if (camiones.length === 0) {
    return (
      <div className="empty-state">
        <h3>No hay camiones para mostrar</h3>
        <p>Intenta cambiar los filtros o crea un nuevo camión.</p>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th>PLACA</th>
            <th>MODELO</th>
            <th>TIPO</th>
            <th>RENTADO</th>
            <th>DISPONIBILIDAD</th>
            <th style={{ width: 360 }}>ACCIONES</th>
          </tr>
        </thead>

        <tbody>
          {camiones.map((c) => (
            <tr key={c.camion_id}>
              <td className="mono">{c.placa}</td>
              <td>{c.modelo}</td>
              <td>{c.tipo_camion?.nombre ?? "—"}</td>
              <td>
                <span className={c.es_rentado ? "pill rentado" : "pill"}>
                  {c.es_rentado ? "Sí" : "No"}
                </span>
              </td>

              <td>
                <span className={`status ${c.disponibilidad.toLowerCase()}`}>
                  {c.disponibilidad === "DISPONIBLE" && "Disponible"}
                  {c.disponibilidad === "EN_RUTA" && "En ruta"}
                  {c.disponibilidad === "MANTENIMIENTO" && "Mantenimiento"}
                  {c.disponibilidad === "FUERA_SERVICIO" && "Fuera de servicio"}
                </span>
              </td>

              <td>
                <div className="actions">
                  <button className="btn btn-details">
                    <FaEye />
                    Detalles
                  </button>

                  <button className="btn btn-edit" onClick={() => onEditar(c)}>
                    <FaEdit />
                    Editar
                  </button>

                  <button className="btn btn-delete" onClick={() => onEliminar(c.camion_id)}>
                    <FaTrashAlt />
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}