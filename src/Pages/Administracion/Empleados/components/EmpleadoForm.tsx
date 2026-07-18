import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import type { EmpleadoCreatePayload } from "../EmpleadosPage";
import { ROLES, ROLE_NAMES, type RoleId } from "../../../../services/auth";

interface Props {
  onCancel: () => void;
  onSave: (data: EmpleadoCreatePayload) => void;
  saving?: boolean;
}

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{1,8}$/;
const PASSWORD_HINT = "Máximo 8 caracteres, con al menos una mayúscula, una minúscula y un número.";

// Solo letras (incluye acentos y ñ) y espacios; nada de números ni
// caracteres especiales en nombre/apellidos.
const soloLetras = (raw: string) => raw.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, "");

export default function EmpleadoForm({ onCancel, onSave, saving = false }: Props) {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [mail, setMail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
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
    if (!password) return setError("La contraseña es obligatoria.");
    if (!PASSWORD_REGEX.test(password)) return setError(`La contraseña no cumple el formato. ${PASSWORD_HINT}`);

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
            onChange={(e) => setNombre(soloLetras(e.target.value))}
            placeholder="Ej: Juan Conductor"
            maxLength={50}
          />
        </div>

        <div className="emp-field emp-full">
          <label>Apellidos</label>
          <input
            value={apellidos}
            onChange={(e) => setApellidos(soloLetras(e.target.value))}
            placeholder="Ej: Pérez López"
            maxLength={50}
          />
        </div>

        <div className="emp-field emp-full">
          <label>Correo</label>
          <input
            type="email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            placeholder="Ej: juan@recolecta.mx"
            maxLength={50}
          />
        </div>

        <div className="emp-field emp-full">
          <label>Usuario</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ej: jperez"
            maxLength={50}
          />
        </div>

        <div className="emp-field emp-full">
          <label>Contraseña</label>
          <div className="emp-password-field">
            <input
              type={mostrarPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña de acceso"
              maxLength={8}
            />
            <button
              type="button"
              className="emp-password-toggle"
              onClick={() => setMostrarPassword((v) => !v)}
              tabIndex={-1}
              aria-label={mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {mostrarPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          <span className="emp-field-hint">{PASSWORD_HINT}</span>
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
