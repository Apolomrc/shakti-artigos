import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ProductList } from './pages/product-list/product-list';

import { AdminLogin } from './pages/admin/login/login';



import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { TermosDeUsoComponent } from './pages/termos-de-uso/termos-de-uso.component';
import { PoliticaDePrivacidadeComponent } from './pages/politica-de-privacidade/politica-de-privacidade.component';
export const routes: Routes = [
    { path: '', component: Home },
    { path: 'produtos', component: ProductList }, 
    { path: 'admin/login', component: AdminLogin },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'termos-de-uso', component: TermosDeUsoComponent },
    { path: 'politica-de-privacidade', component: PoliticaDePrivacidadeComponent }
];

