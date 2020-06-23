import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../../services/products.service";
import { Products } from "../../model/products";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {
  products: any = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.productsService.getProducts().subscribe(
      (res) => {
        this.products = res;
      },
      (err) => console.error(err)
    );
  }

  getProducts() {}
}
