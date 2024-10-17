import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './guards/auth-guard.service';
import { RoleGuard } from './guards/role-guard.service';

export const routes: Routes = [

    {path: 'login', component: LoginComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {
      path: 'dashboard', 
      loadComponent: () => import('./admin/dashboard/dashboard.component').then(m => {
        return m.DashboardComponent
      }),
      canActivate: [AuthGuard]
    },
    {
      path: 'users',
      loadComponent: () => import('./admin/users/users.component').then(m => {
        return m.UsersComponent
      }),
      canActivate: [AuthGuard, RoleGuard],
      data: {expectedRole: 'SuperAdmin'}
    },
    {
      path: 'products',
      loadComponent: () => import('./admin/products/products.component').then(m => {
        return m.ProductsComponent
      }),
      canActivate: [AuthGuard]
    },
    {
      path: 'orders',
      loadComponent: () => import('./admin/orders/orders.component').then(m => {
        return m.OrdersComponent
      }),
      canActivate: [AuthGuard]
    },
    
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
