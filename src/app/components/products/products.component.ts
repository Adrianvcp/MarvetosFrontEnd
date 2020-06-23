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
}
