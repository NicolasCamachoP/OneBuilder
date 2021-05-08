import {Component, OnInit} from '@angular/core';
import {User} from '../models/user';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {LoginObject} from '../models/loginobject';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public userCredentials: User = new User();

  constructor(
    private authServ: AuthenticationService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  private validCredentials(email: any, password: any): boolean {
    let validPassword = false;
    let validEmail = false;
    if (email !== '' && email !== undefined) {
      validEmail = true;
    }
    if (password !== '' && password !== undefined) {
      validPassword = true;
    }
    return validPassword && validEmail;
  }


  public submitLogin() {
    if (this.validCredentials(this.userCredentials.email, this.userCredentials.password)) {
      this.authServ.login(new LoginObject(this.userCredentials)).then((userResult) => {
        if (this.authServ.userValue.isAdmin) {
          //this.router.navigateByUrl("/admin");
        } else {
          //this.router.navigateByUrl("/client");
        }
      }).catch(error => {
        Swal.fire({
          title: 'Error',
          text: 'Las credenciales no son correctas.',
          icon: 'error',
          background: '#edf2f4',
          confirmButtonText: 'Cerrar'
        });
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Digite un correo y contraseña.',
        icon: 'error',
        background: '#edf2f4',
        confirmButtonText: 'Cerrar'
      });

    }

  }


}
