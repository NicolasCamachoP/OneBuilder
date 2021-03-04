import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private stockArrayName = 'mock-stock-array';
  private stock = JSON.parse(localStorage.getItem(this.stockArrayName)) || [];
  constructor() { }

  public createProduct(name: string, desc: string, st: number, pr: number, ean: string): boolean {
    if (this.stock.find(x => x.EAN === ean)) {
      console.log("Product already registered");
      return false;
    }
    else {
      // Adds new UID
      let p: Product = new Product();
      p.EAN = ean;
      p.description = desc;
      p.name = name;
      p.price = pr;
      p.stock = st;
      p.UID = this.stock.length ? Math.max(...this.stock.map(x => x.UID)) + 1 : 1;
      this.stock.push(p);
      localStorage.setItem(this.stockArrayName, JSON.stringify(this.stock));
      return true;
    }
  }

  public getProduct(ean: string){
    return this.stock.find(x => x.EAN === ean);
  }

  public getProducts(){
    return this.stock;
  }

  public deleteProduct(ean: string){
    this.stock = this.stock.filter(x => x.EAN !== ean);
    localStorage.setItem(this.stockArrayName, JSON.stringify(this.stock));
  }

  public updateProduct(p: Product){
    this.stock.array.forEach(product => {
      if (product.EAN === p.EAN){
        product = p;
      }
    });
  }
}
