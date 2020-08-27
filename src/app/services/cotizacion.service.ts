import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Cotizacion } from "../model/cotizacion";
@Injectable({
  providedIn: 'root'
})
export class CotizacionService {

  API_URI = "https://marvetos-web.herokuapp.com/api";

  constructor(private http: HttpClient) { }

  getCotizacion(id: string) {
    return this.http.get(`${this.API_URI}/cotizacion/${id}`);
  }
}
