import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { PurchaseDetailComponent } from './purchase-detail/purchase-detail.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {
    path: '', component: ClientComponent
  }, 
  {
    path: 'purchasedetail', component: PurchaseDetailComponent
  }, 
  {
    path: 'purchases', component: PurchasesComponent
  }, 
  {
    path: 'cart', component: CartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
