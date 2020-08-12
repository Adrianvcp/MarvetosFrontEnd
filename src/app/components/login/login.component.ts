import { Component, OnInit } from "@angular/core";
import { LoginService } from "../../services/login.service";
import { User } from "../../model/user";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";

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
    telefono: "",
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
    this.router.navigateByUrl("/index");
  }

  login() {
    var lg = false;
    this.loginService.login(this.userM).subscribe((data) => {
      console.log("RESPUESTA");
      console.log(data);
      if (data["code"] == 0) {
        Swal.fire({
          title: "Datos Incorrectos",
          text: "Email y/o contraseña incorrecta, lo sentimos!",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar!",
        }).then((result) => {
          if (result.value) {
          }
        });
      } else if (data["code"] == 1) {
        Swal.fire({
          icon: "success",
          title: "Inicio Satisfactorio",
          showConfirmButton: false,
          timer: 2000,
        }).then((result) => {
          this.refresh();
        });

        lg = true;
        console.log(data);
        this.loginService.setToken(data["token"]);

        this.router.navigateByUrl("/index");
      }
    });
  }
}
