import {SaleItem} from './sale-item';

export class Sale {
  public saleID: number;
  public saleItems: SaleItem[];
  public dateTime: Date;
  public clientID: number;
}
