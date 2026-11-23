import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AdminAuth } from './admin-auth';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="admin-shell">
      <aside class="admin-menu">
        <a routerLink="/admin" class="admin-logo">
          <img src="/logo.png" alt="Shakti Artigos">
          <span>Painel</span>
        </a>

        <nav>
          <a routerLink="/admin" [routerLinkActiveOptions]="{ exact: true }" routerLinkActive="ativo">Visão geral</a>
          <a routerLink="/admin/pedidos" routerLinkActive="ativo">Pedidos</a>
          <a routerLink="/admin/produtos" routerLinkActive="ativo">Produtos</a>
          <a routerLink="/admin/estoque" routerLinkActive="ativo">Estoque</a>
          <a routerLink="/admin/clientes" routerLinkActive="ativo">Clientes</a>
        </nav>

        <div class="admin-rodape">
          <a routerLink="/">← Voltar ao site</a>
          <button type="button" (click)="sair()">Sair</button>
        </div>
      </aside>

      <main class="admin-conteudo">
        <router-outlet />
      </main>
    </div>
  `,
  styles: [`
    .admin-shell { display: flex; min-height: 100vh; background: #f5fbfa; font-family: 'Montserrat', sans-serif; color: #102b27; }
    .admin-menu { width: 230px; flex-shrink: 0; display: flex; flex-direction: column; padding: 28px 18px; background: #061a18; color: #fff; }
    .admin-logo { display: flex; flex-direction: column; align-items: center; gap: 6px; margin-bottom: 36px; text-decoration: none; color: #fff; }
    .admin-logo img { width: 110px; }
    .admin-logo span { font-size: 11px; letter-spacing: 2px; color: #20b8b0; text-transform: uppercase; }
    nav { display: flex; flex-direction: column; gap: 4px; }
    nav a { padding: 11px 14px; border-radius: 10px; color: #cfe5e1; text-decoration: none; font-size: 14px; }
    nav a:hover { background: rgba(255, 255, 255, 0.06); }
    nav a.ativo { background: #0d7f78; color: #fff; }
    .admin-rodape { margin-top: auto; display: flex; flex-direction: column; gap: 12px; font-size: 13px; }
    .admin-rodape a { color: #8fbdb6; text-decoration: none; }
    .admin-rodape button { align-self: flex-start; border: none; background: none; color: #fff; cursor: pointer; font: inherit; padding: 0; }
    .admin-conteudo { flex: 1; min-width: 0; padding: 36px clamp(16px, 3vw, 40px); }
    @media (max-width: 760px) {
      .admin-shell { flex-direction: column; }
      .admin-menu { width: 100%; }
      nav { flex-direction: row; flex-wrap: wrap; }
    }
  `],
})
export class Admin {
  private auth = inject(AdminAuth);
  private router = inject(Router);

  sair() {
    this.auth.sair();
    this.router.navigateByUrl('/admin/login');
  }
}
