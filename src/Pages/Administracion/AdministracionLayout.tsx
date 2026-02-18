import { Outlet } from "react-router-dom";
import SidebarAdministracion from "./SidebarAdministracion";
import "./AdministracionLayout.css";

export default function AdministracionLayout() {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <SidebarAdministracion />
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}