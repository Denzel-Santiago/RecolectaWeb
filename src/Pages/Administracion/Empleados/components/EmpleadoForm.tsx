import { useState } from "react";
import type { EmpleadoCreatePayload } from "../EmpleadosPage";
import { ROLES, ROLE_NAMES, type RoleId } from "../../../../services/auth";

interface Props {
  onCancel: () => void;
  onSave: (data: EmpleadoCreatePayload) => void;
  saving?: boolean;
}

export default function EmpleadoForm({ onCancel, onSave, saving = false }: Props) {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [mail, setMail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rolId, setRolId] = useState<RoleId>(ROLES.CONDUCTOR);
  const [error, setError] = useState<string | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    // Evita que Enter en un input dispare el submit del formulario mientras
    // se está llenando; solo se envía con clic explícito en "Crear empleado".
    if (e.key === "Enter" && (e.target as HTMLElement).tagName !== "BUTTON") {
      e.preventDefault();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!nombre.trim()) return setError("El nombre es obligatorio.");
    if (!apellidos.trim()) return setError("Los apellidos son obligatorios.");
    if (!mail.trim()) return setError("El correo es obligatorio.");
    if (!username.trim()) return setError("El usuario es obligatorio.");
    if (!password.trim()) return setError("La contraseña es obligatoria.");

    onSave({
      nombre: nombre.trim(),
      apellidos: apellidos.trim(),
      mail: mail.trim(),
      username: username.trim(),
      password,
      rol_id: rolId,
    });
  };

  return (
    <form className="emp-form" onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
      {error && <div className="emp-alert">{error}</div>}

      <div className="emp-form-grid">
        <div className="emp-field emp-full">
          <label>Nombre</label>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Juan Conductor"
          />
        </div>

        <div className="emp-field emp-full">
          <label>Apellidos</label>
          <input
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
            placeholder="Ej: Pérez López"
          />
        </div>

        <div className="emp-field emp-full">
          <label>Correo</label>
          <input
            type="email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            placeholder="Ej: juan@recolecta.mx"
          />
        </div>

        <div className="emp-field emp-full">
          <label>Usuario</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ej: jperez"
          />
        </div>

        <div className="emp-field emp-full">
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña de acceso"
          />
        </div>

        <div className="emp-field emp-full">
          <label>Rol</label>
          <select value={rolId} onChange={(e) => setRolId(Number(e.target.value) as RoleId)}>
            {(Object.entries(ROLE_NAMES) as [string, string][]).map(([id, nombre]) => (
              <option key={id} value={id}>
                {nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="emp-form-actions">
        <button type="button" className="emp-btn secondary" onClick={onCancel} disabled={saving}>
          Cancelar
        </button>

        <button type="submit" className="emp-btn primary" disabled={saving}>
          {saving ? "Guardando..." : "Crear empleado"}
        </button>
      </div>
    </form>
  );
}
