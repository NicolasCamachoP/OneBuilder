import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { AuthenticationService } from './authentication.service';
import {APIENDPOINT} from '../constants/endpoints.constants';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Cart} from '../models/cart';
import {Sale} from '../models/sale';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService{

  private headers: HttpHeaders;
  private userToken: string;


  constructor(
    private authSrv: AuthenticationService,
    private http: HttpClient) {
    this.userToken = localStorage.getItem('token');
    this.headers = new HttpHeaders({'Authorization': this.userToken});
  }


  public addProduct(product: Product): Promise<Cart> {
    return this.http.post<Cart>(APIENDPOINT + 'cart/add', product, {headers: this.headers})
      .toPromise();
  }

  public removeProduct(product: Product) {
    console.log(product);
    return this.http.post<Cart>(APIENDPOINT + 'cart/remove', product, {headers: this.headers})
      .toPromise();
  }

  public getCart(): Promise<Cart> {
    return this.http.get<Cart>(APIENDPOINT + 'cart', {headers: this.headers})
      .toPromise();
  }

  public clearCart(){
    return this.http.get<Sale>(APIENDPOINT + 'cart/checkout', {headers: this.headers})
      .toPromise();
  }

}
