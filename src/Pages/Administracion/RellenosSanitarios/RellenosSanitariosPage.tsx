// src/Pages/Administracion/RellenosSanitarios/RellenosSanitariosPage.tsx
import { useMemo, useState } from "react";
import "./RellenosSanitariosPage.css";

import RellenosSanitariosForm from "./components/RellenoForm";
import RellenosSanitariosTable from "./components/RellenosTable";

export interface RellenoSanitario {
  id: number;
  nombre: string;
  direccion: string;
  municipio: string;
  capacidadToneladas: number;
  estado: "Activo" | "Inactivo";
  fechaRegistro: string;
}

const MOCK_RELLENOS: RellenoSanitario[] = [
  {
    id: 1,
    nombre: "Relleno Sanitario Norte",
    direccion: "Carretera Federal Km 12, Zona Industrial",
    municipio: "Tuxtla Gutiérrez",
    capacidadToneladas: 1500,
    estado: "Activo",
    fechaRegistro: "2026-02-01",
  },
  {
    id: 2,
    nombre: "Relleno Sanitario Oriente",
    direccion: "Av. Principal s/n, Col. El Mirador",
    municipio: "Chiapa de Corzo",
    capacidadToneladas: 950,
    estado: "Activo",
    fechaRegistro: "2026-02-03",
  },
  {
    id: 3,
    nombre: "Relleno Sanitario Sur",
    direccion: "Camino rural 5, Ejido San Pedro",
    municipio: "Berriozábal",
    capacidadToneladas: 600,
    estado: "Inactivo",
    fechaRegistro: "2026-02-05",
  },
];

