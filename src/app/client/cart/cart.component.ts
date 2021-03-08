import { Component, OnInit } from '@angular/core';
import { SaleItem } from '../../models/sale-item';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import Swal from 'sweetalert2';

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

        if(!this.shoppingSrv.decreaseProductCart( product )){
            Swal.fire({
                title: 'Guardado!',
                text: 'Producto removido del carrito!',
                icon: 'error',
                background: '#edf2f4',
                confirmButtonText: 'Cerrar'
            });
        }
    }

    public increaseProductQuantity( product: SaleItem ){
        if (!this.shoppingSrv.increaseCartProduct( product )){
            Swal.fire({
                title: 'Error!',
                text: 'No hay suficiente Stock!',
                icon: 'error',
                background: '#edf2f4',
                confirmButtonText: 'Cerrar'
            });
        }
    }

    public goToCheckOut() {

    }
}
