import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { PrincipalComponent } from './principal/principal.component';
import { DirectoraComponent } from './directora/directora.component';
import { VendedoraComponent } from './vendedora/vendedora.component';
import { CarritoComponent } from './carrito/carrito.component';
import { VentasComponent } from './ventas/ventas.component';

import { ProductosService } from './services/productos.service';
import { VendedorasService } from './services/vendedoras.service';

import {HttpClientModule} from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';


import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginvendedoraComponent } from './loginvendedora/loginvendedora.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    PrincipalComponent,
    DirectoraComponent,
    VendedoraComponent,
    CarritoComponent,
    VentasComponent,
    NavbarComponent,
    LoginvendedoraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ReactiveFormsModule
  ],
  providers: [ProductosService,VendedorasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
