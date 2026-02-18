// AppRouter.jsx
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

import Login from "../Pages/Login/Login";
import Navbar from "../components/Navigation/Navbar";

// Páginas globales
import Dashboard from "../Pages/Dashboard/Dashboard";
import Historial from "../Pages/Historial/Historial";
import Alertas from "../Pages/Alertas/Alertas";
import Anomalias from "../Pages/Anomalias/Anomalias";
import EstadoRuta from "../Pages/EstadoRuta/EstadoRuta";
import ValidacionRecoleccion from "../Pages/ValidacionRecoleccion/ValidacionRecoleccion";

// ==========================
// ADMINISTRACIÓN (NUEVO)
// ==========================

import AdministracionLayout from "../Pages/Administracion/AdministracionLayout";
import RellenosSanitariosPage from "../Pages/Administracion/RellenosSanitarios/RellenosSanitariosPage";
import CamionesPage from "../Pages/Administracion/Camiones/CamionesPage";
import DiasRecoleccionPage from "../Pages/Administracion/DiasRecoleccion/DiasRecoleccionPage";

// Layout global (Navbar + contenido)
function AppLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta principal */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login sin navbar */}
        <Route path="/login" element={<Login />} />

        {/* ==========================
            RUTAS CON NAVBAR (GLOBAL)
           ========================== */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/historial" element={<Historial />} />
          <Route path="/alertas" element={<Alertas />} />
          <Route path="/anomalias" element={<Anomalias />} />
          <Route path="/estado-ruta" element={<EstadoRuta />} />
          <Route path="/validacion-recoleccion" element={<ValidacionRecoleccion />} />

          {/* ==========================
              ADMINISTRACIÓN (Nested)
             ========================== */}
          <Route path="/administracion" element={<AdministracionLayout />}>
            <Route index element={<Navigate to="rellenos" replace />} />
            <Route path="rellenos" element={<RellenosSanitariosPage />} />
            <Route path="camiones" element={<CamionesPage />} />
            <Route path="dias-recoleccion" element={<DiasRecoleccionPage />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}