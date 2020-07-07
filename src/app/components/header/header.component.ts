import { Component, OnInit } from "@angular/core";
import { LoginService } from "../../services/login.service";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  public login: boolean = false;
  idRol: number = 0;
  nombre: string = "Hola";

  constructor(private loginService: LoginService) {
    this.data();
  }

  ngOnInit() {
    this.data();
  }

  data() {
    var tk = this.loginService.getToken();
    if (tk != "") {
      var dataUser = this.loginService.givemeData(tk);
      this.login = true;
      this.nombre = dataUser["nombre"] + " " + dataUser["apellido"];
      this.idRol = dataUser["idRol"];
      console.log("listo");
      console.log(this.idRol);
    }
  }
}
