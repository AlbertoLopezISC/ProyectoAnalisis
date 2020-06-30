import { AuthService } from './../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  psw: any;
  email: string;
  band: number;
  bandera: boolean = false;

  constructor(private router: Router, private afAuth: AngularFireAuth, private authService: AuthService) {
    
  }
  back2() {
    this.router.navigateByUrl('/principal');
  }

  login(){
    console.log(this.email + ' ' + this.psw);
    console.log(this.email.length +' / '+ this.psw.length);
    this.afAuth.signInWithEmailAndPassword(this.email,this.psw)
    .then( (res) => {
      this.router.navigate(['/principal']);
    })
    .catch((err) => {
      if (err.code === 'auth/user-not-found') {
        swal.fire({ icon: 'error', title: 'Oops...', text: 'El usuario no se ha encontrado', });
      } else if (err.code === 'auth/wrong-password') {
        swal.fire({ icon: 'error', title: 'Oops...', text: 'La contrasena es incorrecta, intenta de nuevo', });
      }
    });
    this.authService.updateUser();
  }


  ngOnInit(): void {
  }


}
