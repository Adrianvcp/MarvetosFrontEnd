import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../../services/products.service";
import { Products } from "../../model/products";
import { Categoria } from "../../model/categoria";

//importar categoria datos
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {
  filterPost = "";
  products: any = [];
  categoria: any = [];
  paginaActual = 1;
  carrito: any = [];

  order = "0";
  reverse = false;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnChanges() {
    console.log("se cambio");
  }

  ngOnInit() {
    console.log("se ejecuta");
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

  onclickFilter(skill: any) {
    switch (this.order) {
      case "1":
        this.order = "name";
        this.reverse = false;
        break;
      case "2":
        this.order = "precio";
        this.reverse = true;
        break;
      case "3":
        this.order = "precio";
        this.reverse = false;
        break;
    }
  }

  localsito(pr: Products) {
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
    console.log(carrito.length);
  }

  getCantidad() {
    return this.carrito.length;
  }

  //selecionar categoria y producto1+
  selectCat(id) {
    //const params = this.activatedRoute.snapshot.params;
    //console.log(params)
    if (id) {
      this.productsService.getSelecCat(id).subscribe(
        (res) => {
          this.products = res;
        },
        (err) => console.error(err)
      );
    }
  }
}
