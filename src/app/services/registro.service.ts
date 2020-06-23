import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../model/user";

@Injectable({
  providedIn: "root",
})
export class RegistroService {
  API_URI = "http://localhost:5000/api";

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(`${this.API_URI}/user`);
  }

  saveUser(user: User) {
    console.log(user);
    return this.http.post(`${this.API_URI}/user`, user);
  }
}
