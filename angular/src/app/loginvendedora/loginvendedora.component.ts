import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { ProductosService } from './../services/productos.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-loginvendedora',
  templateUrl: './loginvendedora.component.html',
  styleUrls: ['./loginvendedora.component.css']
})
export class LoginvendedoraComponent implements OnInit {
  aux:any=[];
  listaprod = [];
  id:string;
  psw:string;
    constructor(public http: HttpClient, public serviceProd: ProductosService, public router: Router) {
      sessionStorage.setItem('compra', JSON.stringify([]));
      this.serviceProd.getproductos().subscribe((data: any) => {
        // console.log(data['data']['vendedoras']);
        this.aux = data['data']['vendedoras'];
        for (const vent in this.aux) {
          //console.log(vent);
          if (this.aux.hasOwnProperty(vent)) {
            const element = this.aux[vent];
            // console.log(element);
            for (let v in element) {
              // console.log(v);
              for (let v_productos in element[v]['productoDisponibles']) {
                // console.log(element[v]['productoDisponibles'][productos]);
                for (let productos in element[v]['productoDisponibles'][v_productos]) {
                 // console.log(element[v]['productoDisponibles'][v_productos][productos]);
                  if (element[v]['productoDisponibles'][v_productos][productos] !== undefined) {
                    this.listaprod.push({
                      nombre: element[v]['nombre'],
                      prod: productos,
                      precio: element[v]['productoDisponibles'][v_productos][productos]['precio'],
                      existencia: element[v]['productoDisponibles'][v_productos][productos]['existencia'],
                      categoria: element[v]['productoDisponibles'][v_productos][productos]['categoria'],
                      tipo: vent,
                      id: v
                    });
                  }
                }
              }
            }
          }
        }
       // console.log(this.listaprod[0]);
      });
    }

  ngOnInit(): void {
  }
  back2() {
    this.router.navigateByUrl('/principal');
  }

  login(){
    for(let i=0; i<this.listaprod.length; i++){
      if(this.id==this.listaprod[i].id){
          this.router.navigateByUrl('/vendedora/'+ this.id +'/' + this.listaprod[i].tipo);
      }
    }
    
  }

}
