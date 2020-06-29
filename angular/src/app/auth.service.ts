import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams   } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  urlapi: string = 'http://localhost:3000/';
  private $user: BehaviorSubject<any> = new BehaviorSubject<any>(null);//igual a nulo
  _user: Observable<any> = this.$user.asObservable(); //_person sera un observable de un solo objeto
  aux: any;
  constructor(private http: HttpClient, private afAuth: AngularFireAuth) {
    this.afAuth.onAuthStateChanged((user) => {
      this.aux = user;
    });
  }

  addUserBD(uid: any, nombre: string, correo: string) {
    console.log(`${uid} ${nombre} ${correo} `);

    const body = new HttpParams()
    .set('uid', uid)
    .set('usuario', nombre)
    .set('correo', correo);

    return this.http.post(this.urlapi + 'altaCliente', body.toString(), {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  updateUser(){
    this.afAuth.currentUser.then((user) => {this.aux = user; });
    this.$user.next(this.aux);
    //console.log(this.aux);
  }

  getUser(): any {
    return this.aux;
  }
}
