import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { StockService } from '../../services/stock.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {
    public product: Product = new Product();

  constructor(private stockSrv: StockService,
             private router: Router) {
      this.product = this.stockSrv.getProduct(localStorage.getItem("toEdit-product"));
  }

  ngOnInit(): void {
  }

  public saveProduct(){
      this.stockSrv.updateProduct( this.product );
      this.router.navigate([".."]);
  }

}
