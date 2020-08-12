import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { NgxPaginationModule } from "ngx-pagination";
import { NgbCollapseModule } from "@ng-bootstrap/ng-bootstrap";
//Token Login
import { CookieService } from "ngx-cookie-service";

//Componentes
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { IndexComponent } from "./components/index/index.component";
import { ProductsComponent } from "./components/products/products.component";
import { DetailsproductComponent } from "./components/detailsproduct/detailsproduct.component";
import { ContactComponent } from "./components/contact/contact.component";
import { ShoppingcarComponent } from "./components/shoppingcar/shoppingcar.component";
import { LoginComponent } from "./components/login/login.component";
import { ConfirmationComponent } from "./components/confirmation/confirmation.component";
import { PaymentComponent } from "./components/payment/payment.component";
import { RegistroComponent } from "./components/registro/registro.component";
import { EmailconfirmationComponent } from "./components/emailconfirmation/emailconfirmation.component";

import { HttpClient } from "@angular/common/http";
import { Products } from "./model/products";

//Servicios
import { ProductsService } from "./services/products.service";
import { FilterPipe } from "./pipes/filter.pipe";
import { DetalleCComponent } from "./components/detalle-c/detalle-c.component";

import { OrdersSellerComponent } from "./components/orders-seller/orders-seller.component";
import { OrdersUserComponent } from "./components/orders-user/orders-user.component";
import { EditarproductosComponent } from "./components/editarproductos/editarproductos.component";

// import { ChatBot } from "angular-ai-chat-bot";
//Para ordenar productos
import { OrderModule } from "ngx-order-pipe";
import { StepBystepComponent } from "./components/step-bystep/step-bystep.component";
import { OrderquestionComponent } from "./components/orderquestion/orderquestion.component";
import { OrdersadminComponent } from "./components/ordersadmin/ordersadmin.component";
import { ConocenosComponent } from "./components/conocenos/conocenos.component";
import { CovidComponent } from "./components/covid/covid.component";
import { IngresoProductoComponent } from "./components/ingreso-producto/ingreso-producto.component";
import { ServiciosComponent } from "./components/servicios/servicios.component";

import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    IndexComponent,
    ProductsComponent,
    DetailsproductComponent,
    ContactComponent,
    ShoppingcarComponent,
    LoginComponent,
    ConfirmationComponent,
    PaymentComponent,
    RegistroComponent,
    FilterPipe,
    DetalleCComponent,
    OrdersSellerComponent,
    OrdersUserComponent,
    EditarproductosComponent,
    StepBystepComponent,
    OrderquestionComponent,
    OrdersadminComponent,
    EmailconfirmationComponent,
    ConocenosComponent,
    CovidComponent,
    IngresoProductoComponent,
    ServiciosComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    OrderModule,
    NgxPaginationModule,
    NgbCollapseModule,
    ReactiveFormsModule,
  ],
  providers: [ProductsService, CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
