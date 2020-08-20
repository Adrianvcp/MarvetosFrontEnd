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


  edit:boolean = false;
  constructor(private detalleCService:DetalleCService,
     private router:Router,
      private  activatedRoute:ActivatedRoute,
      private loginService:LoginService
    ) { 
     var data = this.loginService.givemeData(this.loginService.getToken());
    
     this.id=data.id;
    }

  ngOnInit() {


    
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
      title: 'Estad seguro que deseas actualizar los datos?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, por favor!!'
    }).then((result) => {
      
      if (result.value) {
        

      var obj ={"idEstado":0}
      var fec ={"fechaEntrega":""}
      obj.idEstado=this.idEstado;
     
     
      fec.fechaEntrega =this.fechaEntrega=String(new Date());
     
      var comen ={"comentarioConductor":""}
      
     
      comen.comentarioConductor=this.comentarioConductor;
      
      if(this.comentarioConductor != "" && this.idEstado != 0 ){
       
        var u = Object.assign(obj,comen,fec);
        console.log(u);
        this.detalleCService.updateEstado(String(this.idOrden),u).subscribe(
          (res) => {
            this.getDetalleC(this.id);
            
          
          },
          (err) => console.error(err)
         );

      }else if (this.comentarioConductor != "" ){
        comen.comentarioConductor = this.comentarioConductor;
        this.detalleCService.updateEstado(String(this.idOrden),comen).subscribe(
          (res) => {
            this.getDetalleC(this.id);
            
           
          },
          (err) => console.error(err)
         );
        
      }else{        this.detalleCService.updateEstado(String(this.idOrden),obj).subscribe(
          (res) => {
            this.getDetalleC(this.id);
            
            
          },
          (err) => console.error(err)
         );
      }
    

     

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
    
    if (id) {
     
      this.detalleCService.getBuscarDetalle(id).subscribe(
        (res) => {
        
          this.detalleCarrito = res;
        },
        (err) => console.error(err)
      );
    }
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

    
    
  
  } 

}
