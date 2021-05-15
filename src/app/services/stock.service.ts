import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StockService {
    private stockArrayName = 'mock-stock-array';
    private stock: Product[] = [];
    private header: HttpHeaders;

    constructor(
      private http: HttpClient
    ) {
        this.header = new HttpHeaders({'Authorization': localStorage.getItem('token')});
    }


    public createProduct(name: string, desc: string, st: number, pr: number, ean: string): Promise<Product> {
      let newProduct: Product = new Product();
      newProduct.stock = st;
      newProduct.name = name;
      newProduct.description = desc;
      newProduct.price = pr;
      newProduct.ean = ean;
      return this.http.post<Product>("http://localhost:8080/product/create", newProduct, {headers: this.header})
        .toPromise();
    }

    public getProduct(ean: string) {
        return this.http.get<Product>("http://localhost:8080/product/" + ean, {headers: this.header})
          .toPromise();
    }

    public getProducts(): Promise<Product[]>{
        return this.http.get<Product[]>("http://localhost:8080/product/all", {headers: this.header})
        .toPromise();
    }

    public getProductsInStock() {
        return this.stock.filter( x => x.stock > 0 );
    }

    public deleteProduct(id: number) {
        return this.http.delete<Product>("http://localhost:8080/product/" + id, {headers: this.header})
          .toPromise();
    }

    public updateProduct(p: Product): Promise<Object> {
        return this.http.put("http://localhost:8080/product/update", p, {headers: this.header}).toPromise();

    }

    public reduceProductStock(EAN: string, amountBought: number){
        this.stock.find(x => x.ean === EAN).stock -= amountBought;
        localStorage.setItem(this.stockArrayName, JSON.stringify(this.stock));
    }
}
