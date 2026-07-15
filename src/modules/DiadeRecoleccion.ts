export interface DiaRecoleccionConfig {
  id: number;
  ruta: string;
  colonia: string;
  dias: string[]; 
  turno: "Matutino" | "Vespertino";
  estado: "Activo" | "Inactivo";
  fechaRegistro: string;
}