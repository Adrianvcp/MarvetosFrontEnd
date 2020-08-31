import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Products } from "../model/products";
import { Orden } from "../model/orden";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class OrdersService {
   API_URI = "http://localhost:5000/api";
  //API_URI = "https://marvetos-web.herokuapp.com/api";

  constructor(private http: HttpClient) {}

  getOrdersxSeller(id: string | number) {
    return this.http.get(`${this.API_URI}/orden/vendedor/${id}`);
  }

  getOrdersxUser(id: string | number) {
    return this.http.get(`${this.API_URI}/orden/usuario/${id}`);
  }

  getOrdersxAdmin() {
    return this.http.get(`${this.API_URI}/orden/`);
  }

  putOrdenStatus(id: string | number, updatedOrden: Orden) {
    return this.http.put(`${this.API_URI}/orden/${id}`, updatedOrden);
  }

  getConductor() {
    return this.http.get(`${this.API_URI}/conductor`);
  }
}
