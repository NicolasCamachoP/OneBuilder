import { Injectable } from '@angular/core';
import { Sale } from '../models/sale';
import { SaleItem } from '../models/sale-item';

@Injectable({
    providedIn: 'root'
})
export class SalesService {
    private salesArrayName = 'mock-sales-array';
    private sales = JSON.parse( localStorage.getItem( this.salesArrayName )) || [];

    constructor() {/*
        for( let i = 0; i < 20; i++ ){
            let si: SaleItem[] = [];
            for( let j = 0; j < 30; j++){
                let _si: SaleItem = new SaleItem();
                _si.productEAN = "1" + j;
                _si.currentPrice = j * 10;
                _si.quantity = 1;
                si.push( _si );
            }
            this.createSale( si, 666);
        }*/
    }

    public createSale( saleItems: SaleItem[], clientID: number){
        let s: Sale = new Sale();
        s.saleID = this.sales.length ? Math.max(...this.sales.map(x => x.saleID )) + 1 : 1;
        s.dateTime = new Date();
        s.saleItems = saleItems;
        s.clientID = clientID;
        this.sales.push( s );
        localStorage.setItem(this.salesArrayName, JSON.stringify( this.sales ) );

    }

    public calcSaleTotal( saleID: number ){
        let s: Sale = this.getSale( saleID );

        if( s ){
            return s.saleItems.reduce( ( a, b ) => a + b.currentPrice * b.quantity, 0  );
        }
        else{
            return null;
        }
    }

    public deleteSale(saleID: number ){
        this.sales = this.sales.filter( x => x.saleID !== saleID );
        localStorage.setItem(this.salesArrayName, JSON.stringify(this.sales));
    }
    public getSales(){
        return this.sales;
    }

    public getSale(saleID: number){
        return this.sales.find( x => x.saleID === saleID );
    }

}
