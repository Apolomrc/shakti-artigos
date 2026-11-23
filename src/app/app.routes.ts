import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ProductList } from './pages/product-list/product-list';
import { AdminLogin } from './pages/admin/login/login';
import { Admin } from './pages/admin/admin';
import { Estoque } from './pages/admin/inventory/estoque';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'produtos', component: ProductList },
  { path: 'admin/login', component: AdminLogin },
  {
    path: 'admin',
    component: Admin,
    children: [
      { path: '', redirectTo: 'inventory', pathMatch: 'full' },
      { path: 'inventory', component: Estoque }
    ]
  }
];