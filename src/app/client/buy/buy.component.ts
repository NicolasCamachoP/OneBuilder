import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { Product } from '../../models/product';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import Swal from "sweetalert2";

@Component({
    selector: 'app-buy',
    templateUrl: './buy.component.html',
    styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
    public products: Product[];



    constructor(
        private stockSrv: StockService,
        private shoppingSrv: ShoppingCartService) {
            this.products = this.stockSrv.getProductsInStock();
        }

        ngOnInit(): void {
        }

        public addProductToCart( product: Product ){
            this.shoppingSrv.addProduct( product );
            let toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1200,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            });
            toast.fire({
                icon: 'success',
                title: 'Agregado al Carrito'
            });
        }

}
