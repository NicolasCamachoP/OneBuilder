import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SalesService } from 'src/app/services/sales.service';
import { Sale } from 'src/app/models/sale';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {
  public sales: Sale[];
  constructor(
    private authSrv: AuthenticationService, 
    private salesSrv: SalesService, 
    private router: Router) {
      this.sales = this.salesSrv.getSalesFromClient(this.authSrv.userValue.UID);
     }

  ngOnInit(): void {
  }

  public calcSaleTotal(saleID: number){
    return this.salesSrv.calcSaleTotal(saleID);
  }

  public viewDetail(saleID: number){
    localStorage.setItem("toView-sale", saleID.toString());
    this.router.navigateByUrl('client/purchasedetail');
  }
}
