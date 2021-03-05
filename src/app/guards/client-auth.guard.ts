import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ClientAuthGuard implements CanActivate {
  constructor(private authSrv: AuthenticationService, private router: Router){}
  canActivate(){
    if (this.authSrv.userValue && !this.authSrv.userValue.isAdmin)
      return true;
    else
      return false;
  }
  
}
