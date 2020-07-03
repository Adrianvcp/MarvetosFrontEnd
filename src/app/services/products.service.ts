import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Products } from "../model/products";
import { Categoria } from "../model/categoria";
import { Orden } from "../model/orden";
import { DetalleCarrito } from "../model/detallecarrito";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  API_URI = "http://localhost:5000/api";
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(`${this.API_URI}/producto`);
  }

  getCategoria() {
    return this.http.get(`${this.API_URI}/categoria`);
  }

  getThreeProducts() {
    return this.http.get(`${this.API_URI}/producto/lista`);
  }

  //-------------------
  getASC() {
    return this.http.get(`${this.API_URI}/producto/produc/form/ASC`);
  }
  //-------------------
  getOneProduct(id: string) {
    return this.http.get(`${this.API_URI}/producto/detalle/${id}`);
  }

  //mostrar la lista de los productos con su categoria seleccionada
  getSelecCat(ids: string) {
    return this.http.get(`${this.API_URI}/producto/${ids}`);
  }

  //Busqueda de producto
  getasc(name: string) {
    return this.http.get(`${this.API_URI}/producto/produc`);
  }

  //------------------------------------------------------
  getFormaPago() {
    return this.http.get(`${this.API_URI}/formaPago`);
  }

  postOrden(orden: Orden) {
    console.log("entro");
    return this.http.post(`${this.API_URI}/orden`, orden);
  }

  getUltimoID() {
    return this.http.get(`${this.API_URI}/orden/gid`);
  }

  postDetalleCarrito(detalleCarrito: DetalleCarrito) {
    console.log("llegando ---");
    console.log(detalleCarrito);
    return this.http.post(`${this.API_URI}/detalleCarrito`, detalleCarrito);
  }

  localsito() {
    console.log("loclasito");
  }

  getDistritos() {
    return this.http.get(`${this.API_URI}/ubicacion`);
  }

  getDescuentos() {
    return this.http.get(`${this.API_URI}/detallecarrito/descuento`);
  }
}
