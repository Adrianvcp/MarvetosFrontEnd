import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LocalstorageService {
  constructor() {}

  //Limpiar carrito del local Storage
  limpiarCarrito() {
    localStorage.removeItem("carrito");
  }

  //Eliminar producto del carrito en el local Storage
  eliminarProducto(id: number) {
    var carritoTemp = [];
    var result = [];
    carritoTemp = JSON.parse(localStorage.getItem("carrito"));
    //quitar id producto
    for (let i = 0; i < carritoTemp.length; i++) {
      if (carritoTemp[i].idProducto != id) {
        result.push(carritoTemp[i]);
      } else {
        continue;
      }
    }

    //elimino el localst
    localStorage.removeItem("carrito");
    localStorage.setItem("carrito", JSON.stringify(result));
  }

  disminuirCant(id: number) {
    var carritoTemp = [];
    carritoTemp = JSON.parse(localStorage.getItem("carrito")); //all data on localstorage

    //quitar id producto
    for (let i = 0; i < carritoTemp.length; i++) {
      if (carritoTemp[i].idProducto == id) {
        carritoTemp.splice(i, 1);
        break;
      }
    }

    //elimino el localst
    localStorage.removeItem("carrito");
    localStorage.setItem("carrito", JSON.stringify(carritoTemp));
  }

  AumentarCant(id: number) {
    var carritoTemp = [];
    var Obj = {};

    carritoTemp = JSON.parse(localStorage.getItem("carrito"));
    //quitar id producto
    for (let i = 0; i < carritoTemp.length; i++) {
      if (carritoTemp[i].idProducto == id) {
        Obj = carritoTemp[i];
        break;
      }
    }
    carritoTemp.push(Obj);

    //elimino el localst
    localStorage.removeItem("carrito");
    localStorage.setItem("carrito", JSON.stringify(carritoTemp));
  }
}
