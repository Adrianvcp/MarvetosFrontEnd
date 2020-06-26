import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../../services/products.service";
import { Products } from "../../model/products";
import { Categoria } from "../../model/categoria";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {
  products: any = [];
  categoria: any = [];

  carrito: any = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.productsService.getCategoria().subscribe(
      (res) => {
        this.categoria = res;
      },
      (err) => console.error(err)
    );

    this.productsService.getProducts().subscribe(
      (res) => {
        this.products = res;
      },
      (err) => console.error(err)
    );
  }

  getProducts() {}

  localsito(pr: Products) {
    /*     this.carrito.push(pr);
    let carrito = [];
    if (localStorage.getItem("carrito") === null) {
      carrito = [];
      carrito.push(pr);
      localStorage.setItem("carrito", JSON.stringify(carrito));
    } else {
      carrito = JSON.parse(localStorage.getItem("carrito"));
      carrito.push(pr);
      localStorage.setItem("carrito", JSON.stringify(carrito));
    } */

    this.carrito.push(pr);
    let carrito = [];
    if (localStorage.getItem("carrito") === null) {
      carrito = [];
      carrito.push(pr);
      localStorage.setItem("carrito", JSON.stringify(carrito));
    } else {
      carrito = JSON.parse(localStorage.getItem("carrito"));
      carrito.push(pr);
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }
  }

  getCantidad() {
    return this.carrito.length;
  }

  
}
