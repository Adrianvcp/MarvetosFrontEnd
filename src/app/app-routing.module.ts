import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProductsComponent } from "./components/products/products.component";
import { IndexComponent } from "./components/index/index.component";
import { DetailsproductComponent } from "./components/detailsproduct/detailsproduct.component";
import { ContactComponent } from "./components/contact/contact.component";
import { ShoppingcarComponent } from "./components/shoppingcar/shoppingcar.component";
import { LoginComponent } from "./components/login/login.component";
import { ConfirmationComponent } from "./components/confirmation/confirmation.component";
import { PaymentComponent } from "./components/payment/payment.component";
import { RegistroComponent } from "./components/registro/registro.component";

const routes: Routes = [
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
    path: "confirmacion",
    component: ConfirmationComponent,
  },
  {
    path: "pagar",
    component: PaymentComponent,
  },
  {
    path: "registro",
    component: RegistroComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
