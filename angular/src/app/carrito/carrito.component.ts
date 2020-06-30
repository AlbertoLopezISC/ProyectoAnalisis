import { ProductosService } from './../services/productos.service';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  productos: any[] = [];
  total: number = 0;
  constructor(public servicioprod: ProductosService) {
    this.productos = JSON.parse(sessionStorage.getItem('compra'));
    console.log(JSON.stringify(this.productos));
    for (let i = 0; i < this.productos.length; i++) {
      this.total += this.productos[i].cant * this.productos[i].precio;

    }
    console.log(this.total)
  }

  compra() {
    swal.fire({
      title: 'Confirmar',
      text: " ¿Estas seguro de confirmar?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      this.servicioprod.setenvios(this.productos).subscribe((data: any) => {
        if (data.success) {
          swal.fire(
            'Compra Exitosa',
            ' ',
            'success'
          )

        }
      })
    })


  }

  ngOnInit(): void {
  }

}
