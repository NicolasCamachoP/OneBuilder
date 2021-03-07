import { Component, OnInit } from '@angular/core';
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
export class PurchaseDetailComponent implements OnInit {
  private saleID: number;
  public saleItems: SaleItem[];
  public sale: Sale;
  public currentClient: User;
  private idKey = "toView-sale";

  constructor(
    private authSrv: AuthenticationService, 
    private salesSrv: SalesService
    ) {
      this.saleID = +localStorage.getItem(this.idKey); 
      this.currentClient = this.authSrv.userValue;
      this.sale = this.salesSrv.getSale(this.saleID);
      this.saleItems = this.sale.saleItems;
    }

  ngOnInit(): void {
  }

  public calcTotal(){
    return this.salesSrv.calcSaleTotal(this.saleID);
  }

}
