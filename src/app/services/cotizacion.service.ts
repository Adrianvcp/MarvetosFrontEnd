import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Orden } from "../model/orden";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CotizacionService {
  API_URI = "http://localhost:5000/api";
  //API_URI = "https://marvetos-web.herokuapp.com/api";

  constructor(private http: HttpClient) {}

  sendCotizacion(dataLoginToken: any, formData: FormData) {
    return this.http.post(
      `${this.API_URI}/email/excel/upload/${dataLoginToken.email}`,
      formData
    );
  }

  saveCotizacion(data: any) {
    return this.http.post(`${this.API_URI}/cotizacion`, data);
  }

  getCotizacion(id: string) {
    return this.http.get(`${this.API_URI}/cotizacion/${id}`);
  }
}
