import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { EditproductComponent } from './editproduct/editproduct.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent
  },
  {
    path: 'editproduct', component: EditproductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
