import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SaleItem } from 'src/app/models/sale-item';
import { Sale } from 'src/app/models/sale';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-purchase-detail',
  templateUrl: './purchase-detail.component.html',
  styleUrls: ['./purchase-detail.component.css']
})
export class PurchaseDetailComponent implements OnInit, OnDestroy {
  
  public saleID: number;
  public saleItems: SaleItem[];
  public sale: Sale;
  public currentClient: User;
  private sub: any;

  constructor(
    private authSrv: AuthenticationService,
    private salesSrv: SalesService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.saleID = parseInt(params['saleID']);
      this.currentClient = this.authSrv.userValue;
      this.sale = this.salesSrv.getSale(this.saleID);
      this.saleItems = this.sale.saleItems;
    });
  }
  
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  public calcTotal() {
    return this.salesSrv.calcSaleTotal(this.saleID);
  }

  
}
