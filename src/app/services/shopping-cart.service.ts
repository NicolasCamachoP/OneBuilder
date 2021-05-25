import {Injectable} from '@angular/core';
import {Product} from '../models/product';
import {AuthenticationService} from './authentication.service';
import {APIENDPOINT} from '../constants/endpoints.constants';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Cart} from '../models/cart';
import {Sale} from '../models/sale';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(
    private authSrv: AuthenticationService,
    private http: HttpClient) {
  }


  public addProduct(product: Product): Promise<Cart> {
    return this.http.post<Cart>(APIENDPOINT + 'cart/add', product)
      .toPromise();
  }

  public removeProduct(product: Product) {
    return this.http.post<Cart>(APIENDPOINT + 'cart/remove', product)
      .toPromise();
  }

  public getCart(): Promise<Cart> {
    return this.http.get<Cart>(APIENDPOINT + 'cart')
      .toPromise();
  }

  public clearCart() {
    return this.http.get<Sale>(APIENDPOINT + 'cart/checkout')
      .toPromise();
  }

}
