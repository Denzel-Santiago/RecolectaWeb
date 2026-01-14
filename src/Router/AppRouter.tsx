// AppRouter.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Navbar from "../components/Navigation/Navbar";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Historial from "../Pages/Historial/Historial";
import Alertas from "../Pages/Alertas/Alertas";
import Anomalias from "../Pages/Anomalias/Anomalias";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta principal - Redirige a login por defecto */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Ruta de login (sin navbar) */}
        <Route path="/login" element={<Login />} />
        
        {/* Ruta del dashboard (con navbar) */}
        <Route 
          path="/dashboard" 
          element={
            <>
              <Navbar />
              <Dashboard />
            </>
          } 
        />

        {/* Ruta del historial (con navbar) */}
        <Route 
          path="/historial" 
          element={
            <>
              <Navbar />
              <Historial />
            </>
          } 
        />

        {/* Ruta de alertas (con navbar) */}
        <Route 
          path="/alertas" 
          element={
            <>
              <Navbar />
              <Alertas />
            </>
          } 
        />

        {/* Ruta de anomalias (con navbar) */}
        <Route 
          path="/anomalias" 
          element={
            <>
              <Navbar />
              <Anomalias />
            </>
          } 
        />

        {/* Para cualquier otra ruta, redirige al login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}