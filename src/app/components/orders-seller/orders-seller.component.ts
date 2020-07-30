import { Component, OnInit } from "@angular/core";
import { OrdersService } from "../../services/orders.service";
import { AllService } from "../../services/all.service";
import { LoginService } from "../../services/login.service";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-orders-seller",
  templateUrl: "./orders-seller.component.html",
  styleUrls: ["./orders-seller.component.css"],
})
export class OrdersSellerComponent implements OnInit {
  idNull = null;
  paginaActual = 1;
  IsmodelShow = false;
  idVendedor = 0;
  idcond = 0;
  ordencond = 0;
  conductores: any = [];
  ordenes: any = [];
  estado: any = "Pendiente";
  detalles: any = [];
  tituloModal = "";
  objorden = {
    idOrden: 0,
    idEstado: 0,
    idConductor: 0,
    idVendedor: 0,
    idUser: 0,
    fechaOrden: "",
    fechaEntrega: "",
    Comentario: "",
    Direccion: "",
    PrecioTotal: 0,
    idPago: 0,
    idUbicacion: 0,
    bDescuento: 0,
  };

  constructor(
    private ordersService: OrdersService,
    private loginService: LoginService,
    private allService: AllService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
     this.idVendedor = parseInt(JSON.stringify(this.loginService.givemeData(this.loginService.getToken()).id));
    //  console.log(parseInt(JSON.stringify(this.loginService.givemeData(this.loginService.getToken()).id))); 
  }

  ngOnInit() {
    this.getOrderxSeller();
  }

  getOrderxSeller() {
    let id = this.idVendedor;
    // console.log(id);
    if (id) {
      this.ordersService.getOrdersxSeller(id).subscribe(
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
        this.detalles = res;
        this.getOrderxSeller();
      },
      (err) => console.error(err)
    );
  }

  putOrdenStatus(id) {
    delete this.objorden.idOrden;
    delete this.objorden.idConductor;
    delete this.objorden.idVendedor;
    delete this.objorden.idUser;
    delete this.objorden.fechaOrden;
    delete this.objorden.fechaEntrega;
    delete this.objorden.Comentario;
    delete this.objorden.Direccion;
    delete this.objorden.PrecioTotal;
    delete this.objorden.idPago;
    delete this.objorden.idUbicacion;
    delete this.objorden.bDescuento;
    this.objorden.idEstado = 2;

    Swal.fire({
      title: "¿Desea confirmar el pedido?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",

      confirmButtonText: "Confirmar",
    }).then((result) => {
      if (result.value) {
        this.ordersService.putOrdenStatus(id, this.objorden).subscribe(
          (res) => {
            console.log(res);
            this.getOrderxSeller();
          },
          (err) => console.error(err)
        );

        Swal.fire(
          "Pedido Confirmado",
          "El pedido ha sido confirmado",
          "success"
        );
      }
    });
  }

  putConductorinOrden(id, cond) {
    delete this.objorden.idOrden;
    delete this.objorden.idEstado;
    delete this.objorden.idVendedor;
    delete this.objorden.idUser;
    delete this.objorden.fechaOrden;
    delete this.objorden.fechaEntrega;
    delete this.objorden.Comentario;
    delete this.objorden.Direccion;
    delete this.objorden.PrecioTotal;
    delete this.objorden.idPago;
    delete this.objorden.idUbicacion;
    delete this.objorden.bDescuento;
    this.objorden.idConductor = cond;
    Swal.fire({
      title: "¿Desea confirmar el pedido?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",

      confirmButtonText: "Confirmar",
    }).then((result) => {
      if (result.value) {
        this.ordersService.putOrdenStatus(id, this.objorden).subscribe(
          (res) => {
            
            this.getOrderxSeller();
            // this.close();
          },
          (err) => console.error(err)
        );

        Swal.fire(
          "Conductor Asignado",
          "La asignación ha sido confirmada",
          "success"
        );
        this.getOrderxSeller();
      }
    });
   
  }

  getConductor() {
    this.ordersService.getConductor().subscribe(
      (res) => {
        this.conductores = res;
      },
      (err) => console.error(err)
    );
  }

//   cerrar() {
//       $('#modal').modal(toggle)
// };
  
 
}
