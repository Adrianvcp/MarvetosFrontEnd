import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../model/user";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root",
})
export class RegistroService {
  API_URI = "http://localhost:5000/api";

  constructor(private http: HttpClient, private cookies: CookieService) {}

  getUsers() {
    return this.http.get(`${this.API_URI}/user`);
  }

  saveUser(user: User) {
    console.log(user);
    return this.http.post(`${this.API_URI}/user`, user);
  }

  setToken(token: string) {
    this.cookies.set("token", token);
  }
  getToken() {
    return this.cookies.get("token");
  }

  emailRepetido(obj: any) {
    console.log("data service");
    console.log(obj)
    return this.http.post(`${this.API_URI}/user/email`,obj);
  }
  
}
