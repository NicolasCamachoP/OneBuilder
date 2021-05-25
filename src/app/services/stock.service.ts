import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

import {Product} from '../models/product';
import {APIENDPOINT} from '../constants/endpoints.constants';

@Injectable({
  providedIn: 'root'
})
export class StockService {
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
    return this.http.post<Product>(APIENDPOINT + 'product/create', newProduct)
      .toPromise();
  }

  public getProduct(ean: string) {
    return this.http.get<Product>(APIENDPOINT + 'product/' + ean)
      .toPromise();
  }

  public getProducts(): Promise<Product[]> {
    return this.http.get<Product[]>(APIENDPOINT + 'product/all')
      .toPromise();
  }

  public getProductsInStock(): Promise<Product[]> {
    return this.http.get<Product[]>(APIENDPOINT + 'product/stock')
      .toPromise();
  }

  public deleteProduct(id: number) {
    return this.http.delete<Product>(APIENDPOINT + 'product/' + id)
      .toPromise();
  }

  public updateProduct(p: Product): Promise<Object> {
    return this.http.put(APIENDPOINT + 'product/update', p)
      .toPromise();

  }
}
