import { Component, OnInit } from "@angular/core";
import { Products } from "../../model/products";
import { ProductsService } from "../../services/products.service";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: "app-detailsproduct",
  templateUrl: "./detailsproduct.component.html",
  styleUrls: ["./detailsproduct.component.css"],
})
export class DetailsproductComponent implements OnInit {
  products: any = [];

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.productsService.getOneProduct(params.id).subscribe(
        (res) => {
          this.products = res;
        },
        (err) => console.error(err)
      );
    }
  }
}
