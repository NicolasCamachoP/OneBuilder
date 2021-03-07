import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { SalesService } from '../services/sales.service';
import { User } from '../models/user';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  public currentClient: User;

  constructor(
    private authSrv: AuthenticationService, 
    private router: Router, 
    private salesSrv: SalesService) { 
      this.currentClient = this.authSrv.userValue;
    }

  ngOnInit(): void {
  }

  public lastDetail(){
    let saleID = this.salesSrv.getLastSaleIDFromClient(this.currentClient.UID);
    //debugger;
    //alert("Sale ID: " + saleID);
    if (saleID === null){
      alert("No ha realizado compras :(");
    }else{
      localStorage.setItem("toView-sale", saleID.toString());
      this.router.navigateByUrl('client/purchasedetail');
    }
  }

  public goToShoppingCart(){
    //TODO
  }

  public goToPurchases(){
    this.router.navigateByUrl('client/purchases')
  }
}
