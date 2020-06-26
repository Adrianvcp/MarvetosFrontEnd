import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Products } from "../model/products";
import { Categoria } from "../model/categoria";

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
  getOneProduct(id: string) {
    return this.http.get(`${this.API_URI}/producto/${id}`);
  }

  //seleccionar categoria
  getSelecCate(id: string){
    return this.http.get(`${this.API_URI}/producto/${id}`);
  }




  localsito() {
    console.log("loclasito");
  }
}
