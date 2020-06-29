import { Component, OnInit } from "@angular/core";
import { LoginService } from "../../services/login.service";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  public login: boolean = false;
  nombre: string = "Hola";

  constructor(private loginService: LoginService) {
    var tk = loginService.getToken();
    if (tk != "") {
      var jwtData = tk.split(".")[1];
      var dataUser = JSON.parse(window.atob(jwtData)); //Objeto JSon
      this.login = true;
      this.nombre = dataUser["nombre"] + " " + dataUser["apellido"];
      console.log();
    }
  }

  ngOnInit() {}
}
