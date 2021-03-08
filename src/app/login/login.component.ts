import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

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

  ) { }

  ngOnInit(): void {
    this.authServ.registerAdmin();
  }

  public submitLogin(){
    if (this.authServ.login(this.userCredentials.email, this.userCredentials.password)){
      if (this.authServ.userValue.isAdmin){
        this.router.navigateByUrl("/admin");
      }else{
        this.router.navigateByUrl("/client");
      }
    }
  }

}
