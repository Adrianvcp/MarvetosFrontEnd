import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../../services/products.service";
import { Products } from "../../model/products";
import { Categoria } from "../../model/categoria";
import { Router, ActivatedRoute } from "@angular/router";

import { Orden } from "../../model/orden";

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

  AgregarOrden(ordenO: Orden) {
    console.log(ordenO);
  }
}
