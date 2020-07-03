import { Component, OnInit } from '@angular/core';
import {DetalleCService} from "../../services/detalle-c.service";


import {Orden} from "../../model/orden";
import {DetalleCarrito} from "../../model/detallecarrito"

//importar categoria datos
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-detalle-c',
  templateUrl: './detalle-c.component.html',
  styleUrls: ['./detalle-c.component.css']
})
export class DetalleCComponent implements OnInit {

  orden: any = [];
  detalleCarrito: any =[];

  edit:boolean = false;
  constructor(private detalleCService:DetalleCService, private router:Router, private  activatedRoute:ActivatedRoute
    ) { }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    //console.log(params);
   /*  if(params.id){
      this.detalleCService.getDetalle()
      .subscribe(
        res => {
          this.orden = res;
          this.edit = true;
        },
        err => console.error(err)
      )
    } */



    this.detalleCService.getDetalle().subscribe(
      (res) => {
        this.orden = res;
      },
      (err) => console.error(err)
    );

    /* this.detalleCService.getDetalleCarrito().subscribe(
      (res) => {
        this.detalleCarrito = res;
      },
      (err) => console.error(err)
    ); */


  }
  saveEstado(){
    this.detalleCService.saveEstado(this.orden).subscribe(
      res =>{
        console.log(res);
        this.router.navigate([]);
      },
      err =>console.error(err)
    )
  }

  editEstado(id:string){
    console.log(id);
  }

  updateEstado(){
    console.log(this.orden);
  }







  buscarDetalle(id) {
    //const params = this.activatedRoute.snapshot.params;
    //console.log(params)
    if (id) {
      console.log(id);
      this.detalleCService.getBuscarDetalle(id).subscribe(
        (res) => {
          console.log(res);
          this.detalleCarrito = res;
        },
        (err) => console.error(err)
      );
    }
  }
 /*  selectDetalle(id) {
    //const params = this.activatedRoute.snapshot.params;
    //console.log(params)
    if (id) {
      this.detalleCService.getSelectDetalle(id).subscribe(
        (res) => {
          this.detalleCarrito = res;
        },
        (err) => console.error(err)
      );
    }
  } */



}
