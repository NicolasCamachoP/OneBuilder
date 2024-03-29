import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import {ClientRoutingModule} from './client-routing.module';
import {ClientComponent} from './client.component';
import {CartComponent} from './cart/cart.component';
import {PurchasesComponent} from './purchases/purchases.component';
import {PurchaseDetailComponent} from './purchase-detail/purchase-detail.component';
import {BuyComponent} from './buy/buy.component';

@NgModule({
  declarations: [ClientComponent, CartComponent, PurchasesComponent, PurchaseDetailComponent, BuyComponent],
  imports: [
    CommonModule,
    ClientRoutingModule
  ],
  providers: [DatePipe]
})
export class ClientModule {
}
