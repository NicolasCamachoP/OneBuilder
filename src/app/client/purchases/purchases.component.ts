import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {SalesService} from 'src/app/services/sales.service';
import {Sale} from 'src/app/models/sale';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';

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
    private router: Router,
    private datePipe: DatePipe) {
    this.salesSrv.getSalesFromClient(this.authSrv.userValue.UID)
      .then(sales => {
        this.sales = sales;
      });
  }

  ngOnInit(): void {
  }

  public calcSaleTotal(saleID: number): string {
    let total = 0;
    this.sales.find(x => x.saleID === saleID)
      .saleItems.forEach(item => {
      total += +item.currentPrice * item.quantity;
    });
    return total.toLocaleString('en-us', {minimumFractionDigits: 0});
  }

  public viewDetail(saleID: number) {
    this.router.navigate(['client/purchasedetail', saleID]);
  }

  public formatDate(date: Date) {
    return this.datePipe.transform(date, 'dd-MM-yyyy HH:MM');
  }
}
