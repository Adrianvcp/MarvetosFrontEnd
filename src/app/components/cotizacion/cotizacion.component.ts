import { Component, OnInit } from '@angular/core';
import { CotizacionService } from "../../services/cotizacion.service";
import { Cotizacion } from "../../model/cotizacion";

import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent implements OnInit {

  cotizacion: any = [];
  constructor(
    private cotizacionService : CotizacionService,
  ) { }

  ngOnInit() {
    this.cotizacionService.getCotizacion().subscribe(
      (res) => {
        this.cotizacion = res;
        console.log(res);
      },
      (err) => console.error(err)
    );

    
  
  }

}
