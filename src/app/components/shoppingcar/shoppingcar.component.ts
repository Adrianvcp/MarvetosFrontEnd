import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../../services/products.service";
import { Products } from "../../model/products";
import { Categoria } from "../../model/categoria";
import { Router, ActivatedRoute } from "@angular/router";
import { DetalleCarrito } from "../../model/detallecarrito";
import { Distrito } from "../../model/distrito";

import { Orden } from "../../model/orden";
import { ThrowStmt } from "@angular/compiler";
import { HeaderComponent } from "../header/header.component";
//Alerta
import Swal from "sweetalert2";

@Component({
  selector: "app-shoppingcar",
  templateUrl: "./shoppingcar.component.html",
  styleUrls: ["./shoppingcar.component.css"],
})
export class ShoppingcarComponent implements OnInit {
  carrito: any = [];

  cantProducto: any = [];

  suma: any = 0;

  distritos: any = ["San Miguel", "Comas", "Callao", "Chorillos"];

  //Distritos
  getDistrito: any = [];
  Distritos: any = [];
  //Comentario y Direccion
  direccion = "";
  comentario = "";

  //FormaPago
  pago: any = [];
  idPago = 0;

  nameDistrito = "";
  resultadoTotal: number = 0;

  //Show CostDelivery
  CostDelivery: boolean = false;
  descuentoShow: boolean = false;
  Descuento = "25%";
  DeliveryPrecio: number = 0;
  DescuentoTotal: number = 0;

  //Objetos DetalleCarrito y Orden
  Objdetallecarrito = {
    idDetalleCarrito: 0,
    idOrden: 0,
    idProducto: 0,
    subTotal: 0,
    cantProducto: 0,
  };

  obj_or = {
    idOrden: 0,
    idEstado: 0,
    idConductor: 0,
    idVendedor: 0,
    idUser: 0,
    fechaOrden: "",
    fechaEntrega: "",
    Comentario: "",
    Direccion: "",
    PrecioTotal: 1,
    idPago: 1,
    idUbicacion: 1,
    bDescuento: 0,
  };

  getCantxProducto() {
    /*  OBJETOS DE LOS PRODUCTOS AGREGADOS EN EL LOCALSTORAGE CON SU CANTIDAD  */
    this.carrito = JSON.parse(localStorage.getItem("carrito"));

    var getObject = (id) => {
      for (let i = 0; i < this.carrito.length; i++) {
        if (id === this.carrito[i].idProducto) {
          return this.carrito[i];
        }
      }
    };
    //Fin del constructor

    /* Arreglo carrito con contador */
    const group = (arr) => {
      const reduced = arr.reduce((acc, curr) => {
        const text = curr.idProducto;
        acc[text] = acc[text] || 0;
        acc[text]++;
        return acc;
      }, {});

      return Object.getOwnPropertyNames(reduced).map((prop) => ({
        producto: getObject(parseInt(prop)),
        count: reduced[prop],
      }));
    };

    var grouped = group(this.carrito);
    console.log(JSON.stringify(grouped, null, 4));
    (this.cantProducto = grouped), null, 4;
  }

  //metodo auxiliar para obtener cantidad del objeto
  aux_getCantObj_Pro(Obj: Products) {
    for (let i = 0; i < this.cantProducto.length; i++) {
      if (this.cantProducto[i]["producto"].idProducto == Obj.idProducto) {
        return this.cantProducto[i]["count"];
        break;
      }
    }
  }

  //Inicio del constructor
  constructor(
    private productsService: ProductsService,
    private router: Router,
    private activtedRoute: ActivatedRoute
  ) {
    this.getCantxProducto();

    //getSubtotal
    for (let i = 0; i < this.cantProducto.length; i++) {
      this.suma =
        this.suma +
        this.cantProducto[i].producto.precio * this.cantProducto[i].count;
    }

    //Foma de pago
    this.productsService.getFormaPago().subscribe(
      (res) => {
        this.pago = res;
      },
      (err) => {
        console.log(err);
      }
    );

    //Distritos
    this.productsService.getDistritos().subscribe(
      (res) => {
        this.Distritos = res;
      },
      (err) => {
        console.log(err);
      }
    );

    console.log(this.getDistrito);
  }

  ngOnInit() {}

  hayDescuento(p_list, dia, distrito) {
    for (let i = 0; i < p_list.length; i++) {
      if (p_list[i].name == dia) {
        if (p_list[i].Distrito == distrito) {
          return true;
          break;
        }
      }
    }
    return false;
  }

