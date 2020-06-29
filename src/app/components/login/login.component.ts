import { Component, OnInit } from "@angular/core";
import { LoginService } from "../../services/login.service";
import { User } from "../../model/user";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  //Model user to send - Register
  userM: User = {
    idUser: 0,
    email: "",
    pass: "",
    RUC: "",
    DNI: "",
    Apellidos: "",
    Nombres: "",
    idRol: 0,
    NombreEmpresa: "",
    telefono: 1234567,
  };

  constructor(
    private loginService: LoginService,
    private router: Router,
    private activtedRoute: ActivatedRoute
  ) {}

  ngOnInit() {}

  //Recargar componente
  refresh(): void {
    window.location.reload();
  }

  login() {
    this.loginService.login(this.userM).subscribe((data) => {
      console.log("RESPUESTA");
      if (data["code"] == 0) {
        console.log("No registrado");
      } else {
        console.log(data);
        this.loginService.setToken(data["token"]);
        this.router.navigateByUrl("/");
        this.refresh();
      }
    });
  }
}
