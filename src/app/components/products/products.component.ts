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
  filterPost = '';
  products: any = [];
  categoria: any = [];

  carrito: any = [];

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

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


  //buscador de productos
/*   buscarProduc(name){
   
    if (name) {
      this.productsService.getBuscarProduc(name).subscribe(
        (res) => {
          
          this.products = res;
        },
        
        (err) => console.error(err)
        
      );
    }
  } */

  producASC(){
    this.productsService.getASC().subscribe(
      (res) => {
        this.categoria = res;
      },
      (err) => console.error(err)
    );
  }

}
