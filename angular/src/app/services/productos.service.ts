import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  urlapi = 'http://localhost:3000/';
  constructor(public http: HttpClient) { }
  
  getproductos(){
      return this.http.get(this.urlapi + 'todo',{
        headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
      });
  }

  altaproductos(producto:string, precio:number, existencia:number, categoria:string, idv:string, tipov:string){
    const body = new HttpParams()
    .set('tipo', tipov)
    .set('vendedora', idv)
    .set('nombre',producto)
    .set('categoria', categoria)
    .set('existencia', existencia.toString())
    .set('precio',precio.toString());
    console.log(body.toString());
    return this.http.post(this.urlapi + 'altaProducto', body.toString(),{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    });

  }

  bajaproductos(producto:string, tipov:string, idv:string, categoria:string){
    const body = new HttpParams()
    .set('tipo', tipov)
    .set('vendedora', idv)
    .set('nombre',producto)
    .set('categoria', categoria);
    return this.http.post(this.urlapi + 'bajaProducto', body.toString(),{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  getenvios(tipov:string, idv:string ){
    const body = new HttpParams()
    .set('id', idv)
    .set('tipo', tipov);
    return this.http.post(this.urlapi + 'getEnviosPendientes', body.toString(),{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  setenvios(compra: any){
    const body = new HttpParams()
    .set('compra', JSON.stringify(compra));
    return this.http.post(this.urlapi + 'setEnvio', body.toString(),{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  altavendedora(tipo: string, idirectora: string, idconsultora:string,  nombre: string,correo:string ){
    console.log(idconsultora);
    const body = new HttpParams()
    .set('tipo', tipo )
    .set('idDirectora',idirectora)
    .set('idConsultora', idconsultora )
    .set('nombre', nombre)
    .set('correo', correo);
    return this.http.post(this.urlapi + 'altaVendedora', body.toString(),{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  bajavendedora(tipo:string, idirectora:string, idconsultora:string){
    const body = new HttpParams()
    .set('tipo', tipo )
    .set('idDirectora',idirectora)
    .set('idConsultora', idconsultora );
    return this.http.post(this.urlapi + 'bajaVendedora', body.toString(),{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  getproducto(tipo:string, idvendedora: string, nombre: string, cat:string){
    const body = new HttpParams()
    .set('tipo', tipo )
    .set('id',idvendedora)
    .set('nombre', nombre )
    .set('categoria', cat )
    return this.http.post(this.urlapi + 'getProducto', body.toString(),{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }


  modificarproducto(tipo:string, idvendedora: string, nombre: string, cat:string, existencia:number, precio:number){
    const body = new HttpParams()
    .set('tipo', tipo )
    .set('vendedora',idvendedora)
    .set('nombre', nombre )
    .set('categoria', cat )
    .set('existencia', existencia.toString() )
    .set('precio', precio.toString() );
    return this.http.post(this.urlapi + 'modificarProducto', body.toString(),{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  deleteventa(tipo:string, idvendedora:string, idventa:string){
    const body = new HttpParams()
    .set('tipo', tipo )
    .set('idVendedora',idvendedora)
    .set('idVenta', idventa )
    return this.http.post(this.urlapi + 'deleteVentaPendiente', body.toString(),{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    });

  }

  

}
