import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [HomeComponent, NavbarComponent, FooterComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
