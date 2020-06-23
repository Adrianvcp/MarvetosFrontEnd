import { Component, OnInit } from "@angular/core";
import { RegistroService } from "../../services//registro.service";
import { User } from "../../model/user";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.css"],
})
export class RegistroComponent implements OnInit {
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

  //Listar Usuarios
  user: any = [];
  constructor(
    private registroService: RegistroService,
    private router: Router,
    private activtedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.registroService.getUsers().subscribe(
      (res) => {
        console.log(res);
        this.user = res;
      },
      (err) => console.log(err)
    );
  }

  saveNewUserPersona() {
    delete this.userM.idUser;
    this.userM.idRol = 2;
    this.registroService.saveUser(this.userM).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(["/registro"]);
      },
      (err) => {
        console.log(err);
      }
    );
    return this.registroService;
  }

  saveNewUserEmpresa() {
    delete this.userM.idUser;
    this.userM.idRol = 1;
    this.registroService.saveUser(this.userM).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(["/registro"]);
      },
      (err) => {
        console.log(err);
      }
    );
    return this.registroService;
  }
}
