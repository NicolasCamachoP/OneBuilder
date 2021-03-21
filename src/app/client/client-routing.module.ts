import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { PurchaseDetailComponent } from './purchase-detail/purchase-detail.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { CartComponent } from './cart/cart.component';
import { BuyComponent } from './buy/buy.component';

const routes: Routes = [
  {
    path: '', component: ClientComponent
  },
  {
    path: 'purchasedetail/:saleID', component: PurchaseDetailComponent
  },
  {
    path: 'purchases', component: PurchasesComponent
  },
  {
    path: 'cart', component: CartComponent
  },
  {
    path: 'buy', component: BuyComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
