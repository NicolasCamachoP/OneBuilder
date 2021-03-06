import { Component, OnInit } from '@angular/core';
import { StockService } from '../services/stock.service';
import { SalesService } from '../services/sales.service';
import { Sale } from '../models/sale';

import { Product } from '../models/product';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public products: Product[];
  public sales: Sale[];
  constructor(public stockSrv: StockService, public salesSrv: SalesService) {
    this.products = this.stockSrv.getProducts();
    this.sales = this.salesSrv.getSales();
  }

  ngOnInit(): void {

  }

  public editProduct(ean: String){
    alert(ean);
  }

  public calcSaleTotal( saleID: number ){
      return this.salesSrv.calcSaleTotal( saleID );
  }


}
