import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { SaleItem } from '../models/sale-item';
import { Product } from '../models/product';
import { SalesService } from './sales.service';
import { AuthenticationService } from './authentication.service';
import { StockService } from './stock.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ShoppingCartService implements OnDestroy {

    ngOnDestroy(): void {
        this.saveState();
    }


    private saleItems: SaleItem [] = [];
    private arrayItemsName: string;

    constructor(
        private authSrv: AuthenticationService,
        private stockSrv: StockService,
        private router: Router) {
            this.initializeCart();
        }

        public addProduct (product: Product){
            if( this.saleItems.filter( x => x.productEAN === product.EAN ).length > 0){
                this.increaseProduct(product);
            }
            else{
                let newSaleItem: SaleItem = new SaleItem();
                newSaleItem.quantity = 1;
                newSaleItem.productEAN = product.EAN;
                newSaleItem.productName = product.name;
                newSaleItem.currentPrice = product.price;
                this.saleItems.push(newSaleItem);
            }
            this.saveState();
        }

        public removeProduct (product: Product){
            let i: number = 0;
            let j:number = -1;
            let flag: boolean = true;
            while(i < this.saleItems.length && flag){
                if (this.saleItems[i].productEAN === product.EAN){
                    j = i;
                    flag = false;
                }
            }
            if (j > -1){
                this.saleItems.splice(j, 1);
            }
            this.saveState();
        }

        public decreaseProductCart (product: SaleItem): boolean{
            let i = 0;
            while(i< this.saleItems.length){
                if (this.saleItems[i].productEAN === product.productEAN){
                    if (this.stockSrv.getProduct(product.productEAN).stock >= this.saleItems[i].quantity +1){
                        this.saleItems[i].quantity--;
                        return true;
                    }else{
                        return false;
                    }
                }
                i++;
            }
            this.saveState();
            return false;
        }
        public increaseCartProduct (product: SaleItem): boolean{
            let i = 0;
            while(i< this.saleItems.length){
                if (this.saleItems[i].productEAN === product.productEAN){
                    if (this.stockSrv.getProduct(product.productEAN).stock >= this.saleItems[i].quantity +1){
                        this.saleItems[i].quantity ++;
                        return true;
                    }else{
                        return false;
                    }
                }
                i ++;
            }
            this.saveState();
            return false;
        }

        public increaseProduct (product: Product): boolean{
            let i = 0;
            while(i< this.saleItems.length){
                if (this.saleItems[i].productEAN === product.EAN){
                    if (product.stock >= this.saleItems[i].quantity +1){
                        this.saleItems[i].quantity ++;
                        return true;
                    }else{
                        return false;
                    }
                }
                i ++;
            }
            this.saveState();
            return false;
        }

        public getItems(){
            return this.saleItems;
        }

        public getTotalPrice(){
            return this.saleItems.reduce((a, b) => a + b.currentPrice * b.quantity, 0);
        }
        private initializeCart() {
            this.arrayItemsName = "shoppingcart-";
            this.arrayItemsName += this.authSrv.userValue.UID;
            this.saleItems = JSON.parse(localStorage.getItem(this.arrayItemsName)) || [];
        }

        private saveState(){
            localStorage.setItem(this.arrayItemsName, JSON.stringify(this.saleItems));
        }


        public checkOut(){
            localStorage.setItem(this.arrayItemsName, JSON.stringify(this.saleItems));
            this.router.navigateByUrl("/client/checkout");
        }

}
