// src/Pages/Administracion/Camiones/components/CamionForm.tsx
import { useEffect, useState } from "react";
import type { CamionMock, DisponibilidadCamion, TipoCamionMock } from "../CamionesPage";

interface Props {
  modo: "CREAR" | "EDITAR";
  camion: CamionMock | null;
  tiposCamion: TipoCamionMock[];
  onCancel: () => void;
  onSubmit: (data: Omit<CamionMock, "camion_id" | "eliminado" | "tipo_camion">) => void;
}

export default function CamionForm({ modo, camion, tiposCamion, onCancel, onSubmit }: Props) {
  const [placa, setPlaca] = useState("");
  const [modelo, setModelo] = useState("");
  const [tipoCamionId, setTipoCamionId] = useState<number>(tiposCamion[0]?.tipo_camion_id ?? 1);
  const [esRentado, setEsRentado] = useState(false);
  const [disponibilidad, setDisponibilidad] = useState<DisponibilidadCamion>("DISPONIBLE");

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (modo === "EDITAR" && camion) {
      setPlaca(camion.placa);
      setModelo(camion.modelo);
      setTipoCamionId(camion.tipo_camion_id);
      setEsRentado(camion.es_rentado);
      setDisponibilidad(camion.disponibilidad);
      return;
    }

    // Reset para crear
    setPlaca("");
    setModelo("");
    setTipoCamionId(tiposCamion[0]?.tipo_camion_id ?? 1);
    setEsRentado(false);
    setDisponibilidad("DISPONIBLE");
    setError(null);
  }, [modo, camion, tiposCamion]);

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