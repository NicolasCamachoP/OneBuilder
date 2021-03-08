import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {


  public isLoggedin:boolean = false;
  public isAdmin:boolean = false;
  user: User;
  userSubscription: Subscription;

  constructor(
    private authSrv: AuthenticationService,
    private router: Router) {

    this.userSubscription = this.authSrv.user.subscribe(
      user => {
        this.updateUserInfo();
      }
    )
    this.updateUserInfo();
  }

  private updateUserInfo(){
    if(this.authSrv.userValue === null){
      this.isLoggedin = false;
      this.isAdmin = false;
    } else{
      this.isAdmin = this.authSrv.userValue.isAdmin;
      this.isLoggedin = true;
    }
  }
  ngOnInit(): void {
    this.updateUserInfo();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }


  public logout(){
    this.authSrv.logout();
  }
  public login(){
    this.router.navigateByUrl("/login");
  }

  public goToClientPage(){
    this.router.navigateByUrl("/client");
  }

  public goToAdminPage(){
    this.router.navigateByUrl("/admin");
  }

  public goToRegisterPage(){
    this.router.navigateByUrl("/register");
  }

  public goToBuy(){
    this.router.navigateByUrl("/client/buy");
  }

  public goToCart(){
    this.router.navigateByUrl("/client/cart");
  }
}
