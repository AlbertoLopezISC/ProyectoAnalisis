import { LoginvendedoraComponent } from './loginvendedora/loginvendedora.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VentasComponent } from './ventas/ventas.component';
import { VendedoraComponent } from './vendedora/vendedora.component';
import { RegistroComponent } from './registro/registro.component';
import { PrincipalComponent } from './principal/principal.component';
import { LoginComponent } from './login/login.component';
import { DirectoraComponent } from './directora/directora.component';
import { CarritoComponent } from '../app/carrito/carrito.component';
import { NavbarComponent } from './navbar/navbar.component';



const routes: Routes = [
  { path:"carrito", component:CarritoComponent },
  { path:"directora", component:DirectoraComponent },
  { path:"login", component:LoginComponent },
  { path:"principal", component:PrincipalComponent },
  { path:"registro", component:RegistroComponent },
  { path:"vendedora/:id/:tipo", component:VendedoraComponent},
  { path:"ventas", component:VentasComponent },
  { path:"navbar", component:NavbarComponent},
  { path:"loginvendedora", component:LoginvendedoraComponent},
  { path: '**', redirectTo: 'principal' },
  { path: ' ', pathMatch: 'full', redirectTo: 'principal' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
