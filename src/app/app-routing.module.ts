import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ClientAuthGuard } from './guards/client-auth.guard';
import { AdminAuthGuard } from './guards/admin-auth.guard';


const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'admin',
    canActivate: [AdminAuthGuard],
    loadChildren: () => import('./admin/admin.module').then(
      module => module.AdminModule
    )
  },
  {
    path: 'client',
    canActivate: [ClientAuthGuard],
    loadChildren: () => import('./client/client.module').then(
      module => module.ClientModule
    )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
