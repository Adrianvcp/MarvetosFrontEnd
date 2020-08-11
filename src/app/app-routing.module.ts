import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProductsComponent } from './components/products/products.component';
import { IndexComponent } from "./components/index/index.component";
import { DetailsproductComponent } from "./components/detailsproduct/detailsproduct.component";
import { ContactComponent } from "./components/contact/contact.component";
import { ShoppingcarComponent } from "./components/shoppingcar/shoppingcar.component";
import { LoginComponent } from "./components/login/login.component";
import { ConfirmationComponent } from "./components/confirmation/confirmation.component";
import { PaymentComponent } from "./components/payment/payment.component";
import { RegistroComponent } from "./components/registro/registro.component";

import { DetalleCComponent } from "./components/detalle-c/detalle-c.component";
import { OrdersSellerComponent } from "./components/orders-seller/orders-seller.component";
import { OrdersUserComponent } from './components/orders-user/orders-user.component';
import { EditarproductosComponent } from './components/editarproductos/editarproductos.component';
import { StepBystepComponent } from "./components/step-bystep/step-bystep.component";
import { OrderquestionComponent } from "./components/orderquestion/orderquestion.component";

import { AuthGuardService } from "./services/auth-guard.service";
import { OrdersadminComponent } from './components/ordersadmin/ordersadmin.component';
import { ConocenosComponent  } from './components/conocenos/conocenos.component';
import { CovidComponent  } from './components/covid/covid.component';
import {  IngresoProductoComponent } from './components/ingreso-producto/ingreso-producto.component';
import {ServiciosComponent} from "./components/servicios/servicios.component"
//reparar
const routes: Routes = [
  //ahora si porfa
  {
    path: "",
    redirectTo: "/index",
    pathMatch: "full",
  },
  {
    path: "index",
    component: IndexComponent,
  },
  {
    path: "productos",
    component: ProductsComponent,
  },
  {
    path: "detallesproducto/:id",
    component: DetailsproductComponent,
  },
  {
    path: "contacto",
    component: ContactComponent,
  },
  {
    path: "carrito",
    component: ShoppingcarComponent,
  },
  {
    path: "ingresar",
    component: LoginComponent,
  },
  {
    path: "ingresarProducto",
    component: IngresoProductoComponent,
  },
  {
    path: "servicios",
    component: ServiciosComponent,
  },
  {
    path: "covid",
    component: CovidComponent,
  },
  {
    path: "orden/confirmacion/:id",
    component: ConfirmationComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: "conocenos",
    component: ConocenosComponent,
   
  },
  {
    //YA NO DEBERIA ESTAR
    path: "pagar",
    component: PaymentComponent,
  },
  {
    path: "registro",
    component: RegistroComponent,
  },
  {
    path: "detalleC",
    component: DetalleCComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "orden/vendedor",
    component: OrdersSellerComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "comprar/pasos",
    component: StepBystepComponent,
  },
  {
    path: "ticket",
    component: OrderquestionComponent,
  },
  {
    path: "orden/usuario",
    component: OrdersUserComponent
  },
  {
    path: "productos/editar",
    component: EditarproductosComponent
  },
  {
    path: "orden/administrador",
    component: OrdersadminComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
