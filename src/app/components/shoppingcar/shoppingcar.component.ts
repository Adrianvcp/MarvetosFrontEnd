import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../../services/products.service";
import { Products } from "../../model/products";
import { Categoria } from "../../model/categoria";

@Component({
  selector: "app-shoppingcar",
  templateUrl: "./shoppingcar.component.html",
  styleUrls: ["./shoppingcar.component.css"],
})
export class ShoppingcarComponent implements OnInit {
  carrito: any = [];
  cantProducto: any = [];

  constructor() {
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
  }

  ngOnInit() {}
}
