import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";

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
import { HttpClient } from "@angular/common/http";
import { Products } from "./model/products";
//Servicios
import { ProductsService } from "./services/products.service";
import { FilterPipe } from './pipes/filter.pipe';
import { DetalleCComponent } from './components/detalle-c/detalle-c.component';



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
    
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [ProductsService, CookieService],
  bootstrap: [AppComponent],
 
})
export class AppModule {}
