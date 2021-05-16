import { Injectable } from '@angular/core';
import { Sale } from '../models/sale';
import { SaleItem } from '../models/sale-item';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {Router} from '@angular/router';
import {APIENDPOINT} from '../constants/endpoints.constants';

@Injectable({
    providedIn: 'root'
})
export class SalesService {
    private header: HttpHeaders;
    constructor(
    private http: HttpClient,
    private router: Router) {

        this.header = new HttpHeaders({'Authorization': localStorage.getItem('token')});

    }

    public createSale(saleItems: SaleItem[], clientID: number): Promise<Sale>{
        let s: Sale = new Sale();
        s.saleID = 0;
        s.dateTime = new Date();
        s.saleItems = saleItems;
        s.clientID = clientID;
        return this.http.post<Sale>(APIENDPOINT + 'sale/create', s, {headers: this.header} )
            .toPromise();
    }

    public getSales(): Promise<Sale[]> {
        return this.http.get<Sale[]>(APIENDPOINT + 'sale/all',{headers: this.header})
          .toPromise();
    }

    public getSale(saleID: number): Promise<Sale>{
        return this.http.get<Sale>(APIENDPOINT + 'sale/' + saleID, {headers: this.header})
          .toPromise();
    }

    public getSalesFromClient(clientID: number): Promise<Sale[]>{
        return this.http.get<Sale[]>(APIENDPOINT + 'sale/client/all/' + clientID, {headers: this.header})
          .toPromise();
    }

    public getLastSaleIDFromClient(clientID: number): Promise<Sale>{
      return this.http.get<Sale>(APIENDPOINT + 'sale/client/last/' + clientID, {headers: this.header})
        .toPromise();
    }
}
