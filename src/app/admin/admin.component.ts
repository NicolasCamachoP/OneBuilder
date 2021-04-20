import { Component, OnInit } from '@angular/core';
import { StockService } from '../services/stock.service';
import { SalesService } from '../services/sales.service';
import { Sale } from '../models/sale';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Product } from '../models/product';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
    public products: Product[];
    public sales: Sale[];
    constructor(
        private stockSrv: StockService,
        private salesSrv: SalesService,
        private datePipe: DatePipe,
        private router: Router) {
        this.getProducts();
        this.getSales();
    }

    ngOnInit(): void {
    }
    private getSales(){
      this.salesSrv.getSales()
        .then(sales => {
          this.sales = sales;
        });
    }
    private getProducts(){
      this.stockSrv.getProducts().then( products => {
        this.products = products;
      });
    }

    public editProduct(product: Product){
        this.router.navigate(["admin/editproduct", product.ean]);
    }

    public calcSaleTotal(saleID: number ){
        let sale = this.sales.find(x => x.saleID === saleID);
        return sale.saleItems.reduce((a,b) => a + b.currentPrice * b.quantity, 0)
                .toLocaleString('en-us', {minimumFractionDigits: 0});
    }

    public deleteProduct( id: number){
        this.stockSrv.deleteProduct( id ).then( () => {
            this.getProducts();
        });
    }

    public addProduct(){
        this.router.navigateByUrl("admin/createproduct");
    }

    public formatDate(date: Date){
        return this.datePipe.transform(date, 'dd-MM-yyyy HH:MM');
    }

    identify( index, product){
        return product.EAN;
    }


}
