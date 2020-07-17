import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Products } from "../model/products";

@Injectable({
  providedIn: "root",
})
export class AllService {
  // API_URI = "http://localhost:5000/api";
  API_URI = "https://marvetos-web.herokuapp.com/api";
  constructor(private http: HttpClient) {}

  getOneBuy(id: string) {
    return this.http.get(`${this.API_URI}/todo/${id}`);
  }

  getVendedores() {
    return this.http.get(`${this.API_URI}/user/sellers/`);
  }
}
