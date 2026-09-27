export const ROLES = ["ADMIN", "AGENTE"] as const;
export type Role = (typeof ROLES)[number];

export const PROPERTY_TYPES = [
  "CASA",
  "DEPARTAMENTO",
  "PH",
  "TERRENO",
  "LOCAL",
  "OFICINA",
] as const;
export type PropertyType = (typeof PROPERTY_TYPES)[number];

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  CASA: "Casa",
  DEPARTAMENTO: "Departamento",
  PH: "PH",
  TERRENO: "Terreno",
  LOCAL: "Local comercial",
  OFICINA: "Oficina",
};

export const OPERATION_TYPES = ["VENTA", "ALQUILER"] as const;
export type OperationType = (typeof OPERATION_TYPES)[number];

export const OPERATION_TYPE_LABELS: Record<OperationType, string> = {
  VENTA: "Venta",
  ALQUILER: "Alquiler",
};

export const PROPERTY_STATUSES = [
  "DISPONIBLE",
  "RESERVADA",
  "VENDIDA",
  "ALQUILADA",
] as const;
export type PropertyStatus = (typeof PROPERTY_STATUSES)[number];

export const PROPERTY_STATUS_LABELS: Record<PropertyStatus, string> = {
  DISPONIBLE: "Disponible",
  RESERVADA: "Reservada",
  VENDIDA: "Vendida",
  ALQUILADA: "Alquilada",
};
