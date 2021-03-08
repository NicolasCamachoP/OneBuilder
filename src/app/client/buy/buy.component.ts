import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
    public products: Product[];

  constructor(
      private stockSrv: StockService,

             ) {
      this.products = this.stockSrv.getProducts();
  }

  ngOnInit(): void {
  }

}
