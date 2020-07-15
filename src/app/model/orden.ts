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
  PrecioTotal: number;
  idPago: number;
  idUbicacion: number;
  bDescuento: number;
  comentarioConductor?: string;
  Tproblema?: string;
  //modi
}
