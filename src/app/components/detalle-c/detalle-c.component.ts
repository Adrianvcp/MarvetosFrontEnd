import { Component, OnInit } from '@angular/core';
import {DetalleCService} from "../../services/detalle-c.service";
import Swal from 'sweetalert2'

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
  idEstado= 0;
  estad:string="";
  idOrden = 0;

  edit:boolean = false;
  constructor(private detalleCService:DetalleCService,
     private router:Router,
      private  activatedRoute:ActivatedRoute
    ) { }

  ngOnInit() {
//------------------------------------------------------
console.log("--nombre--");
    const params = this.activatedRoute.snapshot.params;
   
    if(params.id){
      this.detalleCService.getBusc(params.id).subscribe(
res =>{
  console.log(res)
},
err =>console.log(err)
      )
    }
   
//--------------------------------------------


    this.getDetalleC();
   

  }

  getDetalleC(){
    this.detalleCService.getDetalle().subscribe(
      (res) => {
        this.orden = res;
      },
      (err) => console.error(err)
    );

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
    this.idOrden = parseInt(id);

  }




  updateEstado(){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      
      if (result.value) {
        console.log(this.idEstado);
      console.log(this.idOrden);
      var obj ={"idEstado":0}
      obj.idEstado=this.idEstado;
      console.log(obj);
      console.log("------------")
     this.detalleCService.updateEstado(String(this.idOrden),obj).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.error(err)
     );
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })


 
    
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
  colocardato(){
    console.log("Funciono")
  }


  onclicEdit(skill: any){
    console.log(skill);
    this.estad=skill;
    
    switch (skill) {
      case "Pendiente":
        this.idEstado = 1
        break;
      case "Confirmado":
        this.idEstado = 2
        break;
      case "En camino":
        this.idEstado = 3
        break;
      case "Entregado":
        this.idEstado = 4
        break;
    }

    console.log(this.idEstado)
    
  /*  this.detalleCService.getId({"Estado" : skill}).subscribe(  (res) => {
      console.log(res);
      
    },
    (err) => console.error(err)) */
  } 

}
