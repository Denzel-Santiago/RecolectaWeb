import { NavLink } from "react-router-dom";
import { FaTrashAlt, FaTruck, FaCalendarAlt, FaUsers } from "react-icons/fa";
import "./SidebarAdministracion.css";
import { canAccess } from "../../services/auth";

export default function SidebarAdministracion() {
  return (
    <aside className="admin-sidebar-wrapper">
      <nav className="admin-nav">
        {canAccess("administracionRellenos") && (
          <NavLink
            to="/administracion/rellenos"
            className={({ isActive }) =>
              isActive ? "admin-link active" : "admin-link"
            }
            title="Rellenos Sanitarios"
          >
            <FaTrashAlt />
          </NavLink>
        )}

        {canAccess("administracionCamiones") && (
          <NavLink
            to="/administracion/camiones"
            className={({ isActive }) =>
              isActive ? "admin-link active" : "admin-link"
            }
            title="Camiones"
          >
            <FaTruck />
          </NavLink>
        )}

        {canAccess("administracionDiasRecoleccion") && (
          <NavLink
            to="/administracion/dias-recoleccion"
            className={({ isActive }) =>
              isActive ? "admin-link active" : "admin-link"
            }
            title="Días de Recolección"
          >
            <FaCalendarAlt />
          </NavLink>
        )}

        {canAccess("administracionEmpleados") && (
          <NavLink
            to="/administracion/empleados"
            className={({ isActive }) =>
              isActive ? "admin-link active" : "admin-link"
            }
            title="Empleados"
          >
            <FaUsers />
          </NavLink>
        )}
      </nav>
    </aside>
  );
}
