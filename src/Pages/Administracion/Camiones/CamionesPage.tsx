// src/Pages/Administracion/Camiones/CamionesPage.tsx
import { useMemo, useState } from "react";
import { FaTruck, FaCheckCircle, FaClock, FaPlus, FaList, FaFileExport } from "react-icons/fa";
import CamionesTable from "./components/CamionesTable";
import CamionForm from "./components/CamionForm";
import "./CamionesPage.css";

export type DisponibilidadCamion =
  | "DISPONIBLE"
  | "EN_RUTA"
  | "MANTENIMIENTO"
  | "FUERA_SERVICIO";

export interface TipoCamionMock {
  tipo_camion_id: number;
  nombre: string;
}

export interface CamionMock {
  camion_id: number;
  placa: string;
  modelo: string;
  tipo_camion_id: number;
  es_rentado: boolean;
  disponibilidad: DisponibilidadCamion;
  eliminado: boolean;
  created_at?: string;
  updated_at?: string;

  tipo_camion?: TipoCamionMock;
}

const TIPOS_CAMION: TipoCamionMock[] = [
  { tipo_camion_id: 1, nombre: "Compactador" },
  { tipo_camion_id: 2, nombre: "Volteo" },
  { tipo_camion_id: 3, nombre: "Recolección Ligera" },
];

const CAMIONES_MOCK: CamionMock[] = [
  {
    camion_id: 1,
    placa: "CHP-203-A",
    modelo: "Freightliner M2 2020",
    tipo_camion_id: 1,
    es_rentado: false,
    disponibilidad: "DISPONIBLE",
    eliminado: false,
  },
  {
    camion_id: 2,
    placa: "CHP-998-B",
    modelo: "International 2018",
    tipo_camion_id: 2,
    es_rentado: true,
    disponibilidad: "EN_RUTA",
    eliminado: false,
  },
  {
    camion_id: 3,
    placa: "CHP-450-X",
    modelo: "Kenworth 2016",
    tipo_camion_id: 1,
    es_rentado: false,
    disponibilidad: "MANTENIMIENTO",
    eliminado: false,
  },
];

type EstadoFiltro = "TODOS" | "DISPONIBLE" | "EN_RUTA" | "MANTENIMIENTO" | "FUERA_SERVICIO";

