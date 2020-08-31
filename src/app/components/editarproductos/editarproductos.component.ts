import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { ProductsService } from '../../services/products.service';
import { Products } from '../../model/products';
@Component({
  selector: 'app-editarproductos',
  templateUrl: './editarproductos.component.html',
  styleUrls: ['./editarproductos.component.css']
})
export class EditarproductosComponent implements OnInit {
  products: Products = {
    idProducto : 0,
   // idCategoria : 0,
    name: '',
    image: '',
    precio: 0,
    stock: 0
  }
  

  paginaActual : 1;
  productos: any = [];

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
      this.productsService.getProducts().subscribe(
        (res) => {
          this.productos = res;
        },
        (err) => console.error(err)
      );
  }
  
  getOneProduct(prod: any) {
    this.products.idProducto = prod.idProducto;
    this.products.name = prod.producto;
    this.products.precio = prod.precio;
    this.products.stock = prod.stock;
    this.products.descripcion = prod.descripcion;
    //this.products.idCategoria = prod.idCategoria;
    this.products.image = prod.image;
    this.products.idUnidad = prod.idUnidad;
  }
  
  putProducts(){
    Swal.fire({
      title: "¿Desea modificar el producto?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",

      confirmButtonText: "Confirmar",
    }).then((result) => {
      if (result.value) {
        this.productsService.putProducts(this.products.idProducto, this.products).subscribe(
        (res) => {
          this.getProducts();
          Swal.fire(
          "Producto Modificado",
          "El producto se modificó correctamente",
          "success"
        );
        },
        (err) => console.error(err)
        );

        
      }
    });
    
  }


}
