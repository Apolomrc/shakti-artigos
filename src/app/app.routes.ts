import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ProductList } from './pages/product-list/product-list';

import { AdminLogin } from './pages/admin/login/login';
import { Admin } from './pages/admin/admin';
import { adminGuard } from './pages/admin/admin-auth';
import { AdminDashboard } from './pages/admin/dashboard/admin-dashboard';
import { AdminPedidos } from './pages/admin/pedidos/admin-pedidos';
import { AdminProdutos } from './pages/admin/produtos/admin-produtos';
import { AdminProdutoForm } from './pages/admin/produtos/admin-produto-form';
import { AdminEstoque } from './pages/admin/estoque/admin-estoque';
import { AdminClientes } from './pages/admin/clientes/admin-clientes';

import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { Checkout } from './pages/checkout/checkout';
import { TermosDeUsoComponent } from './pages/termos-de-uso/termos-de-uso.component';
import { PoliticaDePrivacidadeComponent } from './pages/politica-de-privacidade/politica-de-privacidade.component';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'produtos', component: ProductList },
  { path: 'checkout', component: Checkout },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'termos-de-uso', component: TermosDeUsoComponent },
  { path: 'politica-de-privacidade', component: PoliticaDePrivacidadeComponent },

  { path: 'admin/login', component: AdminLogin },
  {
    path: 'admin',
    component: Admin,
    canActivate: [adminGuard],
    children: [
      { path: '', component: AdminDashboard },
      { path: 'pedidos', component: AdminPedidos },
      { path: 'produtos', component: AdminProdutos },
      { path: 'produtos/novo', component: AdminProdutoForm },
      { path: 'produtos/:id', component: AdminProdutoForm },
      { path: 'estoque', component: AdminEstoque },
      { path: 'clientes', component: AdminClientes },
      { path: 'inventory', redirectTo: 'estoque' },
    ]
  }
];
