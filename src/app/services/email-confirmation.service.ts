import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class EmailConfirmationService {
  API_URI = "http://localhost:5000/api";

  constructor(private http: HttpClient) {}

  sentEmailConfirmation(data: any) {
    console.log(data);
    return this.http.post(`${this.API_URI}/email`, data);
  }
}
