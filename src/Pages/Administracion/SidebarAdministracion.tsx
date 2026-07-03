import { NavLink } from "react-router-dom";
import { FaTrashAlt, FaTruck, FaCalendarAlt, FaUsers } from "react-icons/fa";
import "./SidebarAdministracion.css";

export default function SidebarAdministracion() {
  return (
    <aside className="admin-sidebar-wrapper">
      <nav className="admin-nav">
        <NavLink
          to="/administracion/rellenos"
          className={({ isActive }) =>
            isActive ? "admin-link active" : "admin-link"
          }
          title="Rellenos Sanitarios"
        >
          <FaTrashAlt />
        </NavLink>

        <NavLink
          to="/administracion/camiones"
          className={({ isActive }) =>
            isActive ? "admin-link active" : "admin-link"
          }
          title="Camiones"
        >
          <FaTruck />
        </NavLink>

        <NavLink
          to="/administracion/dias-recoleccion"
          className={({ isActive }) =>
            isActive ? "admin-link active" : "admin-link"
          }
          title="Días de Recolección"
        >
          <FaCalendarAlt />
        </NavLink>

        <NavLink
          to="/administracion/empleados"
          className={({ isActive }) =>
            isActive ? "admin-link active" : "admin-link"
          }
          title="Empleados"
        >
          <FaUsers />
        </NavLink>
      </nav>
    </aside>
  );
}
