import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public newUser: User = new User();
  constructor(
    private authServ: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public registerUser(){
    this.newUser.isAdmin = false;
    if (this.authServ.register(this.newUser)){
      console.log("REGISTRADO BEBELEAN");
    }else{
      console.log("VALIÓ VERGA, SE ME MURIÓ MI NIÑO");
    }
  }

}
