import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public userCredentials: User = new User();
  constructor(
    private authServ: AuthenticationService, 
    private route: ActivatedRoute,
    private router: Router 
    
  ) { }

  ngOnInit(): void {
  }

  public submitLogin(){
    console.log(this.authServ.login(this.userCredentials.email, this.userCredentials.password).pipe(
      first()
    ).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl']
        || '/';
        this.router.navigateByUrl(returnUrl);
      },
      error: error => {
        console.log("VALIÓ VERGA, SE ME MURIÓ MI NIÑO");
      }
    }));
  }

}
