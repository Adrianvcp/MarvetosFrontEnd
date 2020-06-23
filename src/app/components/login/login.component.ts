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

  login() {
    this.loginService.login(this.userM).subscribe((data) => console.log(data));
    console.log(this.userM);
  }
}
