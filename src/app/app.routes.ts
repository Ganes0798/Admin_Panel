import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {
      path: 'dashboard', 
      loadComponent: () => import('./admin/dashboard/dashboard.component').then(m => {
        return m.DashboardComponent
      })
    },
    {
      path: 'users',
      loadComponent: () => import('./admin/users/users.component').then(m => {
        return m.UsersComponent
      })
    },
    {
      path: 'products',
      loadComponent: () => import('./admin/products/products.component').then(m => {
        return m.ProductsComponent
      })
    },
    {
      path: 'orders',
      loadComponent: () => import('./admin/orders/orders.component').then(m => {
        return m.OrdersComponent
      })
    },
    
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
