import { Component, OnInit } from '@angular/core';
import {DetalleCService} from "../../services/detalle-c.service";
import Swal from 'sweetalert2'

import {Orden} from "../../model/orden";
import {DetalleCarrito} from "../../model/detallecarrito"
import {LoginService} from "../../services/login.service";

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
  paginaActual = 1;
  estad:string="";
  idOrden = 0;
  id=0;
  comentarioConductor="";
  fechaEntrega="";
 /*  obj_or = {
   
    fechaEntrega: ""
 
  }; */

  edit:boolean = false;
  constructor(private detalleCService:DetalleCService,
     private router:Router,
      private  activatedRoute:ActivatedRoute,
      private loginService:LoginService
    ) { 
     var data = this.loginService.givemeData(this.loginService.getToken());
     console.log(data.id);
     this.id=data.id;
    }

  ngOnInit() {
//------------------------------------------------------

   
//--------------------------------------------

    
    this.getDetalleC(this.id);
  

  }

  getDetalleC(id){
    this.detalleCService.getDetalle(id).subscribe(
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
        //this.getDetalleC();
      },
      err =>console.error(err)
    )
  }

  editEstado(id:string){
    console.log(id);
    this.idOrden = parseInt(id);

  }




  updateEstado(){
    console.log("DATA-----")
    console.log(this.comentarioConductor)
    Swal.fire({
      title: 'Estad seguro que deseas actualizar los datos?',
     /*  text: "You won't be able to revert this!", */
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, por favor!!'
    }).then((result) => {
      
      if (result.value) {
        console.log(this.idEstado);
      console.log(this.idOrden);

      var obj ={"idEstado":0}
      var fec ={"fechaEntrega":""}
      obj.idEstado=this.idEstado;
      console.log("llego la hora")
      /* this.fechaEntrega=String(new Date()); */
      fec.fechaEntrega =this.fechaEntrega=String(new Date());
      console.log(this.fechaEntrega);
      var comen ={"comentarioConductor":""}
      
      //obj.idEstado=this.idEstado;
      comen.comentarioConductor=this.comentarioConductor;
      
      if(this.comentarioConductor != "" && this.idEstado != 0 ){
       
        var u = Object.assign(obj,comen,fec);
        console.log(u);
        this.detalleCService.updateEstado(String(this.idOrden),u).subscribe(
          (res) => {
            this.getDetalleC(this.id);
            
            console.log(res);
          },
          (err) => console.error(err)
         );

      }else if (this.comentarioConductor != "" ){
        comen.comentarioConductor = this.comentarioConductor;
        this.detalleCService.updateEstado(String(this.idOrden),comen).subscribe(
          (res) => {
            this.getDetalleC(this.id);
            
            console.log(res);
          },
          (err) => console.error(err)
         );
        
      }else{        this.detalleCService.updateEstado(String(this.idOrden),obj).subscribe(
          (res) => {
            this.getDetalleC(this.id);
            
            console.log(res);
          },
          (err) => console.error(err)
         );
      }
     // console.log(obj);
      console.log("------------")

     

        Swal.fire(
          'Datos Actualizados!',
          'Los datos fueron Actualizados satisfactoriamente',
          'success'
        )
        this.getDetalleC(this.id);
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

  onclicEditComentario(skill:any){
    this.comentarioConductor = skill;
  }
  onclicEdit(skill: any){
    console.log(skill);
    this.estad=skill;
    this.fechaEntrega=skill;
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
        case "Promovido":
        this.idEstado = 5
        break;
    }

    console.log(this.idEstado)
    
  /*  this.detalleCService.getId({"Estado" : skill}).subscribe(  (res) => {
      console.log(res);
      
    },
    (err) => console.error(err)) */
  } 

}
