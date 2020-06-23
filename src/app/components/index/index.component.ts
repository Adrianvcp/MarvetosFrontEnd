import { Component, OnInit } from "@angular/core";
import { Products } from "../../model/products";
import { ProductsService } from "../../services/products.service";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.css"],
})
export class IndexComponent implements OnInit {
  products: any = [];
  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.productsService.getThreeProducts().subscribe(
      (res) => {
        this.products = res;
      },
      (err) => console.error(err)
    );
  }
}
