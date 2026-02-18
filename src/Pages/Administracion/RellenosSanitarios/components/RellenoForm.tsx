// src/Pages/Administracion/RellenosSanitarios/RellenosSanitariosForm.tsx
import { useEffect, useState } from "react";
import type { RellenoSanitario } from "../RellenosSanitariosPage";

interface Props {
  initialData: RellenoSanitario | null;
  onCancel: () => void;
  onSave: (data: Omit<RellenoSanitario, "id" | "fechaRegistro">) => void;
}

export default function RellenosSanitariosForm({
  initialData,
  onCancel,
  onSave,
}: Props) {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [capacidadToneladas, setCapacidadToneladas] = useState<number>(0);
  const [estado, setEstado] = useState<"Activo" | "Inactivo">("Activo");

  useEffect(() => {
    if (!initialData) {
      setNombre("");
      setDireccion("");
      setMunicipio("");
      setCapacidadToneladas(0);
      setEstado("Activo");
      return;
    }

    setNombre(initialData.nombre);
    setDireccion(initialData.direccion);
    setMunicipio(initialData.municipio);
    setCapacidadToneladas(initialData.capacidadToneladas);
    setEstado(initialData.estado);
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim() || !direccion.trim() || !municipio.trim()) {
      alert("Por favor completa todos los campos.");
      return;
    }

    if (capacidadToneladas <= 0) {
      alert("La capacidad debe ser mayor a 0.");
      return;
    }

    onSave({
      nombre: nombre.trim(),
      direccion: direccion.trim(),
      municipio: municipio.trim(),
      capacidadToneladas: Number(capacidadToneladas),
      estado,
    });
  };

  return (
    <form className="rs-form" onSubmit={handleSubmit}>
      <div className="rs-form-grid">
        <div className="rs-field">
          <label>Nombre del Relleno</label>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Relleno Sanitario Norte"
          />
        </div>

        <div className="rs-field">
          <label>Municipio</label>
          <input
            value={municipio}
            onChange={(e) => setMunicipio(e.target.value)}
            placeholder="Ej: Tuxtla Gutiérrez"
          />
        </div>

        <div className="rs-field rs-field-full">
          <label>Dirección</label>
          <input
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            placeholder="Ej: Carretera Federal Km 12, Zona Industrial"
          />
        </div>

        <div className="rs-field">
          <label>Capacidad (Toneladas)</label>
          <input
            type="number"
            value={capacidadToneladas}
            onChange={(e) => setCapacidadToneladas(Number(e.target.value))}
            placeholder="Ej: 1500"
          />
        </div>

        <div className="rs-field">
          <label>Estado</label>
          <select value={estado} onChange={(e) => setEstado(e.target.value as any)}>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>
      </div>

      <div className="rs-form-actions">
        <button type="button" className="rs-btn rs-btn-secondary" onClick={onCancel}>
          Cancelar
        </button>

        <button type="submit" className="rs-btn rs-btn-primary">
          {initialData ? "Guardar Cambios" : "Crear Relleno"}
        </button>
      </div>
    </form>
  );
}