export default function RellenosSanitariosPage() {
  const [rellenos, setRellenos] = useState<RellenoSanitario[]>(MOCK_RELLENOS);

  const [search, setSearch] = useState("");
  const [filtroEstado, setFiltroEstado] = useState<
    "Todos" | "Activo" | "Inactivo"
  >("Todos");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRelleno, setEditingRelleno] =
    useState<RellenoSanitario | null>(null);

  // =========================
  // Filtrado
  // =========================
  const filteredRellenos = useMemo(() => {
    const q = search.trim().toLowerCase();

    return rellenos.filter((r) => {
      const matchSearch =
        q.length === 0 ||
        r.nombre.toLowerCase().includes(q) ||
        r.direccion.toLowerCase().includes(q) ||
        r.municipio.toLowerCase().includes(q);

      const matchEstado =
        filtroEstado === "Todos" ? true : r.estado === filtroEstado;

      return matchSearch && matchEstado;
    });
  }, [rellenos, search, filtroEstado]);

  // =========================
  // Cards resumen
  // =========================
  const resumen = useMemo(() => {
    const total = rellenos.length;
    const activos = rellenos.filter((r) => r.estado === "Activo").length;
    const inactivos = rellenos.filter((r) => r.estado === "Inactivo").length;

    return { total, activos, inactivos };
  }, [rellenos]);

  // =========================
  // CRUD
  // =========================
  const openCreate = () => {
    setEditingRelleno(null);
    setIsModalOpen(true);
  };

  const openEdit = (relleno: RellenoSanitario) => {
    setEditingRelleno(relleno);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingRelleno(null);
  };

  const handleDelete = (id: number) => {
    const relleno = rellenos.find((r) => r.id === id);
    if (!relleno) return;

    const ok = confirm(
      `¿Seguro que deseas eliminar el relleno "${relleno.nombre}"?`
    );

    if (!ok) return;

    setRellenos((prev) => prev.filter((r) => r.id !== id));
  };

  const handleSave = (data: Omit<RellenoSanitario, "id" | "fechaRegistro">) => {
    // Si es edición
    if (editingRelleno) {
      setRellenos((prev) =>
        prev.map((r) =>
          r.id === editingRelleno.id
            ? {
                ...r,
                ...data,
              }
            : r
        )
      );

      closeModal();
      return;
    }

    // Si es nuevo
    const nextId = Math.max(0, ...rellenos.map((r) => r.id)) + 1;

    const nuevo: RellenoSanitario = {
      id: nextId,
      fechaRegistro: new Date().toISOString().slice(0, 10),
      ...data,
    };

    setRellenos((prev) => [nuevo, ...prev]);
    closeModal();
  };

  const handleExport = () => {
    // Export simple CSV (mock)
    const headers = [
      "ID",
      "Nombre",
      "Dirección",
      "Municipio",
      "Capacidad (Ton)",
      "Estado",
      "Fecha Registro",
    ];

    const rows = filteredRellenos.map((r) => [
      r.id,
      r.nombre,
      r.direccion,
      r.municipio,
      r.capacidadToneladas,
      r.estado,
      r.fechaRegistro,
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `rellenos_sanitarios_${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="rs-page">
      {/* =======================
          HEADER
      ======================= */}
      <div className="rs-header">
        <div>
          <h1>Rellenos Sanitarios</h1>
          <p>Administración y seguimiento de rellenos sanitarios registrados</p>
        </div>

        <div className="rs-cards">
          <div className="rs-card">
            <div className="rs-card-title">Rellenos totales</div>
            <div className="rs-card-value">{resumen.total}</div>
          </div>

          <div className="rs-card">
            <div className="rs-card-title">Activos</div>
            <div className="rs-card-value">{resumen.activos}</div>
          </div>

          <div className="rs-card">
            <div className="rs-card-title">Inactivos</div>
            <div className="rs-card-value">{resumen.inactivos}</div>
          </div>
        </div>
      </div>

      {/* =======================
          BOTONES PRINCIPALES
      ======================= */}
      <div className="rs-actions">
        <button className="rs-btn rs-btn-secondary">
          📋 Ver Rellenos
        </button>

        <button className="rs-btn rs-btn-primary" onClick={openCreate}>
          ➕ Crear Relleno
        </button>
      </div>

      {/* =======================
          FILTROS
      ======================= */}
      <div className="rs-filters">
        <div className="rs-filter-left">
          <button
            className={`rs-chip ${filtroEstado === "Todos" ? "active" : ""}`}
            onClick={() => setFiltroEstado("Todos")}
          >
            Todos
          </button>

          <button
            className={`rs-chip ${filtroEstado === "Activo" ? "active" : ""}`}
            onClick={() => setFiltroEstado("Activo")}
          >
            Activos
          </button>

          <button
            className={`rs-chip ${filtroEstado === "Inactivo" ? "active" : ""}`}
            onClick={() => setFiltroEstado("Inactivo")}
          >
            Inactivos
          </button>
        </div>

        <div className="rs-filter-right">
          <input
            className="rs-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre, municipio o dirección..."
          />

          <button className="rs-btn rs-btn-outline" onClick={handleExport}>
            ⬇ Exportar
          </button>
        </div>
      </div>

      {/* =======================
          TABLA
      ======================= */}
      <div className="rs-table-container">
        <div className="rs-table-top">
          <span>
            Mostrando <b>{filteredRellenos.length}</b> rellenos sanitarios
          </span>
          <span className="rs-updated">
            Actualizado: Hoy {new Date().toLocaleTimeString().slice(0, 5)}
          </span>
        </div>

        <RellenosSanitariosTable
          data={filteredRellenos}
          onEdit={openEdit}
          onDelete={handleDelete}
          onDetails={(relleno) => {
            alert(
              `Detalles:\n\nNombre: ${relleno.nombre}\nMunicipio: ${relleno.municipio}\nCapacidad: ${relleno.capacidadToneladas} ton`
            );
          }}
        />
      </div>

      {/* =======================
          MODAL FORM
      ======================= */}
      {isModalOpen && (
        <div className="rs-modal-overlay" onClick={closeModal}>
          <div
            className="rs-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rs-modal-header">
              <h2>
                {editingRelleno ? "Editar Relleno" : "Crear Relleno"}
              </h2>
              <button className="rs-modal-close" onClick={closeModal}>
                ✕
              </button>
            </div>

            <RellenosSanitariosForm
              key={editingRelleno?.id ?? "new"}
              initialData={editingRelleno}
              onCancel={closeModal}
              onSave={handleSave}
            />
          </div>
        </div>
      )}
    </div>
  );
}
