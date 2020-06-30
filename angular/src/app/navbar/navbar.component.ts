import { AuthService } from './../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  bandlog: boolean = false;
  bandLogVendedora: boolean = true;
  constructor(
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone) {
    this.afAuth.onAuthStateChanged((user) => {
      this.ngZone.run(() => {
        if (user) {
          this.bandlog = true;
        }
        else {
          this.bandlog = false;
        }
      });
    });
  }

  ngOnInit(): void {
  }


  logout() {
    this.afAuth.signOut().then(() => {
      // se cerro sesion, ocultar las pestanas
      console.log('se serro sesion');
      this.authService.updateUser();
    })
      .catch((err) => {
        console.log(err);
      });
  }

  loginVendedora() {
    this.bandLogVendedora = false;
    this.router.navigateByUrl('/loginvendedora');

  }

}
