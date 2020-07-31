export interface DetalleCarrito {
  idDetalleCarrito?: number;
  idOrden: number;
  idProducto: number;
  subTotal: number;
  cantProducto: number;
  TNote?: string;
}
