export interface Orden {
  idOrden: number;
  idEstado: number;
  idConductor?: number;
  idVendedor?: number;
  idUser: number;
  fechaOrden: string;
  fechaEntrega: string;
  Comentario: string;
  Direccion: string;
  idPago: number;
  idUbicacion: number;
  PrecioTotal: number;
}
