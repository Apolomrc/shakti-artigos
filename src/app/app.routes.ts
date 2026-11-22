import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ProductList } from './pages/product-list/product-list';
import { AdminLogin } from './pages/admin/login/login';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'produtos', component: ProductList },
  { path: 'admin/login', component: AdminLogin }
];