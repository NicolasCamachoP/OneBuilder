import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

import { Product } from '../models/product';
import {APIENDPOINT} from '../constants/endpoints.constants';

@Injectable({
    providedIn: 'root'
})
export class StockService {
    private stockArrayName = 'mock-stock-array';
    private stock: Product[] = [];
    private header: HttpHeaders;

    constructor(
      private http: HttpClient,
      private router: Router
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
      return this.http.post<Product>(APIENDPOINT + 'product/create', newProduct, {headers: this.header})
        .toPromise();
    }

    public getProduct(ean: string) {
        return this.http.get<Product>(APIENDPOINT + 'product/' + ean, {headers: this.header})
          .toPromise();
    }

    public getProducts(): Promise<Product[]>{
        return this.http.get<Product[]>(APIENDPOINT + 'product/all', {headers: this.header})
        .toPromise();
    }

    public getProductsInStock(): Promise<Product[]> {
        return this.http.get<Product[]>(APIENDPOINT + 'product/stock',{headers : this.header})
          .toPromise();
    }

    public deleteProduct(id: number) {
        return this.http.delete<Product>(APIENDPOINT + 'product/' + id, {headers: this.header})
          .toPromise();
    }

    public updateProduct(p: Product): Promise<Object> {
        return this.http.put(APIENDPOINT + 'product/update', p, {headers: this.header}).toPromise();

    }

    public reduceProductStock(EAN: string, amountBought: number){
        this.stock.find(x => x.ean === EAN).stock -= amountBought;
        localStorage.setItem(this.stockArrayName, JSON.stringify(this.stock));
    }
}
