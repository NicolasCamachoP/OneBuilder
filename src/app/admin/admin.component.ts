import { Component, OnInit } from '@angular/core';
import { StockService } from '../services/stock.service';
import { SalesService } from '../services/sales.service';
import { Sale } from '../models/sale';
import { Router } from '@angular/router';

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
        private router: Router) {
        this.products = this.stockSrv.getProducts();
        this.salesSrv.getSales()
            .subscribe(sales => {
                console.log(sales);
                this.sales = sales;
            })
    }

    ngOnInit(): void {

    }

    public editProduct(product: Product){
        this.router.navigate(["admin/editproduct", product.EAN]);
    }

    public calcSaleTotal(saleID: number ){
        let sale = this.sales.find(x => x.saleID === saleID);
        return sale.saleItems.reduce((a,b) => a + b.currentPrice * b.quantity, 0);
    }

    public deleteProduct( ean: string){
        this.stockSrv.deleteProduct( ean );
        this.products = this.stockSrv.getProducts();
    }

    public addProduct(){
        this.router.navigateByUrl("admin/createproduct");
    }

    identify( index, product){
        return product.EAN;
    }


}
