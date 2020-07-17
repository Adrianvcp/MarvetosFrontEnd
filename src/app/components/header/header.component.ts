import { Component, OnInit } from "@angular/core";
import { LoginService } from "../../services/login.service";

import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  public login: boolean = false;
  idRol: number = 0;
  nombre: string = "Hola";

  constructor(
    private loginService: LoginService,
    private router: Router,
    private cookies: CookieService
  ) {
    this.data();
  }

  ngOnInit() {
    this.data();
  }

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
        window.scrollTo(0, 0);
      }
    });
    this.router.onSameUrlNavigation = "reload";
    this.router.navigateByUrl("/ingresar");
  }

  cerrarSesion() {
    this.cookies.delete("token");
    window.location.reload();
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
    } else {
      this.nombre = "";
      this.login = false;
    }
  }
}