export default function CamionesPage() {
  const [camiones, setCamiones] = useState<CamionMock[]>(() => {
    // Inyectamos el tipo_camion para que la tabla sea más fácil
    return CAMIONES_MOCK.map((c) => ({
      ...c,
      tipo_camion: TIPOS_CAMION.find((t) => t.tipo_camion_id === c.tipo_camion_id),
    }));
  });

  const [search, setSearch] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState<EstadoFiltro>("TODOS");
  const [soloRentados, setSoloRentados] = useState(false);

  // Modal / Form
  const [modalOpen, setModalOpen] = useState(false);
  const [modoForm, setModoForm] = useState<"CREAR" | "EDITAR">("CREAR");
  const [camionSeleccionado, setCamionSeleccionado] = useState<CamionMock | null>(null);

  const camionesFiltrados = useMemo(() => {
    return camiones
      .filter((c) => !c.eliminado)
      .filter((c) => {
        if (estadoFiltro === "TODOS") return true;
        return c.disponibilidad === estadoFiltro;
      })
      .filter((c) => {
        if (!soloRentados) return true;
        return c.es_rentado;
      })
      .filter((c) => {
        const q = search.trim().toLowerCase();
        if (!q) return true;

        return (
          c.placa.toLowerCase().includes(q) ||
          c.modelo.toLowerCase().includes(q) ||
          (c.tipo_camion?.nombre ?? "").toLowerCase().includes(q)
        );
      });
  }, [camiones, estadoFiltro, soloRentados, search]);

  const resumen = useMemo(() => {
    const activos = camiones.filter((c) => !c.eliminado);

    const total = activos.length;
    const disponibles = activos.filter((c) => c.disponibilidad === "DISPONIBLE").length;
    const enRuta = activos.filter((c) => c.disponibilidad === "EN_RUTA").length;
    const mantenimiento = activos.filter((c) => c.disponibilidad === "MANTENIMIENTO").length;

    return { total, disponibles, enRuta, mantenimiento };
  }, [camiones]);

  function abrirCrear() {
    setModoForm("CREAR");
    setCamionSeleccionado(null);
    setModalOpen(true);
  }

  function abrirEditar(camion: CamionMock) {
    setModoForm("EDITAR");
    setCamionSeleccionado(camion);
    setModalOpen(true);
  }

  function cerrarModal() {
    setModalOpen(false);
  }

  function eliminarCamion(camion_id: number) {
    const ok = confirm("¿Seguro que deseas eliminar este camión?");
    if (!ok) return;

    setCamiones((prev) =>
      prev.map((c) => (c.camion_id === camion_id ? { ...c, eliminado: true } : c))
    );
  }

  function onSubmitForm(data: Omit<CamionMock, "camion_id" | "eliminado" | "tipo_camion">) {
    if (modoForm === "CREAR") {
      const nuevo: CamionMock = {
        camion_id: Date.now(), // mock id
        eliminado: false,
        ...data,
        tipo_camion: TIPOS_CAMION.find((t) => t.tipo_camion_id === data.tipo_camion_id),
      };

      setCamiones((prev) => [nuevo, ...prev]);
      setModalOpen(false);
      return;
    }

    // EDITAR
    if (!camionSeleccionado) return;

    setCamiones((prev) =>
      prev.map((c) => {
        if (c.camion_id !== camionSeleccionado.camion_id) return c;

        return {
          ...c,
          ...data,
          updated_at: new Date().toISOString(),
          tipo_camion: TIPOS_CAMION.find((t) => t.tipo_camion_id === data.tipo_camion_id),
        };
      })
    );

    setModalOpen(false);
  }

  function exportarCSV() {
    // Export simple sin librerías
    const headers = ["placa", "modelo", "tipo", "rentado", "disponibilidad"];
    const rows = camionesFiltrados.map((c) => [
      c.placa,
      c.modelo,
      c.tipo_camion?.nombre ?? "",
      c.es_rentado ? "SI" : "NO",
      c.disponibilidad,
    ]);

    const csv = [headers, ...rows]
      .map((r) => r.map((x) => `"${String(x).replaceAll('"', '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "camiones.csv";
    a.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div className="admin-page">
      <div className="camiones">
        {/* =========================
            HEADER (estilo tu ejemplo)
          ========================= */}
        <section className="camiones admin-header">
          <div className="camiones admin-header-left">
            <h1>Camiones</h1>
            <p>Administración general de unidades registradas.</p>
          </div>

          <div className="camiones admin-header-cards">
            <div className="camiones mini-card">
              <div className="camiones mini-card-icon">
                <FaTruck />
              </div>
              <div>
                <h3 className="camiones mini-card-value">{resumen.total}</h3>
                <span className="camiones mini-card-label">Camiones totales</span>
              </div>
            </div>

            <div className="camiones mini-card">
              <div className="camiones mini-card-icon ok">
                <FaCheckCircle />
              </div>
              <div>
                <h3 className="camiones mini-card-value">{resumen.disponibles}</h3>
                <span className="camiones mini-card-label">Disponibles</span>
              </div>
            </div>

            <div className="camiones mini-card">
              <div className="camiones mini-card-icon warn">
                <FaClock />
              </div>
              <div>
                <h3 className="camiones mini-card-value">{resumen.mantenimiento}</h3>
                <span className="camiones mini-card-label">Mantenimiento</span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================
            BARRA DE ACCIONES
          ========================= */}
        <section className="camiones admin-actions-bar">
          <button className="camiones btn camiones btn-light">
            <FaList />
            Ver Camiones
          </button>

          <button className="camiones btn camiones btn-primary" onClick={abrirCrear}>
            <FaPlus />
            Crear Camión
          </button>
        </section>

        {/* =========================
            FILTROS (como tu ejemplo)
          ========================= */}
        <section className="camiones admin-filters">
          <div className="camiones filters-left">
            <div className="camiones chip-group">
              <button
                className={`camiones chip ${estadoFiltro === "TODOS" ? "camiones active" : ""}`}
                onClick={() => setEstadoFiltro("TODOS")}
              >
                Todos
              </button>

              <button
                className={`camiones chip ${estadoFiltro === "DISPONIBLE" ? "camiones active" : ""}`}
                onClick={() => setEstadoFiltro("DISPONIBLE")}
              >
                Disponibles
              </button>

              <button
                className={`camiones chip ${estadoFiltro === "EN_RUTA" ? "camiones active" : ""}`}
                onClick={() => setEstadoFiltro("EN_RUTA")}
              >
                En ruta
              </button>

              <button
                className={`camiones chip ${estadoFiltro === "MANTENIMIENTO" ? "camiones active" : ""}`}
                onClick={() => setEstadoFiltro("MANTENIMIENTO")}
              >
                Mantenimiento
              </button>
            </div>

            <label className="camiones checkbox">
              <input
                type="checkbox"
                checked={soloRentados}
                onChange={(e) => setSoloRentados(e.target.checked)}
              />
              Solo rentados
            </label>
          </div>

          <div className="camiones filters-right">
            <input
              className="camiones search"
              placeholder="Buscar por placa, modelo o tipo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button className="camiones btn camiones btn-outline" onClick={exportarCSV}>
              <FaFileExport />
              Exportar
            </button>
          </div>
        </section>

        {/* =========================
            TABLA
          ========================= */}
        <section className="camiones admin-table-section">
          <div className="camiones admin-table-top">
            <span>Mostrando {camionesFiltrados.length} camiones</span>
            <span className="camiones muted">
              Actualizado: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
            </span>
          </div>

          <CamionesTable
            camiones={camionesFiltrados}
            onEditar={abrirEditar}
            onEliminar={eliminarCamion}
          />
        </section>

        {/* =========================
            MODAL (Crear / Editar)
          ========================= */}
        {modalOpen && (
          <div className="camiones modal-overlay" onMouseDown={cerrarModal}>
            <div className="camiones modal" onMouseDown={(e) => e.stopPropagation()}>
              <div className="camiones modal-header">
                <h2>{modoForm === "CREAR" ? "Crear Camión" : "Editar Camión"}</h2>
                <button className="camiones modal-close" onClick={cerrarModal}>
                  ✕
                </button>
              </div>

              <CamionForm
                modo={modoForm}
                tiposCamion={TIPOS_CAMION}
                camion={camionSeleccionado}
                onCancel={cerrarModal}
                onSubmit={onSubmitForm}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}