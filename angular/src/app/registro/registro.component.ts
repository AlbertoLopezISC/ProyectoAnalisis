import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import swal from 'sweetalert2';
import { FormControl, FormGroup, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  grupo;
  constructor( private authService: AuthService,
    private router: Router,
    private formbuilder: FormBuilder,
    private afAuth: AngularFireAuth) {
      this.grupo = formbuilder.group({
        email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
        conf_password: ['', Validators.required],
        nombre: ['', [Validators.required, Validators.maxLength(30)]]
      });
      this.grupo.setValidators(PasswordValidation.MatchPassword);
      console.log('hola');
    }

  ngOnInit(): void {
  }

  back() {
    this.router.navigateByUrl('/pricipal');
  }

  enviar() {
    this.afAuth.createUserWithEmailAndPassword(this.grupo.value.email, this.grupo.value.password).then(() => {
      this.afAuth.currentUser.then((user) => {
        alert(user.uid);
        user.updateProfile({
          displayName: `${this.grupo.value.nombre}`
        }).then((res) => {
          console.log(this.grupo.value.nombre + this.grupo.value.email + this.grupo.value.password);
          let nombre = this.grupo.value.nombre;
          this.authService.addUserBD(user.uid, nombre, this.grupo.value.email).subscribe((data) => {
            console.log(data);
          });
          this.grupo.reset();
          this.authService.updateUser();
          const swalWithBootstrapButtons = swal.mixin(
            {
              customClass: {
                confirmButton: 'btn btn-success',
              },
              buttonsStyling: false
            });
          swalWithBootstrapButtons.fire(
            {
              title: 'Registrado con éxito',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              reverseButtons: true
            }).then((result) => { this.router.navigate(['/principal']); });
        }).catch((err) => {
          console.log(err);
        });
        /*user.sendEmailVerification().then( () => {
          alert('Correo mandado');
        });*/
      });
    })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, ' ', errorMessage);
        if (errorCode === 'auth/email-already-in-use') {
          alert('El correo ya esta registrado');
        }
      });
  }

}

export class PasswordValidation {

  static MatchPassword(AC: FormControl) {

    let password = AC.get('password'); // to get value in input tag
    let confirmPassword = AC.get('conf_password'); // to get value in input tag
    if (password.value === confirmPassword.value) {
      return null;
    } else {
      return { not_match: true };

    }


  }
}
