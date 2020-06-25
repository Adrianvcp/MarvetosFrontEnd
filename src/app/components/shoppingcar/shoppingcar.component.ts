import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../../services/products.service";
import { Products } from "../../model/products";
import { Categoria } from "../../model/categoria";
import { Router, ActivatedRoute } from "@angular/router";
import { DetalleCarrito } from "../../model/detallecarrito";

import { Orden } from "../../model/orden";
import { ThrowStmt } from "@angular/compiler";

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
  Objdetallecarrito = {
    idDetalleCarrito: 0,
    idProducto: 0,

    SubTotal: 0,
    cantProducto: 0,
    idOrden: 0,
  };
  obj_or = {
    idOrden: 0,
    idEstado: 0,
    idConductor: 0,
    idVendedor: 0,
    idUser: 0,
    fechaOrden: "",
    idPago: 1,
    idUbicacion: 1,
    fechaEntrega: "",
    Comentario: "",
    Direccion: "",
    PrecioTotal: 1,
  };

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private activtedRoute: ActivatedRoute
  ) {
    this.carrito = JSON.parse(localStorage.getItem("carrito"));

    var getObject = (id) => {
      for (let i = 0; i < this.carrito.length; i++) {
        if (id === this.carrito[i].idProducto) {
          return this.carrito[i];
        }
      }
    };

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

    //getSubtotal
    for (let i = 0; i < this.cantProducto.length; i++) {
      this.suma =
        this.suma +
        this.cantProducto[i].producto.precio * this.cantProducto[i].count;
    }
  }

  ngOnInit() {}

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate(["/carrito"]);
  }

  limpiarCarrito() {
    localStorage.removeItem("carrito");
    this.reloadComponent();
  }

  eliminarProducto(id: number) {
    var carritoTemp = [];
    var result = [];
    carritoTemp = JSON.parse(localStorage.getItem("carrito"));
    console.log(carritoTemp);
    //quitar id producto
    for (let i = 0; i < carritoTemp.length; i++) {
      if (carritoTemp[i].idProducto != id) {
        result.push(carritoTemp[i]);
      } else {
        continue;
      }
    }

    console.log(result);

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

    console.log(carritoTemp);

    //elimino el localst
    localStorage.removeItem("carrito");
    localStorage.setItem("carrito", JSON.stringify(carritoTemp));

    this.reloadComponent();
  }

  AumentarCant(id: number) {
    var carritoTemp = [];
    var Obj = {};

    carritoTemp = JSON.parse(localStorage.getItem("carrito"));
    console.log(carritoTemp);
    //quitar id producto
    for (let i = 0; i < carritoTemp.length; i++) {
      if (carritoTemp[i].idProducto == id) {
        Obj = carritoTemp[i];
        break;
      }
    }
    carritoTemp.push(Obj);
    console.log(carritoTemp);

    //elimino el localst
    localStorage.removeItem("carrito");
    localStorage.setItem("carrito", JSON.stringify(carritoTemp));

    this.reloadComponent();
  }

  AgregarOrden() {
    //Deberia ser asincrona
    this.obj_or.idOrden = 8;
    this.obj_or.idEstado = 1;
    this.obj_or.idConductor = 1;
    this.obj_or.idVendedor = 1;
    this.obj_or.idUser = 1;
    this.obj_or.fechaOrden = "";
    this.obj_or.fechaEntrega = "";

    this.obj_or.idPago = 1;
    this.obj_or.idUbicacion = 1;

    this.obj_or.Comentario = "fsdfsdf";
    this.obj_or.Direccion = "dfsdfsdf";
    this.obj_or.PrecioTotal = (this.suma + this.suma * 0.17).toFixed(2);

    delete this.obj_or.idOrden;
    delete this.obj_or.fechaEntrega;
    delete this.obj_or.fechaOrden;

    console.log(this.obj_or);

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
        var idUltimo = res[0]["max(idOrden)"];

        console.log(idUltimo);

        //bucle - producto
        var datosCarrito = JSON.parse(localStorage.getItem("carrito"));
        for (let i = 0; i < datosCarrito.length; i++) {
          this.Objdetallecarrito.idDetalleCarrito = 1;
          this.Objdetallecarrito.idProducto = datosCarrito[i].idProducto;

          this.Objdetallecarrito.idOrden = idUltimo + 1;
          this.Objdetallecarrito.SubTotal = datosCarrito[i].precio * 5;
          this.Objdetallecarrito.cantProducto = 5;
          delete this.Objdetallecarrito.idDetalleCarrito;

          console.log(this.Objdetallecarrito);
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
