import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class EmailConfirmationService {
  // API_URI = "https://marvetos-web.herokuapp.com/api/email http://localhost:5000/api/email";

  API_URI = "https://marvetos-web.herokuapp.com/api/email";

  constructor(private http: HttpClient) {}

  sendEmailConfirmation(data: any) {
    console.log(data);
    return this.http.post(`${this.API_URI}/`, data);
  }

  sendticket(data: any) {
    console.log(data);
    return this.http.post(`${this.API_URI}/ticket`, data);
  }

  uploadExcel(id: any, formData: any) {
    return this.http.post(`${this.API_URI}/excel/upload/${id}`, formData);
  }
}
