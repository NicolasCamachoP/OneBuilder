import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authSrv: AuthenticationService) { }

  ngOnInit(): void {
  }

  public logout(){
    if (this.authSrv.userValue){
      this.authSrv.logout();
    }
  }
}
