import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Orden } from "../model/orden";
import { Observable } from 'rxjs';
/* import { chownSync } from 'fs';
 */
@Injectable({
  providedIn: 'root'
})
export class DetalleCService {
  API_URI = "http://localhost:5000/api";

  constructor(private http: HttpClient) { }

  getDetalle(id: string) {
    return this.http.get(`${this.API_URI}/orden/${id}`);
  }

  //busqueda de detallecarrito de los producto
  getBuscarDetalle(id: string) {
    return this.http.get(`${this.API_URI}/detalleCarrito/busqueda/${id}`);
  }

  
 //guardar dato
 saveEstado(orden: Orden) {
  console.log(orden);
  return this.http.post(`${this.API_URI}/orden`, orden);
}

//actualizarDato
   updateEstado(id:string, updateEstado: any): Observable<any>{
     console.log(id);
     console.log(updateEstado);
    return this.http.put(`${this.API_URI}/orden/${id}`, updateEstado);
  } 
  
  getId(dato:string){
   console.log(dato);
    return this.http.get(`${this.API_URI}/orden/estado`);


  }

  getBusc(id: string) {
    return this.http.get(`${this.API_URI}/orden/${id}`);
  }
 
}
