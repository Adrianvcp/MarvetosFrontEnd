import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Products } from "../model/products";
import { Categoria } from "../model/categoria";
import { Orden } from "../model/orden";
import { Marca } from "../model/marca";
import { DetalleCarrito } from "../model/detallecarrito";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
   API_URI = "http://localhost:5000/api";
  //API_URI = "https://marvetos-web.herokuapp.com/api";

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(`${this.API_URI}/producto`);
  }
  //actualizar
  putProducts(id: string | number, product: any) {
    return this.http.put(`${this.API_URI}/producto/${id}`, product);
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
  getSelecCat(ids: string | number) {
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
    return this.http.get(`${this.API_URI}/orden/gID/giveme`);
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

  getMarca(id: number | string) {
    return this.http.get(`${this.API_URI}/marca/filtro/${id}`);
  }

  getMarcaxSubcat(cat: number | string, sub: number | string) {
    return this.http.get(
      `${this.API_URI}/marca/buscar/producto/categoria/subcategoria/filtro/${cat}/${sub}`
    );
  }

  getProductsxMarca(marca: string | number, id: number | string) {
    return this.http.get(`${this.API_URI}/marca/filtro/marca/${marca}/${id}`);
  }

  //Buscador sin seleccion
  getProductsxBuscador(nombre: string) {
    return this.http.get(
      `${this.API_URI}/marca/buscar/producto/categoria/${nombre}`
    );
  }

  //Buscador por categoria
  getProductsxBuscadorCategoria(nombre: string, id: number) {
    return this.http.get(
      `${this.API_URI}/marca/buscar/producto/categoria/prod/${nombre}/${id}`
    );
  }

  //Buscador por categoria y subcategoria
  getProductsxBuscadorCateSub(
    nombre: string,
    idcat: number,
    idsub: string | number
  ) {
    return this.http.get(
      `${this.API_URI}/marca/buscar/producto/categoria/prod/sub/${nombre}/${idcat}/${idsub}`
    );
  }

  getSubCatexCate(id: string | number) {
    return this.http.get(`${this.API_URI}/producto/produc/form/ASC/sub/${id}`);
  }

  //Productos seleccionando categoria y subcategoria
  getProductxCateSub(idcat: string | number, idsub: string | number) {
    return this.http.get(
      `${this.API_URI}/producto/produc/form/ASC/cat/sub/${idcat}/${idsub}`
    );
  }

  getUnidad() {
    return this.http.get(`${this.API_URI}/unidad`);
  }

  getSubCat() {
    return this.http.get(`${this.API_URI}/subCategoria`);
  }

  getMarcaPro() {
    return this.http.get(`${this.API_URI}/marca`);
  }

  saveProducto(products: Products) {
    console.log(products);
    return this.http.post(`${this.API_URI}/producto`, products);
  }
}
