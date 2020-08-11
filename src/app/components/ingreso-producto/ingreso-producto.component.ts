import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../../services/products.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Products } from "../../model/products";
import  {Unidad}  from "../../model/unidad";
import {Marca} from "../../model/marca";
import  {SubCategoria}  from "../../model/subCategoria";
import Swal from "sweetalert2";
@Component({
  selector: 'app-ingreso-producto',
  templateUrl: './ingreso-producto.component.html',
  styleUrls: ['./ingreso-producto.component.css']
})
export class IngresoProductoComponent implements OnInit {

  getUnidad: any = [];
  unidad: any= [];
  idUnidad = 0;

  getSubCat: any= [];
  subCategoria: any=[];
  idSubCategoria = 0;

 marca: any=[];
 idMarca = 0;

    Name = "";
    Image = "";
    Precio: 0;
    Stock: 0;
    Descripcion = "";
   

  products ={
    idProducto : 0,
    name: "",
    image: "",
    precio: 1,
    stock: 1,
    descripcion: "",
    idUnidad: 1,
    idMarca: 1,
    idSubCategoria: 1,
   
  };

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private activtedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log("se ejecuta");
    this.productsService.getUnidad().subscribe(
      (res) => {
        this.unidad = res;
        console.log(res);
       
      },
      (err) => console.error(err)
    );

    this.productsService.getSubCat().subscribe(
      (res) => {
        this.subCategoria = res;
        console.log(res);
      },
      (err) => console.error(err)
    );

    this.productsService.getMarcaPro().subscribe(
      (res) => {
        this.marca = res;
        console.log(res);
      },
      (err) => console.error(err)
    );
  }

 /*  saveProducto(){
    console.log(this.products);
  } */


  async saveProducto() {
    
    

    if (this.Name == "" || this.Image == "" || this.Descripcion == "" || this.idUnidad == 0 || this.idMarca == 0 || this.idSubCategoria == 0  ){
      
      Swal.fire({
        icon: "warning",
        title: "Datos Faltantes, completa los campos vacios",
        showConfirmButton: false,
        timer: 2000,
      }).then((result) => {
      });
     
     }else if(this.Precio==0){
      Swal.fire({
        icon: "warning",
        title: "El Precio no puede ser 0 o vacio, vuelve a interntarlo",
        showConfirmButton: false,
        timer: 2000,
      }).then((result) => {
      });
     }
     else if(this.Stock==0){
      Swal.fire({
        icon: "warning",
        title: "El Stock no puede ser 0 o vacio, vuelve a interntarlo",
        showConfirmButton: false,
        timer: 2000,
      }).then((result) => {
      });
     }

     else{  this.products.idProducto = 1;
      this.products.name=this.Name;
      this.products.descripcion=this.Descripcion;
      this.products.precio=this.Precio;
      this.products.stock=this.Stock;
      this.products.image=this.Image;
      this.products.idUnidad=this.idUnidad;
      this.products.idSubCategoria=this.idSubCategoria;
      this.products.idMarca=this.idMarca;
  
      console.log(this.saveProducto);
  
      delete this.products.idProducto;
      //Save Order on DB
      var rsp = await this.productsService.saveProducto(this.products).toPromise();
      this.router.navigateByUrl("/productos");
      Swal.fire({
        icon: "success",
        title: "Producto Registrado",
        showConfirmButton: false,
        timer: 2000,
      }).then((result) => {
   
      });
      }




  
  }



 /*  async saveProducto() {
    
    if (this.Name == "" || this.Image == "" || this.Descripcion == "" || this.idUnidad == 0 || this.idMarca == 0 || this.idSubCategoria == 0  || this.Precio == 0 || this.Stock == 0) {
      Swal.fire({
        icon: "warning",
        title: "Datos Faltantes, completa los campos vacios",
        showConfirmButton: false,
        timer: 2000,
      }).then((result) => {
      });
     
     }
     else
     {
      this.products.idProducto = 1;
      this.products.name=this.Name;
      this.products.descripcion=this.Descripcion;
      this.products.precio=this.Precio;
      this.products.stock=this.Stock;
      this.products.image=this.Image;
      this.products.idUnidad=this.idUnidad;
      this.products.idSubCategoria=this.idSubCategoria;
      this.products.idMarca=this.idMarca;
  
      //console.log(this.saveNewUserPersona);
  
      delete this.products.idProducto;
      
      this.productsService.saveProducto(this.products).subscribe(
        res =>{
          console.log(res);
          this.router.navigateByUrl("/productos");
        },
        err => console.error(err)
      );
      Swal.fire({
        icon: "success",
        title: "Producto Registrado",
        showConfirmButton: false,
        timer: 2000,
      }).then((result) => {
   
      });}

    return this.productsService;
 
  } */

  cancelarRegistro(){
    this.router.navigateByUrl("/productos");
    Swal.fire({
      icon: "error",
      title: "Producto Cancelado",
      showConfirmButton: false,
      timer: 2000,
    }).then((result) => {
 
    });
  }

  onEditClickUnidad(skill: any) {
    this.idUnidad = skill;
  }


  onEditClickSubCategoria(skill: any) {
    this.idSubCategoria = skill;
  }

  onEditClickMarca(skill: any) {
    this.idMarca = skill;
  }

  ValidaSoloNumeros(skill:any) {
   
   
    console.log(skill.charCode)
    if ((skill.charCode < 46) || (skill.charCode > 57) ) 
      skill.returnValue = false;
  }
}
