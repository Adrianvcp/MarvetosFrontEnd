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
  tituloMarca = "";
  marcaElegida = false;
  buscar = "";
  filterPost = "";
  products: any = [];
  categoria: any = [];
  paginaActual = 1;
  carrito: any = [];
  prodElegido = 0; //Categoria elegida
  idSubElegido = 0; //Subcategoria elegida
  marcas: any = [];
  order = "0";
  subcategorias: any = [];
  reverse = false;
  count = 0;
  icon1 = false;
  icon2 = false;
  icon3 = false;
  icon4 = false;
  icon5 = false;
  icon6 = false;
  showproduct1 = false;
  showproduct2 = false;
  showproduct3 = false;
  showproduct4 = false;
  showproduct5 = false;
  showproduct6 = false;
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

    this.getProducts();
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

  getProducts() {
    this.productsService.getProducts().subscribe(
      (res) => {
        this.products = res;
      },
      (err) => console.error(err)
    );
  }

  //selecionar categoria y producto1+
  selectCat(id) {
    this.tituloMarca = "Categoría";
    this.buscar = "";
    this.idSubElegido = 0;
    this.marcaElegida = false;
    if (id) {
      this.productsService.getSelecCat(id).subscribe(
        (res) => {
          this.products = res;

          this.prodElegido = this.products[0].idCategoria;
          console.log("prodElegido");
          console.log(res);
          console.log(this.products[0].idCategoria);
          console.log(this.prodElegido);
        },
        (err) => console.error(err)
      );
    }
  }

  //limpiar la categoria
  limpiarProdElegido() {
    this.prodElegido = 0;
    this.idSubElegido = 0;
    this.buscar = "";
    this.getProducts();
    this.limpiarTodo();
  }

  //limpiar la subcategoria
  limpiarSubCategoria() {
    this.idSubElegido = 0;
    this.selectCat(this.prodElegido);
    this.buscar = "";
    this.filtroMarca(this.prodElegido);
  }

  limpiarTodo() {
    this.showproduct1 = false;
    this.showproduct2 = false;
    this.showproduct3 = false;
    this.showproduct4 = false;
    this.showproduct5 = false;
    this.showproduct6 = false;
    this.icon1 = false;
    this.icon2 = false;
    this.icon3 = false;
    this.icon4 = false;
    this.icon5 = false;
    this.icon6 = false;
  }
  filtroMarca(id) {
    console.log("porfi");
    console.log(this.prodElegido);
    this.productsService.getMarca(id).subscribe(
      (res) => {
        this.marcas = res;
        // console.log(res);
      },
      (err) => console.error(err)
    );
  }

  getProductsxMarca(marca) {
    console.log(this.prodElegido);
    console.log(marca);

    this.buscar = "";
    this.productsService.getProductsxMarca(marca, this.prodElegido).subscribe(
      (res) => {
        //  this.products = [];
        this.products = res;
        console.log(res);
        this.marcaElegida = true;
      },
      (err) => console.error(err)
    );
  }

  showIcon(id) {
    switch (id) {
      case 1:
        this.icon1 = !this.icon1;
        this.icon2 = false;
        this.icon3 = false;
        this.icon4 = false;
        this.icon5 = false;
        this.icon6 = false;
        break;
      case 2:
        this.icon2 = !this.icon2;
        this.icon1 = false;
        this.icon3 = false;
        this.icon4 = false;
        this.icon5 = false;
        this.icon6 = false;
        break;
      case 3:
        this.icon3 = !this.icon3;
        this.icon1 = false;
        this.icon2 = false;
        this.icon4 = false;
        this.icon5 = false;
        this.icon6 = false;
        break;
      case 4:
        this.icon4 = !this.icon4;
        this.icon1 = false;
        this.icon2 = false;
        this.icon3 = false;
        this.icon5 = false;
        this.icon6 = false;
        break;
      case 5:
        this.icon5 = !this.icon5;
        this.icon1 = false;
        this.icon2 = false;
        this.icon3 = false;
        this.icon4 = false;
        this.icon6 = false;
        break;
      case 6:
        this.icon6 = !this.icon6;
        this.icon1 = false;
        this.icon2 = false;
        this.icon3 = false;
        this.icon4 = false;
        this.icon5 = false;
        break;
      default:
        break;
    }
  }

  //Busqueda del filtro de palabras
  getBusqueda(event: any) {
    this.buscar = event;
    if (event == "" && this.prodElegido == 0 && this.idSubElegido == 0) {
      this.getProducts();
    } else if (event == "" && this.prodElegido != 0 && this.idSubElegido == 0) {
      this.selectCat(this.prodElegido);
    } else if (event == "" && this.prodElegido != 0 && this.idSubElegido != 0) {
      this.productsService
        .getProductxCateSub(this.prodElegido, this.idSubElegido)
        .subscribe(
          (res) => {
            console.log("aca es");
            this.products = res;
            console.log(res);
          },
          (err) => console.error(err)
        );
    } else if (event != "" && this.prodElegido == 0 && this.idSubElegido == 0) {
      this.productsService.getProductsxBuscador(event).subscribe(
        (res) => {
          console.log(res);
          this.products = res;
        },
        (err) => console.error(err)
      );
    } else if (event != "" && this.prodElegido != 0 && this.idSubElegido == 0) {
      this.productsService
        .getProductsxBuscadorCategoria(event, this.prodElegido)
        .subscribe(
          (res) => {
            console.log(res);
            console.log("tmr");
            console.log(this.idSubElegido);
            this.products = res;
          },
          (err) => console.error(err)
        );
    } else if (event != "" && this.prodElegido != 0 && this.idSubElegido != 0) {
      this.productsService
        .getProductsxBuscadorCateSub(event, this.prodElegido, this.idSubElegido)
        .subscribe(
          (res) => {
            console.log("prueba rapida");
            console.log(this.prodElegido);
            console.log(this.idSubElegido);
            console.log(res);
            this.products = res;
          },
          (err) => console.error(err)
        );
    }
  }

  //Muestra las subcategorias por categoria
  getSubCatexCate() {
    console.log("con fe");
    console.log(this.prodElegido);
    this.productsService.getSubCatexCate(this.prodElegido).subscribe(
      (res) => {
        this.subcategorias = res;
      },
      (err) => console.error(err)
    );
  }

  showSubCategoria(id) {
    this.productsService.getSubCatexCate(id).subscribe(
      (res) => {
        this.subcategorias = res;
        console.log("aca es");
        console.log(res);

        switch (id) {
          case 1:
            this.showproduct1 = !this.showproduct1;
            this.showproduct2 = false;
            this.showproduct3 = false;
            this.showproduct4 = false;
            this.showproduct5 = false;
            this.showproduct6 = false;
            break;
          case 2:
            this.showproduct2 = !this.showproduct2;
            this.showproduct1 = false;
            this.showproduct3 = false;
            this.showproduct4 = false;
            this.showproduct5 = false;
            this.showproduct6 = false;
            break;
          case 3:
            this.showproduct3 = !this.showproduct3;
            this.showproduct1 = false;
            this.showproduct2 = false;
            this.showproduct4 = false;
            this.showproduct5 = false;
            this.showproduct6 = false;
            break;
          case 4:
            this.showproduct4 = !this.showproduct4;
            this.showproduct1 = false;
            this.showproduct2 = false;
            this.showproduct3 = false;
            this.showproduct5 = false;
            this.showproduct6 = false;
            break;
          case 5:
            this.showproduct5 = !this.showproduct5;
            this.showproduct1 = false;
            this.showproduct2 = false;
            this.showproduct3 = false;
            this.showproduct4 = false;
            this.showproduct6 = false;
            break;
          case 6:
            this.showproduct6 = !this.showproduct6;
            this.showproduct1 = false;
            this.showproduct2 = false;
            this.showproduct3 = false;
            this.showproduct4 = false;
            this.showproduct5 = false;
            break;
          default:
            break;
        }
      },
      (err) => console.error(err)
    );
  }

  getProductxCateSub(cat, subcat) {
    this.buscar = "";
    this.marcaElegida = false;
    this.productsService.getProductxCateSub(cat, subcat).subscribe(
      (res) => {
        console.log("aquisito");
        this.products = res;

        this.idSubElegido = this.products[0].idSubCategoria;
        console.log("checa");
        console.log(res);
        console.log(this.idSubElegido);
      },
      (err) => console.error(err)
    );

    this.getMarcaxSubcat(cat, subcat);
  }

  getMarcaxSubcat(cat, subcat) {
    this.tituloMarca = "Subcategoría";
    this.productsService.getMarcaxSubcat(cat, subcat).subscribe(
      (res) => {
        this.marcas = res;
        console.log("prueba subcat");
        console.log(res);
      },
      (err) => console.error(err)
    );
  }
}