  onEditClickDistrito(skill: any) {
    this.CostDelivery = true;

    this.nameDistrito = skill;

    console.log(this.Distritos);
    //Costo delivery
    for (let i = 0; i < this.Distritos.length; i++) {
      if (this.Distritos[i].Distrito == skill) {
        this.DeliveryPrecio = this.Distritos[i].Precio;
        console.log(this.DeliveryPrecio);
      }
    }
    this.DescuentoTotal = this.DeliveryPrecio * 0.25;
    //Distritos
    this.productsService.getDescuentos().subscribe(
      (res) => {
        var diasSemana = [
          "Domingo",
          "Lunes",
          "Martes",
          "Miércoles",
          "Jueves",
          "Viernes",
          "Sábado",
        ];
        var f = new Date();
        var b_Discount = this.hayDescuento(
          res,
          diasSemana[f.getDay()],
          this.nameDistrito
        );
        console.log("Hay descuento?");
        console.log(b_Discount);
        b_Discount == true
          ? (this.descuentoShow = true)
          : (this.descuentoShow = false);

        b_Discount == true
          ? (this.resultadoTotal =
              this.DeliveryPrecio -
              this.DeliveryPrecio * 0.25 +
              (this.suma + this.suma * 0.17))
          : (this.resultadoTotal =
              this.suma + this.suma * 0.17 + this.DeliveryPrecio).toFixed(2);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  setDataPago(d) {
    console.log("ad");
    console.log(d);
  }

  onEditClick(skill: any) {
    console.log(this.idPago);
    console.log(skill[0]);
    console.log("skill name", skill);
    this.idPago = skill;
  }

  //Recargar componente
  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate(["/carrito"]);
  }

  //Limpiar carrito del local Storage
  limpiarCarrito() {
    localStorage.removeItem("carrito");
    this.reloadComponent();
  }

  //Eliminar carrito del local Storage
  eliminarProducto(id: number) {
    var carritoTemp = [];
    var result = [];
    carritoTemp = JSON.parse(localStorage.getItem("carrito"));
    //quitar id producto
    for (let i = 0; i < carritoTemp.length; i++) {
      if (carritoTemp[i].idProducto != id) {
        result.push(carritoTemp[i]);
      } else {
        continue;
      }
    }

    //elimino el localst
    localStorage.removeItem("carrito");
    localStorage.setItem("carrito", JSON.stringify(result));

    this.reloadComponent();
  }

  disminuirCant(id: number) {
    var carritoTemp = [];
    carritoTemp = JSON.parse(localStorage.getItem("carrito"));
    console.log(carritoTemp);
    //quitar id producto
    for (let i = 0; i < carritoTemp.length; i++) {
      if (carritoTemp[i].idProducto == id) {
        carritoTemp.splice(i, 1);
        break;
      }
    }

    //elimino el localst
    localStorage.removeItem("carrito");
    localStorage.setItem("carrito", JSON.stringify(carritoTemp));

    this.reloadComponent();
  }

  AumentarCant(id: number) {
    var carritoTemp = [];
    var Obj = {};

    carritoTemp = JSON.parse(localStorage.getItem("carrito"));
    //quitar id producto
    for (let i = 0; i < carritoTemp.length; i++) {
      if (carritoTemp[i].idProducto == id) {
        Obj = carritoTemp[i];
        break;
      }
    }
    carritoTemp.push(Obj);

    //elimino el localst
    localStorage.removeItem("carrito");
    localStorage.setItem("carrito", JSON.stringify(carritoTemp));

    this.reloadComponent();
  }

  //Determinar aleatorio vendedor

  //Funcion Agregar orden y productos
  AgregarOrden() {
    //Validaciones
    console.log(this.nameDistrito);
    console.log(this.idPago);
    console.log(this.direccion);
    console.log(this.comentario);

    if (this.nameDistrito == "" || this.idPago == 0) {
      // no pasas
      console.log("entro");
      Swal.fire({
        text: "Distrito y/o pago no seleccionado.",
        title: "Lo sentimos",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Lo entiendo",
      }).then((result) => {
        if (result.value) {
        }
      });
    } else if (this.comentario == "" || this.direccion == "") {
      console.log("entroN")
      Swal.fire({
        text: "Direccion y/o Comentario no seleccionado.",
        title: "Lo sentimos",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Lo entiendo",
      }).then((result) => {
        if (result.value) {
        }
      });
    } else if (this.resultadoTotal < 80.0) {
      console.log("MN")
      Swal.fire({
        
        text: "Minimo de precio S/. 80.00",
        title: "Lo sentimos",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Lo entiendo",
      }).then((result) => {
        if (result.value) {
        }
      });
    } else {
      //Deberia ser asincrona
      this.obj_or.idOrden = 1;
      this.obj_or.idEstado = 1;
      this.obj_or.idConductor = null;
      this.obj_or.idVendedor = 3; //RANDOM VENDEDOR
      this.obj_or.idUser = 1; // LOGIN
      this.obj_or.fechaOrden = "";
      this.obj_or.fechaEntrega = "";
      this.obj_or.Comentario = this.comentario;
      this.obj_or.Direccion = this.direccion;
      this.obj_or.PrecioTotal = this.resultadoTotal;
      this.obj_or.idPago = this.idPago;
      this.obj_or.idUbicacion = 1;
      this.obj_or.bDescuento = 0;

      delete this.obj_or.fechaEntrega;
      delete this.obj_or.fechaOrden;
      delete this.obj_or.idOrden;
      console.log("OBJETO");
      console.log(JSON.stringify(this.obj_or));
      //Orden
      this.productsService.postOrden(this.obj_or).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );

      //orden carrito

      //id
      
      this.productsService.getUltimoID().subscribe(
        (res) => {
          console.log("EntroXd")
          var idUltimo = res[0]["max(idOrden)"];

          console.log(idUltimo)
          //bucle - producto
          var datosCarrito = JSON.parse(localStorage.getItem("carrito"));
          for (let index = 0; index < this.cantProducto.length; index++) {
            this.Objdetallecarrito.idDetalleCarrito = 1;
            this.Objdetallecarrito.idOrden = idUltimo + 1;
            this.Objdetallecarrito.idProducto = this.cantProducto[index][
              "producto"
            ].idProducto;
            this.Objdetallecarrito.subTotal =
              this.cantProducto[index]["producto"].precio *
              this.cantProducto[index]["count"];
            this.Objdetallecarrito.cantProducto = this.cantProducto[index][
              "count"
            ];

            delete this.Objdetallecarrito.idDetalleCarrito;
            this.productsService
              .postDetalleCarrito(this.Objdetallecarrito)
              .subscribe(
                (res) => {
                  console.log(res);
                },
                (err) => {
                  console.log(err);
                }
              );
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}