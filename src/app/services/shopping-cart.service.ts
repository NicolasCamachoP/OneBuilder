import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { SaleItem } from '../models/sale-item';
import { Product } from '../models/product';
import { SalesService } from './sales.service';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService implements OnInit, OnDestroy{

  ngOnDestroy(): void {
    this.saveState();
  }
  ngOnInit(): void {
    this.initializeCart();
  }
  

  private saleItems: SaleItem [] = [];
  private arrayItemsName: string;

  constructor( 
    private authSrv: AuthenticationService, 
    private router: Router) { 
    this.initializeCart();
  }

  public addProduct (product: Product){
    let newSaleItem: SaleItem = new SaleItem();
    newSaleItem.quantity = 1;
    newSaleItem.productEAN = product.EAN;
    newSaleItem.productName = product.name;
    newSaleItem.currentPrice = product.price;
    this.saleItems.push(newSaleItem);
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
    return false;
  }

  public decreaseProduct (product: Product){
    let flag: boolean = true;
    let i = 0;
    while(i< this.saleItems.length && flag){
      if (this.saleItems[i].productEAN === product.EAN){
        if (this.saleItems[i].quantity > 1){
          this.saleItems[i].quantity --;
        }else{
          this.removeProduct(product);
        }
        flag = false;
      }
      i ++;
    }
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
