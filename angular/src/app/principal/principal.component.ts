import { ProductosService } from './../services/productos.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  aux = [];
  listaprod = [];
  filtro: String = 'todas';
  constructor(public http: HttpClient, public serviceProd: ProductosService) {
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

  add(item:any){
    let compra:any =JSON.parse(sessionStorage.getItem("compra"));
    for(let i=0; i<compra.length; i++){
      if(compra[i].prod==item.prod && compra[i].nombre==item.nombre){
        compra[i].cant++;
        sessionStorage.setItem("compra",JSON.stringify(compra));
        return;
      }
    }
    item.cant=1;
    compra.push(item);
    sessionStorage.setItem("compra",JSON.stringify(compra));
  }

  delete(item:any){
    let compra:any =JSON.parse(sessionStorage.getItem("compra"));
    for(let i=0; i<compra.length; i++){
      if(compra[i].prod==item.prod && compra[i].nombre==item.nombre){
        compra[i].cant--;
        if(compra[i].cant==0){
          compra.splice(i,1);
        }
        sessionStorage.setItem("compra",JSON.stringify(compra));
        return;
      }
    }
    alert("te crees muy gracioso imbecil")
  }

  ngOnInit(): void {
  }


}
