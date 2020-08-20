import { Component, OnInit } from "@angular/core";
import { RegistroService } from "../../services//registro.service";
import { User } from "../../model/user";
import { Router, ActivatedRoute } from "@angular/router";

import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from "sweetalert2";


@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.css"],
  
})
export class RegistroComponent implements OnInit {
createFormGroup(){
  return new FormGroup({
    Nombres: new FormControl('')
  })
}

  Rpass="";
  RpassE="";
  //Model user to send - Register
  userM: User = {
    idUser: 0,
    email: "",
    pass: "",
    RUC: "",
    DNI: "",
    Apellidos: "",
    Nombres: "",
    idRol: 0,
    NombreEmpresa: "",
    telefono: "",
   
   
  };

  userE: User = {
    idUser: 0,
    email: "",
    pass: "",
    RUC: "",
    DNI: "",
    Apellidos: "",
    Nombres: "",
    idRol: 0,
    NombreEmpresa: "",
    telefono: "",
    
  };

  respuesta:any;

  //Listar Usuarios
  user: any = [];

  contactForm: FormGroup
  constructor(
    private registroService: RegistroService,
    private router: Router,
    private activtedRoute: ActivatedRoute
  ) {
    this.contactForm = this.createFormGroup();
  }
  validatingForm: FormGroup;
  ngOnInit() {
   this.getUsers();
    this.validatingForm = new FormGroup({
      text: new FormControl(null, [Validators.required, Validators.email])
    });
  }

  getUsers() {
    this.registroService.getUsers().subscribe(
      (res) => {
        console.log(res);
        this.user = res;
      },
      (err) => console.log(err)
    );
  }
 
 
  esEmailValido(email: string):boolean {
    let mailValido = false;
      'use strict';

      var EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/;

      if (email.match(EMAIL_REGEX)){
        mailValido = true;
      }
    return mailValido;
  }

  

  async emailRepetido(emailR){
    var data = await this.registroService.emailRepetido(emailR).toPromise()
  if (data[0] == undefined){return "false";
  }else{
    return "true";
  }
  
  }


  async saveNewUserPersona() {
   
   
    var emailR={
      email:this.userM.email
    };
    
    let esValido:boolean = true;
   
   if (this.userM.Apellidos == "" || this.userM.DNI == "" || this.userM.email== "" || this.userM.pass == "" || this.userM.telefono == "" || this.userM.Nombres == ""    ) {
    Swal.fire({
      icon: "warning",
      title: "Datos Faltantes, completa los campos vacios",
      showConfirmButton: false,
      timer: 2000,
    }).then((result) => {
    });
   
   }else if(this.userM.telefono.length<8){
    Swal.fire({
      icon: "warning",
      title: "Celular incorrecto, vuelve intentarlo nuevamente",
      showConfirmButton: false,
      timer: 2000,
    }).then((result) => {
    });
   }else if(this.userM.DNI.length<8){
    Swal.fire({
      icon: "warning",
      title: "DNI incorrecto, vuelve a ponerlo nuevamente",
      showConfirmButton: false,
      timer: 2000,
    }).then((result) => {
    });
   }else if(!this.esEmailValido(this.userM.email)){
    Swal.fire({
      icon: "warning",
      title: "Correo incorrecto, vuelve intentarlo nuevamente",
      showConfirmButton: false,
      timer: 2000,
    }).then((result) => {
    });
   }else if(this.userM.pass!=this.Rpass){
    Swal.fire({
      icon: "warning",
      title: "Las contraseñas no coiciden, vuelve a intarlo por favor!!",
      showConfirmButton: false,
      timer: 2000,
    }).then((result) => {
    });
   }else if( await this.emailRepetido(emailR) =="true"){
    Swal.fire({
      icon: "warning",
      title: "Correo existente, vuelve a intentarlo",
      showConfirmButton: false,
      timer: 2000,
    }).then((result) => {
    });
   }else{
    delete this.userM.idUser;
    this.userM.idRol = 2;
    this.registroService.saveUser(this.userM).subscribe(
      (res) => {
        console.log(res);
        /*         this.registroService.setToken(res["token"]);
         */ this.router.navigate(["/registro"]);
        this.router.navigateByUrl("/ingresar");
      },
      (err) => {
        console.log(err);
      }
    );
    Swal.fire({
      icon: "success",
      title: "Cliente Registrado",
      showConfirmButton: false,
      timer: 2000,
    }).then((result) => {
    });
    return this.registroService;
   
  }

 
}






 async saveNewUserEmpresa() {

    var emailR={
      email:this.userE.email
    };
   
     
    
   
    if (this.userE.NombreEmpresa == "" || this.userE.RUC == "" || this.userE.telefono== "" || this.userE.email == "" || this.userE.pass == "") {
      Swal.fire({
        icon: "warning",
        title: "Datos Faltantes, completa los campos vacios",
        showConfirmButton: false,
        timer: 2000,
      }).then((result) => {
      });
     
     }else if(this.userE.RUC.length<12){
      Swal.fire({
        icon: "warning",
        title: "RUC incorrecto,  vuelve a intarlo por favor!!",
        showConfirmButton: false,
        timer: 2000,
      }).then((result) => {
      });
     }else if(this.userE.telefono.length<9){
      Swal.fire({
        icon: "warning",
        title: "Celular incorrecto,  vuelve a intarlo por favor!!",
        showConfirmButton: false,
        timer: 2000,
      }).then((result) => {
      });
     }else if(!this.esEmailValido(this.userE.email)){
      Swal.fire({
        icon: "warning",
        title: "Correo incorrecto, vuelve intentarlo nuevamente",
        showConfirmButton: false,
        timer: 2000,
      }).then((result) => {
      });
     }
     else if(this.userE.pass!=this.RpassE){
      Swal.fire({
        icon: "warning",
        title: "Las contraseñas no coiciden, vuelve a intarlo por favor!!",
        showConfirmButton: false,
        timer: 2000,
      }).then((result) => {
      });
     }else if( await this.emailRepetido(emailR) =="true"){
      Swal.fire({
        icon: "warning",
        title: "Correo existente, vuelve a intentarlo",
        showConfirmButton: false,
        timer: 2000,
      }).then((result) => {
      });
     }else{
      delete this.userE.idUser;
      this.userE.idRol = 1;
      this.registroService.saveUser(this.userE).subscribe(
        (res) => {
          console.log(res);
          /*         this.registroService.setToken(res["token"]);
           */ this.router.navigate(["/registro"]);
          this.router.navigateByUrl("/ingresar");
        },
        (err) => {
          console.log(err);
        }
      );
      Swal.fire({
        icon: "success",
        title: "Empresa Registrado",
        showConfirmButton: false,
        timer: 2000,
      }).then((result) => {
      });
      return this.registroService;
      
     }


    
  }

  ValidaSoloNumeros(skill:any) {
   
   
    console.log(skill.charCode)
    if ((skill.charCode < 48) || (skill.charCode > 57) ) 
      skill.returnValue = false;

      
          //No esta permitido - eliminar 
  }

  
  
   soloLetras(e:any) {
    var key = e.keyCode || e.which;
    var tecla = String.fromCharCode(key).toLowerCase();
    var letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
   

    if(letras.indexOf(tecla) == -1 )
        return false;
}
}
