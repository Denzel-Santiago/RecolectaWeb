// Dashboard.tsx - Componente principal del dashboard de monitoreo de flota
import { useState, useEffect, useRef } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import camionRojo from '../../assets/camion-rojo.png';
import camionNaranja from '../../assets/camion-naranja.png';
import camionVerde from '../../assets/camion-verde.png';
import './Dashboard.css';

// ─── Tipos ────────────────────────────────────────────────────────────────────
interface Incidencia {
  id: number;
  fecha: string;
  hora: string;
  descripcion: string;
  ubicacion: 'Suchiapa' | 'Chiapas' | 'Tuxtla Gutiérrez';
}

interface Ruta {
  id: string;
  nombre: string;
  conductor: string;
  estado: 'alerta' | 'advertencia' | 'ok';
  progreso: number;
  color: string;
  badge: string;
}

interface Alerta {
  id: number;
  titulo: string;
  detalle: string;
  tipo: 'critica' | 'advertencia';
  tiempo: string;
}

interface Posiciones {
  [key: string]: { t: number };
}

// ─── Datos simulados ──────────────────────────────────────────────────────────

const RUTAS_INICIALES: Ruta[] = [
  { id: '01', nombre: 'Camión 1', conductor: '', estado: 'alerta',    progreso: 65,  color: '#E24B4A', badge: 'Detenido' },
  { id: '02', nombre: 'Camión 2', conductor: '', estado: 'advertencia', progreso: 40, color: '#BA7517', badge: 'En movimiento' },
  { id: '03', nombre: 'Camión 3', conductor: '',  estado: 'ok',         progreso: 100, color: '#639922', badge: 'Completado' },
];

const ALERTAS: Alerta[] = [
  { id: 1, titulo: 'Camión 1 — En movimiento', detalle: 'Ruta activa · Progreso normal', tipo: 'advertencia', tiempo: 'Ahora' },
  { id: 2, titulo: 'Camión 2 — Retraso en ruta', detalle: '30 min sobre tiempo estimado', tipo: 'advertencia', tiempo: '10 min' },
  { id: 3, titulo: 'Camión 3 — Finalizado', detalle: 'Ruta completada exitosamente', tipo: 'advertencia', tiempo: '2h' },
];

const INCIDENCIAS: Incidencia[] = [
  {
    id: 1,
    fecha: '2026-04-20',
    hora: '08:32',
    descripcion: 'Se encontraron residuos peligrosos y no aptos, se requiere intervención inmediata.',
    ubicacion: 'Suchiapa, Punto de recolección: Num 5'
  },
  {
    id: 2,
    fecha: '2026-04-20',
    hora: '10:15',
    descripcion: 'Material no clasificado detectado en ruta de recolección.',
    ubicacion: 'Suchiapa Punto de recolección: Num 12'
  },
  {
    id: 3,
    fecha: '2026-04-20',
    hora: '14:45',
    descripcion: 'Incidente de tráfico reportado en la ruta de recolección.',
    ubicacion: 'Suchiapa Punto de recolección: Num 8'
  }

];

