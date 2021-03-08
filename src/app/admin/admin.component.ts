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
        this.sales = this.salesSrv.getSales();
    }

    ngOnInit(): void {

    }

    public editProduct(product: Product){
        localStorage.setItem("toEdit-product", product.EAN);
        this.router.navigateByUrl("admin/editproduct");
    }

    public calcSaleTotal( saleID: number ){
        return this.salesSrv.calcSaleTotal( saleID );
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
