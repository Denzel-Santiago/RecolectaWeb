export interface RellenoSanitario {
  id: number;
  nombre: string;
  direccion: string;
  municipio: string;
  capacidadToneladas: number;
  estado: "Activo" | "Inactivo";
  fechaRegistro: string;
}