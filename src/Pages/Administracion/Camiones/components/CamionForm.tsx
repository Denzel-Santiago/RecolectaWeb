// src/Pages/Administracion/Camiones/components/CamionForm.tsx
import { useState } from "react";
import type { CamionMock, DisponibilidadCamion, TipoCamionMock } from "../CamionesPage";

interface Props {
  modo: "CREAR" | "EDITAR";
  camion: CamionMock | null;
  tiposCamion: TipoCamionMock[];
  onCancel: () => void;
  onSubmit: (data: Omit<CamionMock, "camion_id" | "eliminado" | "tipo_camion">) => void;
}

export default function CamionForm({ modo, camion, tiposCamion, onCancel, onSubmit }: Props) {
  const [placa, setPlaca] = useState(() => (modo === "EDITAR" && camion ? camion.placa : ""));
  const [modelo, setModelo] = useState(() => (modo === "EDITAR" && camion ? camion.modelo : ""));
  const [tipoCamionId, setTipoCamionId] = useState<number>(() =>
    modo === "EDITAR" && camion ? camion.tipo_camion_id : tiposCamion[0]?.tipo_camion_id ?? 1
  );
  const [esRentado, setEsRentado] = useState(() => (modo === "EDITAR" && camion ? camion.es_rentado : false));
  const [disponibilidad, setDisponibilidad] = useState<DisponibilidadCamion>(() =>
    modo === "EDITAR" && camion ? camion.disponibilidad : "DISPONIBLE"
  );

  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!placa.trim()) return setError("La placa es obligatoria.");
    if (!modelo.trim()) return setError("El modelo es obligatorio.");

    onSubmit({
      placa: placa.trim().toUpperCase(),
      modelo: modelo.trim(),
      tipo_camion_id: tipoCamionId,
      es_rentado: esRentado,
      disponibilidad,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      {error && <div className="form-error">{error}</div>}

      <div className="form-grid">
        <div className="field">
          <label>Placa</label>
          <input value={placa} onChange={(e) => setPlaca(e.target.value)} placeholder="CHP-123-A" />
        </div>

        <div className="field">
          <label>Modelo</label>
          <input
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            placeholder="Freightliner M2 2020"
          />
        </div>

        <div className="field">
          <label>Tipo de camión</label>
          <select value={tipoCamionId} onChange={(e) => setTipoCamionId(Number(e.target.value))}>
            {tiposCamion.map((t) => (
              <option key={t.tipo_camion_id} value={t.tipo_camion_id}>
                {t.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>Disponibilidad</label>
          <select
            value={disponibilidad}
            onChange={(e) => setDisponibilidad(e.target.value as DisponibilidadCamion)}
          >
            <option value="DISPONIBLE">Disponible</option>
            <option value="EN_RUTA">En ruta</option>
            <option value="MANTENIMIENTO">Mantenimiento</option>
            <option value="FUERA_SERVICIO">Fuera de servicio</option>
          </select>
        </div>

        <div className="field full">
          <label className="switch">
            <input
              type="checkbox"
              checked={esRentado}
              onChange={(e) => setEsRentado(e.target.checked)}
            />
            <span>¿Es rentado?</span>
          </label>
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-outline" onClick={onCancel}>
          Cancelar
        </button>

        <button type="submit" className="btn btn-primary">
          {modo === "CREAR" ? "Crear" : "Guardar cambios"}
        </button>
      </div>
    </form>
  );
}