// Rutas en el SVG (viewBox 460x220). Cada array = waypoints [x, y]
const MAP_PATHS: Record<string, number[][]> = {
  '01': [[20,56],[65,56],[65,116],[160,116],[220,56],[270,56]],
  '02': [[390,116],[270,116],[270,56],[165,56],[165,116],[65,116],[65,176]],
  '03': [[20,176],[65,176],[165,176],[270,176],[380,176],[450,176]],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function lerp(a: number, b: number, t: number): number { return a + (b - a) * t; }

function getTruckPos(path: number[][], t: number): [number, number] {
  const segs = path.length - 1;
  const seg  = Math.min(Math.floor(t * segs), segs - 1);
  const local = (t * segs) - seg;
  const a = path[seg], b = path[seg + 1];
  return [lerp(a[0], b[0], local), lerp(a[1], b[1], local)];
}

function buildPolylinePoints(path: number[][], t: number): string {
  if (t >= 1) return path.map(p => p.join(',')).join(' ');
  const segs = path.length - 1;
  const end  = t * segs;
  const seg  = Math.floor(end);
  const local = end - seg;
  const pts = path.slice(0, seg + 1).map(p => p.join(','));
  if (seg < path.length - 1) {
    const a = path[seg], b = path[seg + 1];
    pts.push([lerp(a[0], b[0], local).toFixed(1), lerp(a[1], b[1], local).toFixed(1)].join(','));
  }
  return pts.join(' ');
}

function pad(n: number): string { return String(n).padStart(2, '0'); }

// ─── Mini mapa SVG ────────────────────────────────────────────────────────────

function MiniMapa({ rutas }: { rutas: Ruta[] }) {
  const [positions, setPositions] = useState<Posiciones>({
    '01': { t: RUTAS_INICIALES[0].progreso / 100 },
    '02': { t: RUTAS_INICIALES[1].progreso / 100 },
    '03': { t: RUTAS_INICIALES[2].progreso / 100 },
  });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    function animate() {
      setPositions(prev => {
        const next = { ...prev };
        // Solo los camiones 02 y 03 se mueven en ciclo continuo
        // El camión 01 permanece en su posición inicial
        next['02'] = { t: (prev['02'].t + 0.0015) % 1 }; // Ciclo continuo
        next['03'] = { t: (prev['03'].t + 0.0012) % 1 }; // Ciclo continuo (velocidad ligeramente diferente)
        return next;
      });
      rafRef.current = requestAnimationFrame(animate);
    }
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const estadoColor: Record<string, string> = { alerta: '#E24B4A', advertencia: '#BA7517', ok: '#639922' };

  return (
    <div className="mapa-wrap">
      <svg viewBox="0 0 460 220" className="mapa-svg" xmlns="http://www.w3.org/2000/svg">
        {/* Fondo */}
        <rect width="460" height="220" fill="#e8eeea" />

        {/* Calles horizontales */}
        {[50, 110, 170].map(y => (
          <rect key={y} x="0" y={y} width="460" height="12" fill="#d4dcd6" opacity=".7" />
        ))}
        {/* Calles verticales */}
        {[60, 160, 270, 380].map(x => (
          <rect key={x} x={x} y="0" width="10" height="220" fill="#d4dcd6" opacity=".7" />
        ))}

        {/* Manzanas */}
        {[
          [10,20,40,25],[80,20,70,25],[80,65,70,38],[175,20,85,25],[175,65,85,38],
          [285,20,85,25],[285,65,85,38],[395,20,55,25],[80,125,70,38],[175,125,85,38],
          [285,125,85,38],[395,125,55,38],[10,185,40,28],[80,185,70,28],[175,185,85,28],
        ].map(([x,y,w,h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} rx="3" fill="#c8d4ca" />
        ))}

        {/* Rutas trazadas */}
        {rutas.map(r => {
          const path = MAP_PATHS[r.id];
          const t    = positions[r.id]?.t ?? r.progreso / 100;
          const pts  = buildPolylinePoints(path, t);
          const color = estadoColor[r.estado] ?? '#888';
          return (
            <polyline
              key={r.id}
              points={pts}
              fill="none"
              stroke={color}
              strokeWidth="2.5"
              strokeDasharray={r.estado === 'ok' ? 'none' : '5,3'}
              opacity=".85"
            />
          );
        })}

        {/* Camiones */}
        {rutas.map(r => {
          const path = MAP_PATHS[r.id];
          const t    = positions[r.id]?.t ?? r.progreso / 100;
          const [cx, cy] = getTruckPos(path, t);
          let camionImage = camionVerde;
          if (r.id === '01') camionImage = camionRojo;
          else if (r.id === '02') camionImage = camionNaranja;
          return (
            <image
              key={r.id}
              href={camionImage}
              x={cx - 12}
              y={cy - 8}
              width="24"
              height="16"
              opacity="0.9"
            />
          );
        })}
      </svg>

      {/* Leyenda */}
      <div className="mapa-legend">
        {rutas.map(r => (
          <div key={r.id} className="mapa-legend-row">
            <span className="mapa-legend-dot" style={{ background: estadoColor[r.estado] }} />
            <span>{r.nombre} · {r.badge}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

export default function Dashboard() {
  const [rutas]        = useState<Ruta[]>(RUTAS_INICIALES);
  const [seleccionado, setSeleccionado] = useState<string | null>(null);
  const [ahora, setAhora]              = useState(new Date());

  useEffect(() => {
    const iv = setInterval(() => setAhora(new Date()), 1000);
    return () => clearInterval(iv);
  }, []);

  const metricas = {
    total:       rutas.length,
    completadas: rutas.filter(r => r.estado === 'ok').length,
    activos:     rutas.filter(r => r.estado === 'advertencia').length,
    alertas:     ALERTAS.length,
  };

  const estadoBadgeClass: Record<string, string> = { alerta: 'tbadge-err', advertencia: 'tbadge-warn', ok: 'tbadge-ok' };
  const estadoDotClass: Record<string, string>   = { alerta: 'sdot-err',  advertencia: 'sdot-warn',  ok: 'sdot-ok'  };
  const barColor: Record<string, string>         = { alerta: '#E24B4A',    advertencia: '#BA7517',    ok: '#639922'   };

 // SOLO cambia la parte del render (return)

return (
  <div className="dash-container">
    <div className="dashboard">

      {/* HEADER */}
      <header className="dash-header">
        <div className="dash-header-left">
          <div>
            <h1>Monitoreo de flota</h1>
            <p className="dash-subtitle">Turno matutino · Zona Norte</p>
          </div>
        </div>
        <div className="dash-clock">
          {pad(ahora.getHours())}:{pad(ahora.getMinutes())}:{pad(ahora.getSeconds())}
        </div>
      </header>

      {/* MÉTRICAS */}
      <div className="dash-metrics">
        <div className="metric">
          <span className="metric-lbl">Total</span>
          <span className="metric-val">{metricas.total}</span>
          <span className="metric-lbl">camiones</span>
        </div>
        <div className="metric">
          <span className="metric-lbl">Completadas</span>
          <span className="metric-val val-ok">{metricas.completadas}</span>
          <span className="metric-lbl">rutas</span>
        </div>
        <div className="metric">
          <span className="metric-lbl">En curso</span>
          <span className="metric-val val-info">{metricas.activos}</span>
          <span className="metric-lbl">activos</span>
        </div>
        <div className="metric">
          <span className="metric-lbl">Alertas</span>
          <span className="metric-val val-danger">{metricas.alertas}</span>
          <span className="metric-lbl">activas</span>
        </div>
      </div>

      {/* GRID PRINCIPAL */}
      <div className="dash-main-grid">

        {/* MAPA */}
        <div className="card">
          <h2 className="card-title">Mapa de rutas · Tiempo real</h2>
          <MiniMapa rutas={rutas} />

          <div className="truck-list">
            {rutas.map(r => (
              <div
                key={r.id}
                className={`truck-row ${seleccionado === r.id ? 'truck-row--selected' : ''}`}
                onClick={() => setSeleccionado(r.id === seleccionado ? null : r.id)}
              >
                <span className={`sdot ${estadoDotClass[r.estado]}`} />
                <div className="truck-info">
                  <span className="truck-name">{r.nombre}</span>
                </div>
                <div className="truck-right">
                  <div className="pbar-wrap">
                    <div className="pbar" style={{ width: `${r.progreso}%`, background: barColor[r.estado] }} />
                  </div>
                  <span className="pct">{r.progreso}%</span>
                  <span className={`tbadge ${estadoBadgeClass[r.estado]}`}>{r.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COLUMNA DERECHA */}
        <div className="right-column">

          {/* ALERTAS */}
          <div className="card card--alerts">
            <h2 className="card-title">Alertas activas</h2>
            <div className="alerts-list compact">
              {ALERTAS.map(a => (
                <div key={a.id} className={`alerta alerta--${a.tipo}`}>
                  <FiAlertTriangle className="alerta-icon" />
                  <div className="alerta-body">
                    <p className="alerta-titulo">{a.titulo}</p>
                    <p className="alerta-detalle">{a.detalle}</p>
                  </div>
                  <span className="alerta-time">{a.tiempo}</span>
                </div>
              ))}
            </div>
          </div>

          {/* INCIDENCIAS */}
          <div className="card card--incidencias">
            <h2 className="card-title">Incidencias</h2>
            <div className="alerts-list">
              {INCIDENCIAS.map((inc) => (
                <div key={inc.id} className="alerta alerta--critica">
                  <FiAlertTriangle className="alerta-icon" />
                  <div className="alerta-body">
                    <p className="alerta-titulo">
                      {inc.fecha} · {inc.hora}
                    </p>
                    <p className="alerta-detalle">{inc.descripcion}</p>
                    <p className="alerta-detalle" style={{ marginTop: '6px', fontWeight: 600 }}>
                      📍 {inc.ubicacion}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* PROGRESO FULL WIDTH */}
      <div className="dash-full">
        <div className="card">
          <h2 className="card-title">Progreso por ruta</h2>
          {rutas.map(r => (
            <div key={r.id} className="ruta-bar">
              <div className="ruta-bar-top">
                <span className="rlbl">
                  Ruta {r.id === '01' ? 'A' : r.id === '02' ? 'B' : 'C'} · {r.nombre}
                </span>
                <span className="rpct">{r.progreso}%</span>
              </div>
              <div className="rtrack">
                <div className="rfill" style={{ width: `${r.progreso}%`, background: barColor[r.estado] }} />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>
);
}