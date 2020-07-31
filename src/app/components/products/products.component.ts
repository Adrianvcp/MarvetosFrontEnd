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
  prodElegido = 0;
  marcas: any = [];
  order = "0";
  reverse = false;
  count = 0;
  prueba = "";
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
        console.log(res);
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
    console.log(pr);
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
    
    if (id) {
      this.productsService.getSelecCat(id).subscribe(
        (res) => {
          
          this.products = res;
          console.log(res);
          
          this.prodElegido= this.products[0].idCategoria;
        },
        (err) => console.error(err)
      );
    }
  }

  filtroMarca(id){
    this.productsService.getMarca(id).subscribe(
      (res) => {
        this.marcas = res;
        console.log(res);
      },
      (err) => console.error(err)
    );
  }

  getProductsxMarca(marca){
    console.log(this.prodElegido);
    console.log(marca);  
    this.prueba = "";
    this.productsService.getProductsxMarca(marca,this.prodElegido).subscribe(
      (res) => {
        //  this.products = [];  
        this.products = res;
        console.log(res);
      },
      (err) => console.error(err)
    );
  }

  getBusqueda(event: any){
    
      this.prueba = event;
      if(event == "" && this.prodElegido == 0){
        console.log("entro");
        this.productsService.getProducts().subscribe(
        (res) => {
          this.products = res;
        },
        (err) => console.error(err)
        );
      } else if(event == "" && this.prodElegido != 0){
        this.productsService.getSelecCat(this.prodElegido).subscribe(
          (res) => {
            this.products = res;
          },
          (err) => console.error(err)
        );
      } else if (event != "" && this.prodElegido == 0){
        this.productsService.getProductsxBuscador(event).subscribe(
          (res) => {
            console.log(res);
            this.products = res;
          },
          (err) => console.error(err)
        );
      } else if (event != "" && this.prodElegido != 0) {
        this.productsService.getProductsxBuscadorCategoria(event,this.prodElegido).subscribe(
          (res) => {
            console.log(res);
            this.products = res;
          },
          (err) => console.error(err)
        );
      }
 
  } 


}
