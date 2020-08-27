import { Component, OnInit } from '@angular/core';
import { CotizacionService } from "../../services/cotizacion.service";
import { Cotizacion } from "../../model/cotizacion";
import {LoginService} from "../../services/login.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent implements OnInit {

  cotizacion: any = [];
  id=0;
  constructor(
    private cotizacionService : CotizacionService,
    private  activatedRoute:ActivatedRoute,
    private loginService:LoginService
  ) {
    var data = this.loginService.givemeData(this.loginService.getToken());
    
    this.id=data.id;
   }

  ngOnInit() {
    this.getCotizacion(this.id);

    
  
  }

  getCotizacion(id){
    this.cotizacionService.getCotizacion(id).subscribe(
      (res) => {
        this.cotizacion = res;
        console.log(res);
      },
      (err) => console.error(err)
    );

    
  
  }

}
