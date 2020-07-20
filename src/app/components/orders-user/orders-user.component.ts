import { Component, OnInit } from '@angular/core';
import { OrdersService } from "../../services/orders.service";
import { AllService } from "../../services/all.service";
import { LoginService } from "../../services/login.service";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
// import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-orders-user',
  templateUrl: './orders-user.component.html',
  styleUrls: ['./orders-user.component.css']
})
export class OrdersUserComponent implements OnInit {
  ordenes: any = [];
  details: any = [];
  idUser = 0;
  tracking: any = [];
  detalles: any = {
    idOrden: 0,
    fechaOrden: "",
    idEstado: 0,
    Estado: "",
    nombresVendedor: "",
    apellidosVendedor: "",
  };
  paginaActual: 1;
  constructor(
    private ordersService: OrdersService,
    private loginService: LoginService,
    private allService: AllService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { this.idUser = parseInt(JSON.stringify(this.loginService.givemeData(this.loginService.getToken()).id));
     }

  ngOnInit() {
    this.getOrderxUser();
  }

  getOrderxUser() {
    
     let id = this.idUser;
    // console.log(id);
    if (id) {
      this.ordersService.getOrdersxUser(id).subscribe(
        (res) => {
          
          this.ordenes = res;
          
        },
        (err) => console.error(err)
      );
    }
  }

  getOneBuy(id) {
    
    this.allService.getOneBuy(id).subscribe(
      (res) => {
        this.details = res;

        this.getOrderxUser();
      },
      (err) => console.error(err)
    );
  }

  getOneOrder(data){
    this.detalles.idOrden = JSON.stringify(data.idOrden);
    this.detalles.fechaOrden = data.fechaOrden;
    this.detalles.idEstado = parseInt(JSON.stringify(data.idEstado));
    this.detalles.Estado = JSON.stringify(data.Estado);
    this.detalles.nombresVendedor = data.nombresVendedor;
    this.detalles.apellidosVendedor = data.apellidosVendedor;
   
  }
}
