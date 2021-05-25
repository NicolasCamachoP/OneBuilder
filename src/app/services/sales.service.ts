import {Injectable} from '@angular/core';
import {Sale} from '../models/sale';
import {HttpClient} from '@angular/common/http';
import {APIENDPOINT} from '../constants/endpoints.constants';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  constructor(
    private http: HttpClient) {
  }

  public getSales(): Promise<Sale[]> {
    return this.http.get<Sale[]>(APIENDPOINT + 'sale/all')
      .toPromise();
  }

  public getSale(saleID: number): Promise<Sale> {
    return this.http.get<Sale>(APIENDPOINT + 'sale/' + saleID)
      .toPromise();
  }

  public getSalesFromClient(clientID: number): Promise<Sale[]> {
    return this.http.get<Sale[]>(APIENDPOINT + 'sale/client/all/' + clientID)
      .toPromise();
  }

  public getLastSaleIDFromClient(clientID: number): Promise<Sale> {
    return this.http.get<Sale>(APIENDPOINT + 'sale/client/last/' + clientID)
      .toPromise();
  }
}
