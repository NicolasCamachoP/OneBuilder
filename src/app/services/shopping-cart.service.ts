import { Injectable } from '@angular/core';
import { SaleItem } from '../models/sale-item';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private saleItems: SaleItem [] = [];

  constructor() { }

  public addProduct (product: Product){
    //TODO
  }

  public removeProduct (product: Product){
    //TODO
  }

  public increaseProduct (product: Product){
    //TODO
  }

  public decreaseProdcut (product: Product){
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
    //TODO
  }

}
