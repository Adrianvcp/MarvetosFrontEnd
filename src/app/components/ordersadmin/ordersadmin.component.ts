import { Component, OnInit } from "@angular/core";
import { OrdersService } from "../../services/orders.service";
import { AllService } from "../../services/all.service";
import { LoginService } from "../../services/login.service";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
@Component({
  selector: "app-ordersadmin",
  templateUrl: "./ordersadmin.component.html",
  styleUrls: ["./ordersadmin.component.css"],
})
export class OrdersadminComponent implements OnInit {
  detalles: any = [];
 
  ordenes: any = [];
  estado: any = "Pendiente";
  paginaActual = 1;
  constructor(
    private ordersService: OrdersService,
    private loginService: LoginService,
    private allService: AllService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getOrdersxAdmin();
  }

  getOrdersxAdmin() {
    this.ordersService.getOrdersxAdmin().subscribe(
      (res) => {
        console.log(res);
        this.ordenes = res;
      },
      (err) => console.error(err)
    );
  }

  getOneBuy(id) {
    this.allService.getOneBuy(id).subscribe(
      (res) => {
        this.detalles = res;
        this.getOrdersxAdmin();
      },
      (err) => console.error(err)
    );
  }
}
