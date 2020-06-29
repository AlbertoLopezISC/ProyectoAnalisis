import  swal  from 'sweetalert2';
import { ProductosService } from './../services/productos.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-vendedora',
  templateUrl: './vendedora.component.html',
  styleUrls: ['./vendedora.component.css']
})
export class VendedoraComponent implements OnInit {
  _precio: number;
  _existencia: number;
  _producto: string;
  _cat: string;
  idVendedora: string;
  tipo: string;
  solicitudes=[];
  _user: string;
  _useremail: string;
  _pass:string;
  _usertipo: string;
  _userid: string;
  _usertipo2: string;

  constructor(private route: ActivatedRoute, public serviceprod: ProductosService) {
    this.route.params.subscribe(params => {
      this.idVendedora = params.id;
      this.tipo=params.tipo;
      console.log(this.idVendedora);
      console.log(this.tipo);
    });

    this.serviceprod.getenvios(this.tipo, this.idVendedora).subscribe((data:any)=>{
      console.log(data);
      for (const p in data.data) {
        console.log(p);
        if (data.data.hasOwnProperty(p)) {
          const element = data.data[p];
          element.id=p;
          this.solicitudes.push(element);
        }
      }
    });
   }

  ngOnInit(): void {
  }

  alta(){
    this.serviceprod.altaproductos(this._producto, this._precio, this._existencia, this._cat,this.idVendedora, this.tipo)
    .subscribe((data: any)=>{
      if(data.success){
        swal.fire(
          'Producto dado de alta',
          ' ',
          'success'
        );
      }
    });
  }
  
  baja(){
    this.serviceprod.bajaproductos(this._producto,this.tipo,this.idVendedora, this._cat )
    .subscribe((data: any)=>{
      if(data.success){
        swal.fire(
          'Producto dado de baja',
          ' ',
          'success'
        );
      }
    });
  }

  altausuario(){
    if(this._usertipo=='consultoras'){
      this.serviceprod.altavendedora(this._usertipo, this.idVendedora, this._user, this._user, this._useremail )
      .subscribe((data:any) => {
        if(data.success){
          swal.fire(
            'Vendedora dada de alta',
            ' ',
            'success'
          );
        }
      })
    }
    else{
    console.log(this._user);
    this.serviceprod.altavendedora( this._usertipo, this._user, "", this._user, this._useremail  )
    .subscribe((data:any) => {
      if(data.success){
        swal.fire(
          'Vendedora dada de alta',
          ' ',
          'success'
        );
      }
    })
  }
  }

  bajausuario(){
    this.serviceprod.bajavendedora( this._usertipo2, this.idVendedora, this._userid)
    .subscribe((data:any) => {
      if(data.success){
        swal.fire(
          'Vendedora dada de baja',
          ' ',
          'success'
        );
      }
    })
  }

  modificar(item){
    console.log(item.id);
    this.serviceprod.getproducto(this.tipo,this.idVendedora,item.producto,item.categoria)
    .subscribe((data:any) => {
      if(data.success){
        let producto=data.data;
        this.serviceprod.modificarproducto(this.tipo,this.idVendedora,item.producto,item.categoria,(producto.existencia-item.cantidad),producto.precio)
        .subscribe((data:any) => {
          this.serviceprod.deleteventa(this.tipo, this.idVendedora, item.id)
          .subscribe((data:any)=>{
            if(data.success){
              swal.fire(
                'Operacion Exitosa',
                ' ',
                'success'
              );
            }
          })
        })
      }
    })
  }


}
