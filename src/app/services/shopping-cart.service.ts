import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { SaleItem } from '../models/sale-item';
import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';
import { SalesService } from './sales.service';
import { AuthenticationService } from './authentication.service';
import { StockService } from './stock.service';
import { Router } from '@angular/router';
import {User} from '../models/user';
import {APIENDPOINT} from '../constants/endpoints.constants';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Cart} from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService implements OnDestroy {

  private headers: HttpHeaders;
  private userToken: string;


  constructor(
    private authSrv: AuthenticationService,
    private http: HttpClient) {
    this.userToken = localStorage.getItem('token');
    this.headers = new HttpHeaders({'Authorization': this.userToken});
  }

  ngOnDestroy(): void {
    this.saveState();
  }

  public addProduct(product: Product): Promise<Cart> {
    return this.http.post<Cart>(APIENDPOINT + 'cart/add', product, {headers: this.headers})
      .toPromise();
  }

  public removeProduct(product: Product) {
    return this.http.post<Cart>(APIENDPOINT + 'cart/remove', product, {headers: this.headers})
      .toPromise();
  }

  public getCart(): Promise<Cart> {
    return this.http.get<Cart>(APIENDPOINT + 'cart', {headers: this.headers})
      .toPromise();
  }

  public clearCart(){
    return this.http.get<Cart>(APIENDPOINT + 'checkout', {headers: this.headers})
      .toPromise();
  }

}
