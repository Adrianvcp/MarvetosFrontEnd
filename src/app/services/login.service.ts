import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../model/user";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  // API_URI = "http://localhost:5000/api/user";
  API_URI = "https://marvetos-web.herokuapp.com/api/user";


  constructor(private http: HttpClient, private cookies: CookieService) {}
  login(user: User) {
    console.log(user);
    return this.http.post(`${this.API_URI}/login`, user);
  }

  setToken(token: string) {
    this.cookies.set("token", token);
  }
  getToken() {
    var token = "";
    try {
      token = this.cookies.get("token");
      return token;
    } catch (error) {
      return "";
    }
  }

  givemeData(tk: any) {
    if (tk != "") {
      var jwtData = tk.split(".")[1];
      var dataUser = JSON.parse(window.atob(jwtData)); //Objeto JSon
      return dataUser;
    }
  }
}
