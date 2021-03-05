import { Component, OnInit } from '@angular/core';
import { StockService } from '../services/stock.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public products: Product[];
  constructor(public stockSrv: StockService) { 
    this.products = this.stockSrv.getProducts();
  }

  ngOnInit(): void {
    
  }

  public editProduct(ean: String){
    alert(ean);
  }

}
