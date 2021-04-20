import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { CreateProductComponent } from './create-product/create-product.component';

/*28:43*/
@NgModule({
  declarations: [AdminComponent, EditproductComponent, CreateProductComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ],
  providers : [ DatePipe ]
})
export class AdminModule { }
