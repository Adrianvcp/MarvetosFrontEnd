import { Component, OnInit } from '@angular/core';
import { AllService } from "../../services/all.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  
  ordenes: any = [];
  igv = 0;
  suma = 0;
  constructor(
    private allService: AllService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.mostrarProducto();
  }

  mostrarProducto(){
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.allService.getOneBuy(params.id).subscribe(
        (res) => {
          this.ordenes = res;
          console.log(this.ordenes);
          let cantidad = this.ordenes.length;
          for(let i=0; i < cantidad; i++){
            this.suma = this.suma + this.ordenes[i].subTotal;
          }
          console.log(this.suma);
          this.igv = parseFloat((0.18*this.suma).toFixed(2));
          console.log(this.igv);
        },
        (err) => console.error(err)
      );
    }
  }

}
