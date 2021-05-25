import {Component, OnInit} from '@angular/core';
import {User} from '../models/user';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';
import {faEnvelope, faLock, faUser} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import {Role} from '../models/role';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  faUser = faUser;
  faEnvelope = faEnvelope;
  faLock = faLock;
  public newUser: User = new User();
  public passwordConf: String = '';

  constructor(
    private authServ: AuthenticationService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  public registerUser() {
    this.newUser.isAdmin = false;
    if (this.newUser.password === this.passwordConf) {
      this.authServ.register(this.newUser, Role.USER).then((resultUser) => {
        Swal.fire({
          title: 'Perfecto!',
          text: 'Registrado con exito. Bienvenido a OneBuilder!',
          icon: 'success',
          background: '#edf2f4',
          confirmButtonText: 'Cerrar'
        });
        this.router.navigateByUrl('/client');
      }).catch((error) => {
        Swal.fire({
          title: 'Error!',
          text: 'Correo registrado, intenta con otro o inicia sesión.',
          icon: 'error',
          background: '#edf2f4',
          confirmButtonText: 'Cerrar'
        });
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Las contraseñas no coinciden!',
        icon: 'error',
        background: '#edf2f4',
        confirmButtonText: 'Cerrar'
      });
    }
  }

}
