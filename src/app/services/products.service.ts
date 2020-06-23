import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Products} from '../model/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  API_URI = 'http://localhost:5000/api';
  constructor(private http: HttpClient) {
  }

  getProducts(){
    return this.http.get(`${this.API_URI}/producto`);
  }

}
