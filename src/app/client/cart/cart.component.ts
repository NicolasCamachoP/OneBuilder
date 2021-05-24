import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StockService } from 'src/app/services/stock.service';
import {Cart} from '../../models/cart';
import {CartItem} from '../../models/cart-item';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    public cart: Cart;

    constructor(
        private shoppingSrv: ShoppingCartService,
        private stockSrv: StockService,
        private router: Router,
        private authSrv: AuthenticationService) {
        this.cart = new Cart();
        this.cart.cartItems = [];
        this.shoppingSrv.getCart().then(cart => {
          this.cart = cart;
        }).catch(error => {
          Swal.fire({
            title: 'Error!',
            text: 'Error al recuperar el carrito!',
            icon: 'error',
            background: '#edf2f4',
            confirmButtonText: 'Cerrar'
          });
        });
    }

    ngOnInit(): void {
    }

    public getCartTotal(){
      let total = 0;
      this.cart.cartItems.forEach( item => {
        total += +item.currentPrice * item.quantity;
      });
      return total.toLocaleString('en-us', {minimumFractionDigits: 0});
    }

    public decreaseProductQuantity( cartItem: CartItem ){
      this.stockSrv.getProduct(cartItem.productEAN).then(p => {
        this.shoppingSrv.removeProduct(p).then(cart => {
          console.log(cart);
          this.cart = cart;
        }).catch(error => {
          Swal.fire({
            title: 'Error!',
            text: 'Tenemos dificultades técnicas...!',
            icon: 'error',
            background: '#edf2f4',
            confirmButtonText: 'Cerrar'
          });
        });
      }).catch(error => {
        Swal.fire({
          title: 'Error!',
          text: 'Tenemos dificultades técnicas...',
          icon: 'error',
          background: '#edf2f4',
          confirmButtonText: 'Cerrar'
        });
      });
    }

    public increaseProductQuantity( cartItem: CartItem ){
      this.stockSrv.getProduct(cartItem.productEAN).then(p => {
        this.shoppingSrv.addProduct(p).then(cart => {
          this.cart = cart;
        }).catch(error => {
          Swal.fire({
            title: 'Error!',
            text: 'No hay suficiente Stock!',
            icon: 'error',
            background: '#edf2f4',
            confirmButtonText: 'Cerrar'
          });
        });
      }).catch(error => {
        Swal.fire({
          title: 'Error!',
          text: 'Producto no disponible...',
          icon: 'error',
          background: '#edf2f4',
          confirmButtonText: 'Cerrar'
        });
      });
    }

    public goToCheckOut() {
      this.shoppingSrv.clearCart().then(sale => {
        console.log(sale);
        this.router.navigate(['client/purchasedetail', sale.saleID]);
      }).catch(error=> {
        Swal.fire({
          title: 'Error!',
          text: 'Error al procesar tu compra, intenta después.',
          icon: 'error',
          background: '#edf2f4',
          confirmButtonText: 'Cerrar'
        });
      });
    }
}
