import { Component, OnInit } from '@angular/core';
import { SaleItem } from '../../models/sale-item';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    public products: SaleItem[];

    constructor( private shoppingSrv: ShoppingCartService) {
        this.products = this.shoppingSrv.getItems();
    }

    ngOnInit(): void {
    }

    public getCartTotal(){
        return this.shoppingSrv.getTotalPrice();
    }

    public decreaseProductQuantity( product: SaleItem ){
        this.shoppingSrv.decreaseProductCart( product );
    }

    public increaseProductQuantity( product: SaleItem ){
        this.shoppingSrv.increaseCartProduct( product );
    }

    public goToCheckOut() {

    }
}
