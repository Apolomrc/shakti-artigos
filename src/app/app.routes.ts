import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ProductList } from './pages/product-list/product-list';

export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'produtos', component: ProductList }, 
];
