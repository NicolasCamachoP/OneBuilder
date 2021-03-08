import { Injectable } from '@angular/core';
import { Sale } from '../models/sale';
import { SaleItem } from '../models/sale-item';

@Injectable({
    providedIn: 'root'
})
export class SalesService {
    private salesArrayName = 'mock-sales-array';
    private sales = JSON.parse(localStorage.getItem(this.salesArrayName)) || [];

    constructor() {
        if (this.sales.length === 0){
            this.createMockSales();
        }
    }

    private createMockSales(){
        let si: SaleItem[] = [];
        let _si: SaleItem = new SaleItem();
        _si.productEAN = "1365489523149";
        _si.currentPrice = 2500000;
        _si.quantity = 10;
        _si.productName ="RTX 3090";
        si.push(_si);
        this.createSale(si, 2);
        si= [];
        _si = new SaleItem();
        _si.productEAN = "2361851573222";
        _si.currentPrice = 900000;
        _si.quantity = 8;
        _si.productName ="MPG B550 Gaming Carbon WiFi";
        si.push(_si);
        _si = new SaleItem();
        _si.productEAN = "2364781563111";
        _si.currentPrice = 2300000;
        _si.quantity = 2;
        _si.productName = "Ryzen 9 5900X";
        si.push(_si);
        this.createSale(si, 2);
    }

    public createSale(saleItems: SaleItem[], clientID: number) {
        let s: Sale = new Sale();
        s.saleID = this.sales.length ? Math.max(...this.sales.map(x => x.saleID)) + 1 : 1;
        s.dateTime = new Date();
        s.saleItems = saleItems;
        s.clientID = clientID;
        this.sales.push(s);
        localStorage.setItem(this.salesArrayName, JSON.stringify(this.sales));

    }

    public calcSaleTotal(saleID: number) {
        let s: Sale = this.getSale(saleID);

        if (s) {
            return s.saleItems.reduce((a, b) => a + b.currentPrice * b.quantity, 0);
        }
        else {
            return null;
        }
    }

    public deleteSale(saleID: number) {
        this.sales = this.sales.filter(x => x.saleID !== saleID);
        localStorage.setItem(this.salesArrayName, JSON.stringify(this.sales));
    }
    public getSales() {
        return this.sales;
    }

    public getSale(saleID: number) {
        return this.sales.find(x => x.saleID === saleID);
    }

    public getSalesFromClient(clientID: number){
        return this.sales.filter(x => x.clientID === clientID);
    }

    public getLastSaleIDFromClient(clientID: number): number{
        let clientSales = this.sales.filter(x => x.clientID === clientID);
        if (clientSales.length >= 1){
            return clientSales[clientSales.length - 1].saleID;
        }else{
            return null;
        }
    }
}
